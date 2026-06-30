import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { MagicFlow } from '../../../components/MagicFlow';
import { Tesseract } from '../../../components/Tesseract/Tesseract';
import { BackButton } from '../../core/components/BackButton';
import { skillsAttributes } from '../data/skillsData';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';
import { SkillList } from './SkillList';
import { NodeId } from '../../constellation/enums/NodeId';
import { StarMap } from '../../constellation/components/StarMap';
import { FutharkRunes } from '../../constellation/components/FutharkRunes';
import { nodeThemes } from '../../constellation/data/constellationData';

const HabilidadesBackground: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const theme = nodeThemes[NodeId.HABILIDADES];

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.6;
      coreRef.current.rotation.x += delta * 0.3;
    }
    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.4;
      shellRef.current.rotation.z += delta * 0.2;
    }
  });

  if (!theme) return null;

  return (
    <>
      <StarMap />
      <FutharkRunes />
      <group position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
        <pointLight color={theme.color} intensity={2.0} distance={2000} />
        <pointLight color={0xffffff} intensity={0.5} distance={2500} />

        <mesh ref={coreRef} geometry={theme.geom} castShadow receiveShadow>
          <meshStandardMaterial
            color={0xffffff}
            roughness={0.1}
            metalness={0.8}
            emissive={theme.emissive}
            emissiveIntensity={0.5}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        <mesh ref={shellRef} geometry={theme.shellGeom}>
          <meshStandardMaterial
            color={theme.color}
            roughness={0.1}
            metalness={0.9}
            wireframe
            transparent
            opacity={0.1}
            emissive={theme.emissive.clone().multiplyScalar(0.2)}
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>
    </>
  );
};

export const SkillsFeature: React.FC = () => {
  const selectedAttribute = useConstellationStore((state) => state.selectedAttribute);
  const transitioningAttribute = useConstellationStore((state) => state.transitioningAttribute);
  const returningAttribute = useConstellationStore((state) => state.returningAttribute);

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
          camera={{ position: [0, 0, 15], fov: 75, near: 0.1, far: 30000 }}
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
              onHover={(nodeId) => useConstellationStore.getState().setHoveredNode(nodeId as NodeId | null)}
            />
          )}
          {selectedAttribute && <HabilidadesBackground />}
        </Canvas>
      </div>

      {/* Botón de volver */}
      {selectedAttribute && !transitioningAttribute && (
        <div className="absolute inset-0 z-60 pointer-events-none">
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
              <Tesseract
                color={selectedAttributeData.color}
                sections={[{
                  id: 'main',
                  title: selectedAttributeData.label,
                  markdown: selectedAttributeData.description || '',
                  filterOptions: ['Todos', 'Activa', 'Pasiva'],
                  customComponent: selectedAttributeData.skills && selectedAttributeData.skills.length > 0 ? (
                    <SkillList skills={selectedAttributeData.skills} color={selectedAttributeData.color} />
                  ) : undefined
                }]}
              />
            </div>
          </div>
        );
      })()}

    </div>
  );
};
