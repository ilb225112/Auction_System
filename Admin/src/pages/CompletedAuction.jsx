import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUCTION_PATH } from "../constant";

const CompletedAuction = () => {
    const [auctions, setAuctions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompletedAuctions = async () => {
            try {
                const response = await fetch(`${AUCTION_PATH}/completed`);
                if (!response.ok) throw new Error("Failed to fetch completed auctions");
                const data = await response.json();
                setAuctions(data);
            } catch (error) {
                console.error("Error fetching completed auctions:", error);
            }
        };

        fetchCompletedAuctions();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h2 className="text-3xl font-bold mb-6">Completed Auctions</h2>
            <div className="w-full max-w-4xl">
                {auctions.length === 0 ? (
                    <p className="text-center text-gray-500">No completed auctions found.</p>
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
                                        className="bg-purple-500 text-white px-4 py-2 mx-2 rounded-md hover:bg-purple-600"
                                        onClick={() => navigate(`/completed-bidder/${auction.auctionId}/${auction.name}`)}
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

export default CompletedAuction;
