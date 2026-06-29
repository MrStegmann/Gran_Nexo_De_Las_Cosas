import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { MagicFlow } from '../../../components/MagicFlow';
import { GeometricNodeShape } from '../../../components/GeometricNodeShape';
import { Tesseract } from '../../../components/Tesseract/Tesseract';
import { BackButton } from '../../core/components/BackButton';
import { mainAttributes, schoolsData } from '../data/spellsData';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';
import { AttributeId } from '../../constellation/enums/AttributeId';
import { SpellList } from './SpellList';
import { useAzulitoStore } from '../../core/store/useAzulitoStore';
import { AZULITO_SPEECHES } from '../../core/constants/azulitoSpeeches';
import { NodeId } from '../../constellation/enums/NodeId';

export const SpellsFeature: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const selectedAttribute = useConstellationStore((state) => state.selectedAttribute);
  const transitioningAttribute = useConstellationStore((state) => state.transitioningAttribute);
  const returningAttribute = useConstellationStore((state) => state.returningAttribute);
  const setSelectedAttribute = useConstellationStore((state) => state.setSelectedAttribute);

  const handleNodeClick = (nodeId: string) => {
    const state = useConstellationStore.getState();
    if (!state.selectedAttribute && !state.transitioningAttribute) {
      if (nodeId === AttributeId.INTELIGENCIA || nodeId === AttributeId.VOLUNTAD) {
        state.setTransitioningAttribute(nodeId as AttributeId);
      }
    } else if (state.selectedAttribute) {
      setSelectedSchool(nodeId);
    }
  };

  const currentNodes = selectedAttribute ? schoolsData[selectedAttribute] : mainAttributes;
  const currentThemeHex = selectedAttribute === AttributeId.INTELIGENCIA ? '#0044ff' : selectedAttribute === AttributeId.VOLUNTAD ? '#ffd700' : '#ffffff';

  const showBlackBg = !!selectedAttribute || !!transitioningAttribute || !!returningAttribute;

  const handleNodeHover = (nodeId: string | null) => {
    if (nodeId) {
      const node = currentNodes.find(n => n.id === nodeId);
      if (node && node.description) {
        useAzulitoStore.getState().setSpeechAndMood(node.description, 'talk');
      } else if (node) {
        useAzulitoStore.getState().setSpeechAndMood(`Explorando ${node.label}...`, 'talk');
      }
    } else {
      useAzulitoStore.getState().setSpeechAndMood(AZULITO_SPEECHES[NodeId.HECHIZOS] || '', 'talk');
    }
  };

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
              onNodeHover={handleNodeHover}
            />
          ) : (
            <MagicFlow
              nodes={currentNodes}
              onClick={handleNodeClick}
              onHover={handleNodeHover}
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
          <div className="absolute inset-0 z-50 md:p-16 bg-black/40 backdrop-blur-sm pointer-events-auto">
            <div className="w-full mt-[1%] h-[80vh] pointer-events-auto relative md:absolute md:top-0 md:left-0 md:mt-0 md:w-[80%] md:h-[95vh] md:max-w-none md:z-40">
              <Tesseract color={selectedSchoolData.color}>
                <div className="flex flex-col h-full overflow-hidden p-2 md:p-6">
                  <div className="mb-6 shrink-0">
                    <h1 className="text-3xl font-bold mb-2 border-b pb-2" style={{ color: selectedSchoolData.color, borderColor: `${selectedSchoolData.color}40` }}>
                      {selectedSchoolData.label}
                    </h1>
                    <p className="text-white opacity-90 text-lg">{selectedSchoolData.description}</p>
                  </div>
                  {selectedSchoolData.spells && selectedSchoolData.spells.length > 0 && (
                    <div className="flex-1 overflow-hidden min-h-0">
                      <SpellList spells={selectedSchoolData.spells} color={selectedSchoolData.color} />
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
