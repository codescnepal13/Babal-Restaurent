import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative text-[#E4B951] overflow-visible">
      {/* SVG with curved top and glow effect */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-12 sm:h-14 md:h-16 -translate-y-full pointer-events-none"
        aria-hidden="true"
      >
        {/* Glow effect definition */}
        <defs>
          <filter id="softGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
            <feFlood floodColor="rgba(255,200,90,0.8)" floodOpacity="1"/>
            <feComposite in2="blur" operator="in" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
            </feMerge>
          </filter>
        </defs>

        {/* Glow border */}
        <path
          d="M0 80 Q720 5 1440 80 L1440 120 L0 120 Z"
          fill="none"
          stroke="rgba(255,200,90,0.8)"
          strokeWidth="25"
          filter="url(#softGlow)"
        />

        {/* Solid footer background */}
        <path
          d="M0 80 Q720 5 1440 80 L1440 120 L0 120 Z"
          fill="#202020"
        />
      </svg>

      {/* Footer background continuation */}
      <div className="relative bg-[#202020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3 md:pt-4 pb-4 sm:pb-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            
            {/* Logo Section */}
            <div className="flex flex-col items-center sm:items-start">
              <img
                src="/logo.png" 
                alt="Babal Restaurant"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain mb-3"
              />
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 text-[#E4B951]">Quick Links</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <a href="/" className="text-xs sm:text-sm text-zinc-300 hover:text-[#E4B951] transition-all duration-300 hover:translate-x-1 inline-block">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-xs sm:text-sm text-zinc-300 hover:text-[#E4B951] transition-all duration-300 hover:translate-x-1 inline-block">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/menu" className="text-xs sm:text-sm text-zinc-300 hover:text-[#E4B951] transition-all duration-300 hover:translate-x-1 inline-block">
                    Our Menu
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-xs sm:text-sm text-zinc-300 hover:text-[#E4B951] transition-all duration-300 hover:translate-x-1 inline-block">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/contactus" className="text-xs sm:text-sm text-zinc-300 hover:text-[#E4B951] transition-all duration-300 hover:translate-x-1 inline-block">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info & Social */}
            <div className="text-center sm:text-left">
              <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 text-[#E4B951]">Contact Us</h3>
              <div className="space-y-2 mb-4">
                <p className="text-zinc-300 text-xs sm:text-sm flex items-start justify-center sm:justify-start gap-2">
                  <span className="text-[#E4B951] font-semibold">Phone:</span>
                  <a href="tel:+9779840202020" className="hover:text-[#E4B951] transition-colors">
                    +977 984-0202020
                  </a>
                </p>
                <p className="text-zinc-300 text-xs sm:text-sm flex items-start justify-center sm:justify-start gap-2">
                  <span className="text-[#E4B951] font-semibold">Email:</span>
                  <a href="mailto:info@babalrestaurant.com" className="hover:text-[#E4B951] transition-colors break-all">
                    info@babalrestaurant.com
                  </a>
                </p>
                <p className="text-zinc-300 text-xs sm:text-sm">
                  <span className="text-[#E4B951] font-semibold">Hours:</span> 10 AM - 10 PM
                </p>
              </div>

              <h4 className="text-xs sm:text-sm font-semibold mb-2 text-[#E4B951]">Follow Us</h4>
              <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook" 
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-blue-600 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative bg-zinc-800 p-2 rounded-full group-hover:bg-blue-600 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1">
                    <Facebook size={18} className="sm:w-5 sm:h-5 text-[#E4B951] group-hover:text-white transition-colors duration-300" />
                  </div>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram" 
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-pink-600 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative bg-zinc-800 p-2 rounded-full group-hover:bg-linear-to-br group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-orange-500 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1">
                    <Instagram size={18} className="sm:w-5 sm:h-5 text-[#E4B951] group-hover:text-white transition-colors duration-300" />
                  </div>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter" 
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-sky-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative bg-zinc-800 p-2 rounded-full group-hover:bg-sky-500 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1">
                    <Twitter size={18} className="sm:w-5 sm:h-5 text-[#E4B951] group-hover:text-white transition-colors duration-300" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700">
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