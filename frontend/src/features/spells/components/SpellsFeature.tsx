import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { MagicFlow } from '../../../components/MagicFlow';
import { GeometricNodeShape } from '../../../components/GeometricNodeShape';
import { Tesseract } from '../../../components/Tesseract/Tesseract';
import { BackButton } from '../../core/components/BackButton';
import { mainAttributes, schoolsData } from '../data/spellsData';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';

export const SpellsFeature: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const selectedAttribute = useConstellationStore((state) => state.selectedAttribute);
  const transitioningAttribute = useConstellationStore((state) => state.transitioningAttribute);
  const returningAttribute = useConstellationStore((state) => state.returningAttribute);
  const setSelectedAttribute = useConstellationStore((state) => state.setSelectedAttribute);

  const handleNodeClick = (nodeId: string) => {
    const state = useConstellationStore.getState();
    if (!state.selectedAttribute && !state.transitioningAttribute) {
      if (nodeId === 'inteligencia' || nodeId === 'voluntad') {
        state.setTransitioningAttribute(nodeId as 'inteligencia' | 'voluntad');
      }
    } else if (state.selectedAttribute) {
      setSelectedSchool(nodeId);
    }
  };

  const currentNodes = selectedAttribute ? schoolsData[selectedAttribute] : mainAttributes;
  const currentThemeHex = selectedAttribute === 'inteligencia' ? '#0044ff' : selectedAttribute === 'voluntad' ? '#ffd700' : '#ffffff';

  const showBlackBg = !!selectedAttribute || !!transitioningAttribute || !!returningAttribute;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 flex flex-col justify-center items-center">
      {/* Black Background Layer to hide Constellation */}
      <div 
        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-1000 z-[-1]"
        style={{ opacity: showBlackBg ? 1 : 0 }}
      />


      {/* Main Canvas for MagicFlow */}
      <div className="w-full h-full relative">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 75 }}
          gl={{ alpha: true, antialias: true }}
        >
          {/* Post-processing identical to main scene for consistency */}
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.2} 
              mipmapBlur 
              intensity={1.8} 
            />
          </EffectComposer>
          
          {selectedAttribute ? (
            <GeometricNodeShape 
              nodes={currentNodes} 
              radius={6} 
              nodeRadius={0.8} 
              lineWidth={0.08}
              selectedNodeId={selectedSchool}
              onNodeClick={handleNodeClick}
            />
          ) : (
            <MagicFlow 
              nodes={currentNodes} 
              onClick={handleNodeClick} 
            />
          )}
        </Canvas>
      </div>

      {/* Botón de volver global (disponible tanto en la ruleta de escuelas como en el Tesseract) */}
      {selectedAttribute && !transitioningAttribute && (
        <div className="absolute inset-0 z-[60] pointer-events-none">
          <BackButton 
            key={selectedSchool ? 'back-from-school' : 'back-from-attribute'}
            onClick={() => {
              if (selectedSchool) {
                // Si estamos viendo una magia (ej. Arcano), volvemos a la rueda de escuelas
                setSelectedSchool(null);
              } else {
                // Si estamos en la rueda de escuelas, volvemos a los atributos
                const store = useConstellationStore.getState();
                if (store.selectedAttribute) {
                  store.setReturningAttribute(store.selectedAttribute);
                  store.setSelectedAttribute(null);
                }
              }
            }} 
            colorHex={selectedSchool ? (currentNodes.find(n => n.id === selectedSchool)?.color || currentThemeHex) : currentThemeHex} 
          />
        </div>
      )}

      {/* Tesseract Overlay */}
      {selectedSchool && (() => {
        const selectedSchoolData = currentNodes.find(n => n.id === selectedSchool);
        if (!selectedSchoolData) return null;
        
        return (
          <div className="absolute inset-0 z-50 p-8 md:p-16 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto">
            <div className="relative w-full max-w-4xl h-[80vh] flex flex-col">
              <Tesseract 
                color={selectedSchoolData.color} 
                sections={[
                  {
                    id: 'info',
                    title: selectedSchoolData.label,
                    markdown: `# ${selectedSchoolData.label}\n\n${selectedSchoolData.description}`
                  }
                ]} 
              />
            </div>
          </div>
        );
      })()}

    </div>
  );
};
