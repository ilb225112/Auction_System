import React, { useEffect } from 'react';
import Card from './Card';
import Button from './Button';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md',
  closeOnOverlay = true 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl'
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeOnOverlay ? onClose : undefined}
      />
      
      <div className={`relative w-full ${sizes[size]} animate-in fade-in zoom-in duration-200`}>
        <Card glass>
          {title && (
            <Card.Header className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Card.Header>
          )}
          
          <Card.Body>
            {children}
          </Card.Body>
          
          {footer && (
            <Card.Footer>
              {footer}
            </Card.Footer>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Modal;
