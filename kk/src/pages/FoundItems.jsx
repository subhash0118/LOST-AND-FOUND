import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ItemsContext } from "./ItemsContext";

const FoundItems = () => {
  const { foundItems, deleteFoundItem } = useContext(ItemsContext);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="min-h-screen bg-[#D7D3BF] flex flex-col items-center justify-center gap-16 p-8">
      <div className="text-center text-5xl">
        <h1>FOUND ITEMS</h1>
      </div>

      <Link to="/additemsf">
        <div className="w-full max-w-4xl h-64 flex items-center justify-center rounded-2xl">
          <img
            src="add1.png"
            className="h-36 w-36 object-cover rounded-2xl"
            alt="Add Item"
          />
        </div>
      </Link>

      <div className="flex flex-wrap justify-center gap-8">
        {foundItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedItem(item)}
            className="w-48 h-48 bg-gray-300 rounded-2xl flex flex-col items-center justify-center p-2 cursor-pointer"
          >
            <img
              src={item.image}
              alt={`Item ${index + 1}`}
              className="h-32 w-32 object-cover rounded-2xl mb-2"
            />
            <p className="text-sm text-center">{item.details}</p>
          </div>
        ))}
      </div>

      {/* Modal for showing uploader details */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h2 className="text-xl font-bold mb-4">Uploader Details</h2>
            <p><strong>Name:</strong> {selectedItem.uploaderName}</p>
            <p><strong>Time:</strong> {selectedItem.uploadTime}</p>
            <p><strong>Location:</strong> {selectedItem.location}</p>
            <p><strong>Mobile:</strong> {selectedItem.mobileNumber}</p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  deleteFoundItem(selectedItem.id);
                  setSelectedItem(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-300 cursor-pointer "
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-black/50 hover:bg-gray-300 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoundItems;
