import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label,
  error,
  icon,
  className = '',
  containerClassName = '',
  ...props 
}, ref) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-2.5 
            bg-slate-800/50 border border-slate-700 
            rounded-lg text-slate-100 placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
