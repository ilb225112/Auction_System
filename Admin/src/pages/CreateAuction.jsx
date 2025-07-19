import React, { useState } from "react";
import { toast } from "react-toastify";
import { AUCTION_PATH } from "../constant";

const CreateAuction = () => {
  const [auctionType, setAuctionType] = useState("");
  const [auctionDate, setAuctionDate] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAuction = { name, auctionType, auctionDate };

    try {
      const response = await fetch(`${AUCTION_PATH}/createAuction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAuction),
      });

      if (response.ok) {
        toast.success("Auction created successfully!");
        setAuctionType("");
        setAuctionDate("");
      } else {
        toast.error("Failed to create auction");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Auction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Auction Type</label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={auctionType}
              onChange={(e) => setAuctionType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="CRICKET">Cricket</option>
              <option value="ANTIQUES">Antiques</option>
              <option value="REAL_ESTATE">Real Estate</option>
              <option value="KABADDI">Kabaddi</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Auction Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Auction Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md"
              value={auctionDate}
              onChange={(e) => setAuctionDate(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-md">
            Create Auction
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAuction;
