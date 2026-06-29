import React, { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { OrbitControls } from '@react-three/drei';
import { Constellation } from './Constellation';

const CameraAdjuster: React.FC = () => {
  const { camera } = useThree();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        // Move camera further back on mobile to see all vertically distributed nodes
        camera.position.set(0, 0, 250); 
      } else {
        camera.position.set(0, 0, 50);
      }
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, [camera]);

  return null;
};

export const ConstellationScene: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 75, near: 0.1, far: 30000 }}
      gl={{ alpha: true, antialias: true }}
    >
      <CameraAdjuster />
      <color attach="background" args={['#020205']} />
      <fogExp2 attach="fog" args={['#020205', 0.002]} />
      
      {/* 
        We use postprocessing for the bloom effect.
        The parameters match the UnrealBloomPass:
        intensity, luminanceThreshold, luminanceSmoothing
      */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2} 
          mipmapBlur 
          intensity={1.8} 
        />
      </EffectComposer>

      <OrbitControls makeDefault enableDamping dampingFactor={0.05} target={[0, 0, -200]} enableZoom={true} />
      <Constellation />
    </Canvas>
  );
};
