import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-4 bg-[#ECEBDE] shadow-md">
      <div className="flex items-center">
        <img src="Logo.png" alt="FoundIT" className="h-8 w-8" />
        <span className="ml-2 text-xl font-semibold">FoundIT</span>
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
        <Link to="/login" className="px-4 py-2 bg-black text-white rounded">LOGIN</Link>
      </div>
    </nav>
  );
};

export default Navbar;