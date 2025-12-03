// src/pages/RequestForm.jsx
import React, { useState, useMemo } from "react";

/**
 * RequestForm.jsx
 * - Uploads image to Cloudinary (unsigned)
 * - Sends JSON payload to Apps Script webhook endpoint (REACT_APP_SHEETS_ENDPOINT)
 * - Adds X-Webhook-Token header for server-side validation
 */

const SHEETS_ENDPOINT = process.env.REACT_APP_SHEETS_ENDPOINT;
const WEBHOOK_TOKEN = process.env.REACT_APP_WEBHOOK_TOKEN;
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUD_PRESET = process.env.REACT_APP_CLOUDINARY_UNSIGNED_PRESET;

const initialState = {
  firstName: "", lastName: "", company: "",
  email: "", phone: "",
  street1: "", street2: "", city: "", province: "", postalCode: "",
  serviceType: "", details: "",
  date1: "", date2: "", flexible: false, specificTime: false,
  bedrooms: "", bathrooms: "", kitchens: "", squareFeet: "",
  people: "", pets: "", livedHere: "", lastClean: "", smoke: "",
  hearAboutUs: "", contactPreference: "email", consent: false,
  website: "" // honeypot
};

export default function RequestForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState({ type: "", msg: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ctaText = useMemo(() => (isSubmitting ? "Submitting…" : "Submit"), [isSubmitting]);

  // small helper for file upload to cloudinary unsigned
  async function uploadImageToCloudinary(file) {
    if (!file) return null;
    if (!CLOUD_NAME || !CLOUD_PRESET) {
      console.warn("Cloudinary not configured in .env");
      return null;
    }
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", CLOUD_PRESET);
    // optionally set folder: form.append('folder', 'splashpro_uploads');
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
    try {
      const res = await fetch(url, { method: "POST", body: form });
      const data = await res.json();
      return data.secure_url || null;
    } catch (err) {
      console.error("Cloudinary upload failed", err);
      return null;
    }
  }

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (name === "phone") {
      const digits = value.replace(/[^\d+]/g, "");
      setFormData((p) => ({ ...p, [name]: digits }));
      return;
    }

    // file input
    if (files) {
      setFormData((p) => ({ ...p, [name]: files }));
      return;
    }

    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const next = {};
    if (!formData.firstName.trim()) next.firstName = "First name is required.";
    if (!formData.lastName.trim()) next.lastName = "Last name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) next.email = "A valid email is required.";
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 7) next.phone = "A valid phone number is required.";
    if (!formData.serviceType) next.serviceType = "Please select a service.";
    if (!formData.date1) next.date1 = "Please pick a preferred date.";
    if (!formData.consent) next.consent = "You must consent to be contacted.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

// in your RequestForm handleSubmit (client-side)
async function submitToApi(formData) {
  const VERCEL_API = 'https://splash-pro.vercel.app/api/submit';

  // if you want to upload a file from input: convert to base64 first (client), then send as imageBase64
  // OR, better: upload file directly to Cloudinary from client using unsigned preset, then send cloud URL.

  const payload = { ...formData };
  // Remove client-only fields if any
  // Do not include secrets here, Vercel will attach token when calling Apps Script

  const r = await fetch(VERCEL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const j = await r.json();
  return j;
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.website) return; // honeypot check, silently drop spam

    if (!validate()) {
      setBanner({ type: "error", msg: "Please fix the highlighted fields and try again." });
      return;
    }

    setIsSubmitting(true);
    setBanner({ type: "", msg: "" });

    try {
      // Upload images if provided (support one or multiple)
      const imageFiles = formData.images; // input name="images"
      let imageUrls = [];
      if (imageFiles && imageFiles.length) {
        for (let i = 0; i < imageFiles.length; i++) {
          const url = await uploadImageToCloudinary(imageFiles[i]);
          if (url) imageUrls.push(url);
        }
      }

      // Build payload
      const payload = { ...formData };
      // Remove file objects from payload; add imageUrls
      delete payload.images;
      payload.imageUrls = imageUrls;



      const res = await submitToApi(payload);

      console.log({res});
      if (!res.ok) {
        console.error("Webhook error:", res?.err);
        throw new Error(res?.err || "Webhook returned error");
      }

      setBanner({ type: "success", msg: "Thanks! Your request has been submitted. Splash Pro Cleaners will contact you shortly." });
      setFormData(initialState);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setBanner({ type: "error", msg: "There was a problem submitting your request. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10 space-y-10">
        <header className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold">Request Service • Splash Pro Cleaners</h1>
          <p className="text-gray-500 text-sm">Tell us about your space and preferred dates. We’ll reply with a quote.</p>
        </header>

        {banner.msg && (
          <div className={`rounded-md p-3 text-sm ${banner.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {banner.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* Contact Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Contact Details</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="label">First name</label>
                <input name="firstName" className={`input ${errors.firstName ? "border-red-400" : ""}`} value={formData.firstName} onChange={handleChange} />
                {errors.firstName && <p className="help text-red-600">{errors.firstName}</p>}
              </div>
              <div>
                <label className="label">Last name</label>
                <input name="lastName" className={`input ${errors.lastName ? "border-red-400" : ""}`} value={formData.lastName} onChange={handleChange} />
                {errors.lastName && <p className="help text-red-600">{errors.lastName}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="label">Company name (if applicable)</label>
                <input name="company" className="input" value={formData.company} onChange={handleChange} />
              </div>

              <div className="md:col-span-2">
                <label className="label">Email</label>
                <input name="email" type="email" className={`input ${errors.email ? "border-red-400" : ""}`} value={formData.email} onChange={handleChange} />
                {errors.email && <p className="help text-red-600">{errors.email}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="label">Phone number</label>
                <input name="phone" type="tel" className={`input ${errors.phone ? "border-red-400" : ""}`} value={formData.phone} onChange={handleChange} />
                {errors.phone && <p className="help text-red-600">{errors.phone}</p>}
              </div>
            </div>
            <p className="help">By providing your info you consent to being contacted about your request. You can opt out anytime.</p>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Address</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <div><label className="label">Street 1</label><input name="street1" className="input" value={formData.street1} onChange={handleChange} /></div>
              <div><label className="label">Street 2</label><input name="street2" className="input" value={formData.street2} onChange={handleChange} /></div>
              <div><label className="label">City</label><input name="city" className="input" value={formData.city} onChange={handleChange} /></div>
              <div><label className="label">Province</label><input name="province" className="input" value={formData.province} onChange={handleChange} /></div>
              <div className="md:col-span-2"><label className="label">Postal Code</label><input name="postalCode" className="input" value={formData.postalCode} onChange={handleChange} /></div>
            </div>
          </div>

          {/* Service & images */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Service & Details</h2>
            <div className="grid gap-3">
              <select name="serviceType" className={`input ${errors.serviceType ? "border-red-400" : ""}`} value={formData.serviceType} onChange={handleChange}>
                <option value="">Choose an option</option>
                <option>Bi weekly Residential - Most common</option>
                <option>Monthly residential</option>
                <option>Janitorial/Commercial</option>
                <option>Vacation Rental/Air bnb</option>
                <option>Post Construction</option>
                <option>Move out Clean - Empty building only</option>
                <option>Deep Clean</option>
              </select>
              {errors.serviceType && <p className="help text-red-600">{errors.serviceType}</p>}

              <textarea name="details" className="input" rows="3" value={formData.details} onChange={handleChange} placeholder="Additional details (optional)"></textarea>

              <div>
                <label className="label">Upload images (optional)</label>
                <input type="file" name="images" accept="image/*" multiple onChange={handleChange} className="input" />
                <p className="help">Images help us estimate time. We store images in Cloudinary.</p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Availability</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="label">Preferred date</label>
                <input name="date1" type="date" className={`input ${errors.date1 ? "border-red-400" : ""}`} value={formData.date1} onChange={handleChange} />
                {errors.date1 && <p className="help text-red-600">{errors.date1}</p>}
              </div>
              <div>
                <label className="label">Another day that works</label>
                <input name="date2" type="date" className="input" value={formData.date2} onChange={handleChange} />
              </div>
            </div>

            <label className="label">We currently have a 2-hour arrival window. Will this be a problem?</label>
            <div className="flex gap-6">
              <label className="inline-flex items-center gap-2"><input type="checkbox" name="flexible" checked={formData.flexible} onChange={handleChange} /> No, I am flexible</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" name="specificTime" checked={formData.specificTime} onChange={handleChange} /> Yes, I need a specific time</label>
            </div>
          </div>

          {/* Home details */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Home Details</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <input name="bedrooms" className="input" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} />
              <input name="bathrooms" className="input" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} />
              <input name="kitchens" className="input" placeholder="Kitchens" value={formData.kitchens} onChange={handleChange} />
              <input name="squareFeet" className="input" placeholder="Square Footage" value={formData.squareFeet} onChange={handleChange} />
              <input name="people" className="input" placeholder="People in Home" value={formData.people} onChange={handleChange} />
              <input name="pets" className="input" placeholder="Do you have pets?" value={formData.pets} onChange={handleChange} />
              <input name="livedHere" className="input" placeholder="How long have you lived there?" value={formData.livedHere} onChange={handleChange} />
              <input name="lastClean" className="input" placeholder="Last professional clean?" value={formData.lastClean} onChange={handleChange} />
              <input name="smoke" className="input md:col-span-2" placeholder="Do you smoke inside?" value={formData.smoke} onChange={handleChange} />
            </div>
          </div>

          {/* Consent + honeypot */}
          <div className="space-y-2">
            <label className="inline-flex items-start gap-3">
              <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} />
              <span className="text-sm text-gray-700">I consent to be contacted about my request via my preferred method.</span>
            </label>
            {errors.consent && <p className="help text-red-600">{errors.consent}</p>}
            <input name="website" value={formData.website} onChange={handleChange} autoComplete="off" tabIndex="-1" style={{ display: "none" }} />
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md transition">
            {ctaText}
          </button>

          <p className="text-xs text-center text-gray-500">
            This form may be protected by reCAPTCHA and the Google{" "}
            <a className="underline" href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
            <a className="underline" href="https://policies.google.com/terms">Terms of Service</a> apply.
          </p>
        </form>
      </div>
    </section>
  );
}