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
    <div className="h-screen bg-black overflow-hidden">
      <div className="bg-black text-white h-full px-4 py-6">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid md:grid-cols-2 gap-6 h-full items-center">

            {/* Left Side - Image Carousel */}
            <div className="space-y-3">
              <div className="relative h-[55vh] w-[70%] mx-auto rounded-lg overflow-hidden bg-zinc-900">
                <img
                  src={foodImages[currentImageIndex]}
                  alt={foodName}
                  className="w-full h-full object-cover"
                />

                {foodImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#E4B951] flex items-center justify-center"
                    >
                      <ChevronLeft className="w-5 h-5 text-black" />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#E4B951] flex items-center justify-center"
                    >
                      <ChevronRight className="w-5 h-5 text-black" />
                    </button>
                  </>
                )}
              </div>

              {foodImages.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {foodImages.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-[25vh] w-[90%] rounded-lg overflow-hidden cursor-pointer ${
                        currentImageIndex === index
                          ? 'ring-2 ring-[#E4B951]'
                          : 'opacity-70'
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
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-4xl font-bold">
                    {foodName.split(' ')[0]}{" "}
                    <span className="font-great-vibes text-[#E4B951]">
                      {foodName.split(' ').slice(1).join(' ')}
                    </span>
                  </h2>
                  <p className="text-zinc-400">{foodSubtitle}</p>
                </div>

                <div className="w-24 h-24 rounded-full bg-[#E4B951] flex items-center justify-center border-4 border-white">
                  <span className="text-2xl font-bold text-black">
                    {foodPrice}
                  </span>
                </div>
              </div>

              <p className="text-zinc-300 text-base leading-relaxed max-h-[22vh] overflow-hidden">
                {foodDescription}
              </p>

              <div>
                <h3 className="text-xl font-semibold mb-2">Features:</h3>
                <ul className="space-y-1 text-zinc-400">
                  {features.map((feature, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-[#E4B951]">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => window.history.back()}
                className="w-full bg-zinc-800 text-white py-4 rounded-full hover:bg-[#E4B951] transition-colors"
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
