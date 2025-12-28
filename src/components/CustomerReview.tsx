import React from 'react';

const CustomerReview: React.FC = () => {
  return (
    <section className="relative bg-black text-white py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      
                {/* Leaf Part*/}
        
<div className="absolute top-1/2 right-0 -translate-y-1/2 w-40 md:w-96 lg:w-[500px] h-40 md:h-96 pointer-events-none overflow-hidden z-0">
  <img
    src="/herosec3.png"
    alt=""
    className="absolute right-[-70%] top-1/2 -translate-y-1/2 w-full object-contain rotate-[-230deg]"
  />
</div>





      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Customer images positioned around the content */}
        <div className="relative">
          {/* Left side images */}
          <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-32 xl:-translate-x-48 space-y-8">
            <div className="w-24 h-24 rounded-full border-4 border-[#E4B951] overflow-hidden ml-50">
              <img
                src="/customer1.jpg"
                alt="Customer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-28 h-28 rounded-full border-4 border-[#E4B951] overflow-hidden ml-40">
              <img
                src="/customer2.jpg"
                alt="Customer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-24 h-24 rounded-full border-4 border-[#E4B951] overflow-hidden ml-50">
              <img
                src="/customer3.jpg"
                alt="Customer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side images */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-32 xl:translate-x-48 space-y-8">
            <div className="w-24 h-24 rounded-full border-4 border-[#E4B951] overflow-hidden mr-50">
              <img
                src="/customer4.jpg"
                alt="Customer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-28 h-28 rounded-full border-4 border-[#E4B951] overflow-hidden mr-40">
              <img
                src="/customer5.jpg"
                alt="Customer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-24 h-24 rounded-full border-4 border-[#E4B951] overflow-hidden mr-50">
              <img
                src="/customer1.jpg"
                alt="Customer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>



          {/* Center content */}
          <div className="max-w-4xl mx-auto text-center">
            {/* Title */}
            <h2 className="mb-8 sm:mb-10 md:mb-12">
              <span className="block font-great-vibes text-3xl sm:text-4xl md:text-5xl text-white mb-2">
                Our
              </span>
              <span className="block font-anton-sc text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#E4B951] font-bold tracking-wide">
                Customer Review
              </span>
            </h2>

            {/* Review text */}
            <div className="mb-8 sm:mb-10 md:mb-12 px-4 sm:px-8">
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                At Almado Fado Al Fama, every dish is a note, and every evening tells a story.
              </p>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                Inspired by the haunting beauty of Fado, Portugal's traditional soul music, we blend heartfelt live performances with the warmth of family-style Portuguese dining.
              </p>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                Set in the heart of Alfama, Lisbon's oldest district, our candlelit space invites you to savor the flavors of bacalhau, pastéis de nata, and fine wines while being serenaded by the voice of a fadista and the gentle strum of the guitarra portuguesa.
              </p>
            </div>

            {/* Decorative line and name */}
            <div className="flex flex-col items-center">
              <div className="w-24 sm:w-32 h-px bg-[#E4B951] mb-4"></div>
              <p className="text-white text-lg sm:text-xl font-semibold">
                Mr. Abc
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;