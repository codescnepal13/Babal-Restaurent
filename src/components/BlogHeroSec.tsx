export default function BlogHeroSec() {
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
        <h1 className="text-3xl font-anton sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-[#E4B951]">
            Blog
        </h1>
      </div>
     
    </section>
  );
}