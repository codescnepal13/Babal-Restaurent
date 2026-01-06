import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">

          {/* Left links - Desktop */}
          <div className="hidden lg:flex flex-1 items-center gap-8 xl:gap-10">
            <Link
              to="/"
              className="text-white hover:text-[#E4B951] transition-colors duration-300 font-medium text-base xl:text-lg"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-white hover:text-[#E4B951] transition-colors duration-300 font-medium text-base xl:text-lg"
            >
              About
            </Link>
          </div>

          {/* Logo (CENTER) */}
          <div className="flex flex-1 justify-center lg:justify-center">
            <Link to="/" onClick={closeMenu}>
              <img
                src="./logo.png"
                alt="Babal Restaurant"
                className="h-16 sm:h-20 w-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Right links - Desktop */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-6 xl:gap-10">
            <Link 
              to="/contactus" 
              className="text-white hover:text-[#E4B951] transition-colors duration-300 font-medium text-base xl:text-lg"
            >
              Contact Us
            </Link>
            
            <Link
              to="/menu"
              className="px-6 xl:px-8 py-2.5 border-2 border-white text-white 
                hover:border-[#E4B951] hover:text-[#E4B951] 
                rounded-md hover:bg-white/5 transition-all duration-300 font-medium text-base xl:text-lg"
            >
              Menu 
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden ml-auto p-2 text-white hover:text-[#E4B951] transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-sm border-t border-white/10 rounded-b-lg pb-6 animate-fadeIn">
            <div className="flex flex-col gap-1 pt-4">
              <Link 
                to="/" 
                onClick={closeMenu}
                className="text-white hover:text-[#E4B951] hover:bg-white/5 transition-all duration-300 py-3 px-6 text-center font-medium"
              >
                Home
              </Link>
              
              <Link 
                to="/about" 
                onClick={closeMenu}
                className="text-white hover:text-[#E4B951] hover:bg-white/5 transition-all duration-300 py-3 px-6 text-center font-medium"
              >
                About
              </Link>
              
              <Link 
                to="/contactus" 
                onClick={closeMenu}
                className="text-white hover:text-[#E4B951] hover:bg-white/5 transition-all duration-300 py-3 px-6 text-center font-medium"
              >
                Contact Us
              </Link>
              
              <Link
                to="/menu"
                onClick={closeMenu}
                className="border-2 border-white text-white hover:border-[#E4B951] hover:text-[#E4B951] hover:bg-white/5 transition-all duration-300 px-8 py-3 rounded-md mx-6 mt-2 text-center font-medium"
              >
                Menu
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
