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

export const AzulitoMascot: React.FC = () => {
  const { speech, mood, isVisible, setSpeechAndMood } = useAzulitoStore();
  const selectedNodeId = useConstellationStore((state) => state.selectedNodeId);
  const [showSpeech, setShowSpeech] = useState(false);

  useEffect(() => {
    if (selectedNodeId) {
      setSpeechAndMood(AZULITO_SPEECHES[selectedNodeId] || AZULITO_SPEECHES.DEFAULT, 'talk');
    } else {
      setSpeechAndMood(AZULITO_SPEECHES.DEFAULT, 'talk');
    }
  }, [selectedNodeId, setSpeechAndMood]);

  useEffect(() => {
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
  }, [speech]);

  if (!isVisible) return null;

  const imageSrc = MOOD_IMAGES[mood] || azulitoDefault;

  return (
    <div className="absolute bottom-10 md:bottom-5 right-4 sm:right-8 z-30 flex items-end justify-end pointer-events-none">
      <div className="relative flex items-end">
        {/* Speech Bubble */}
        <div 
          className={`relative mb-32 -mr-18 z-10 w-48 sm:w-64 p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-cyan-400/50 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 transform ${showSpeech ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto cursor-pointer hover:bg-slate-800/90' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'}`}
          onClick={() => setShowSpeech(false)}
        >
          <p className="text-cyan-100 text-xs sm:text-sm font-mono leading-relaxed select-none">
            {speech}
          </p>
          {/* Bubble Tail */}
          <div className="absolute -bottom-2 right-12 w-4 h-4 bg-slate-900/90 border-b border-r border-cyan-400/50 transform rotate-45 backdrop-blur-sm"></div>
        </div>

        {/* Mascot Image */}
        <img
          src={imageSrc}
          alt="Azulito"
          className="w-32 sm:w-40 md:w-48 h-auto object-contain pointer-events-auto drop-shadow-[0_0_20px_rgba(6,182,212,0.4)] relative z-20"
          style={{ transformOrigin: 'bottom center' }}
        />
      </div>
    </div>
  );
};
