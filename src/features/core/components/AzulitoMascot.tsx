import React, { useEffect, useState } from 'react';
import { useAzulitoStore } from '../store/useAzulitoStore';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';
import { AZULITO_SPEECHES } from '../constants/azulitoSpeeches';

import azulitoTalk from '../../../assets/Azulito_Talk.png';
import azulitoConfused from '../../../assets/Azulito_Confused.png';
import azulitoHehe from '../../../assets/Azulito_hehe.png';
import azulitoDefault from '../../../assets/Azulito_.png';

const MOOD_IMAGES = {
  talk: azulitoTalk,
  confused: azulitoConfused,
  hehe: azulitoHehe,
};

const TYPE_CONFIG = {
  info: {
    image: azulitoTalk,
    bubbleBg: 'bg-slate-900/90',
    bubbleBorder: 'border-blue-400/50',
    shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    text: 'text-blue-100',
    tail: 'bg-slate-900/90 border-blue-400/50',
    dropShadow: 'drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]',
  },
  error: {
    image: azulitoConfused,
    bubbleBg: 'bg-slate-900/90',
    bubbleBorder: 'border-red-400/50',
    shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    text: 'text-red-100',
    tail: 'bg-slate-900/90 border-red-400/50',
    dropShadow: 'drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]',
  },
  alert: {
    image: azulitoHehe,
    bubbleBg: 'bg-slate-900/90',
    bubbleBorder: 'border-orange-400/50',
    shadow: 'shadow-[0_0_15px_rgba(249,115,22,0.3)]',
    text: 'text-orange-100',
    tail: 'bg-slate-900/90 border-orange-400/50',
    dropShadow: 'drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]',
  },
  default: {
    bubbleBg: 'bg-slate-900/90',
    bubbleBorder: 'border-cyan-400/50',
    shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]',
    text: 'text-cyan-100',
    tail: 'bg-slate-900/90 border-cyan-400/50',
    dropShadow: 'drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]',
  },
};

export const AzulitoMascot: React.FC = () => {
  const { speech, mood, isVisible, sendNoty, queue, currentNoty, popNoty, clearCurrentNoty } = useAzulitoStore();
  const selectedNodeId = useConstellationStore((state) => state.selectedNodeId);
  const hoveredNodeId = useConstellationStore((state) => state.hoveredNodeId);

  const [showSpeech, setShowSpeech] = useState(false);

  // Queue Processing
  useEffect(() => {
    if (!currentNoty && queue.length > 0) {
      popNoty();
    }
  }, [queue, currentNoty, popNoty]);

  useEffect(() => {
    if (currentNoty) {
      const timer = setTimeout(() => {
        clearCurrentNoty();
      }, currentNoty.timeLife);
      return () => clearTimeout(timer);
    }
  }, [currentNoty, clearCurrentNoty]);

  // Constellation Speech Logic
  useEffect(() => {
    if (hoveredNodeId) {
      sendNoty(AZULITO_SPEECHES[hoveredNodeId] || AZULITO_SPEECHES.DEFAULT, 'info');
    } else {
      popNoty();
    }
  }, [hoveredNodeId, sendNoty]);

  useEffect(() => {
    if (currentNoty) {
      setShowSpeech(false);
      return;
    }

    if (!speech) {
      setShowSpeech(false);
      return;
    }

    setShowSpeech(true);
    // Calculation: 50ms per character with a minimum of 2000ms
    const readingTime = Math.max(2000, speech.length * 50);

    const timer = setTimeout(() => {
      setShowSpeech(false);
    }, readingTime);

    return () => clearTimeout(timer);
  }, [speech, currentNoty]);

  if (!isVisible) return null;

  const isActive = currentNoty || showSpeech;
  const activeMessage = currentNoty ? currentNoty.msg : speech;

  let config = TYPE_CONFIG.default as any;
  if (currentNoty) {
    config = TYPE_CONFIG[currentNoty.type] || TYPE_CONFIG.info;
  } else if (showSpeech) {
    config = { ...TYPE_CONFIG.default, image: MOOD_IMAGES[mood] || azulitoDefault };
  }

  const imageSrc = isActive ? config.image : azulitoDefault;

  return (
    <div className="absolute bottom-10 md:bottom-5 right-4 sm:right-8 z-30 flex items-end justify-end pointer-events-none">
      <div className="relative flex items-end">
        {/* Speech Bubble */}
        <div
          className={`relative mb-32 -mr-18 z-10 w-48 sm:w-64 p-3 sm:p-4 rounded-2xl ${config.bubbleBg} border ${config.bubbleBorder} backdrop-blur-md ${config.shadow} transition-all duration-300 transform ${isActive ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto cursor-pointer hover:bg-slate-800/90' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'}`}
          onClick={() => {
            if (currentNoty) clearCurrentNoty();
            else setShowSpeech(false);
          }}
        >
          <p className={`${config.text} text-xs sm:text-sm font-mono leading-relaxed select-none`}>
            {activeMessage}
          </p>
          {/* Bubble Tail */}
          <div className={`absolute -bottom-2 right-12 w-4 h-4 border-b border-r transform rotate-45 backdrop-blur-sm ${config.tail}`}></div>
        </div>

        {/* Mascot Image */}
        <img
          src={imageSrc}
          alt="Azulito"
          className={`w-32 sm:w-40 md:w-48 h-auto object-contain pointer-events-auto relative z-20 ${isActive ? config.dropShadow : TYPE_CONFIG.default.dropShadow}`}
          style={{ transformOrigin: 'bottom center' }}
        />
      </div>
    </div>
  );
};
