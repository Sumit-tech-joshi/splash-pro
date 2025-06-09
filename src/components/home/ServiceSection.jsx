import React from "react";
import cleanImageOne from "../../assets/cleaning_one.jpg";
import cleanImageTwo from "../../assets/cleaning_two.jpg";
import cleanImageThree from "../../assets/cleaning_three.jpg";
import cleanImageFour from "../../assets/cleaning_four.jpg";
import shine from "../../assets/shine.svg";
import bucket from "../../assets/bucket.svg";
import cleaningKit from "../../assets/cleaning_kit.svg";
import cleaningBrush from "../../assets/cleaning_brush.svg";

const BenefitSection = () => {
  return (
    <section class="bg-white py-16 px-6 sm:px-10 lg:px-20 text-lg leading-7">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          Our Cleaning Specialties
        </h2>

        <div class="grid gap-40">
          {/* <!-- Residential Cleaning --> */}
          <div class="flex flex-col lg:flex-row gap-10 items-center">
            <img
              src={cleanImageTwo}
              alt="Residential Cleaning"
              class="w-full lg:w-1/2 rounded-lg shadow-md object-cover"
            />
            <div class="lg:w-1/2">
              <h3 class="text-2xl font-semibold text-gray-800 mb-4">
                Let's Make Your Home a Beacon of Cleanliness and Comfort
              </h3>
              <p class="text-gray-600 mb-4">
                Feeling swamped by endless cleaning tasks? Let Betty's Best
                Cleaning Services whisk away the worry! We give you back
                precious moments for what matters – more laughter, memories, and
                time with loved ones.
              </p>
              <ul class="text-lg text-gray-700 text-lg">
                <li className="flex mt-8">
                  <img src={shine} className="w-20 h-20 mt-1 shrink-0" />
                  <div>
                    <div className="font-bold">Regular Cleaning</div>
                    <p>
                      Maintenance cleaning on a weekly, bi-weekly, or monthly
                      schedule tailored to your lifestyle.
                    </p>
                  </div>
                </li>

                <li className="flex mt-8">
                  <img src={bucket} className="w-20 h-20 mt-1 shrink-0" />
                  <div>
                    <div className="font-bold">Initial & Deep Cleaning:</div>
                    <p>
                    Perfect for first-timers or heavy cleans, taking up to twice the usual
                  time to get it right.
                    </p>
                  </div>
                </li>

                <li className="flex mt-8">
                  <img src={cleaningKit} className="w-20 h-20 mt-1 shrink-0" />
                  <div>
                    <div className="font-bold">Move Out Clean:</div>
                    <p>
                    Moving? Let us handle the
                  final shine before you say goodbye.
                    </p>
                  </div>
                </li>
              </ul>
              <div className=" mt-14 text-center">
              <a
                href="#contact"
                className="inline-block btn-primary md:mt-6 !mt-32hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Request a Service
              </a>
              </div>
              
            </div>
          </div>

          {/* <!-- Janitorial Cleaning --> */}
          <div class="flex flex-col lg:flex-row-reverse gap-10 items-center">
            <img
              src={cleanImageOne}
              alt="Janitorial Cleaning"
              class="w-full lg:w-1/2 rounded-lg shadow-md object-cover"
            />
            <div class="lg:w-1/2">
              <h3 class="text-2xl font-semibold text-gray-800 mb-4">
                Boost Your Business with Clean Spaces
              </h3>
              <p class="text-gray-600 mb-4">
                Transform your workspace into a beacon of cleanliness and
                productivity with our janitorial services. We keep your
                environment clean, healthy, and professional.
              </p>
              <ul class="text-gray-700">
                <li>
                  <strong>Tailored Solutions:</strong> Custom cleaning plans
                  that fit your business and space needs perfectly.
                </li>
                <li>
                  <strong>Excellence in Every Sweep:</strong> Reliable,
                  quality-first cleaning delivered by professionals.
                </li>
                <li>
                  <strong>Seamless & Efficient:</strong> We work on your
                  schedule to avoid business disruption.
                </li>
              </ul>
              <a
                href="#contact"
                class="mt-6 inline-block btn-primary inline-block mt-10 md:mt-6 !mt-32hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Request a Walk Through
              </a>
            </div>
          </div>

          {/* <!-- Post-Construction Cleaning --> */}
          <div class="flex flex-col lg:flex-row gap-10 items-center">
            <img
              src={cleanImageThree}
              alt="Post Construction Cleaning"
              class="w-full lg:w-1/2 rounded-lg shadow-md object-cover"
            />
            <div class="lg:w-1/2">
              <h3 class="text-2xl font-semibold text-gray-800 mb-4">
                Shine After the Build – Perfecting New Beginnings
              </h3>
              <p class="text-gray-600 mb-4">
                As the dust settles on your new construction or renovation, we
                come in to polish every inch of your space to perfection — ready
                for move-in or showing off.
              </p>
              <ul class="text-lg text-gray-700">
                <li>
                  <strong>Detail-Oriented Shine:</strong> Every surface and
                  corner meticulously cleaned and inspected.
                </li>
                <li>
                  <strong>Move-In Magic:</strong> We make your property feel
                  fresh, inviting, and instantly livable.
                </li>
                <li>
                  <strong>Clearing the Way:</strong> Debris, dust, and
                  construction residue are professionally removed.
                </li>
              </ul>
              <a
                href="#contact"
                class="mt-6 inline-block btn-primary inline-block mt-10 md:mt-6 !mt-32hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Get My Estimate
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
