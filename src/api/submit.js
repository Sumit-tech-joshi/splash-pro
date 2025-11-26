// api/submit.js (Vercel serverless, Node 18+)
// Paste into /api/submit.js in your repo and deploy to Vercel.

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "";
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || "";
const APPS_SCRIPT_TOKEN = process.env.APPS_SCRIPT_TOKEN || "";
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || "";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

// helper: set CORS headers on every response
function setCors(res, originValue) {
  res.setHeader("Access-Control-Allow-Origin", originValue);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Vary", "Origin");
  // don't set Allow-Credentials unless you actually use credentials (cookies)
}

// Cloudinary upload (expects base64 data like data:image/jpeg;base64,...)
async function uploadToCloudinary(base64Data) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) return "";
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  // Use FormData so Cloudinary receives correct multipart/form-data
  const form = new FormData();
  form.append("file", base64Data);
  form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const r = await fetch(url, {
    method: "POST",
    body: form, // do not set Content-Type; fetch will set boundary
  });

  if (!r.ok) {
    const txt = await r.text();
    throw new Error("Cloudinary upload failed: " + txt);
  }
  const j = await r.json();
  return j.secure_url || "";
}

// Sendgrid email
async function sendSendGridEmail(payload) {
  if (!SENDGRID_API_KEY || !NOTIFY_EMAIL) return false;

  const bodyHtml = `
    <h3>New booking request</h3>
    <p><strong>Name:</strong> ${payload.firstName || ""} ${payload.lastName || ""}</p>
    <p><strong>Email:</strong> ${payload.email || ""}</p>
    <p><strong>Phone:</strong> ${payload.phone || ""}</p>
    <p><strong>Service:</strong> ${payload.serviceType || ""}</p>
    <p><strong>Date:</strong> ${payload.date1 || ""}</p>
    <p><strong>Details:</strong> ${payload.details || ""}</p>
    <p><strong>Image:</strong> ${payload.imageUrl ? `<a href="${payload.imageUrl}">uploaded image</a>` : "none"}</p>
    <pre>${JSON.stringify(payload, null, 2)}</pre>
  `;

  const msg = {
    personalizations: [{ to: [{ email: NOTIFY_EMAIL }] }],
    from: { email: process.env.FROM_EMAIL || NOTIFY_EMAIL, name: "Splash Pro Website" },
    subject: `New request from ${payload.firstName || ""} ${payload.lastName || ""}`,
    content: [{ type: "text/html", value: bodyHtml }],
  };

  const r = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg),
  });

  if (!r.ok) {
    const txt = await r.text();
    console.warn("SendGrid failed:", txt);
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  const origin = req.headers.origin || "";

  // decide what origin to return (must match the incoming origin or a safe/default)
  const allowedOrigin = ALLOWED_ORIGINS.length
    ? ALLOWED_ORIGINS.includes(origin)
      ? origin
      : ALLOWED_ORIGINS[0]
    : "*";

  // respond to preflight immediately
  if (req.method === "OPTIONS") {
    setCors(res, allowedOrigin);
    return res.status(204).end();
  }

  // always set CORS for actual requests
  setCors(res, allowedOrigin);

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    // body parser: Vercel provides parsed JSON in req.body
    const payload = req.body && Object.keys(req.body).length ? req.body : {};
    // basic anti-bot honeypot
    if (payload.website) {
      // Accept but don't process bot submissions
      return res.status(200).json({ ok: true });
    }

    // basic validation (you can expand)
    if (!payload.firstName || !payload.lastName || !payload.email || !payload.phone) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    // optional image upload: payload.imageBase64
    if (payload.imageBase64) {
      try {
        const imageUrl = await uploadToCloudinary(payload.imageBase64);
        payload.imageUrl = imageUrl;
        delete payload.imageBase64;
      } catch (err) {
        // log but continue
        console.warn("Cloudinary upload failed, continuing without image", err);
      }
    }

    // Forward to Apps Script
    if (APPS_SCRIPT_URL && APPS_SCRIPT_TOKEN) {
      try {
        const bodyToSend = { ...payload, __token: APPS_SCRIPT_TOKEN };
        const r = await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyToSend),
        });
        if (!r.ok) {
          const txt = await r.text();
          console.warn("Apps Script returned non-OK:", txt);
        } else {
          // optional parse response
          // const jr = await r.json();
        }
      } catch (err) {
        console.error("Error forwarding to Apps Script:", err);
      }
    } else {
      console.warn("APPS_SCRIPT_URL or APPS_SCRIPT_TOKEN not configured. Skipping sheet write.");
    }

    // Send email via SendGrid (best-effort)
    if (SENDGRID_API_KEY && NOTIFY_EMAIL) {
      try {
        await sendSendGridEmail(payload);
      } catch (err) {
        console.warn("SendGrid send error:", err);
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("submit handler error:", err);
    return res.status(500).json({ ok: false, error: err.message || "Server error" });
  }
}