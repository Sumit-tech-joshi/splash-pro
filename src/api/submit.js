// api/submit.js (Node 18+ / Vercel Serverless)
// Install: none required on Vercel (node fetch available). If locally test, install node-fetch.

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "";
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || "";
const APPS_SCRIPT_TOKEN = process.env.APPS_SCRIPT_TOKEN || "";
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || "";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(',').map(s => s.trim()).filter(Boolean);

function setCors(res, origin) {
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
}

async function uploadToCloudinary(base64Data) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) return "";
  // base64Data should be like "data:image/jpeg;base64,...."
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const form = new URLSearchParams();
  form.append('file', base64Data);
  form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  const r = await fetch(url, { method: 'POST', body: form });
  if (!r.ok) {
    const txt = await r.text();
    throw new Error('Cloudinary upload failed: ' + txt);
  }
  const j = await r.json();
  return j.secure_url || "";
}

async function sendSendGridEmail(payload) {
  if (!SENDGRID_API_KEY || !NOTIFY_EMAIL) return false;
  const bodyHtml = `
    <h3>New booking request</h3>
    <p><strong>Name:</strong> ${payload.firstName || ''} ${payload.lastName || ''}</p>
    <p><strong>Email:</strong> ${payload.email || ''}</p>
    <p><strong>Phone:</strong> ${payload.phone || ''}</p>
    <p><strong>Service:</strong> ${payload.serviceType || ''}</p>
    <p><strong>Date:</strong> ${payload.date1 || ''}</p>
    <p><strong>Details:</strong> ${payload.details || ''}</p>
    <p><strong>Image:</strong> ${payload.imageUrl ? `<a href="${payload.imageUrl}">uploaded image</a>` : 'none'}</p>
    <pre>${JSON.stringify(payload, null, 2)}</pre>
  `;
  const msg = {
    personalizations: [{ to: [{ email: NOTIFY_EMAIL }] }],
    from: { email: 'no-reply@yourdomain.com', name: 'Splash Pro Website' },
    subject: `New request from ${payload.firstName || ''} ${payload.lastName || ''}`,
    content: [{ type: 'text/html', value: bodyHtml }]
  };

  const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(msg),
  });

  if (!r.ok) {
    const txt = await r.text();
    console.error('SendGrid failed:', txt);
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  // CORS preflight
  const origin = req.headers.origin;
  if (req.method === 'OPTIONS') {
    setCors(res, ALLOWED_ORIGINS.includes(origin) ? origin : '*');
    res.status(204).end();
    return;
  }

  setCors(res, ALLOWED_ORIGINS.includes(origin) ? origin : '*');

  if (req.method !== 'POST') {
    res.status(405).json({ ok:false, error:'Method not allowed' });
    return;
  }

  try {
    const payload = req.body || {};
    // spam honeypot
    if (payload.website) {
      res.status(200).json({ ok:true }); // silently ignore
      return;
    }

    // Basic validation
    if (!payload.firstName || !payload.lastName || !payload.email || !payload.phone) {
      res.status(400).json({ ok:false, error:'Missing required fields' });
      return;
    }

    // Optional: handle base64 image upload
    if (payload.imageBase64) {
      try {
        const url = await uploadToCloudinary(payload.imageBase64);
        payload.imageUrl = url;
        delete payload.imageBase64;
      } catch (err) {
        console.warn('Cloudinary upload failed, continuing without image', err);
      }
    }

    // Send to Google Apps Script (sheet writer)
    if (APPS_SCRIPT_URL && APPS_SCRIPT_TOKEN) {
      const bodyToSend = { ...payload, __token: APPS_SCRIPT_TOKEN };
      const r = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyToSend),
      });
      if (!r.ok) {
        const txt = await r.text();
        console.warn('Apps Script returned non-OK:', txt);
      } else {
        // optionally parse response
        // const jr = await r.json();
      }
    }

    // Send email via SendGrid
    if (SENDGRID_API_KEY && NOTIFY_EMAIL) {
      await sendSendGridEmail(payload);
    }

    res.status(200).json({ ok:true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, error: err.message });
  }
}