import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
}

const AboutUs: React.FC = () => {
  // Placeholder images - replace with your actual images
  const images: ImageProps[] = [
    { src: '/dish-1.jpg', alt: 'Traditional Portuguese dish preparation' },
    { src: '/dish-3.jpg', alt: 'Elegant plated dish' },
    { src: '/dish-2.jpg', alt: 'Salad with grilled protein' },
    { src: '/dish-3.jpg', alt: 'Signature salad dish' },
  ];

  return (
    <section className="bg-black text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
            <span className="text-[#E4B951] font-inter">Our </span>
            <span className="font-great-vibes">Story</span>
          </h1>
        </div>

        {/* Description */}
        <p className="text-center max-w-4xl mx-auto mb-12 leading-relaxed text-sm md:text-base">
        Amsterdam is a city of bridges, and at Babal, we've built one that stretches 7,000 kilometers—from the bustling gallis of Kathmandu to the iconic canals of the Dam.
We didn't just want to open another restaurant; we wanted to create a portal. Babal was born from a simple longing for the honest, soul-warming flavors of home. We missed the sizzle of a fresh plate of momos, the earthy depth of slow-cooked dal, and the vibrant kick of a Himalayan tomato chutney. So, we decided to bring the "Babal" (meaning extraordinary or mind-blowing in Nepali) experience to Amsterdam.
        </p>
         

        <div className="text-center text-3xl md:text-4xl lg:text-5xl mb-12">
         <h1 className="text-[#E4B951] font-inter">
          Come for the food, stay for the vibe.
         </h1>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              className="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
    </div>

          {/* The Flavor of Babal Section */}
      <div className="max-w-5xl mx-auto mt-20 md:mt-32">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <div className="overflow-hidden rounded-lg">
              <img
                src="/dish-4.png"
                alt="Traditional Portuguese Bacalhau dish"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <h3 className="font-great-vibes text-right text-2xl justify-end md:text-3xl lg:text-5xl  mb-4">
              <span className="text-[#E4B951]">The </span>
              Flavor of 
              <span className="text-[#E4B951]"> Babal</span>
            </h3>
            <div className="space-y-4 text-right text-sm md:text-base leading-relaxed">
              <p>
               Nepali cuisine is a tapestry of cultures, altitudes, and spices. It's food that is meant to be shared and stories that are meant to be told. Our kitchen stays true to traditional roots while embracing the fresh, high-quality ingredients available right here in the Netherlands.
              </p>
              <p>
              Whether you're a spice-seeker or a comfort-food lover, our menu is a curated journey through the hills and valleys of Nepal. No shortcuts, no compromises—just authentic Himalayan soul food.
              </p>
              
            </div>
          </div>
          
        </div>

        {/* Why We're Here Section */}
      <div className="max-w-7xl mx-auto mt-20 md:mt-32">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          <div className="order-1">
            <h3 className="font-great-vibes text-2xl md:text-3xl lg:text-5xl mb-4">
               <span className="text-[#E4B951]">Why </span>
              We're
              <span className="text-[#E4B951]"> Here</span>
            </h3>
            <div className="space-y-4 text-sm md:text-base leading-relaxed">
              <p>
               At Babal, our philosophy is simple: Atithi Devo Bhava—The Guest is God. We've designed our space to be your home away from home. It's a place where the mountain chill meets the cozy Dutch gezelligheid.
              </p>
              <p>
              Whether you're stopping by for a quick lunch, a festive dinner with friends, or your very first taste of a buffalo momo, we're here to make sure your experience is nothing short of... well, Babal.
              </p>
            </div>
          </div>

          <div className="order-2">
            <div className="overflow-hidden rounded-lg">
              <img
                src="/dish-5.jpg"
                alt="Traditional Nepali cuisine"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
      </div>
     </div>
    </div>
    </section>
  );
};

export default AboutUs;