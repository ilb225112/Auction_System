import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUCTION_PATH } from "../constant";

const LiveAuction = () => {
    const [auctions, setAuctions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLiveAuctions = async () => {
            try {
                const response = await fetch(`${AUCTION_PATH}/live`);
                if (!response.ok) throw new Error("Failed to fetch live auctions");
                const data = await response.json();
                setAuctions(data);
            } catch (error) {
                console.error("Error fetching live auctions:", error);
            }
        };

        fetchLiveAuctions();
    }, []);
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h2 className="text-3xl font-bold mb-6">Live Auctions</h2>
            <div className="w-full max-w-4xl">
                {auctions.length === 0 ? (
                    <p className="text-center text-gray-500">No live auctions found.</p>
                ) : (
                    <div className="space-y-4">
                        {auctions.map((auction) => (
                            <div key={auction.auctionId} className="bg-white p-5 rounded-lg shadow-md flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-semibold">{auction.name}</h3>
                                    <p className="text-gray-600">Date: {new Date(auction.auctionDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 mx-2 rounded-md hover:bg-blue-600"
                                        onClick={() => navigate(`/auction-items/${auction.auctionId}/${auction.name}`)}
                                    >
                                        Items
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 mx-2 rounded-md hover:bg-blue-600"
                                        onClick={() => navigate(`/addItem/${auction.auctionId}`)}
                                    >
                                        Add Item
                                    </button>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 mx-2 rounded-md hover:bg-green-600"
                                        onClick={() => navigate(`/host/${auction.auctionId}`)}
                                    >
                                        Host
                                    </button>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 mx-2 rounded-md hover:bg-green-600"
                                        onClick={() => navigate(`/live-bidder/${auction.auctionId}/${auction.name}`)}
                                    >
                                        Bidders
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveAuction;
