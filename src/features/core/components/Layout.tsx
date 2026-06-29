import React from 'react';
import { ConstellationScene } from '../../constellation/components/Scene';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';
import { NodeId } from '../../constellation/enums/NodeId';
import { AzulitoMascot } from './AzulitoMascot';
import { BackButton } from './BackButton';

interface LayoutProps {
  children: React.ReactNode;
}

const FOOTER_THEMES: Record<string, { border: string, shadow: string, scanline: string, text: string, textDropShadow: string, colorHex: string }> = {
  DEFAULT: {
    border: 'border-cyan-400/30',
    shadow: 'shadow-[0_-4px_20px_rgba(6,182,212,0.15)]',
    scanline: 'bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.1)_50%)]',
    text: 'text-cyan-200/90',
    textDropShadow: 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]',
    colorHex: '#00f0ff'
  },
  [NodeId.MECANICAS]: {
    border: 'border-[#ffb700]/30',
    shadow: 'shadow-[0_-4px_20px_rgba(255,183,0,0.15)]',
    scanline: 'bg-[linear-gradient(transparent_50%,rgba(255,183,0,0.1)_50%)]',
    text: 'text-[#ffb700]/90',
    textDropShadow: 'drop-shadow-[0_0_8px_rgba(255,183,0,0.8)]',
    colorHex: '#ffb700'
  },
  [NodeId.HECHIZOS]: {
    border: 'border-[#00f0ff]/30',
    shadow: 'shadow-[0_-4px_20px_rgba(0,240,255,0.15)]',
    scanline: 'bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.1)_50%)]',
    text: 'text-[#00f0ff]/90',
    textDropShadow: 'drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]',
    colorHex: '#00f0ff'
  },
  [NodeId.RUNAS]: {
    border: 'border-[#ffffff]/30',
    shadow: 'shadow-[0_-4px_20px_rgba(255,255,255,0.15)]',
    scanline: 'bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.1)_50%)]',
    text: 'text-[#ffffff]/90',
    textDropShadow: 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]',
    colorHex: '#ffffff'
  },
  [NodeId.HABILIDADES]: {
    border: 'border-[#e000ff]/30',
    shadow: 'shadow-[0_-4px_20px_rgba(224,0,255,0.15)]',
    scanline: 'bg-[linear-gradient(transparent_50%,rgba(224,0,255,0.1)_50%)]',
    text: 'text-[#e000ff]/90',
    textDropShadow: 'drop-shadow-[0_0_8px_rgba(224,0,255,0.8)]',
    colorHex: '#e000ff'
  },
  [NodeId.FICHAS]: {
    border: 'border-[#00ff88]/30',
    shadow: 'shadow-[0_-4px_20px_rgba(0,255,136,0.15)]',
    scanline: 'bg-[linear-gradient(transparent_50%,rgba(0,255,136,0.1)_50%)]',
    text: 'text-[#00ff88]/90',
    textDropShadow: 'drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]',
    colorHex: '#00ff88'
  },
  [NodeId.INVENTARIO]: {
    border: 'border-[#ff3344]/30',
    shadow: 'shadow-[0_-4px_20px_rgba(255,51,68,0.15)]',
    scanline: 'bg-[linear-gradient(transparent_50%,rgba(255,51,68,0.1)_50%)]',
    text: 'text-[#ff3344]/90',
    textDropShadow: 'drop-shadow-[0_0_8px_rgba(255,51,68,0.8)]',
    colorHex: '#ff3344'
  }
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const selectedNodeId = useConstellationStore((state) => state.selectedNodeId);
  const selectedAttribute = useConstellationStore((state) => state.selectedAttribute);
  const setSelectedNode = useConstellationStore((state) => state.setSelectedNode);
  const activeTheme = selectedNodeId && FOOTER_THEMES[selectedNodeId] ? FOOTER_THEMES[selectedNodeId] : FOOTER_THEMES.DEFAULT;

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

      {/* Mascot Azulito */}
      <AzulitoMascot />

      {/* Global Back Button */}
      {selectedNodeId && !selectedAttribute && (
        <BackButton
          onClick={() => {
            const state = useConstellationStore.getState();
            state.setReturningNode(selectedNodeId);
            state.setSelectedNode(null);
          }}
          colorHex={activeTheme.colorHex}
        />
      )}

      {/* Hologram Glassmorphism Footer */}
      <footer className={`absolute bottom-0 left-0 w-full z-20 pointer-events-auto backdrop-blur-md bg-white/5 border-t ${activeTheme.border} ${activeTheme.shadow} transition-all duration-500`}>
        {/* Hologram scanlines overlay */}
        <div className={`absolute inset-0 ${activeTheme.scanline} bg-size-[100%_4px] pointer-events-none transition-all duration-500`}></div>
        <div className="relative py-3 px-4 text-center">
          <p className={`text-xs sm:text-sm font-mono tracking-[0.2em] ${activeTheme.text} ${activeTheme.textDropShadow} uppercase transition-all duration-500`}>
            © 2026 PatrickJS. Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};
