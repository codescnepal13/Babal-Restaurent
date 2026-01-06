import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FoodDetailProps {
  foodName?: string;
  foodSubtitle?: string;
  foodPrice?: string;
  foodDescription?: string;
  foodImages?: string[];
  features?: string[];
}

const FoodDetail = ({
  foodName = "Spicy Momo",
  foodSubtitle = "Chilly",
  foodPrice = "$12",
  foodDescription = "At Almado Fado Al Fama, every dish is a note, and every evening tells a story. Inspired by the haunting beauty of Fado Portugal's traditional soul music we blend heartfelt live performances with the warmth of family-style Portuguese dining.",
  foodImages = ['/menu1.png', '/menu2.png', '/menu1.png'],
  features = [
    "Live performances",
    "Authentic taste",
    "Fresh ingredients",
    "Traditional recipe",
    "Chef special"
  ]
}: FoodDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % foodImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + foodImages.length) % foodImages.length);
  };

  return (
    <div className="min-h-screen pb-20 bg-black">
      <div className="bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 md:items-center">

            {/* Left Side - Image Carousel */}
            <div className="space-y-3 sm:space-y-4">
              <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] w-full sm:w-[85%] md:w-[80%] lg:w-[70%] mx-auto rounded-lg overflow-hidden bg-zinc-900 shadow-2xl">
                <img
                  src={foodImages[currentImageIndex]}
                  alt={foodName}
                  className="w-full h-full object-cover"
                />

                {foodImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#E4B951] flex items-center justify-center hover:bg-[#d4a941] transition-colors shadow-lg"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#E4B951] flex items-center justify-center hover:bg-[#d4a941] transition-colors shadow-lg"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                    </button>
                  </>
                )}
              </div>

              {foodImages.length > 1 && (
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {foodImages.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-[15vh] sm:h-[18vh] md:h-[20vh] lg:h-[25vh] w-full sm:w-[95%] md:w-[90%] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                        currentImageIndex === index
                          ? 'ring-2 ring-[#E4B951] opacity-100'
                          : 'opacity-60 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${foodName} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Details */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 mt-6 md:mt-0">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                    {foodName.split(' ')[0]}{" "}
                    <span className="font-great-vibes text-[#E4B951]">
                      {foodName.split(' ').slice(1).join(' ')}
                    </span>
                  </h2>
                  <p className="text-zinc-400 text-sm sm:text-base mt-1 sm:mt-2">{foodSubtitle}</p>
                </div>

                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-24 lg:h-24 rounded-full bg-[#E4B951] flex items-center justify-center border-3 sm:border-4 border-white shadow-lg flex-shrink-0">
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold text-black">
                    {foodPrice}
                  </span>
                </div>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-h-none sm:max-h-[25vh] md:max-h-[22vh] overflow-y-auto pr-2">
                {foodDescription}
              </p>

              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-semibold mb-2 sm:mb-3 text-[#E4B951]">Features:</h3>
                <ul className="space-y-1 sm:space-y-2 text-zinc-400 text-sm sm:text-base">
                  {features.map((feature, index) => (
                    <li key={index} className="flex gap-2 items-start">
                      <span className="text-[#E4B951] text-lg sm:text-xl mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => window.history.back()}
                className="w-full bg-zinc-800 text-white py-3 sm:py-4 rounded-full hover:bg-[#E4B951] hover:text-black transition-all duration-300 font-medium text-sm sm:text-base shadow-lg"
              >
                Back to Menu
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;