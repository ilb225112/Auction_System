import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AUCTION_PATH } from "../constant";

const AuctionItems = () => {
    const { auctionId, auctionName } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${AUCTION_PATH}/auctionItems/${auctionId}`);
                if (!response.ok) throw new Error("Failed to fetch items");
                const data = await response.json();
                setItems(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching items:", error);
                setLoading(false);
            }
        };

        fetchItems();
    }, [auctionId]);


    if (loading) return <div className="text-center text-xl mt-10">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center mb-6">{auctionName}</h1>
            <div className="grid gap-6 md:grid-cols-2">
                {items.length > 0 ? items.map(item => (
                    <div key={item.itemId} className="border p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="font-medium mt-2">Starting Price: ${item.startingPrice}</p>
                        <p className={`mt-2 font-semibold ${item.status === "SOLD" ? "text-red-500" : "text-green-500"}`}>
                            Status: {item.status}
                        </p>
                    </div>
                )) : <p className="text-center text-lg">No items found.</p>}
            </div>
        </div>
    );
};

export default AuctionItems;
