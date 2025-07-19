import { useState, useEffect } from "react";
import axios from "axios";
import { BID_PATH, AUCTION_PATH } from "../constant";
import { useParams } from "react-router-dom";

const BidderPanel = () => {
    const { auctionId, name, userId } = useParams();
    const [items, setItems] = useState([]);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [currentBid, setCurrentBid] = useState(null);
    const [bidAmount, setBidAmount] = useState("");
    const [timer, setTimer] = useState(3600);
    const [intervalId, setIntervalId] = useState(null);
    const [allSold, setAllSold] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`${AUCTION_PATH}/auctionItems/${auctionId}`);
                const availableItems = response.data.filter(item => item.status !== "SOLD");
                if (availableItems.length === 0) {
                    setAllSold(true);
                }
                setItems(availableItems);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
    }, [auctionId]);

    useEffect(() => {
        if (items.length === 0 || allSold) return;
    
        const fetchLatestBid = async () => {
            try {
                const response = await axios.get(`${BID_PATH}/latestBid/${auctionId}/${items[currentItemIndex].itemId}`);
                const latestBid = response.data;
    
                if (latestBid) {
                    const bidTime = new Date(latestBid.bidtime).getTime();
                    const currentTime = Date.now();
                    const remainingTime = Math.max(60 - (currentTime - bidTime) / 1000, 0);
                    setCurrentBid((prevBid) => {
                        if (!prevBid || latestBid.bidAmount > prevBid.bidAmount) {
                            setTimer(Math.floor(remainingTime));
                            return latestBid;
                        }
                        return prevBid;
                    });
                }
            } catch (error) {
                console.error("Error fetching latest bid:", error);
            }
        };
    
        fetchLatestBid();
        const id = setInterval(fetchLatestBid, 1000);
        setIntervalId(id);
    
        return () => clearInterval(id);
    }, [currentItemIndex, items]);
    
    useEffect(() => {
        if (timer === 0) {
            sellItem();
        }
        const timerId = setInterval(() => setTimer(prev => prev > 0 ? prev - 1 : 0), 1000);
        return () => clearInterval(timerId);
    }, [timer]);

    const handleBidChange = (amount) => {
        setBidAmount(amount);
    };

    const placeBid = async () => {
    
        const bidIncrement = parseFloat(bidAmount);
        if (isNaN(bidIncrement) || bidIncrement <= 0) {
            alert("Please enter a valid bid increment.");
            return;
        }
    
        // Calculate new bid amount
        const bidAmountValue = currentBid 
            ? currentBid.bidAmount + bidIncrement
            : currentItem.startingPrice + bidIncrement;
    
    
        try {
            await axios.post(`${BID_PATH}/placeBid`, {
                item: { itemId: items[currentItemIndex].itemId },  
                auction: { auctionId: auctionId },  
                bidder: { userId: userId },  
                bidAmount: bidAmountValue
            });
    
            alert("Bid placed successfully!");
            setBidAmount("");  // Reset input field
        } catch (error) {
            console.error("Error placing bid:", error);
            alert("Failed to place bid.");
        }
    };

    const sellItem = async () => {
        if (!currentBid) return;
        console.log("Sell item called");
        try {
            await axios.post(`${BID_PATH}/sellItem/${items[currentItemIndex].itemId}`, {
                bidderId: currentBid.bidderId,
                bidAmount: currentBid.bidAmount,
            });
    
            alert("Item sold successfully!");
            moveToNextItem();
        } catch (error) {
            console.error("Error selling item:", error);
            alert("Failed to sell item.");
        }
    };

    const moveToNextItem = () => {
        console.log("Move to next Item called")
        clearInterval(intervalId);
        if (currentItemIndex + 1 < items.length) {
            setCurrentItemIndex(currentItemIndex + 1);
            setCurrentBid(null);
            setTimer(3600);
        } else {
            setAllSold(true);
        }
    };



    if (allSold) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <h2 className="text-3xl font-bold text-gray-800">All Items Sold Out!</h2>
            </div>
        );
    }
    if (items.length === 0) {
        return <h2>Loading items...</h2>;
    }
    const currentItem = items[currentItemIndex];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{name}</h2>

            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h3 className="text-xl font-semibold text-gray-900">{currentItem.name}</h3>
                <p className="text-gray-600 mb-2">{currentItem.description}</p>

                <div className="flex items-center justify-between text-lg font-medium mt-4">
                    <span>Current Bid:</span>
                    <span className="text-green-600">
                        ${currentBid ? currentBid.bidAmount : currentItem.startingPrice}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                    <span>Current Bidder:</span>
                    <span className="text-blue-500">
                        {currentBid ? currentBid.bidderName : "N/A"}
                    </span>
                </div>

                <div className="flex items-center justify-between text-lg font-medium mt-4">
                    <span>Time Left:</span>
                    <span className={`${timer < 10 ? "text-red-600" : "text-gray-800"}`}>
                        {timer} sec
                    </span>
                </div>

                <div className="flex flex-col gap-3 mt-5">
                    <input
                        type="number"
                        placeholder="Increase bid by"
                        value={bidAmount}
                        onChange={(e) => handleBidChange(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={placeBid}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Place Bid
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BidderPanel;
