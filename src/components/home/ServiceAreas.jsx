import React from 'react';

const MAPS_EMBED_URL = process.env.REACT_APP_MAPS_EMBED_URL ||
  'https://www.google.com/maps?q=Splash+Pro+Cleaners+Courtenay+BC&output=embed';

const AREAS = [
  'Courtenay', 'Comox', 'Cumberland', 'Royston',
  'East Courtenay', 'West Courtenay', 'Crown Isle', 'Union Bay'
];

export default function ServiceAreas(){
  return (
    <section className="py-14 px-4 sm:px-8">
      <div className="wrap grid gap-8 md:grid-cols-2 items-start">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">Proudly Serving the Comox Valley</h2>
          <p className="text-gray-600 mt-2">Not sure if we cover your area? Send a request — we’ll confirm quickly.</p>
          <ul className="mt-5 grid grid-cols-2 gap-2 text-gray-700">
            {AREAS.map(a => <li key={a} className="bg-muted rounded-md px-3 py-2 text-sm">{a}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-soft min-h-[260px] bg-gray-100">
          <iframe
            title="Service Area Map"
            src={MAPS_EMBED_URL}
            className="w-full h-[320px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}