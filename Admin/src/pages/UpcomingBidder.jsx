import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ADMIN_PATH } from '../constant';

const UpcomingBidder = () => {
  const { auctionId, auctionName } = useParams();
  const [bidders, setBidders] = useState([]);

  useEffect(() => {
    fetchBidders();
  }, [auctionId]);

  const fetchBidders = () => {
    fetch(`${ADMIN_PATH}/bidders/${auctionId}`)
      .then(res => res.json())
      .then(data => setBidders(data))
      .catch(err => console.error("Error fetching bidders:", err));
  };

  const deleteBidder = (userId) => {
    if (window.confirm("Are you sure you want to remove this bidder from the auction?")) {
      fetch(`${ADMIN_PATH}/deleteBidder/${auctionId}/${userId}`, {
        method: 'DELETE'
      })
        .then(() => {
          setBidders(bidders.filter(b => b.userId !== userId));
        })
        .catch(err => console.error("Error deleting bidder:", err));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Registered Bidders for Auction: <span className="text-blue-600">{auctionName}</span>
      </h1>
      
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Role</th>
            <th className="py-3 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {bidders.length > 0 ? (
            bidders.map((bidder) => (
              <tr key={bidder.userId} className="text-center hover:bg-gray-50 transition">
                <td className="py-2 px-4 border-b">{bidder.name}</td>
                <td className="py-2 px-4 border-b">{bidder.email}</td>
                <td className="py-2 px-4 border-b capitalize">{bidder.role}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => deleteBidder(bidder.userId)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 text-gray-500 text-center">No bidders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingBidder;
