import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ItemBiddingPage = () => {
  const { auctionId, itemId } = useParams();
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const [item, setItem] = useState({
    id: 1,
    name: 'MS Dhoni Signed Jersey - CSK 2024',
    description: 'Official CSK jersey signed by MS Dhoni with authenticity certificate. This exclusive piece comes with a holographic certificate of authenticity and has been verified by official IPL memorabilia experts.',
    startingPrice: 50000,
    status: 'AVAILABLE',
    imageUrl: null,
    auction: {
      id: 1,
      name: 'IPL 2024 Memorabilia Auction',
      auctionType: 'CRICKET',
      status: 'LIVE'
    }
  });
  
  const [currentBid, setCurrentBid] = useState({
    bidAmount: 75000,
    bidderName: 'Rajesh Kumar',
    timestamp: '2 minutes ago'
  });
  
  const [bidHistory, setBidHistory] = useState([
    { id: 1, bidderName: 'Rajesh Kumar', amount: 75000, timestamp: '2 minutes ago' },
    { id: 2, bidderName: 'Priya Sharma', amount: 70000, timestamp: '5 minutes ago' },
    { id: 3, bidderName: 'Amit Patel', amount: 65000, timestamp: '8 minutes ago' },
    { id: 4, bidderName: 'Sneha Reddy', amount: 60000, timestamp: '12 minutes ago' },
    { id: 5, bidderName: 'Vikram Singh', amount: 55000, timestamp: '15 minutes ago' }
  ]);
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const minBidAmount = currentBid ? currentBid.bidAmount + 1000 : item.startingPrice;
  
  const handlePlaceBid = () => {
    const amount = parseInt(bidAmount);
    if (amount >= minBidAmount) {
      setShowConfirmModal(true);
    }
  };
  
  const confirmBid = () => {
    setIsSubmitting(true);
    // Add bid placement logic here
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmModal(false);
      setBidAmount('');
      // Show success toast
    }, 1500);
  };
  
  const isValidBid = bidAmount && parseInt(bidAmount) >= minBidAmount;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#131827] to-[#0a0e1a]">
      <Navbar user={{ name: 'John Doe', email: 'john@example.com' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/auctions/${auctionId}`)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Auction
        </button>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Item Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <Card className="overflow-hidden">
              <div className="relative h-96 bg-gradient-to-br from-slate-700 to-slate-800">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-32 h-32 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge variant={item.status.toLowerCase()} size="lg">
                    {item.status}
                  </Badge>
                </div>
              </div>
            </Card>
            
            {/* Item Info */}
            <Card>
              <Card.Body>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-white mb-2">{item.name}</h1>
                    <div className="flex items-center gap-2 text-slate-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      <span>{item.auction.name}</span>
                    </div>
                  </div>
                  <Badge variant={item.auction.auctionType.toLowerCase()}>
                    {item.auction.auctionType}
                  </Badge>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed">{item.description}</p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Starting Price</p>
                      <p className="text-xl font-bold text-slate-300">{formatCurrency(item.startingPrice)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Minimum Bid Increment</p>
                      <p className="text-xl font-bold text-slate-300">₹1,000</p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
            
            {/* Bid History */}
            <Card>
              <Card.Header>
                <h3 className="text-xl font-bold text-white">Bid History</h3>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="divide-y divide-slate-700/50">
                  {bidHistory.map((bid, index) => (
                    <div key={bid.id} className="p-4 hover:bg-slate-800/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            index === 0 
                              ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white' 
                              : 'bg-slate-700 text-slate-300'
                          }`}>
                            {bid.bidderName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{bid.bidderName}</p>
                            <p className="text-sm text-slate-500">{bid.timestamp}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-xl font-bold ${index === 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {formatCurrency(bid.amount)}
                          </p>
                          {index === 0 && (
                            <Badge variant="live" size="sm">Highest</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
          
          {/* Bidding Panel */}
          <div className="space-y-6">
            {/* Current Bid */}
            <Card glow className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border-indigo-500/30">
              <Card.Body>
                <div className="text-center mb-6">
                  <p className="text-sm text-slate-400 mb-2">Current Highest Bid</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {formatCurrency(currentBid.bidAmount)}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      {currentBid.bidderName.charAt(0)}
                    </div>
                    <span>by {currentBid.bidderName}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{currentBid.timestamp}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Your Bid Amount
                    </label>
                    <Input
                      type="number"
                      placeholder={`Min: ${formatCurrency(minBidAmount)}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Minimum bid: {formatCurrency(minBidAmount)}
                    </p>
                  </div>
                  
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={!isValidBid}
                    onClick={handlePlaceBid}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Place Bid
                  </Button>
                  
                  {/* Quick Bid Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    {[1000, 5000, 10000].map((increment) => (
                      <button
                        key={increment}
                        onClick={() => setBidAmount((minBidAmount + increment).toString())}
                        className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-sm text-slate-300 hover:text-white transition-all border border-slate-700/50 hover:border-indigo-500/50"
                      >
                        +₹{increment/1000}k
                      </button>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
            
            {/* Auction Info */}
            <Card>
              <Card.Header>
                <h3 className="font-bold text-white">Auction Information</h3>
              </Card.Header>
              <Card.Body className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status</span>
                  <Badge variant="live" pulse>LIVE</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Bids</span>
                  <span className="text-white font-semibold">{bidHistory.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Time Remaining</span>
                  <span className="text-white font-semibold">2h 45m</span>
                </div>
              </Card.Body>
            </Card>
            
            {/* Tips */}
            <Card className="bg-blue-500/10 border-blue-500/30">
              <Card.Body>
                <div className="flex gap-3">
                  <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Bidding Tips</h4>
                    <ul className="text-sm text-slate-400 space-y-1">
                      <li>• Bids are final and binding</li>
                      <li>• Set a maximum budget</li>
                      <li>• Watch for last-minute bids</li>
                    </ul>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <Card.Header>
              <h3 className="text-xl font-bold text-white">Confirm Your Bid</h3>
            </Card.Header>
            <Card.Body className="space-y-4">
              <p className="text-slate-300">
                You are about to place a bid of <span className="font-bold text-indigo-400">{formatCurrency(parseInt(bidAmount))}</span> on:
              </p>
              <p className="font-semibold text-white">{item.name}</p>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-sm text-amber-400">
                  ⚠️ This bid is final and binding. Make sure you're ready to purchase if you win.
                </p>
              </div>
            </Card.Body>
            <Card.Footer className="flex gap-3">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setShowConfirmModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={confirmBid}
                loading={isSubmitting}
              >
                Confirm Bid
              </Button>
            </Card.Footer>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ItemBiddingPage;
