import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  glass = false,
  glow = false,
  ...props 
}) => {
  const baseStyles = 'rounded-xl border border-slate-700/50 transition-all duration-250';
  const backgroundStyles = glass 
    ? 'bg-slate-800/70 backdrop-blur-xl' 
    : 'bg-slate-800/90';
  const hoverStyles = hover ? 'hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20 cursor-pointer' : '';
  const glowStyles = glow ? 'shadow-lg shadow-indigo-500/30' : 'shadow-lg';
  
  return (
    <div 
      className={`${baseStyles} ${backgroundStyles} ${hoverStyles} ${glowStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-slate-700/50 ${className}`}>
    {children}
  </div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`p-6 border-t border-slate-700/50 ${className}`}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
