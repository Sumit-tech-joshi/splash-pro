import React from 'react';
import yelp from '../../assets/yelp.png'
const GOOGLE_URL = process.env.REACT_APP_GOOGLE_REVIEWS_URL ||
  'https://www.google.com/search?q=Splash+Pro+Cleaners+Courtenay+reviews';

const YELP_URL = process.env.REACT_APP_YELP_URL ||
  'https://www.yelp.ca/biz/splash-pro-cleaners-courtney';

const MAPS_EMBED_URL = process.env.REACT_APP_MAPS_EMBED_URL ||
  'https://www.google.com/maps?q=Splash+Pro+Cleaners+Courtenay+BC&output=embed';

const TESTIMONIALS = [
  {
    name: 'Kara P.',
    source: 'Google',
    quote: 'Super professional and friendly. Our home looked amazing after every visit!',
    avatar: 'https://i.pravatar.cc/64?img=12',
  },
  {
    name: 'Michael D.',
    source: 'Yelp',
    quote: 'On time, great communication, and excellent attention to detail.',
    avatar: 'https://i.pravatar.cc/64?img=24',
  },
  {
    name: 'Sophie L.',
    source: 'Google',
    quote: 'Booking was easy, crew was efficient, and the results were spotless.',
    avatar: 'https://i.pravatar.cc/64?img=33',
  },
];

export default function ReviewsReputation() {
  return (
    <section id="reviews" className="section bg-white">
      <div className="wrap max-w-7xl mx-auto">
        <div className="text-center wrap-narrow">
          <span className="eyebrow">Reviews & Reputation</span>
          <h2 className="h2 mt-3">Locals trust Splash Pro Cleaners</h2>
          <p className="lead mt-3">
            Read real customer feedback and see why homes and businesses across the Comox Valley choose us.
          </p>
        </div>

        {/* Trust cards + Map */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 items-stretch">
          {/* Google */}
          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="card-soft p-6 hover:shadow-2xl transition block"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://www.gstatic.com/images/branding/product/1x/gsa_64dp.png"
                alt="Google"
                className="w-16 h-16"
              />
              <div>
                <div className="font-semibold text-gray-900">Google Reviews</div>
                <div className="stars text-lg" aria-label="5 star rating">★★★★★</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-3">
              Check our public Google reviews and share your experience.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="chip">Verified</span>
              <span className="chip">Local Favorite</span>
            </div>
            <span className="btn-ghost mt-6 inline-flex">See Google Reviews</span>
          </a>

          {/* Yelp */}
          <a
            href={YELP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="card-soft p-6 hover:shadow-2xl transition block"
          >
            <div className="flex items-center gap-3">
              <img
                src={yelp}
                alt="Yelp"
                className="w-16 h-16"
              />
              <div>
                <div className="font-semibold text-gray-900">Yelp</div>
                <div className="stars text-lg" aria-label="5 star rating">★★★★★</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-3">
              See our Yelp profile, ratings, and photos from the community.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="chip">Community Rated</span>
              <span className="chip">Photos</span>
            </div>
            <span className="btn-ghost mt-6 inline-flex">Open Yelp</span>
          </a>

          {/* Map (stacks on mobile) */}
          {/* <div className="card-soft p-0 overflow-hidden min-h-[260px] bg-gray-100">
            <iframe
              title="Service Area Map"
              src={MAPS_EMBED_URL}
              className="w-full h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div> */}
        </div>

        {/* Testimonials scroller */}
        {/* <div className="mt-12">
          <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="snap-start shrink-0 w-[88%] sm:w-[420px] card-soft p-6"
              >
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border" />
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.source}</div>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 italic">“{t.quote}”</p>
                <div className="stars mt-2">★★★★★</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Swipe to see more reviews. For live feeds, we can add Google/Yelp APIs later.
          </p>
        </div> */}
      </div>
    </section>
  );
}