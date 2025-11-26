import React from 'react';
import res1 from '../../assets/res1.jpg';
import res2 from '../../assets/res2.jpg';
import res3 from '../../assets/cleaning_three.jpg'; // use your existing image or swap

const Bullet = ({ children }) => (
  <li className="flex items-start gap-3">
    <span className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent/15 text-accent text-xs font-bold">✓</span>
    <span className="text-gray-700">{children}</span>
  </li>
);

export default function ServicesShowcase() {
  return (
    <section id="services" className="section bg-gray-50" >
      <div className="wrap max-w-7xl mx-auto">
        <div className="text-center wrap-narrow">
          <h2 className="h2 mt-3">What we do best</h2>
          <p className="lead mt-3">
            Residential upkeep, commercial janitorial, and post‑construction detail. Book a free estimate and we’ll tailor a plan to your space.
          </p>
        </div>

        {/* Residential */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <img src={res1} alt="Residential cleaning" className="w-full rounded-2xl shadow-soft object-cover" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Residential Cleaning</h3>
            <p className="mt-3 text-gray-600">
              Come home to fresh counters, gleaming bathrooms, and dust‑free living spaces—without losing your weekend.
            </p>
            <ul className="mt-6 space-y-3">
              <Bullet><strong>Routine cleans</strong> weekly • bi‑weekly • monthly</Bullet>
              <Bullet><strong>Deep/initial clean</strong> for that first reset or special occasions</Bullet>
              <Bullet><strong>Kitchen & baths</strong> detail: sinks, taps, surfaces, floors</Bullet>
            </ul>
            <a href="/booking" target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex">Book Free Estimate</a>
          </div>
        </div>

        {/* Commercial / Janitorial */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center lg:grid-flow-dense">
          <div className="lg:order-2">
            <img src={res2} alt="Commercial janitorial" className="w-full rounded-2xl shadow-soft object-cover" />
          </div>
          <div className="lg:order-1">
            <h3 className="text-2xl font-semibold text-gray-900">Commercial / Janitorial</h3>
            <p className="mt-3 text-gray-600">
              Keep your workplace spotless and on‑brand with reliable night or day service that works around your hours.
            </p>
            <ul className="mt-6 space-y-3">
              <Bullet><strong>Tailored schedules</strong> to avoid disruptions</Bullet>
              <Bullet><strong>Consistent crews</strong> & checklists for quality</Bullet>
              <Bullet><strong>Supplies included</strong>—ask about eco options</Bullet>
            </ul>
            <a href="/booking" target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6 inline-flex">Request a Walk‑through</a>
          </div>
        </div>

        {/* Post‑Construction */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
          <img src={res3} alt="Post construction cleaning" className="w-full rounded-2xl shadow-soft object-cover" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Post‑Construction Detailing</h3>
            <p className="mt-3 text-gray-600">
              After the last tool leaves, we clear dust, polish surfaces, and make your space photo‑ready.
            </p>
            <ul className="mt-6 space-y-3">
              <Bullet><strong>Debris & dust</strong> thoroughly removed</Bullet>
              <Bullet><strong>High‑touch detail</strong> for fixtures, trim, glass</Bullet>
              <Bullet><strong>Move‑in ready</strong> handover finish</Bullet>
            </ul>
            <a href="/booking" target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex">Get My Estimate</a>
          </div>
        </div>
      </div>
    </section>
  );
}