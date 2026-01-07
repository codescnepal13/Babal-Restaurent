export default function ItemDesHeroSec() {
  return (
    <section className="relative bg-black overflow-visible">
   
      {/* Background image of the restaurant interior */}
      <div className="relative overflow-hidden h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
        <img
          src="/aboutusherosec.jpg"
          alt="Restaurant Interior"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Overlay text */}
      <div className="absolute top-26 sm:top-20 md:top-24 lg:top-32 left-0 w-full flex justify-center z-10 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-[#E4B951] text-center">
          <span className="font-great-vibes text-[#E4B951]">Item </span> 
          <span className="block mt-1 sm:mt-2 font-bold font-inter">Description</span>
        </h1>
      </div>
     
    </section>
  );
}