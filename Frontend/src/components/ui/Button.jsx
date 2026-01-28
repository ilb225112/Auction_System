import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0e1a] disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 focus:ring-indigo-500',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white shadow-md hover:shadow-lg focus:ring-slate-500',
    outline: 'border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400 focus:ring-indigo-500',
    ghost: 'text-slate-300 hover:bg-slate-800 hover:text-white focus:ring-slate-500',
    destructive: 'bg-red-600 hover:bg-red-500 text-white shadow-md hover:shadow-lg hover:shadow-red-500/50 focus:ring-red-500',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg hover:shadow-emerald-500/50 focus:ring-emerald-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !loading && icon}
      {children}
    </button>
  );
};

export default Button;
