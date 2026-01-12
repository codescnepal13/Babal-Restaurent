export default function AboutUsHeroSec() {
  return (
    <section className="relative bg-black overflow-visible">
   
      {/* Background image of the restaurant interior */}
      <div className="relative overflow-hidden h-[350px] sm:h-[400px] md:h-[400px]">
        <img
          src="/aboutusherosec.jpg"
          alt="Restaurant Interior"
          className="w-full h-full object-cover opacity-35"
        />
      </div>

      {/* Overlay text */}
      <div className="absolute top-16 sm:top-20 md:top-32 left-0 w-full flex justify-center z-10 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-[#E4B951]">
          <span className="font-great-vibes text-[#E4B951] inline-block rotate-[-20deg] text-2xl mt-18 sm:text-3xl md:text-4xl lg:text-5xl">
            About us
          </span> 
          <span className="block mt-2 sm:mt-1 md:mt-0 ml-4 sm:ml-8 md:ml-20 font-bold">
            Babal Restaurent
          </span>
        </h1>
      </div>
     
    </section>
  );
}