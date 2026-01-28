import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/design-system.css';

// New Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BidderDashboard from './pages/BidderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AuctionsListPage from './pages/AuctionsListPage';
import AuctionDetailPage from './pages/AuctionDetailPage';
import ItemBiddingPage from './pages/ItemBiddingPage';
import MyAuctionsPage from './pages/MyAuctionsPage';
import CreateAuctionPage from './pages/CreateAuctionPage';

// Old Pages (Backend-connected)
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import BidderAuctions from './pages/BidderAuctions';
import AuctionItems from './pages/AuctionItems';
import PurchasedItems from './pages/Purchases';
import Profile from './pages/Profile';
import BidderPanel from './pages/BidderPanel';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - Using old backend-connected pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Bidder Routes - Using old backend-connected pages */}
        <Route path="/bidderAuctions" element={<BidderAuctions />} />
        <Route path="/auctionItems/:auctionId/:auctionName" element={<AuctionItems />} />
        <Route path="/purchases/:auctionId/:auctionName/:userId" element={<PurchasedItems />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/live/:auctionId/:name/:userId" element={<BidderPanel />} />
        
        {/* New UI Pages (for reference/future use) */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/dashboard" element={<BidderDashboard />} />
        <Route path="/auctions" element={<AuctionsListPage />} />
        <Route path="/auctions/:auctionId" element={<AuctionDetailPage />} />
        <Route path="/auctions/:auctionId/items/:itemId" element={<ItemBiddingPage />} />
        <Route path="/my-auctions" element={<MyAuctionsPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-auction" element={<CreateAuctionPage />} />
        <Route path="/admin/auctions" element={<AuctionsListPage />} />
        <Route path="/admin/auctions/:auctionId" element={<AuctionDetailPage />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
