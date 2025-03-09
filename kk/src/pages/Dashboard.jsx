import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center gap-12 p-8 bg-[#D7D3BF]">
      
      {/* Top Center Title */}
      <h1 className="absolute top-8 w-full text-center text-4xl font-bold text-black">
        FoundIT
      </h1>

      {/* Lost and Found Links */}
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-20">
        
        {/* Lost Items with Image on the Left */}
        <div className="flex items-center gap-4">
          {/* Image - Hidden on mobile, shown on medium screens and above */}
          <img
            src="LOSTIMAG.png"
            alt="Lost Items"
            className="hidden md:block w-64 h-auto"
          />
          <Link to="/lostitems">
            <div className="relative w-60 h-72 bg-[#FAF8EF] shadow-lg rounded-xl flex items-center justify-center transition-transform hover:scale-105">
              {/* Green tape effect */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-green-600 rounded-sm"></div>
              <h2 className="text-xl font-semibold text-center text-black">LOST ITEMS</h2>
            </div>
          </Link>
        </div>

        {/* Found Items with Image on the Right */}
        <div className="flex items-center gap-4">
          <Link to="/founditems">
            <div className="relative w-60 h-72 bg-[#FAF8EF] shadow-lg rounded-xl flex items-center justify-center transition-transform hover:scale-105">
              {/* Green tape effect */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-green-600 rounded-sm"></div>
              <h2 className="text-xl font-semibold text-center text-black">FOUND ITEMS</h2>
            </div>
          </Link>
          {/* Image - Hidden on mobile, shown on medium screens and above */}
          <img
            src="FOUNDIMAG.png"
            alt="Found Items"
            className="hidden md:block w-64 h-auto"
          />
        </div>

      </div>
      
    </div>
  );
};

export default Dashboard;
