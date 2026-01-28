import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import ItemCard from '../components/auction/ItemCard';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const AuctionDetailPage = () => {
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('items');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isRegistered, setIsRegistered] = useState(false);
  
  const [auction, setAuction] = useState({
    id: 1,
    name: 'IPL 2024 Memorabilia Auction',
    auctionType: 'CRICKET',
    status: 'LIVE',
    dateTime: '2026-01-21T18:00:00',
    description: 'Exclusive collection of IPL 2024 memorabilia including signed jerseys, bats, and rare collectibles from your favorite players.',
    organizer: 'IPL Auctions Ltd.',
    rules: [
      'All bids are final and binding',
      'Payment must be completed within 48 hours',
      'Items will be shipped within 7 business days',
      'Authenticity certificates provided for all items'
    ]
  });
  
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'MS Dhoni Signed Jersey - CSK 2024',
      description: 'Official CSK jersey signed by MS Dhoni with authenticity certificate',
      startingPrice: 50000,
      status: 'AVAILABLE',
      imageUrl: null
    },
    {
      id: 2,
      name: 'Virat Kohli Match-Used Bat',
      description: 'Bat used by Virat Kohli in IPL 2024 final match',
      startingPrice: 150000,
      status: 'AVAILABLE',
      imageUrl: null
    },
    {
      id: 3,
      name: 'Rohit Sharma Signed Cricket Ball',
      description: 'Cricket ball signed by Rohit Sharma from record-breaking innings',
      startingPrice: 25000,
      status: 'SOLD',
      finalPrice: 45000,
      imageUrl: null
    },
    {
      id: 4,
      name: 'IPL Trophy Replica - Limited Edition',
      description: 'Official IPL trophy replica, 1 of 100 made',
      startingPrice: 75000,
      status: 'AVAILABLE',
      imageUrl: null
    }
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleRegister = () => {
    setIsRegistered(true);
    // Add registration logic here
  };
  
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#131827] to-[#0a0e1a]">
      <Navbar user={{ name: 'John Doe', email: 'john@example.com' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/auctions')}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Auctions
        </button>
        
        {/* Auction Header */}
        <Card glass className="mb-8">
          <Card.Body className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant={auction.status.toLowerCase()} pulse={auction.status === 'LIVE'} size="lg">
                    {auction.status}
                  </Badge>
                  <Badge variant={auction.auctionType.toLowerCase()} size="lg">
                    {auction.auctionType}
                  </Badge>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-4">{auction.name}</h1>
                
                <div className="flex flex-wrap gap-6 text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatDate(auction.dateTime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Organized by {auction.organizer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>{items.length} Items</span>
                  </div>
                </div>
                
                <p className="text-slate-300 text-lg">{auction.description}</p>
              </div>
              
              <div className="lg:w-80">
                {!isRegistered ? (
                  <Card className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-indigo-500/30">
                    <Card.Body className="text-center space-y-4">
                      <div className="p-4 bg-indigo-500/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                        <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Register to Bid</h3>
                        <p className="text-slate-400 text-sm">Join this auction to start placing bids on items</p>
                      </div>
                      <Button variant="primary" size="lg" className="w-full" onClick={handleRegister}>
                        Register Now
                      </Button>
                    </Card.Body>
                  </Card>
                ) : (
                  <Card className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border-emerald-500/30">
                    <Card.Body className="text-center space-y-4">
                      <div className="p-4 bg-emerald-500/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                        <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">You're Registered!</h3>
                        <p className="text-slate-400 text-sm">You can now bid on all items in this auction</p>
                      </div>
                      <Badge variant="available" size="lg">Registered</Badge>
                    </Card.Body>
                  </Card>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('items')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'items'
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Items ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'overview'
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'rules'
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Rules
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'items' && (
          <div>
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="status">Status</option>
              </select>
            </div>
            
            {/* Items Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                  auctionId={auctionId}
                  auctionStatus={auction.status}
                />
              ))}
            </div>
            
            {filteredItems.length === 0 && (
              <Card className="text-center py-12">
                <div className="text-slate-500">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-lg">No items found</p>
                </div>
              </Card>
            )}
          </div>
        )}
        
        {activeTab === 'overview' && (
          <Card>
            <Card.Body className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-bold text-white mb-4">About This Auction</h3>
              <p className="text-slate-300 text-lg leading-relaxed">{auction.description}</p>
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Organizer</h4>
                  <p className="text-slate-400">{auction.organizer}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Category</h4>
                  <Badge variant={auction.auctionType.toLowerCase()}>{auction.auctionType}</Badge>
                </div>
              </div>
            </Card.Body>
          </Card>
        )}
        
        {activeTab === 'rules' && (
          <Card>
            <Card.Body>
              <h3 className="text-2xl font-bold text-white mb-6">Auction Rules</h3>
              <ul className="space-y-4">
                {auction.rules.map((rule, index) => (
                  <li key={index} className="flex gap-3 text-slate-300">
                    <svg className="w-6 h-6 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AuctionDetailPage;
