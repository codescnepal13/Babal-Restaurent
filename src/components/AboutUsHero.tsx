import React from 'react';

const AboutUsHero: React.FC = () => {
  return (
    <section className="bg-black text-white min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl">
                <span className="text-[#E4B951] font-great-vibes">A</span>
                <span className="font-great-vibes">bout </span>
                <span className="text-[#E4B951] font-great-vibes">U</span>
                <span className="font-great-vibes">s</span>
              </h1>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight">
                <span className="font-great-vibes">Whatever </span>
                <span className="text-[#E4B951] font-inter">You Do,</span>
                <br />
                <span className="text-[#E4B951] font-inter">Make It </span>
                <span className="font-great-vibes">Babal.</span>
              </h2>
            </div>

            <div className="space-y-4 text-gray-300">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                In Nepali slang, "Babal" means awesome, extraordinary, or simply the best. That is the energy we bring to Amsterdam.
              </p>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                We are not just a restaurant; we are a culinary journey to the Himalayas. Whether you are looking for the comforting warmth of a traditional Dal Bhat or the rich, creamy texture of a curry, we serve it with passion and authenticity.
              </p>
            </div>

            <p className="font-inter text-base sm:text-lg lg:text-2xl font-medium">
              Come for the food, stay for the vibe.
            </p>

            <div className="flex justify-center lg:justify-start">
              <a href="/menu" className="text-[#E4B951] text-base sm:text-lg font-medium border-b-2 border-[#E4B951] pb-1 hover:text-yellow-600 hover:border-yellow-600 transition-colors duration-300">
                View More
              </a>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Top Left */}
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="/img1.jpg"
                alt="Traditional Nepali meal with dal bhat"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Top Right */}
            <div className="mt-16 aspect-square rounded-lg overflow-hidden">
              <img
                src="/img2.jpg"
                alt="Variety of curries and dishes"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Bottom Left */}
            <div className="aspect-square rounded-lg overflow-hidden -mt-15">
              <img
                src="/img3.jpg"
                alt="Chicken and rice dishes"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Bottom Right */}
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="/img4.png"
                alt="Momos and traditional snacks"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHero;