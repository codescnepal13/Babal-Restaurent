// export default function HeroSection() {
//   return (
//     <section className="relative h-[64vh] sm:h-[80vh] md:h-[75vh] lg:h-screen bg-black overflow-hidden pb-0">
   
//       {/* Background image of the restaurant interior */}
//       <img
//         src="/herosec1.png"
//         alt="Restaurant Interior"
//         className="absolute top-0 left-0 w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover opacity-30"
//       />

//       {/* Overlay text */}
//       <div className="absolute top-20 sm:top-24 md:top-32 left-0 w-full flex justify-center z-10 px-4">
//         <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-[#E4B951]">
//           <span className="font-great-vibes text-white inline-block rotate-[-20deg] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">The</span> 
//           <span className="block ml-6 sm:ml-12 md:ml-10 lg:ml-20 font-bold font-anton">Rich Flavors of Two</span>
//           <span className="block ml-66 sm:ml-50 md:ml-100 lg:ml-150 text-white font-great-vibes inline-block rotate-[-20deg] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Cultures.</span>
//         </h1>
//       </div>


//       {/* Decorative leaf image */}
//       <div className="absolute left-0 top-[5%] sm:top-[18%] md:top-1/7 w-40 sm:w-50 md:w-80 lg:w-96 xl:w-[500px] h-100 overflow-hidden pointer-events-none opacity-70 md:opacity-90">
//        <img
//           src="/herosec3.png"
//           alt=""
//           className="w-full h-full object-contain rotate-[-130deg] -translate-x-1/2 sm:-translate-x-1/2 -translate-y-5 sm:translate-y-5 md:translate-y-10"
//         />
//       </div>

//       {/* Foreground image of the dish with leaves, bowls, tomato, and utensils */}
//       <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-16 sm:-translate-y-24 md:-translate-y-12 lg:translate-y-8 xl:translate-y-20 z-20 w-full px-4">
//         <img
//           src="/herosec2.png"
//           alt="Featured Dish"
//           className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto mx-auto"
//         />
//       </div>
//     </section>
//   );
// }













const HeroSection = () => {
  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 items-center min-h-screen py-8 lg:py-0">
          
          {/* Left Content */}
          <div className="text-white space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1 lg:ml-10 lg:mt-12">
            {/* Logo/Brand Name */}
            <div className="space-y-2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 pb-3 sm:pb-6">
                <img 
                  src="/blogo.png" 
                  alt="Babal Logo" 
                  className="h-10 sm:h-12 lg:h-14 xl:h-16 w-auto object-contain"
                />
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="text-white font-great-vibes">The </span>
                <span className="text-[#E4B951] font-inter">Name Says</span>
                <span className="text-white">,</span>
              </h2>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="text-white font-great-vibes">It </span>
                <span> </span>
                <span className="text-white font-great-vibes">A</span>
                <span className="text-[#E4B951] font-great-vibes">ll</span>
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base lg:text-xl max-w-xl leading-relaxed text-center lg:text-left mx-auto lg:mx-0 lg:ml-8 mt-3 sm:mt-4">
              Authentic Nepali Soul Food &<br />
              Bold North Indian Curries in the Heart of Amsterdam.
            </p>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4 flex justify-center lg:justify-start">
              <button className="group bg-[#E4B951] hover:bg-yellow-600 text-black font-semibold px-6 sm:px-8 py-2.5 sm:py-3 lg:py-4 rounded-full inline-flex items-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50">
                <a href="/menu" className="text-sm sm:text-base">View Menu</a>
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="mt-20 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-100 sm:max-w-xs md:max-w-sm lg:max-w-lg xl:max-w-xl">
              {/* Momo Image */}
              <img 
                src="/menu1.png" 
                alt="Delicious Momos" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;