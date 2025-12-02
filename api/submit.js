// api/submit.js (Vercel serverless, Node 18+)
// Paste into /api/submit.js in your repo and deploy to Vercel.

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || "";
const APPS_SCRIPT_TOKEN = process.env.APPS_SCRIPT_TOKEN || "";
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || "";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// helper: always set CORS headers on the response object
function setCors(res, originValue) {
  // Must be exact origin (including protocol) to satisfy browser
  res.setHeader("Access-Control-Allow-Origin", originValue);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Webhook-Token"
  );
  res.setHeader("Vary", "Origin");
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

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  // pick exact origin if allowed, otherwise fallback to first allowed or '*' as last resort
  const allowedOrigin = ALLOWED_ORIGINS.length
    ? ALLOWED_ORIGINS.includes(origin)
      ? origin
      : ALLOWED_ORIGINS[0]
    : "*";

  // ALWAYS set CORS headers immediately — for OPTIONS and for POST responses
  setCors(res, allowedOrigin);

  // respond to preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // quick debug endpoint (GET /api/submit?debug=1) to inspect incoming origin and chosen origin
  if (req.method === "GET" && req.query?.debug) {
    return res
      .status(200)
      .json({ ok: true, detectedOrigin: origin, chosenOrigin: allowedOrigin });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    // body parser: Vercel provides parsed JSON in req.body
    const payload = req.body && Object.keys(req.body).length ? req.body : {};
    // basic anti-bot honeypot
    if (payload.website) {
      // Accept but don't process bot submissions
      return res.status(200).json({ ok: true, message: payload });
    }

    // basic validation (you can expand)
    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.email ||
      !payload.phone
    ) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing required fields" });
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
        console.log("Message from app script", r);

        if (!r.ok) {
          const txt = await r.text();
          console.warn("Apps Script returned non-OK:", txt);
        } else {
          const txt = await r.text();
          return res.status(200).json({ ok: true, message: txt });
        }
      } catch (err) {
        console.error("Error forwarding to Apps Script:", err);
      }
    } else {
      console.warn(
        "APPS_SCRIPT_URL or APPS_SCRIPT_TOKEN not configured. Skipping sheet write."
      );
    }

    return res
      .status(200)
      .json({ ok: true, message: "Received (demo response)" });
  } catch (err) {
    console.error("submit handler error:", err);
    return res
      .status(500)
      .json({ ok: false, error: err.message || "Server error" });
  }
}
