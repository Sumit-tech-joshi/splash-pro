import { Link } from 'react-router-dom';

const FinalQuoteSection = () => {
  return (
    <section className="bg-accent text-white py-12 px-4 text-center">
      <h2 className="text-2xl md:text-4xl font-semibold mb-4">Enjoy a Clean, Cozy Home!</h2>
      <p className="mb-6">Let us help you reclaim your space. Book a free estimate today.</p>
      <Link to="/booking" className="bg-white text-accent px-5 py-2 rounded hover:bg-gray-100 transition">
        Book a Free Estimate
      </Link>
    </section>
  );
};

export default FinalQuoteSection;