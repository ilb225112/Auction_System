import React from 'react';
import Card from './Card';

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  trend,
  trendValue,
  color = 'indigo',
  loading = false 
}) => {
  const colorClasses = {
    indigo: 'from-indigo-500 to-purple-500',
    emerald: 'from-emerald-500 to-teal-500',
    blue: 'from-blue-500 to-cyan-500',
    amber: 'from-amber-500 to-orange-500',
    pink: 'from-pink-500 to-rose-500',
  };
  
  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-700 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-slate-700 rounded w-3/4"></div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card hover glow className="p-6 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white mb-2">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
              {trend === 'up' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
