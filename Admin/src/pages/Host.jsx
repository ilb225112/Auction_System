import { useState, useEffect } from "react";
import axios from "axios";
import { BID_PATH, AUCTION_PATH } from "../constant";
import { useParams } from "react-router-dom";

const Host = () => {
    const { auctionId } = useParams();
    const [items, setItems] = useState([]);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [currentBid, setCurrentBid] = useState(null);
    const [timer, setTimer] = useState(3600);
    const [intervalId, setIntervalId] = useState(null);
    const [allSold, setAllSold] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`${AUCTION_PATH}/auctionItems/${auctionId}`);
                const availableItems = response.data.filter(item => item.status !== "SOLD");
                if (availableItems.length === 0) setAllSold(true);
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
                const response = await axios.get(
                    `${BID_PATH}/latestBid/${auctionId}/${items[currentItemIndex].itemId}`
                );
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
        const id = setInterval(fetchLatestBid, 3000);
        setIntervalId(id);

        return () => clearInterval(id);
    }, [currentItemIndex, items]);

    useEffect(() => {
        if (timer === 0) {
            // Optional: auto-sell or highlight that item bidding is done
        }
        const timerId = setInterval(() => setTimer(prev => prev > 0 ? prev - 1 : 0), 1000);
        return () => clearInterval(timerId);
    }, [timer]);

    const sellItem = async () => {
        if (!currentBid) {
            alert("No current bid to sell the item.");
            return;
        }

        try {
            await axios.post(`${BID_PATH}/sellItem/${items[currentItemIndex].itemId}`, {
                bidderId: currentBid.bidderId,
                bidAmount: currentBid.bidAmount,
            });

            alert("Item marked as SOLD.");
            moveToNextItem();
        } catch (error) {
            console.error("Error selling item:", error);
            alert("Failed to mark item as sold.");
        }
    };

    const moveToNextItem = () => {
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Live Auction Panel</h2>

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

                {/* <button
                    onClick={sellItem}
                    className="mt-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                    Mark as Sold & Next
                </button> */}
            </div>
        </div>
    );
};

export default Host;
