import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { USER_PATH } from "../constant";

const PurchasedItems = () => {
  const { userId, auctionName, auctionId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchasedItems = async () => {
      try {
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

  if (loading) return <p className="text-gray-600 text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">{auctionName}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.itemId} className="border p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="font-medium mt-2">Starting Price: ${item.startingPrice}</p>
              <p className={`mt-2 font-semibold ${item.status === "SOLD" ? "text-red-500" : "text-green-500"}`}>
                Status: {item.status}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No items found.</p>
        )}
      </div>
    </div>
  );
};

export default PurchasedItems;
