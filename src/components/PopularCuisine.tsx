import React from 'react';

const PopularCuisineSection: React.FC = () => {
  return (
    <section className="relative bg-black py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 sm:mb-4">
          <span className="block text-white font-great-vibes text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-1 sm:mb-2">
            Our
          </span>
          <span className="text-[#E4B951] font-inter">Popular Cuisine</span>
        </h2>

        {/* Description */}
        <p className="text-gray-400 font-inter text-sm sm:text-base md:text-lg max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-4">
          Experience the authentic blend of Nepali and Indian flavors crafted with love and tradition.
        </p>

        {/* Cuisine Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Nepali Thali */}
          <div className="group">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <img
                src="/nt.png"
                alt="Nepali Thali"
                className="w-full sm:h-80 md:h-[500px] lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* South Thali (Indian Dosa Thali) */}
          <div className="group">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <img
                src="/st.png"
                alt="South Thali"
                className="w-full sm:h-80 md:h-[500px] lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Sweet Delights */}
          <div className="group">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <img
                src="/sd.png"
                alt="Sweet Delights"
                className="w-full sm:h-80 md:h-[500px] lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Quick Snacks */}
          <div className="group">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <img
                src="/qs.png"
                alt="Quick Snacks"
                className="w-full sm:h-80 md:h-[500px] lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* View More Button */}
        <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16">
          <button className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-black text-sm sm:text-base font-medium rounded-full shadow-lg hover:bg-[#E4B951] hover:text-black transition-all duration-300">
            <span className="mr-2 sm:mr-3 h-1 w-6 sm:w-8 bg-[#E4B951] rounded-full"></span>
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCuisineSection;