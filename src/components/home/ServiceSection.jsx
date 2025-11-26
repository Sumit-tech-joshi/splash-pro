import React from 'react';

const items = [
  {
    title: 'Hello, Extra Time!',
    desc: 'Say goodbye to lost weekends. Our thorough, efficient cleaning gives you hours back for what you love.'
  },
  {
    title: 'Stress Less, Smile More',
    desc: 'Friendly teams, predictable results, and a home that feels right every visit.'
  },
  {
    title: 'Trusted Professional Clean',
    desc: 'Trained, insured cleaners who care about details — from kitchens to baseboards.'
  },
  {
    title: 'Locally Owned & Proud',
    desc: 'Courtenay & Comox Valley is our home. We stand by our service and our community.'
  },
];

export default function ServiceSection(){
  return (
    <section id="services" className="wrap py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-semibold text-dark">Find Your Happy Place in a Clean Home — Without the Fuss</h2>
        <p className="mt-3 text-gray-600">Residential, commercial, move‑out, and post‑construction — book an estimate and we’ll tailor a plan.</p>
      </div>
      <div className="grid gap-8 mt-12 md:grid-cols-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 rounded-lg text-accent font-bold">✓</div>
            <div>
              <h3 className="text-lg font-semibold text-dark">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}