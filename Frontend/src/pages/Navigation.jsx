import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUserId(JSON.parse(user).userId);
            setIsAuthenticated(true);
            setUserName(JSON.parse(user).name);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">Home</Link>
                <ul className="flex space-x-8">
                    {!isAuthenticated ? (
                        <>
                            <li><Link to="/login" className="text-white hover:underline">Login</Link></li>
                            <li><Link to="/register" className="text-white hover:underline">SignUp</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/bidderAuctions" className="text-white hover:underline">My_Auctions</Link></li>
                            <li><Link to={`/profile/${userId}`} className="text-white hover:underline">{userName}</Link></li>
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
