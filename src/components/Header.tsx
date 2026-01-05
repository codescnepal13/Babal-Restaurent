import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black opacity-60">
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center h-24">

          {/* Left links */}
        <div className="hidden lg:flex flex-1 items-center gap-10">
         <Link
           to="/"
            className="nav-link text-white hover:text-[#E4B951] transition-colors duration-300"
          >
             Home
           </Link>

          <Link
            to="/about"
            className="nav-link text-white hover:text-[#E4B951] transition-colors duration-300"
          >
          About
         </Link>
         </div>



          {/* Logo (CENTER) */}
          <div className="flex flex-1 justify-center">
            <a href="#home">
              <img
                src="logo.png"
                alt="Babal Restaurant"
                className="h-20 w-auto"
              />
            </a>
          </div>

          {/* Right links */}
          <div className="hidden hover:[#E4B951] lg:flex flex-1 items-center justify-end gap-10">
            <Link to="/contactus" className="nav-link text-white hover:text-[#E4B951] transition-colors duration-300">Contact us</Link>
          <Link
            to="/menu"
            className="px-8 py-2.5 border border-white text-white 
             hover:border-[#E4B951] hover:text-[#E4B951] 
             rounded hover:bg-black transition"
          >
             Menu 
          </Link>

          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden ml-auto p-2 text-white"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black text-white rounded-b-lg pb-6">
            <div className="flex flex-col gap-4 pt-4 text-center">
              <a href="/" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="Aboutpage" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#contactus" onClick={() => setIsMenuOpen(false)}>Contact us</a>
              <a
                href="#menu"
                className="border border-white px-6 py-2 rounded mx-auto"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
