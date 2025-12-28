import React from 'react';

const AboutCultureSection: React.FC = () => {
  return (
    <section className="relative bg-black py-20 md:py-32 overflow-hidden">
      {/* Banana Leaf Decoration */}
    <div className="absolute left top-1/4 w-80 md:w-96 lg:w-[500px] h-100 overflow-hidden pointer-events-none">
       <img
          src="/herosec3.png"
          alt=""
          className="w-full h-full object-contain rotate-[-50deg] -translate-x-1/2 translate-y-10 opacity-90"
        />
      </div>


      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        {/* Title */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl  mb-8">
          <span className="block text-white font-great-vibes text-4xl md:text-6xl mb-4">
            From
          </span>
          <span className="block text-[#E4B951] font-inter leading-tight">
            The Hills of Nepal to
          </span>
          <span className="block text-[#E4B951] font-inter mt-2">
            South India.
          </span>
        </h2>

        {/* Description Paragraphs */}
        <div className="space-y-8 max-w-10xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed">
          <p>
            Babal Restaurant, we bring together the bold spices of South India and the comforting flavors of Nepal to create a dining experience that's both familiar and excitingly new. Our chefs blend traditional recipes with a modern touch, offering dishes that celebrate authenticity while inviting creativity.
          </p>

          <p>
            From fluffy idlis and crisp dosas to flavorful momos and hearty thalis, every plate at Babal tells a story of two rich culinary cultures coming together. Whether you're craving the warmth of Nepali hospitality or the vibrant taste of Southern spice, Babal Restaurant is where your journey begins — where Nepal meets the South.
          </p>
        </div>

        {/* View More Button */}
        <div className="mt-16">
          <button className="inline-flex items-center px-10 py-5 bg-white text-black font-medium text-lg rounded-full shadow-2xl hover:bg-[#E4B951] hover:text-black transition-all duration-300">
            <span className="mr-4 h-1.5 w-10 bg-[#E4B951] rounded-full"></span>
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutCultureSection;