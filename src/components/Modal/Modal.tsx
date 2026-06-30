import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        className="bg-black/90 border border-[#00ff88]/30 rounded-xl max-w-md w-full shadow-[0_0_20px_rgba(0,255,136,0.2)] animate-fade-in flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6 text-gray-300">
          {children}
        </div>
        {actions && (
          <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
