export default function ItemDesHeroSec() {
  return (
    <section className="relative h-85 bg-black overflow-visible ">
   
      {/* Background image of the restaurant interior */}
  <div className="relative overflow-hidden h-[500px]">
  <img
    src="/aboutusherosec.jpg"
    alt="Restaurant Interior"
    className="w-full h-90 object-cover opacity-35 rounded-b-[50%]"
  />
</div>


      {/* Overlay text */}
      <div className="absolute top-32 left-0 w-full flex justify-center z-10">
        <h1 className="text-5xl md:text-6xl tracking-wide text-[#E4B951]">
          <span className="font-great-vibes text-[#E4B951] rotate-[-40deg] ">Item </span> 
          <span className="block ml-55 font-bold font-inter">Description</span>
        </h1>
      </div>

     
    </section>
  );
}

