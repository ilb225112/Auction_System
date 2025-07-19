import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ADMIN_PATH, USER_PATH } from '../constant';

const CompletedBidder = () => {
  const { auctionId, auctionName } = useParams();
  const [bidders, setBidders] = useState([]);
  const [purchasesByUser, setPurchasesByUser] = useState({}); // key = userId, value = purchased items

  useEffect(() => {
    fetch(`${ADMIN_PATH}/bidders/${auctionId}`)
      .then(res => res.json())
      .then(data => setBidders(data))
      .catch(err => console.error("Error fetching bidders:", err));
  }, [auctionId]);

  const fetchPurchasedItems = async (userId) => {
    try {
      const res = await fetch(`${USER_PATH}/purchases/${userId}/${auctionId}`);
      const data = await res.json();
      setPurchasesByUser(prev => ({ ...prev, [userId]: data }));
    } catch (err) {
      console.error("Error fetching purchases:", err);
    }
  };

  const togglePurchaseBox = (userId) => {
    if (purchasesByUser[userId]) {
      // Hide box if already fetched
      setPurchasesByUser(prev => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
    } else {
      fetchPurchasedItems(userId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Completed Auction Bidders: <span className="text-gray-600">{auctionName}</span>
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
              <React.Fragment key={bidder.userId}>
                <tr className="text-center hover:bg-gray-50 transition">
                  <td className="py-2 px-4 border-b">{bidder.name}</td>
                  <td className="py-2 px-4 border-b">{bidder.email}</td>
                  <td className="py-2 px-4 border-b capitalize">{bidder.role}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => togglePurchaseBox(bidder.userId)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg text-sm"
                    >
                      {purchasesByUser[bidder.userId] ? 'Hide' : 'Purchase'}
                    </button>
                  </td>
                </tr>

                {/* Purchased Items Box */}
                {purchasesByUser[bidder.userId] && (
                  <tr>
                    <td colSpan="4" className="bg-gray-50 border-b p-4">
                      <div className="bg-white rounded-lg p-4 shadow-inner">
                        <h3 className="text-lg font-semibold mb-2 text-left">Purchased Items:</h3>
                        {purchasesByUser[bidder.userId].length === 0 ? (
                          <p className="text-gray-500">No items purchased.</p>
                        ) : (
                          <ul className="space-y-2">
                            {purchasesByUser[bidder.userId].map(item => (
                              <li key={item.itemId} className="border p-3 rounded-md shadow-sm">
                                <p><strong>Name:</strong> {item.name}</p>
                                <p><strong>Description:</strong> {item.description}</p>
                                <p><strong>Sold Price:</strong> ₹{item.startingPrice}</p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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

export default CompletedBidder;
