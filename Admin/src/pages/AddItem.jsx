import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get path params
import { toast } from "react-toastify";
import { AUCTION_PATH } from "../constant";

const AddItem = () => {
  const { auctionId } = useParams(); // Get auctionId from URL params
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { name, description, startingPrice };

    try {
      const response = await fetch(`${AUCTION_PATH}/addItem/${auctionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        toast.success("Item added successfully!");
        setName("");
        setDescription("");
        setStartingPrice("");
      } else {
        toast.error("Failed to add item");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Item to Auction {auctionId}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Item Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Starting Price</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md"
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-md">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
