import React from 'react';

const PopularCuisineSection: React.FC = () => {
  return (
    <section className="relative bg-black py-16 md:py-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-5xl md:text-7xl mb-4">
          <span className="block text-white font-great-vibes text-4xl md:text-6xl mb-2">
            Our
          </span>
          <span className="text-[#E4B951] font-inter ">Popular Cuisine</span>
        </h2>

        {/* Placeholder description (you can change or remove) */}
        <p className="text-gray-400 font-inter max-w-3xl mx-auto mb-12 md:mb-16">
          Experience the authentic blend of Nepali and Indian flavors crafted with love and tradition.
        </p>

        {/* Cuisine Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Nepali Thali */}
          <div className="group">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <img
                src="/nt.png" // Change to your actual filename
                alt="Nepali Thali"
                className="w-full h-96 object-cover"
              />
              {/* Optional dark overlay on hover */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* South Thali (Indian Dosa Thali) */}
          <div className="group">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <img
                src="/st.png" // Change to your actual filename
                alt="South Thali"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Sweet Delights */}
          <div className="group">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <img
                src="/sd.png" // Change to your actual filename
                alt="Sweet Delights"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Quick Snacks */}
          <div className="group">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <img
                src="/qs.png" // Change to your actual filename
                alt="Quick Snacks"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* View More Button */}
        <div className="mt-16">
          <button className="inline-flex items-center px-8 py-4 bg-white text-black font-medium rounded-full shadow-lg hover:bg-[#E4B951] hover:text-black transition-all duration-300">
            <span className="mr-3 h-1 w-8 bg-[#E4B951] rounded-full"></span>
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCuisineSection;