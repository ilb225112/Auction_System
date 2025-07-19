import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { USER_PATH } from "../constant";

const Home = () => {
  const [auctions, setAuctions] = useState([]);
  const navigate = useNavigate();  // Initialize navigation

  // Check if user exists in localStorage
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    navigate("/login");  // Redirect to login if no user found
    return null;
  }

  const userId = JSON.parse(storedUser).userId;

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const res = await axios.get(`${USER_PATH}/unregistered/${userId}`);
      setAuctions(res.data);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  const registerForAuction = async (auctionId) => {
    const confirmRegister = window.confirm("Do you want to register for this auction?");
    if (!confirmRegister) return;

    try {
      await axios.post(`${USER_PATH}/registerAuction`, { userId, auctionId });
      toast.success("Successfully registered for auction!");
      fetchAuctions();
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Try again!");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Upcoming Auctions</h1>
      {auctions.length === 0 ? (
        <>
          <p className="text-center text-gray-600">No auctions available</p>
          <Link to="/bidderAuctions" className="text-white hover:underline">
            Go to registered auctions
          </Link>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {auctions.map((auction) => (
            <div key={auction.auctionId} className="border rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-semibold">Auction: {auction.name}</h2>
              <p className="text-gray-600">Date: {new Date(auction.auctionDate).toLocaleDateString()}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => registerForAuction(auction.auctionId)}
              >
                Register
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
