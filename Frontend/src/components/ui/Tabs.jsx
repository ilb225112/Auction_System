import React, { useState } from 'react';

const Tabs = ({ tabs, defaultTab, onChange, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value);
  
  const handleTabChange = (value) => {
    setActiveTab(value);
    if (onChange) onChange(value);
  };
  
  return (
    <div className={className}>
      <div className="flex gap-2 border-b border-slate-800 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`flex items-center gap-2 px-6 py-3 font-medium whitespace-nowrap transition-all ${
              activeTab === tab.value
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
            {tab.count !== undefined && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === tab.value
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'bg-slate-700 text-slate-400'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
