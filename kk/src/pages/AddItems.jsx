import { useState, useContext } from "react";
import { ItemsContext } from "./ItemsContext";
import { useNavigate } from "react-router-dom";

const AddItems = () => {
  const { addItem } = useContext(ItemsContext);
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [details, setDetails] = useState("");
  const [uploaderName, setUploaderName] = useState("");
  const [location, setLocation] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageFile) return alert("Please select an image");

    const reader = new FileReader();
    reader.onload = () => {
      const newItem = {
        id: Date.now(),
        image: reader.result, 
        details,
        uploaderName,
        location,
        mobileNumber,
        uploadTime: new Date().toLocaleString(),
      };
      addItem(newItem);
      navigate("/lostitems");
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-8">
  <h1 className="text-4xl mb-8 text-white font-semibold tracking-wide">
    Add New Lost Item
  </h1>
  <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-5 w-full max-w-lg bg-gray-900 p-8 rounded-2xl shadow-2xl"
  >
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setImageFile(e.target.files[0])}
      className="w-full text-white file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-gray-700 file:text-white
      hover:file:bg-gray-600 cursor-pointer"
    />

    <input
      type="text"
      placeholder="Item Details"
      value={details}
      onChange={(e) => setDetails(e.target.value)}
      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
    />

    <input
      type="text"
      placeholder="Uploader Name"
      value={uploaderName}
      onChange={(e) => setUploaderName(e.target.value)}
      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
    />

    <input
      type="text"
      placeholder="Location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
    />

    <input
      type="text"
      placeholder="Mobile Number"
      value={mobileNumber}
      onChange={(e) => setMobileNumber(e.target.value)}
      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
    />

    <button
      type="submit"
      className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all"
    >
      Add Item
    </button>
  </form>
</div>

  );
};

export default AddItems;
