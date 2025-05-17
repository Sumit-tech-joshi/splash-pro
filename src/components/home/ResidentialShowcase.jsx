import res1 from '../../assets/res1.jpg';
import res2 from '../../assets/res2.jpg';

const ResidentialShowcase = () => {
  return (
    <section className="py-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Residential Services</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <img src={res1} alt="kitchen" className="rounded shadow" />
          <p className="mt-2 text-sm text-gray-600">Detailed kitchen cleaning with focus on hygiene and aesthetics.</p>
        </div>
        <div>
          <img src={res2} alt="bathroom" className="rounded shadow" />
          <p className="mt-2 text-sm text-gray-600">Sparkling bathrooms cleaned top to bottom.</p>
        </div>
      </div>
    </section>
  );
};

export default ResidentialShowcase;
