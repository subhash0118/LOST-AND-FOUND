import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa"; // Import profile icon

const Navbar1 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, []);

  return (
    <nav className="flex items-center justify-between px-4 py-4 bg-[#ECEBDE] shadow-md">
      <div className="flex items-center">
        <img src="Logo.png" alt="FoundIT" className="h-8 w-8" />
        <span className="ml-2 text-xl font-semibold">FoundIT</span>
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>

        {isLoggedIn ? (
          <Link to="/profile" className="flex items-center text-gray-600 hover:text-gray-900">
            <FaUserCircle className="text-2xl mr-2" />
            Profile
          </Link>
        ) : (
          <Link to="/login" className="px-4 py-2 bg-black text-white rounded">LOGIN</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar1;
