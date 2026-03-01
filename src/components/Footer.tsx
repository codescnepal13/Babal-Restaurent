import React from 'react';
import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';

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
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Our Menu', href: '/menu' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Reservation', href: '/reservation' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-xs sm:text-sm text-zinc-300 hover:text-[#E4B951] transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info & Social */}
            <div className="text-center sm:text-left">
              <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 text-[#E4B951]">Our Info</h3>
              <div className="space-y-2 mb-4">

                <p className="text-zinc-300 text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-[#E4B951] font-semibold">KVK:</span>
                  <span>98219146</span>
                </p>

                <p className="text-zinc-300 text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-[#E4B951] font-semibold">BTW NO:</span>
                  <span>NL868404767B01</span>
                </p>

                <p className="text-zinc-300 text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-2">
                  <Phone size={13} className="text-[#E4B951] shrink-0" />
                  <a href="tel:+31202330673" className="hover:text-[#E4B951] transition-colors">
                    +31 20 233 0673
                  </a>
                </p>

                <p className="text-zinc-300 text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-2">
                  <Mail size={13} className="text-[#E4B951] shrink-0" />
                  <a href="mailto:babalrestaurant10@gmail.com" className="hover:text-[#E4B951] transition-colors break-all">
                    babalrestaurant10@gmail.com
                  </a>
                </p>

                <p className="text-zinc-300 text-xs sm:text-sm flex items-start justify-center sm:justify-start gap-2">
                  <Clock size={13} className="text-[#E4B951] shrink-0 mt-0.5" />
                  <span>Opening: 13:00 🕐 till 00:30 🕐</span>
                </p>

                <p className="text-zinc-300 text-xs sm:text-sm flex items-start justify-center sm:justify-start gap-2">
                  <MapPin size={13} className="text-[#E4B951] shrink-0 mt-0.5" />
                  <a
                    href="https://maps.google.com/?q=Halvemaansteeg+10H+Amsterdam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#E4B951] transition-colors"
                  >
                    Halvemaansteeg 10H, 1017 CR Amsterdam
                  </a>
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
                  <div className="absolute inset-0 bg-blue-600 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
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
                  <div className="absolute inset-0 bg-pink-600 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
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
                  <div className="absolute inset-0 bg-black-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="relative bg-zinc-800 p-2 rounded-full group-hover:bg-black-500 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1">
                    <svg
                     viewBox="0 0 24 24"
                     className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#E4B951] group-hover:text-white transition-colors duration-300"
                     fill="currentColor"
                     aria-hidden="true"
                    >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
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