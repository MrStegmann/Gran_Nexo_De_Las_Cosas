import React, { useState, useEffect } from 'react';
import type { CharacterState, MetaData } from './types';
import { STEP_META, INITIAL_STATE } from './constants';

import { Step1Identity } from './Step1Identity';
import { Step2Attributes } from './Step2Attributes';
import { Step3Talents } from './Step3Talents';
import { Step4Traits } from './Step4Traits';
import { Step5Aptitudes } from './Step5Aptitudes';
import { Step6Spells } from './Step6Spells';
import { Step7Summary } from './Step7Summary';

export const CharWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState<CharacterState>(INITIAL_STATE);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          racesData, 
          attributesData, 
          positiveTraits, 
          negativeTraits, 
          racesKeys, 
          attributesKeys
        ] = await Promise.all([
          import('../../../../assets/data/meta/races_data.json').then(m => m.default),
          import('../../../../assets/data/meta/attributes_data.json').then(m => m.default),
          import('../../../../assets/data/meta/positive_traits.json').then(m => m.default),
          import('../../../../assets/data/meta/negative_traits.json').then(m => m.default),
          import('../../../../assets/data/meta/races_keys.json').then(m => m.default),
          import('../../../../assets/data/meta/attributes_keys.json').then(m => m.default),
        ]);

        setMetaData({
          racesData,
          attributesData,
          positiveTraits,
          negativeTraits,
          racesKeys,
          attributesKeys
        });
      } catch (err: any) {
        console.error('Error loading meta data:', err);
        setError(err.message || 'Error loading wizard data');
      }
    };

    loadData();
  }, []);

  const validateCurrentStep = () => {
    if (currentStep === 0) {
      if (!state.nombre.trim()) {
        alert('Introduce un nombre para tu personaje.');
        return false;
      }
      if (!state.raza) {
        alert('Por favor, elige una raza antes de continuar.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (currentStep < 6) {
      setCurrentStep(c => c + 1);
      document.querySelector('.custom-scrollbar')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(c => c - 1);
      document.querySelector('.custom-scrollbar')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <h2 className="text-2xl font-bold mb-4">Error al cargar el Wizard</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!metaData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <div className="text-4xl animate-spin mb-4">⬡</div>
        <p>Preparando el Grimorio del Personaje...</p>
      </div>
    );
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return <Step1Identity state={state} setState={setState} metaData={metaData} />;
      case 1: return <Step2Attributes state={state} setState={setState} />;
      case 2: return <Step3Talents state={state} setState={setState} metaData={metaData} />;
      case 3: return <Step4Traits state={state} setState={setState} metaData={metaData} />;
      case 4: return <Step5Aptitudes state={state} setState={setState} />;
      case 5: return <Step6Spells state={state} setState={setState} />;
      case 6: return <Step7Summary state={state} setState={setState} metaData={metaData} />;
      default: return null;
    }
  };

  const pct = (currentStep / 6) * 100;

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-full text-white font-sans">
      
      {/* HEADER / PROGRESS BAR */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md pt-4 pb-2 border-b border-white/10 mb-6">
        <div className="text-xl font-bold text-[#00ff88] uppercase tracking-widest text-center mb-4">
          ⬡ Crear Personaje
        </div>
        
        <div className="relative flex justify-between items-center mb-6 px-4">
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-gray-800 -z-10 -translate-y-1/2"></div>
          
          {STEP_META.map((s, i) => {
            const isActive = i === currentStep;
            const isCompleted = i < currentStep;
            
            return (
              <div 
                key={i} 
                className={`relative flex flex-col items-center group ${isActive ? 'text-[#00ff88]' : isCompleted ? 'text-gray-300' : 'text-gray-600'}`}
                onClick={() => {
                  // Only allow jumping to completed steps or exactly next one (with validation)
                  if (i < currentStep || (i === currentStep + 1 && validateCurrentStep())) {
                    setCurrentStep(i);
                  }
                }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 transition-all ${
                  isActive ? 'bg-black border-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.5)]' : 
                  isCompleted ? 'bg-gray-800 border-gray-500 cursor-pointer hover:border-gray-300' : 
                  'bg-black border-gray-800'
                }`}>
                  <span className="text-lg">{s.icon}</span>
                </div>
                <div className={`absolute -bottom-6 text-[10px] uppercase tracking-widest whitespace-nowrap transition-opacity ${isActive ? 'opacity-100 font-bold' : 'opacity-0 group-hover:opacity-100'}`}>
                  {s.title}
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full h-1 bg-gray-800 mt-8">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-[#00ff88] transition-all duration-300" style={{ width: `${pct}%` }}></div>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 pb-24">
        {renderCurrentStep()}
      </div>

      {/* FOOTER NAV */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-black/90 backdrop-blur border-t border-white/10 z-50 md:absolute">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button 
            onClick={handlePrev} 
            className={`px-6 py-2 rounded font-bold uppercase tracking-widest text-sm transition-colors ${currentStep === 0 ? 'invisible' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            ← Anterior
          </button>
          
          <div className="text-sm text-gray-500 uppercase tracking-widest">
            Paso {currentStep + 1} de 7
          </div>
          
          <button 
            onClick={handleNext}
            className={`px-6 py-2 rounded font-bold uppercase tracking-widest text-sm transition-all ${
              currentStep === 6 
                ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/50' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {currentStep === 6 ? '✓ Ficha completada' : 'Siguiente →'}
          </button>
        </div>
      </div>

    </div>
  );
};
