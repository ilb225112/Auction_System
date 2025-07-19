import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Route, createRoutesFromElements } from 'react-router';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import BidderAuctions from './pages/BidderAuctions';
import AuctionItems from './pages/AuctionItems';
import BidderPanel from './pages/BidderPanel';
import PurchasedItems from './pages/Purchases';
import Profile from './pages/Profile';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/bidderAuctions' element={<BidderAuctions/>} />
            <Route path='/live/:auctionId/:name/:userId' element={<BidderPanel/>} />
            <Route path='/auctionItems/:auctionId/:auctionName' element={<AuctionItems/>} />
            <Route path='/purchases/:auctionId/:auctionName/:userId' element={<PurchasedItems/>} />
            <Route path='/profile/:userId' element={<Profile/>} />

            
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
