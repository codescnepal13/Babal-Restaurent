export default function ContactUsHeroSec() {
  return (
    <section className="relative bg-black overflow-visible">
   
      {/* Background image of the restaurant interior */}
      <div className="relative overflow-hidden h-[300px] sm:h-[350px] md:h-[400px]">
        <img
          src="/aboutusherosec.jpg"
          alt="Restaurant Interior"
          className="w-full h-full object-cover opacity-35"
        />
      </div>

      {/* Overlay text */}
      <div className="absolute top-30 sm:top-20 md:top-32 left-0 w-full flex justify-center z-10 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-[#E4B951] text-center sm:text-left">
          <span className="font-bold font-inter text-[#E4B951]">Reserve </span> 
          <span className="block sm:mt-0 ml-30 sm:ml-12 md:ml-20 lg:ml-55 font-great-vibes rotate-[-18deg]">
            Now
          </span>
        </h1>
      </div>
     
    </section>
  );
}