import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { USER_PATH } from "../constant";

const BidderAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedUser?.userId;

  useEffect(() => {
    fetchRegisteredAuctions();
  }, []);

  const fetchRegisteredAuctions = async () => {
    try {
      const res = await axios.get(`${USER_PATH}/registered/${userId}`);
      setAuctions(res.data);
    } catch (error) {
      console.error("Error fetching registered auctions:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">My Registered Auctions</h1>
      {auctions.length === 0 ? (
        <p className="text-center text-gray-600">You have not registered for any auctions</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {auctions.map((auction) => (
            <div key={auction.auctionId} className="border rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-semibold">{auction.name}</h2>
              <p className="text-gray-600">Date: {new Date(auction.auctionDate).toLocaleDateString()}</p>
              <p className={`font-bold ${auction.status === "Live" ? "text-green-500" : auction.status === "Upcoming" ? "text-blue-500" : "text-gray-500"}`}>
                {auction.status}
              </p>
              {auction.status === "Live" && (
                <Link to={`/live/${auction.auctionId}/${auction.name}/${userId}`} className="mt-2 block text-white bg-green-500 px-4 py-2 rounded hover:bg-green-700 text-center">
                  Join Live Auction
                </Link>
              )}
              {auction.status === "Upcoming" && (
                <Link to={`/auctionItems/${auction.auctionId}/${auction.name}`} className="mt-2 block text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 text-center">
                  View Items
                </Link>
              )}
              {auction.status === "Completed" && (
                <Link to={`/purchases/${auction.auctionId}/${auction.name}/${userId}`} className="mt-2 block text-white bg-gray-500 px-4 py-2 rounded hover:bg-gray-700 text-center">
                  View Purchases
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BidderAuctions;
