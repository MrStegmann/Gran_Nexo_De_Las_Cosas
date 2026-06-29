import React from 'react';
import { ConstellationScene } from '../../constellation/components/Scene';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <ConstellationScene />
      </div>
      
      {/* UI Foreground Layer */}
      <div className="relative z-10 w-full h-full pointer-events-none flex flex-col">
        {children}
      </div>
    </div>
  );
};
