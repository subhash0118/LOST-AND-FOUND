import { Link } from "react-router-dom";
import bgImage from "../assets/backgroundddd.jpg"; // Adjust the path as needed

const Home = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="Lost and Found"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0  bg-opacity-80 p-4 flex flex-col items-center justify-center text-black text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          WELCOME TO
          <br />
          FoundIT
        </h1>
        <p className="max-w-2xl text-sm md:text-lg mb-8">
          FIND YOUR LOST ITEMS HERE!!
        </p>
        <Link to="/login">
          <button className="px-6 md:px-8 py-2 md:py-3 border-2 border-black hover:bg-black hover:text-white transition">
            GET STARTED
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
