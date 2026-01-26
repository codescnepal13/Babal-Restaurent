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
          <h2 className="text-3xl md:text-3xl font-amber font-bold tracking-wider mb-6">
            About Us
          </h2>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
            <span className="text-[#E4B951] font-inter">Whatever You Do, Make It </span>
            {/* <span className="font-great-vibes">Food</span>
            <span className="text-[#E4B951] font-inter"> Meets the </span> */}
            <span className="font-great-vibes">Babal</span>
          </h1>
          
          {/* <h1 className="text-3xl md:text-4xl lg:text-5xl">
            <span className="text-[#E4B951] font-inter">& the </span>
            <span className="font-great-vibes">Heart</span>
            <span className="text-[#E4B951] font-inter"> Finds a </span>
            <span className="font-great-vibes">Home</span>
          </h1> */}
        </div>

        {/* Description */}
        <p className="text-center text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed text-sm md:text-base">
         In Nepali slang, "Babal" means awesome, extraordinary, or simply the best. That is the energy we bring to Amsterdam.
         We are not just a restaurant; we are a culinary journey to the Himalayas. Whether you are looking for the comforting warmth of a traditional Dal Bhat or the rich, creamy texture of a North Indian curry, we serve it with passion and authenticity.
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

          {/* Indian Culture Section */}
      <div className="max-w-7xl mx-auto mt-20 md:mt-32">
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
            <h3 className="font-great-vibes text-right text-2xl justify-end md:text-3xl  mb-4">
              The Taste of Port
            </h3>
            <h2 className="text-3xl md:text-4xl text-right lg:text-5xl text-[#E4B951] font-inter mb-8">
              Indian Culture
            </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                At Almado Fado Al Fama, every dish is a note, and every evening tells a story. 
                Inspired by the haunting beauty of Fado Portugal's traditional soul music we blend 
                heartfelt live performances with the warmth of family-style Portuguese dining. 
                Set in the heart of Alfama, Lisbon's oldest district, our candlelit space invites you to 
                savor the flavors of bacalhau, pastéis de nata, and fine wines while being serenaded 
                by the voice of a fadista and the gentle strum of the guitarra portuguesa.At Almado 
                Fado Al Fama, every dish is a note, and every evening tells a story.
              </p>
              <p>
                Inspired by the haunting beauty of Fado Portugal's traditional soul music we blend 
                heartfelt live performances with the warmth of family-style Portuguese dining. 
                Set in the heart of Alfama, Lisbon's oldest district, our candlelit space invites you to 
                savor the flavors of bacalhau, pastéis de nata, and fine wines while being serenaded 
                by the voice of a fadista and the gentle strum of the guitarra portuguesa.
              </p>
              
            </div>
          </div>
          
        </div>

        {/* Nepali Culture Section */}
      <div className="max-w-7xl mx-auto mt-20 md:mt-32">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          <div className="order-1">
            <h3 className="font-great-vibes text-2xl md:text-3xl mb-4">
              The Essence of Himalayas
            </h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#E4B951] font-inter mb-8">
              Nepali Culture
            </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                At Almado Fado Al Fama, every dish is a note, and every evening tells a story. 
                Inspired by the haunting beauty of Fado Portugal's traditional soul music we blend 
                heartfelt live performances with the warmth of family-style Portuguese dining. 
                Set in the heart of Alfama, Lisbon's oldest district, our candlelit space invites you to 
                savor the flavors of bacalhau, pastéis de nata, and fine wines while being serenaded 
                by the voice of a fadista and the gentle strum of the guitarra portuguesa.At Almado 
                Fado Al Fama, every dish is a note, and every evening tells a story.
              </p>
              <p>
                Inspired by the haunting beauty of Fado Portugal's traditional soul music we blend 
                heartfelt live performances with the warmth of family-style Portuguese dining. 
                Set in the heart of Alfama, Lisbon's oldest district, our candlelit space invites you to 
                savor the flavors of bacalhau, pastéis de nata, and fine wines while being serenaded 
                by the voice of a fadista and the gentle strum of the guitarra portuguesa.
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