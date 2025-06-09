const stars = "⭐".repeat(5);

const ReviewSection = () => {
  return (
<section class="bg-gray-50 py-16 px-6 sm:px-10 lg:px-20">
  <div class="max-w-7xl mx-auto text-center">
    <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 animate-fadeIn">
      Hear From Our Happy Clients
    </h2>
    <p class="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-12 animate-fadeIn delay-150">
      Here’s what our customers have to say about their sparkling clean homes.
    </p>

    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

      <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all animate-slideUp">
        <div class="flex items-center gap-3 mb-4">
          <img src="https://i.pravatar.cc/50?img=1" alt="Avatar" class="w-12 h-12 rounded-full border"/>
          <div class="text-left">
            <h4 class="font-semibold text-gray-800">Emily R.</h4>
            <p class="text-lg text-gray-500">Google Review</p>
          </div>
        </div>
        <p class="text-gray-700 mb-4 italic">
          “The team was so professional and quick! My place has never looked this clean. Highly recommend them!”
        </p>
        <div class="text-yellow-400 text-xl">★★★★★</div>
      </div>


      <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all animate-slideUp delay-100">
        <div class="flex items-center gap-3 mb-4">
          <img src="https://i.pravatar.cc/50?img=2" alt="Avatar" class="w-12 h-12 rounded-full border"/>
          <div class="text-left">
            <h4 class="font-semibold text-gray-800">Jason L.</h4>
            <p class="text-lg text-gray-500">Facebook Review</p>
          </div>
        </div>
        <p class="text-gray-700 mb-4 italic">
          “Reliable, affordable, and super friendly! I love coming home after they’ve been here. 10/10.”
        </p>
        <div class="text-yellow-400 text-xl">★★★★★</div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all animate-slideUp delay-200">
        <div class="flex items-center gap-3 mb-4">
          <img src="https://i.pravatar.cc/50?img=3" alt="Avatar" class="w-12 h-12 rounded-full border"/>
          <div class="text-left">
            <h4 class="font-semibold text-gray-800">Samantha K.</h4>
            <p class="text-lg text-gray-500">Google Review</p>
          </div>
        </div>
        <p class="text-gray-700 mb-4 italic">
          “The booking process was smooth and the results were amazing. The team went above and beyond.”
        </p>
        <div class="text-yellow-400 text-xl">★★★★★</div>
      </div>
    </div>
  </div>
</section>

  );
};

export default ReviewSection;
