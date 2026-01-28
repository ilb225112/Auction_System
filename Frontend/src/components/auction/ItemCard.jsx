import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const ItemCard = ({ item, auctionId, auctionStatus }) => {
  const navigate = useNavigate();
  const [currentBid, setCurrentBid] = useState(null);
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const isLive = auctionStatus === 'LIVE';
  const isSold = item.status === 'SOLD';
  const isAvailable = item.status === 'AVAILABLE';
  
  return (
    <Card hover className="overflow-hidden group">
      {/* Image Section */}
      <div className="relative h-56 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-24 h-24 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={isSold ? 'sold' : 'available'} size="sm">
            {item.status}
          </Badge>
        </div>
        
        {/* Sold Overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-red-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white font-bold text-lg">SOLD</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <Card.Body className="space-y-3">
        <div>
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-indigo-400 transition-colors">
            {item.name}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-2">
            {item.description}
          </p>
        </div>
        
        {/* Pricing Section */}
        <div className="space-y-2 pt-2 border-t border-slate-700/50">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 uppercase tracking-wide">Starting Price</span>
            <span className="text-sm font-semibold text-slate-300">{formatCurrency(item.startingPrice)}</span>
          </div>
          
          {currentBid && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500 uppercase tracking-wide">Current Bid</span>
              <span className="text-lg font-bold text-emerald-400">{formatCurrency(currentBid.bidAmount)}</span>
            </div>
          )}
          
          {isSold && item.finalPrice && (
            <div className="flex justify-between items-center bg-red-500/10 -mx-6 px-6 py-2 border-y border-red-500/20">
              <span className="text-xs text-red-400 uppercase tracking-wide font-semibold">Final Price</span>
              <span className="text-xl font-bold text-red-400">{formatCurrency(item.finalPrice)}</span>
            </div>
          )}
        </div>
      </Card.Body>
      
      {/* Footer */}
      <Card.Footer className="bg-slate-900/50">
        {isLive && isAvailable ? (
          <Button 
            variant="primary" 
            className="w-full"
            onClick={() => navigate(`/auctions/${auctionId}/items/${item.id}`)}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Place Bid
          </Button>
        ) : isSold ? (
          <Button 
            variant="ghost" 
            className="w-full"
            onClick={() => navigate(`/auctions/${auctionId}/items/${item.id}`)}
          >
            View Details
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate(`/auctions/${auctionId}/items/${item.id}`)}
          >
            View Item
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default ItemCard;
