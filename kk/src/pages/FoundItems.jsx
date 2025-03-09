import { Link } from "react-router-dom";

const FoundItems = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-16 p-8">
      <div className="text-center text-5xl">
        <h1>FOUNDITEMS</h1>
      </div>
      {/* Top Center Image */}
      <div className="w-full max-w-4xl h-64 bg-gray-300 flex items-center justify-center rounded-2xl">
        <img
          src="add1.png"
          alt="Top Banner"
          className="h-36 w-36 object-cover rounded-2xl"
        />
      </div>

      {/* Bottom Links */}
      <div className="flex flex-wrap justify-center gap-8">
        
        <Link to="/item1">
          <div className="w-48 h-48 bg-gray-300 rounded-2xl flex items-center justify-center">
            <img
              src="/path-to-item1.jpg"
              alt="Item 1"
              className="h-full w-full object-cover rounded-2xl"
            />
          </div>
        </Link>

        <Link to="/item2">
          <div className="w-48 h-48 bg-gray-300 rounded-2xl flex items-center justify-center">
            <img
              src="/path-to-item2.jpg"
              alt="Item 2"
              className="h-full w-full object-cover rounded-2xl"
            />
          </div>
        </Link>

        <Link to="/item3">
          <div className="w-48 h-48 bg-gray-300 rounded-2xl flex items-center justify-center">
            <img
              src="/path-to-item3.jpg"
              alt="Item 3"
              className="h-full w-full object-cover rounded-2xl"
            />
          </div>
        </Link>

      </div>
    </div>
  );
};

export default FoundItems;
