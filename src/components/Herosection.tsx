export default function HeroSection() {
  return (
    <section className="relative h-screen bg-black overflow-visible ">
   
      {/* Background image of the restaurant interior */}
      <img
        src="/herosec1.png"
        alt="Restaurant Interior"
        className="absolute top-0 left-0 w-full h-[500px] object-cover opacity-30"
      />

      {/* Overlay text */}
      <div className="absolute top-32 left-0 w-full flex justify-center z-10">
        <h1 className="text-5xl md:text-6xl tracking-wide text-[#E4B951]">
          <span className="font-great-vibes text-white inline-block rotate-[-20deg]">The</span> 
          <span className="block ml-20 font-bold">Rich Flavors of Two</span>
          <span className="block ml-150 text-white font-great-vibes inline-block rotate-[-20deg]">Cultures.</span>
        </h1>
      </div>

      <div className="absolute left top-1/4 w-80 md:w-96 lg:w-[500px] h-100 overflow-hidden pointer-events-none">
       <img
          src="/herosec3.png"
          alt=""
          className="w-full h-full object-contain rotate-[-130deg] -translate-x-1/2 translate-y-10 opacity-90"
        />
      </div>

      {/* Foreground image of the dish with leaves, bowls, tomato, and utensils – positioned to overlap at the bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-20 z-20">
        <img
          src="/herosec2.png"
          alt="Featured Dish"
          className="w-[800px] max-w-full h-auto"
        />
      </div>
    </section>
  );
}

