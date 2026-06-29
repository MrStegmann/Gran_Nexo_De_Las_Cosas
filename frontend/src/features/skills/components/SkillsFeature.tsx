import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { MagicFlow } from '../../../components/MagicFlow';
import { Tesseract } from '../../../components/Tesseract/Tesseract';
import { BackButton } from '../../core/components/BackButton';
import { skillsAttributes } from '../data/skillsData';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';
import { SkillList } from './SkillList';

export const SkillsFeature: React.FC = () => {
  const selectedAttribute = useConstellationStore((state) => state.selectedAttribute);
  const transitioningAttribute = useConstellationStore((state) => state.transitioningAttribute);
  const returningAttribute = useConstellationStore((state) => state.returningAttribute);
  const setTransitioningAttribute = useConstellationStore((state) => state.setTransitioningAttribute);

  const handleNodeClick = (nodeId: string) => {
    const state = useConstellationStore.getState();
    if (!state.selectedAttribute && !state.transitioningAttribute) {
      if (nodeId === 'constitucion' || nodeId === 'fuerza' || nodeId === 'destreza') {
        state.setTransitioningAttribute(nodeId as 'constitucion' | 'fuerza' | 'destreza');
      }
    }
  };

  const currentNodes = skillsAttributes;
  const currentThemeHex = '#ffffff'; // Fallback theme color

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

          {!selectedAttribute && (
            <MagicFlow
              nodes={currentNodes}
              onClick={handleNodeClick}
            />
          )}
        </Canvas>
      </div>

      {/* Botón de volver */}
      {selectedAttribute && !transitioningAttribute && (
        <div className="absolute inset-0 z-[60] pointer-events-none">
          <BackButton
            key="back-from-attribute"
            onClick={() => {
              const store = useConstellationStore.getState();
              if (store.selectedAttribute) {
                store.setReturningAttribute(store.selectedAttribute);
              }
            }}
            colorHex={currentNodes.find(n => n.id === selectedAttribute)?.color || currentThemeHex}
          />
        </div>
      )}

      {/* Tesseract Overlay */}
      {selectedAttribute && !transitioningAttribute && (() => {
        const selectedAttributeData = currentNodes.find(n => n.id === selectedAttribute);
        if (!selectedAttributeData) return null;

        return (
          <div className="absolute inset-0 z-50 md:p-16 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity duration-1000">
            <div className="w-full mt-[1%] h-[80vh] pointer-events-auto relative md:absolute md:top-0 md:left-0 md:mt-0 md:w-[80%] md:h-[95vh] md:max-w-none md:z-40">
              <Tesseract color={selectedAttributeData.color}>
                <div className="flex flex-col h-full overflow-hidden p-2 md:p-6">
                  <div className="mb-6 shrink-0">
                    <h1 className="text-3xl font-bold mb-2 border-b pb-2" style={{ color: selectedAttributeData.color, borderColor: `${selectedAttributeData.color}40` }}>
                      {selectedAttributeData.label}
                    </h1>
                    <p className="text-white opacity-90 text-lg">{selectedAttributeData.description}</p>
                  </div>
                  {selectedAttributeData.skills && selectedAttributeData.skills.length > 0 && (
                    <div className="flex-1 overflow-hidden min-h-0">
                      <SkillList skills={selectedAttributeData.skills} color={selectedAttributeData.color} />
                    </div>
                  )}
                </div>
              </Tesseract>
            </div>
          </div>
        );
      })()}

    </div>
  );
};
