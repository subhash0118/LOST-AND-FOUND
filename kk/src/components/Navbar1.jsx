import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Navbar1 = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[#ECEBDE] shadow-md">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src="Logo.png" alt="FoundIT" className="h-8 w-8" />
          <span className="ml-2 text-xl font-semibold">FoundIT</span>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FaUserCircle className="text-2xl mr-2" />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-4 pb-4">
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-900" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => setMenuOpen(false)}
          >
            <FaUserCircle className="text-2xl mr-2" />
            Profile
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar1;
