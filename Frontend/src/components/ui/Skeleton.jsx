import React from 'react';

const Skeleton = ({ className = '', variant = 'rectangular', width, height }) => {
  const baseStyles = 'animate-pulse bg-slate-700/50';
  
  const variants = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4'
  };
  
  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100%')
  };
  
  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
    />
  );
};

export const SkeletonCard = () => (
  <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
    <Skeleton variant="rectangular" height="200px" className="mb-4" />
    <Skeleton variant="text" className="mb-2" width="60%" />
    <Skeleton variant="text" className="mb-4" width="80%" />
    <div className="flex gap-2">
      <Skeleton variant="rectangular" height="40px" width="100px" />
      <Skeleton variant="rectangular" height="40px" width="100px" />
    </div>
  </div>
);

export const SkeletonAuctionCard = () => (
  <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50">
    <Skeleton variant="rectangular" height="192px" />
    <div className="p-6">
      <div className="flex gap-2 mb-4">
        <Skeleton variant="rectangular" height="24px" width="60px" />
        <Skeleton variant="rectangular" height="24px" width="80px" />
      </div>
      <Skeleton variant="text" className="mb-2" width="80%" />
      <Skeleton variant="text" className="mb-4" width="60%" />
      <Skeleton variant="rectangular" height="40px" />
    </div>
  </div>
);

export default Skeleton;
