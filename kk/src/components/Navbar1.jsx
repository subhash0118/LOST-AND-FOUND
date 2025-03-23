import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar1 = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-4 py-4 bg-[#ECEBDE] shadow-md">
      <div className="flex items-center">
        <img src="Logo.png" alt="FoundIT" className="h-8 w-8" />
        <span className="ml-2 text-xl font-semibold">FoundIT</span>
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
        <Link to="/profile" className="flex items-center text-gray-600 hover:text-gray-900">
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
    </nav>
  );
};

export default Navbar1;
