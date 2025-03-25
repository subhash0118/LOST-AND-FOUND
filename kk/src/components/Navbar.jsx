import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#ECEBDE] shadow-md">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src="Logo.png" alt="FoundIT" className="h-8 w-8" />
          <span className="ml-2 text-xl font-semibold">FoundIT</span>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-black text-white rounded"
          >
            LOGIN
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-4 pb-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 text-center"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-black text-white rounded text-center"
            onClick={() => setMenuOpen(false)}
          >
            LOGIN
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
