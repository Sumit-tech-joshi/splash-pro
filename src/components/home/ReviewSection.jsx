import React from 'react';

const names = ['Emily R.', 'Jason L.', 'Samantha K.'];
const texts = [
  '“The team was so professional and quick! My place has never looked this clean. Highly recommend them!”',
  '“Reliable, affordable, and super friendly! I love coming home after they’ve been here. 10/10.”',
  '“The booking process was smooth and the results were amazing. The team went above and beyond.”'
];

export default function ReviewSection(){
  return (
    <section id="reviews" className="bg-gray-50 py-14 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 animate-fadeIn">
          Hear From Our Happy Clients
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 sm:mb-12 animate-fadeIn">
          Here’s what our customers have to say about their sparkling clean homes.
        </p>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map((id, idx) => (
            <div key={id} className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all animate-fadeIn`}>
              <div className="flex items-center gap-3 mb-4 text-left">
                <img src={`https://i.pravatar.cc/50?img=${id}`} alt="Avatar" className="w-12 h-12 rounded-full border"/>
                <div>
                  <h4 className="font-semibold text-gray-800">{names[idx]}</h4>
                  <p className="text-sm text-gray-500">Google Review</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">{texts[idx]}</p>
              <div className="text-yellow-400 text-xl">★★★★★</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}