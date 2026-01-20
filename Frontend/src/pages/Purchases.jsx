import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { USER_PATH } from "../constant";

const PurchasedItems = () => {
  const { userId, auctionName, auctionId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchasedItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${USER_PATH}/purchases/${userId}/${auctionId}`
        );
        setItems(response.data);
      } catch (err) {
        setError("Failed to fetch purchased items.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedItems();
  }, [userId, auctionId]);

  const totalSpent = items.reduce((sum, item) => sum + (item.finalPrice || item.startingPrice), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/bidderAuctions" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to My Auctions
          </Link>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {auctionName}
          </h1>
          <p className="text-gray-600">Your winning purchases</p>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-green-500">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Items Won</p>
              <p className="text-4xl font-bold text-green-600">{items.length}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Spent</p>
              <p className="text-4xl font-bold text-blue-600">${totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <div 
                key={item.itemId} 
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                    #{index + 1}
                  </span>
                  <span className="text-red-600 bg-red-100 text-xs font-semibold px-3 py-1 rounded-full">
                    {item.status}
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Starting Price</span>
                    <span className="text-sm font-medium text-gray-800">${item.startingPrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Won at</span>
                    <span className="text-2xl font-bold text-green-600">${item.finalPrice || item.startingPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-xl text-gray-600 mb-2">No purchases yet</p>
            <p className="text-gray-500">You haven't won any items in this auction</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasedItems;
