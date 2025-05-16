const stars = "⭐".repeat(5);

const ReviewSection = () => {
  return (
    <section className="bg-primary text-white py-14 px-4 text-center">
      <h2 className="text-2xl md:text-4xl font-semibold mb-4">Experience the Satisfaction of Having Your Home Professionally Cleaned</h2>
      <p className="text-xl">{stars} Rated 5 Stars by Over 200 Happy Customers!</p>
    </section>
  );
};

export default ReviewSection;
