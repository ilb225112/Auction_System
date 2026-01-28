import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const LandingPage = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Real-Time Bidding',
      description: 'Experience lightning-fast bidding with live updates and instant notifications'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Secure & Trusted',
      description: 'Bank-level security ensures your bids and transactions are always protected'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: 'Multiple Categories',
      description: 'From cricket memorabilia to real estate, find auctions across diverse categories'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '24/7 Availability',
      description: 'Bid anytime, anywhere with our always-on platform and mobile support'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#131827] to-[#0a0e1a]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                AuctionHub
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button variant="primary" onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience Next-Gen
            </span>
            <br />
            <span className="text-white">Auctions</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join thousands of bidders in the most advanced online auction platform. 
            Bid on exclusive items, win amazing deals, and experience the thrill of live auctions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/register')}
              className="min-w-[200px]"
            >
              Start Bidding Now
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/auctions')}
              className="min-w-[200px]"
            >
              Browse Auctions
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {[
              { value: '10K+', label: 'Active Bidders' },
              { value: '500+', label: 'Live Auctions' },
              { value: '₹50Cr+', label: 'Total Bids' },
              { value: '98%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose AuctionHub?</h2>
            <p className="text-slate-400 text-lg">Everything you need for a seamless auction experience</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 backdrop-blur-xl">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Bidding?</h2>
            <p className="text-slate-300 text-lg mb-8">
              Join our community today and discover exclusive auctions tailored for you
            </p>
            <Button 
              variant="primary" 
              size="xl"
              onClick={() => navigate('/register')}
            >
              Create Free Account
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-slate-500">
          <p>&copy; 2026 AuctionHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
