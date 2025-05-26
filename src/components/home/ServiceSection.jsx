import React from "react";
import iconTime from "../../assets/time.svg";
import iconSmile from "../../assets/smile.svg";
import iconSparkle from "../../assets/sparkle.svg";
import iconLocal from "../../assets/home.svg";
import { motion } from "framer-motion";

const features = [
  {
    icon: iconTime,
    title: "Hello, Extra Time!",
    desc: "Thanks to our speedy and thorough cleaning magic, say goodbye to lost weekends spent cleaning and hello to hours you can spend however you wish.",
  },
  {
    icon: iconSmile,
    title: "Stress Less, Smile More",
    desc: "Let our friendly team take the cleaning load off your shoulders, bringing you peace of mind and a clutter-free home that feels just right.",
  },
  {
    icon: iconSparkle,
    title: "Trust in a Professional Clean",
    desc: "Count on us to make your place shine bright with every visit. We’re all about bringing that dependable shine and comfort to your space.",
  },
  {
    icon: iconLocal,
    title: "Locally Owned and Grown",
    desc: "Proudly serving our community, you'll take comfort in knowing we're a locally owned business in the Comox Valley that grows alongside you and your neighbours.",
  },
];


const ServiceSection = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-10">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-2xl md:text-4xl font-semibold text-dark">
          Find Your Happy Place in a Clean Home – Without the Fuss
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Tired of chasing after that never-ending list of cleaning chores? Let us introduce you to the comfort of a perfectly clean home made easy with our help. Imagine having more time to enjoy what you love most.
        </p>
      </div>

      <div className="grid gap-10 mt-14 md:grid-cols-2 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="flex items-start space-x-5"
          >
            <img
              src={f.icon}
              alt={f.title}
              className="w-10 h-10 mt-1 shrink-0"
            />
            <div>
              <h3 className="text-lg font-semibold text-dark">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mt-1">
                {f.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
