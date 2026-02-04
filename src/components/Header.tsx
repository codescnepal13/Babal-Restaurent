import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm border-b border-white/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">

          {/* Left links - Desktop */}
          <div className="hidden lg:flex flex-1 items-center gap-12 xl:gap-16">
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

            <Link
              to="/reservation"
              className="text-white hover:text-[#E4B951] transition-colors duration-300 font-medium text-base xl:text-lg"
            >
              Reservation
            </Link>
          </div>

          {/* Logo (CENTER) */}
          <div className="shrink-0">
            <Link to="/" onClick={closeMenu}>
              <img
                src="/logo.png"
                alt="Babal Restaurant"
                className="h-14 sm:h-16 lg:h-18 w-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Right links - Desktop */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-12 xl:gap-16">
            <Link
              to="/blog"
              className="text-white hover:text-[#E4B951] transition-colors duration-300 font-medium text-base xl:text-lg"
            >
              Blog
            </Link>

            <Link
              to="/menu"
              className="px-6 xl:px-8 py-2.5 border-2 border-white text-white 
                hover:border-[#E4B951] hover:text-[#E4B951] 
                rounded-full hover:bg-white/5 transition-all duration-300 font-medium text-base xl:text-lg"
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
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-sm border-t border-white/20 rounded-b-lg pb-4 animate-fadeIn">
            <div className="flex flex-col gap-1 pt-3">
              <Link 
                to="/" 
                onClick={closeMenu}
                className="text-white hover:text-[#E4B951] hover:bg-white/5 transition-all duration-300 py-2.5 px-4 text-center font-medium text-sm"
              >
                Home
              </Link>
              
              <Link 
                to="/about" 
                onClick={closeMenu}
                className="text-white hover:text-[#E4B951] hover:bg-white/5 transition-all duration-300 py-2.5 px-4 text-center font-medium text-sm"
              >
                About
              </Link>


              <Link 
                to="/reservation" 
                onClick={closeMenu}
                className="text-white hover:text-[#E4B951] hover:bg-white/5 transition-all duration-300 py-2.5 px-4 text-center font-medium text-sm"
              >
                Reservation
              </Link>

              <Link 
                to="/blog" 
                onClick={closeMenu}
                className="text-white hover:text-[#E4B951] hover:bg-white/5 transition-all duration-300 py-2.5 px-4 text-center font-medium text-sm"
              >
                Blog
              </Link>
              
              <Link
                to="/menu"
                onClick={closeMenu}
                className="border-2 border-white text-white hover:border-[#E4B951] hover:text-[#E4B951] hover:bg-white/5 transition-all duration-300 px-6 py-2.5 rounded-full mx-4 mt-2 text-center font-medium text-sm"
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