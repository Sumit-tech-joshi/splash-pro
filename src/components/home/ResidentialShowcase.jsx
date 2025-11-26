import React from 'react';
import res1 from '../../assets/res1.jpg';
import res2 from '../../assets/res2.jpg';

export default function ResidentialShowcase(){
  return (
    <section className="py-12 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Residential Services</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <img src={res1} alt="kitchen" className="w-full h-auto rounded shadow" />
          <p className="mt-2 text-base sm:text-lg text-gray-600">Detailed kitchen cleaning with focus on hygiene and aesthetics.</p>
        </div>
        <div>
          <img src={res2} alt="bathroom" className="w-full h-auto rounded shadow" />
          <p className="mt-2 text-base sm:text-lg text-gray-600">Sparkling bathrooms cleaned top to bottom.</p>
        </div>
      </div>
    </section>
  );
}