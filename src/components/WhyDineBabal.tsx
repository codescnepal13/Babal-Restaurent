const WhyDineBabal = () => {
  return (
    <div className="relative min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern/Texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-zinc-900 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Images Gallery */}
        <div className="mb-12 lg:mb-16">
          {/* Desktop & Tablet Layout */}
          <div className="hidden md:grid grid-cols-4 gap-4 lg:gap-6 items-end">
            {/* Image 1 - Restaurant Interior (shorter with margin-top) */}
            <div className="w-full h-87.5 lg:h-100 overflow-hidden rounded-lg">
              <img 
                src="/bg1.jpg" 
                alt="Restaurant ambiance" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2 - Nepali Thali */}
            <div className="w-full h-112.5 lg:h-125 overflow-hidden rounded-lg">
              <img 
                src="/bg2.jpg" 
                alt="Nepali Thali" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 3 - Indian Dish */}
            <div className="w-full h-112.5 lg:h-125 overflow-hidden rounded-lg">
              <img 
                src="/bg3.jpg" 
                alt="Indian cuisine" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 4 - Dining Area (shorter with margin-top) */}
            <div className="w-full h-87.5 lg:h-100 overflow-hidden rounded-lg">
              <img 
                src="/bg4.jpg" 
                alt="Dining space" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            {/* Image 1 */}
            <div className="w-full h-62.5 overflow-hidden rounded-lg">
              <img 
                src="/bg1.jpg" 
                alt="Restaurant ambiance" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2 */}
            <div className="w-full h-62.5 overflow-hidden rounded-lg">
              <img 
                src="/bg2.jpg" 
                alt="Nepali Thali" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 3 */}
            <div className="w-full h-62.5 overflow-hidden rounded-lg">
              <img 
                src="/bg3.jpg" 
                alt="Indian cuisine" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 4 */}
            <div className="w-full h-62.5 overflow-hidden rounded-lg">
              <img 
                src="/bg4.jpg" 
                alt="Dining space" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="relative text-center max-w-full mx-auto space-y-6 sm:space-y-8">
          {/* Background Image for Text Content */}
          <img 
            src="/bg5.jpg" 
            alt="Background texture" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-lg"
          />
          
          {/* Content */}
          <div className="relative z-10 py-8 px-4 mb-10 sm:px-6">
            {/* Heading */}
            <div>
              <p className="text-lg sm:text-xl lg:text-4xl font-great-vibes mb-3">
                So
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl mb-2">
                <span className="font-great-vibes">Why </span>
                <span className="text-[#E4B951] font-inter">Dine </span>
                <span className="font-great-vibes">at </span>
                <span className="text-[#E4B951] font-inter">Babal</span>
                <span className="text-[#E4B951]"> ?</span>
              </h2>
            </div>

            {/* Description 1 - Authentic Flavors */}
            <div className="space-y-2">
              <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed">
                <span className="text-[#E4B951] font-semibold">Authentic Flavors</span>
                <span className="text-white"> are at the heart of our kitchen. We believe in doing things the right way, using traditional spices and classic cooking methods to bring out rich, genuine tastes in every dish.</span>
              </p>
            </div>

            {/* Description 2 - Cozy Atmosphere */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                <span className="text-white">A </span>
                <span className="text-[#E4B951] font-semibold">Cozy</span>
                <span className="text-white"> and welcoming </span>
                <span className="text-[#E4B951] font-semibold">Atmosphere</span>
                <span className="text-white"> makes our space ideal for any occasion, from a quick lunch break to a relaxed romantic dinner or a lively group celebration with friends and family.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyDineBabal;