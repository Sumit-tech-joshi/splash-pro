import React, { useState } from 'react';

const QA = [
  { q: 'What’s included in a regular clean?',
    a: 'Dusting, vacuuming/mopping, bathrooms, kitchen surfaces, and common areas. We tailor to your priorities.' },
  { q: 'Do you bring supplies?',
    a: 'Yes — professional tools and products. Prefer eco-only? Mention it in your request.' },
  { q: 'What’s your arrival window?',
    a: 'We use a 2‑hour arrival window to allow for traffic and prior jobs. We’ll text when we’re on the way.' },
  { q: 'Are you insured?',
    a: 'Yes. Splash Pro Cleaners are trained and insured.' },
  { q: 'How do I reschedule/cancel?',
    a: 'Reply to the confirmation email/text or call us. No fee with 24‑hour notice.' },
];

export default function Faq(){
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-gray-50 py-14 px-4 sm:px-8">
      <div className="wrap max-w-3xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">FAQ</h2>
        <p className="text-center text-gray-600 mt-2">Everything you need to know before you book.</p>

        <div className="mt-8 bg-white rounded-2xl shadow-soft divide-y">
          {QA.map((item, i) => (
            <div key={i} className="faq-item">
              <button
                className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 focus:outline-none flex items-start justify-between gap-4"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span className="font-semibold text-dark">{item.q}</span>
                <span className="text-gray-500">{open === i ? '–' : '+'}</span>
              </button>
              <div id={`faq-panel-${i}`} className={`px-4 sm:px-6 pb-4 sm:pb-5 text-gray-600 ${open === i ? 'block' : 'hidden'}`}>
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}