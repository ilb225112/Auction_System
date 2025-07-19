import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("admin");
        if (user) {
            setIsAuthenticated(true);
        }
        else{
            navigate('/login');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("admin");
        setIsAuthenticated(false);
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">Home</Link>
                <ul className="flex space-x-10">
                    {!isAuthenticated ? (
                        <>
                            <li><Link to="/login" className="text-white hover:underline">Login</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/nextAuctions" className="text-white hover:underline">Next Auctions</Link></li>
                            <li><Link to="/liveAuctions" className="text-white hover:underline">Live Auctions</Link></li>
                            <li><Link to="/completedAuctions" className="text-white hover:underline">Completed Auctions</Link></li>
                            <li><Link to="/createAuction" className="text-white hover:underline">Add Auctions</Link></li>
                            {/* <li><Link to="/bidders" className="text-white hover:underline">Bidders</Link></li> */}
                            <li>
                                <button onClick={handleLogout} className="text-white hover:underline">
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
