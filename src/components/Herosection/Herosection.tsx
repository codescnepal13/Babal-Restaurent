export default function HeroSection() {
  return (
    <section className="relative h-[64vh] sm:h-[80vh] md:h-[75vh] lg:h-screen bg-black overflow-hidden pb-0">
   
      {/* Background image of the restaurant interior */}
      <img
        src="/herosec1.png"
        alt="Restaurant Interior"
        className="absolute top-0 left-0 w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover opacity-30"
      />

      {/* Overlay text */}
      <div className="absolute top-20 sm:top-24 md:top-32 left-0 w-full flex justify-center z-10 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-[#E4B951]">
          <span className="font-great-vibes text-white inline-block rotate-[-20deg] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">The</span> 
          <span className="block ml-6 sm:ml-12 md:ml-10 lg:ml-20 font-bold font-anton">Rich Flavors of Two</span>
          <span className="block ml-66 sm:ml-50 md:ml-100 lg:ml-150 text-white font-great-vibes inline-block rotate-[-20deg] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Cultures.</span>
        </h1>
      </div>


      {/* Decorative leaf image */}
      <div className="absolute left-0 top-[5%] sm:top-[18%] md:top-1/7 w-40 sm:w-50 md:w-80 lg:w-96 xl:w-[500px] h-100 overflow-hidden pointer-events-none opacity-70 md:opacity-90">
       <img
          src="/herosec3.png"
          alt=""
          className="w-full h-full object-contain rotate-[-130deg] -translate-x-1/2 sm:-translate-x-1/2 -translate-y-5 sm:translate-y-5 md:translate-y-10"
        />
      </div>

      {/* Foreground image of the dish with leaves, bowls, tomato, and utensils */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-16 sm:-translate-y-24 md:-translate-y-12 lg:translate-y-8 xl:translate-y-20 z-20 w-full px-4">
        <img
          src="/herosec2.png"
          alt="Featured Dish"
          className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto mx-auto"
        />
      </div>
    </section>
  );
}