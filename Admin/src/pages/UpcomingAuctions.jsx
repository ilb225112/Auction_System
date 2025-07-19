import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUCTION_PATH } from "../constant";

const UpcomingAuctions = () => {
    const [auctions, setAuctions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await fetch(`${AUCTION_PATH}/upcoming`);
                if (!response.ok) throw new Error("Failed to fetch auctions");
                const data = await response.json();
                setAuctions(data);
            } catch (error) {
                console.error("Error fetching auctions:", error);
            }
        };

        fetchAuctions();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h2 className="text-3xl font-bold mb-6">Upcoming Auctions</h2>
            <div className="w-full max-w-4xl">
                {auctions.length === 0 ? (
                    <p className="text-center text-gray-500">No upcoming auctions found.</p>
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
                                        className="bg-blue-500 text-white px-4 py-2 mx-5 rounded-md hover:bg-blue-600"
                                        onClick={() => navigate(`/auction-items/${auction.auctionId}/${auction.name}`)}
                                    >
                                        All Items
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 mx-5 rounded-md hover:bg-blue-600"
                                        onClick={() => navigate(`/addItem/${auction.auctionId}`)}
                                    >
                                        Add Item
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 mx-5 rounded-md hover:bg-blue-600"
                                        onClick={() => navigate(`/upcoming-bidder/${auction.auctionId}/${auction.name}`)}
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

export default UpcomingAuctions;
