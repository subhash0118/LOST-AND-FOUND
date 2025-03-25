import { useState, useContext } from "react";
import { ItemsContext } from "./ItemsContext";
import { useNavigate } from "react-router-dom";

const AddItemsF = () => {
  const { addFoundItem } = useContext(ItemsContext);
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
      addFoundItem(newItem);
      navigate("/founditems");
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#D7D3BF]">
  <h1 className="text-4xl mb-8 text-black font-semibold tracking-wide">
    Add New Found Item
  </h1>
  <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-5 w-full max-w-lg bg-[#ECEBDE] p-8 rounded-2xl shadow-2xl"
  >
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setImageFile(e.target.files[0])}
      className="w-full text-black file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-[#D7D3BF] file:text-black
      hover:file:bg-[#C1BAA1] cursor-pointer"
    />

    <input
      type="text"
      placeholder="Item Details"
      value={details}
      onChange={(e) => setDetails(e.target.value)}
      className="w-full p-3 bg-[#ECEBDE] text-black border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
    />

    <input
      type="text"
      placeholder="Uploader Name"
      value={uploaderName}
      onChange={(e) => setUploaderName(e.target.value)}
      className="w-full p-3 bg-[#ECEBDE] text-black border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
    />

    <input
      type="text"
      placeholder="Location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="w-full p-3 bg-[#ECEBDE] text-black border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
    />

    <input
      type="text"
      placeholder="Mobile Number"
      value={mobileNumber}
      onChange={(e) => setMobileNumber(e.target.value)}
      className="w-full p-3 bg-[#ECEBDE] text-black border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
    />

    <button
      type="submit"
      className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-[#C1BAA1] transition-all"
    >
      Add FoundItem
    </button>
  </form>
</div>

  );
};

export default AddItemsF;
