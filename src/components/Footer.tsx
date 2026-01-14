// import React from 'react';

// const Footer: React.FC = () => {
//   return (


//         {/* Glow */}
//         <path
//           d="M0 90 Q350 10 700 90 L700 300 L0 300 Z"
//           fill="none"
//           stroke="rgba(255,200,90,0.8)"
//           strokeWidth="30"
//           filter="url(#softGlow)"
//         />

//         {/* Solid footer */}
//         <path
//           d="M0 90 Q350 10 700 90 L700 300 L0 300 Z"
//           fill="#202020"
//         />
//       </svg>

//       {/* Footer content */}
//       <div className="relative z-10 h-full w-full px-12 pt-20 text-white">
//         <p>Footer content here</p>
//       </div>
//     </footer> */}
//   );
// };

// export default Footer;








import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative text-[#E4B951] overflow-visible">
      {/* Footer background with curved top */}
      <div className="relative bg-[#2a2a2a]">
        {/* Curved top shape */}
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full h-16 sm:h-20 md:h-24 -translate-y-full pointer-events-none"
          aria-hidden="true"
        >
          {/* Glow effect definitions - only shadow, no visible line */}
          <defs>
            <filter id="goldenShadow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
              <feFlood floodColor="#d4af37" floodOpacity="1"/>
              <feComposite in2="blur" operator="in" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Dark background fill with simple curve */}
          <path
            fill="#2a2a2a"
            d="M0,80 Q720,0 1440,80 L1440,80 L0,80 Z"
          />
          
          {/* Golden shadow only - no visible stroke */}
          <path
            fill="none"
            stroke="#d4af37"
            strokeWidth="4"
            d="M0,80 Q720,0 1440,80"
            filter="url(#goldenShadow)"
            opacity="0"
          />
          <path
            fill="none"
            stroke="#d4af37"
            strokeWidth="20"
            d="M0,80 Q720,0 1440,80"
            filter="url(#goldenShadow)"
            opacity="0.6"
          />
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            
            {/* Logo Section */}
            <div className="flex flex-col items-center sm:items-start">
              <img
                src="/logo.png" 
                alt="Babal Restaurant"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain"
              />
            </div>

            {/* Restaurant Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Restaurant</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a href="#" className="text-sm sm:text-base hover:text-yellow-500 transition-colors">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm sm:text-base hover:text-yellow-500 transition-colors">
                    Our Menu
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm sm:text-base hover:text-yellow-500 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Information Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Information</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a href="#" className="text-sm sm:text-base hover:text-yellow-500 transition-colors">
                    Terms & conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info & Social */}
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Contact info</h3>
              <p className="text-[#E4B951] text-sm sm:text-base mb-6 sm:mb-8">
                Contact No.- 9840202020
              </p>

              <div className="flex justify-center sm:justify-start space-x-4 sm:space-x-6">
                <a 
                  href="#" 
                  aria-label="Facebook" 
                  className="hover:text-yellow-500 transition-all hover:scale-110 transform duration-200"
                >
                  <Facebook size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a 
                  href="#" 
                  aria-label="Instagram" 
                  className="hover:text-yellow-500 transition-all hover:scale-110 transform duration-200"
                >
                  <Instagram size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a 
                  href="#" 
                  aria-label="Twitter" 
                  className="hover:text-yellow-500 transition-all hover:scale-110 transform duration-200"
                >
                  <Twitter size={20} className="sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
            <p className="text-gray-500 text-xs sm:text-sm text-center">
              © {new Date().getFullYear()} Babal Restaurant. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;