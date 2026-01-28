import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import StatsCard from '../components/ui/StatsCard';
import AuctionCard from '../components/auction/AuctionCard';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const BidderDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    registeredAuctions: 12,
    upcomingAuctions: 8,
    liveAuctions: 3,
    itemsWon: 5
  });
  
  const [liveAuctions, setLiveAuctions] = useState([
    {
      id: 1,
      name: 'IPL 2024 Memorabilia Auction',
      auctionType: 'CRICKET',
      status: 'LIVE',
      dateTime: '2026-01-21T18:00:00',
      itemCount: 45
    },
    {
      id: 2,
      name: 'Vintage Antiques Collection',
      auctionType: 'ANTIQUES',
      status: 'LIVE',
      dateTime: '2026-01-21T16:30:00',
      itemCount: 28
    },
    {
      id: 3,
      name: 'Premium Real Estate Showcase',
      auctionType: 'REAL_ESTATE',
      status: 'LIVE',
      dateTime: '2026-01-21T14:00:00',
      itemCount: 12
    }
  ]);
  
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'bid',
      itemName: 'Signed MS Dhoni Jersey',
      amount: 125000,
      timestamp: '2 minutes ago',
      status: 'winning'
    },
    {
      id: 2,
      type: 'outbid',
      itemName: 'Vintage Rolex Watch',
      amount: 450000,
      timestamp: '15 minutes ago',
      status: 'outbid'
    },
    {
      id: 3,
      type: 'won',
      itemName: 'Antique Vase',
      amount: 85000,
      timestamp: '1 hour ago',
      status: 'won'
    },
    {
      id: 4,
      type: 'bid',
      itemName: 'Luxury Apartment - Bandra',
      amount: 12500000,
      timestamp: '2 hours ago',
      status: 'winning'
    }
  ]);
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const getActivityIcon = (type) => {
    switch(type) {
      case 'won':
        return (
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'outbid':
        return (
          <div className="p-2 bg-red-500/20 rounded-lg">
            <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#131827] to-[#0a0e1a]">
      <Navbar user={{ name: 'John Doe', email: 'john@example.com' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John! 👋</h1>
          <p className="text-slate-400">Here's what's happening with your auctions today</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Registered Auctions"
            value={stats.registeredAuctions}
            icon={
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            }
            color="indigo"
            trend="up"
            trendValue="+2 this week"
          />
          <StatsCard
            title="Upcoming Auctions"
            value={stats.upcomingAuctions}
            icon={
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            color="blue"
          />
          <StatsCard
            title="Live Auctions"
            value={stats.liveAuctions}
            icon={
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            color="emerald"
            trend="up"
            trendValue="3 active now"
          />
          <StatsCard
            title="Items Won"
            value={stats.itemsWon}
            icon={
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            }
            color="amber"
            trend="up"
            trendValue="+1 today"
          />
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Auctions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Live Auctions
              </h2>
              <button 
                onClick={() => navigate('/auctions')}
                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
              >
                View All →
              </button>
            </div>
            
            <div className="grid gap-6">
              {liveAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          </div>
          
          {/* Activity Feed */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            
            <Card className="overflow-hidden">
              <div className="divide-y divide-slate-700/50">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {activity.itemName}
                        </p>
                        <p className="text-lg font-bold text-indigo-400 mt-1">
                          {formatCurrency(activity.amount)}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-500">{activity.timestamp}</span>
                          {activity.status === 'winning' && (
                            <Badge variant="live" size="sm">Winning</Badge>
                          )}
                          {activity.status === 'outbid' && (
                            <Badge variant="sold" size="sm">Outbid</Badge>
                          )}
                          {activity.status === 'won' && (
                            <Badge variant="available" size="sm">Won</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <Card.Header>
                <h3 className="font-bold text-white">Quick Actions</h3>
              </Card.Header>
              <Card.Body className="space-y-3">
                <button 
                  onClick={() => navigate('/auctions')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-left transition-all group"
                >
                  <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors">Browse Auctions</span>
                </button>
                <button 
                  onClick={() => navigate('/my-auctions')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-left transition-all group"
                >
                  <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors">My Auctions</span>
                </button>
                <button 
                  onClick={() => navigate('/purchases')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-left transition-all group"
                >
                  <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors">My Purchases</span>
                </button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidderDashboard;
