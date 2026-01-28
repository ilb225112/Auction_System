import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const MyAuctionsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('registered');
  
  const [registeredAuctions, setRegisteredAuctions] = useState([
    {
      id: 1,
      name: 'IPL 2024 Memorabilia',
      type: 'CRICKET',
      status: 'LIVE',
      dateTime: '2026-01-21T18:00:00',
      itemsCount: 45,
      myBids: 8,
      winning: 3
    },
    {
      id: 2,
      name: 'Vintage Antiques',
      type: 'ANTIQUES',
      status: 'LIVE',
      dateTime: '2026-01-21T16:30:00',
      itemsCount: 28,
      myBids: 5,
      winning: 2
    },
    {
      id: 3,
      name: 'Pro Kabaddi League',
      type: 'KABADDI',
      status: 'UPCOMING',
      dateTime: '2026-01-25T19:00:00',
      itemsCount: 32,
      myBids: 0,
      winning: 0
    }
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#131827] to-[#0a0e1a]">
      <Navbar user={{ name: 'John Doe', email: 'john@example.com' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Auctions</h1>
          <p className="text-slate-400 text-lg">Track your registered auctions and bidding activity</p>
        </div>
        
        <div className="grid gap-6">
          {registeredAuctions.map((auction) => (
            <Card key={auction.id} hover className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center">
                  <svg className="w-20 h-20 text-indigo-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{auction.name}</h3>
                        <Badge variant={auction.status.toLowerCase()} pulse={auction.status === 'LIVE'}>
                          {auction.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400 text-sm">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(auction.dateTime)}
                        </span>
                        <Badge variant={auction.type.toLowerCase()} size="sm">{auction.type}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                      <p className="text-2xl font-bold text-white">{auction.itemsCount}</p>
                      <p className="text-xs text-slate-400">Total Items</p>
                    </div>
                    <div className="text-center p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/30">
                      <p className="text-2xl font-bold text-indigo-400">{auction.myBids}</p>
                      <p className="text-xs text-slate-400">My Bids</p>
                    </div>
                    <div className="text-center p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                      <p className="text-2xl font-bold text-emerald-400">{auction.winning}</p>
                      <p className="text-xs text-slate-400">Winning</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="primary" onClick={() => navigate(`/auctions/${auction.id}`)}>
                      View Auction
                    </Button>
                    <Button variant="outline" onClick={() => navigate(`/auctions/${auction.id}`)}>
                      My Bids
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAuctionsPage;
