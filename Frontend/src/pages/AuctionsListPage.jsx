import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import AuctionCard from '../components/auction/AuctionCard';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

const AuctionsListPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  
  const [auctions, setAuctions] = useState([
    {
      id: 1,
      name: 'IPL 2024 Memorabilia Auction',
      auctionType: 'CRICKET',
      status: 'LIVE',
      dateTime: '2026-01-21T18:00:00',
      description: 'Exclusive IPL memorabilia collection',
      itemCount: 45
    },
    {
      id: 2,
      name: 'Vintage Antiques Collection',
      auctionType: 'ANTIQUES',
      status: 'LIVE',
      dateTime: '2026-01-21T16:30:00',
      description: 'Rare antiques from around the world',
      itemCount: 28
    },
    {
      id: 3,
      name: 'Premium Real Estate Showcase',
      auctionType: 'REAL_ESTATE',
      status: 'LIVE',
      dateTime: '2026-01-21T14:00:00',
      description: 'Luxury properties in prime locations',
      itemCount: 12
    },
    {
      id: 4,
      name: 'Pro Kabaddi League Collectibles',
      auctionType: 'KABADDI',
      status: 'UPCOMING',
      dateTime: '2026-01-25T19:00:00',
      description: 'Official PKL merchandise and memorabilia',
      itemCount: 32
    },
    {
      id: 5,
      name: 'Cricket World Cup 2023 Items',
      auctionType: 'CRICKET',
      status: 'UPCOMING',
      dateTime: '2026-01-26T18:00:00',
      description: 'World Cup winning moments captured',
      itemCount: 38
    },
    {
      id: 6,
      name: 'Heritage Furniture Auction',
      auctionType: 'ANTIQUES',
      status: 'UPCOMING',
      dateTime: '2026-01-27T15:00:00',
      description: 'Antique furniture from royal collections',
      itemCount: 22
    },
    {
      id: 7,
      name: 'Mumbai Real Estate Deals',
      auctionType: 'REAL_ESTATE',
      status: 'COMPLETED',
      dateTime: '2026-01-15T14:00:00',
      description: 'Premium properties in Mumbai',
      itemCount: 8
    },
    {
      id: 8,
      name: 'IPL 2023 Championship Items',
      auctionType: 'CRICKET',
      status: 'COMPLETED',
      dateTime: '2026-01-10T18:00:00',
      description: 'Championship winning memorabilia',
      itemCount: 41
    }
  ]);
  
  const auctionTypes = [
    { value: 'all', label: 'All Categories', icon: '🎯' },
    { value: 'CRICKET', label: 'Cricket', icon: '🏏' },
    { value: 'ANTIQUES', label: 'Antiques', icon: '🏺' },
    { value: 'REAL_ESTATE', label: 'Real Estate', icon: '🏢' },
    { value: 'KABADDI', label: 'Kabaddi', icon: '🤼' }
  ];
  
  const tabs = [
    { value: 'all', label: 'All Auctions', count: auctions.length },
    { value: 'LIVE', label: 'Live', count: auctions.filter(a => a.status === 'LIVE').length },
    { value: 'UPCOMING', label: 'Upcoming', count: auctions.filter(a => a.status === 'UPCOMING').length },
    { value: 'COMPLETED', label: 'Completed', count: auctions.filter(a => a.status === 'COMPLETED').length }
  ];
  
  const filteredAuctions = auctions.filter(auction => {
    const matchesTab = activeTab === 'all' || auction.status === activeTab;
    const matchesType = selectedType === 'all' || auction.auctionType === selectedType;
    const matchesSearch = auction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         auction.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesType && matchesSearch;
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#131827] to-[#0a0e1a]">
      <Navbar user={{ name: 'John Doe', email: 'john@example.com' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Browse Auctions</h1>
          <p className="text-slate-400 text-lg">Discover exclusive items across multiple categories</p>
        </div>
        
        {/* Filters Section */}
        <Card glass className="mb-8">
          <Card.Body className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <Input
                  placeholder="Search auctions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                />
              </div>
              
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {auctionTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedType === type.value
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <span className="mr-2">{type.icon}</span>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === tab.value
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === tab.value
                  ? 'bg-white/20'
                  : 'bg-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-400">
            Showing <span className="text-white font-semibold">{filteredAuctions.length}</span> auctions
          </p>
          <select className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Sort by: Latest</option>
            <option>Sort by: Ending Soon</option>
            <option>Sort by: Most Popular</option>
            <option>Sort by: Name</option>
          </select>
        </div>
        
        {/* Auctions Grid */}
        {filteredAuctions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <div className="text-slate-500">
              <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-slate-400 mb-2">No auctions found</h3>
              <p className="text-slate-500">Try adjusting your filters or search query</p>
            </div>
          </Card>
        )}
        
        {/* Load More */}
        {filteredAuctions.length > 0 && (
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-lg font-medium transition-all border border-slate-700 hover:border-indigo-500/50">
              Load More Auctions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionsListPage;
