const features = [
    { icon: "🧹", title: "Thorough Cleaning", desc: "Every nook and cranny cleaned." },
    { icon: "💧", title: "Eco Products", desc: "Safe for pets and family." },
    { icon: "⏱️", title: "Flexible Booking", desc: "Schedule at your convenience." },
  ];
  
  const ServiceIcons = () => {
    return (
      <section className="bg-white py-12 px-4 text-center space-y-10">
        <h2 className="text-2xl md:text-4xl font-semibold">Find Your Happy Place in a Clean Home</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <div key={i} className="space-y-2">
              <div className="text-4xl">{f.icon}</div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default ServiceIcons;
  