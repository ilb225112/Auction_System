import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  pulse = false,
  className = '' 
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full';
  
  const variants = {
    default: 'bg-slate-700 text-slate-200',
    live: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50',
    upcoming: 'bg-blue-500/20 text-blue-400 border border-blue-500/50',
    completed: 'bg-slate-600/20 text-slate-400 border border-slate-600/50',
    sold: 'bg-red-500/20 text-red-400 border border-red-500/50',
    available: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50',
    cricket: 'bg-orange-500/20 text-orange-400 border border-orange-500/50',
    antiques: 'bg-amber-500/20 text-amber-400 border border-amber-500/50',
    real_estate: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50',
    kabaddi: 'bg-pink-500/20 text-pink-400 border border-pink-500/50',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {children}
    </span>
  );
};

export default Badge;
