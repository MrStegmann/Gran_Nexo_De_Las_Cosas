import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { OrbitControls } from '@react-three/drei';
import { Constellation } from './Constellation';
import { useConstellationStore } from '../store/useConstellationStore';
import { constellationData } from '../data/constellationData';
import { FutharkRunes } from './FutharkRunes';

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

const CameraAnimator: React.FC = () => {
  const { camera } = useThree();
  const transitioningNodeId = useConstellationStore((state) => state.transitioningNodeId);
  const returningNodeId = useConstellationStore((state) => state.returningNodeId);
  const setSelectedNode = useConstellationStore((state) => state.setSelectedNode);
  const setTransitioningNode = useConstellationStore((state) => state.setTransitioningNode);
  const setReturningNode = useConstellationStore((state) => state.setReturningNode);

  const transitionTime = React.useRef(0);

  useFrame((_, delta) => {
    if (transitioningNodeId) {
      transitionTime.current += delta;

      const nodeData = constellationData.find(n => n.id === transitioningNodeId);
      if (nodeData) {
        const isMobile = window.innerWidth <= 768;
        const targetPos = isMobile && nodeData.mobilePos ? nodeData.mobilePos : nodeData.pos;

        // Exponential acceleration: starts at 0 and grows very fast
        const speedMultiplier = Math.exp(transitionTime.current * 3.5) - 1;
        const moveSpeed = Math.min(speedMultiplier * delta, 0.9);

        camera.position.lerp(targetPos, moveSpeed);

        // Orient towards target smoothly
        const targetRotation = new THREE.Quaternion().setFromRotationMatrix(
          new THREE.Matrix4().lookAt(camera.position, targetPos, camera.up)
        );
        camera.quaternion.slerp(targetRotation, Math.min(moveSpeed * 1.5, 1));

        const dist = camera.position.distanceTo(targetPos);

        // Tunnel effect occurs at max speed
        const pCam = camera as THREE.PerspectiveCamera;
        // Increase FOV drastically only when speedMultiplier is high
        const targetFov = 75 + Math.min(speedMultiplier * 2.0, 90); // max FOV around 165
        pCam.fov = THREE.MathUtils.lerp(pCam.fov, targetFov, delta * 15);
        pCam.updateProjectionMatrix();

        if (dist < 10) {
          setSelectedNode(transitioningNodeId);
          setTransitioningNode(null);
          // Reset FOV for the inner view
          pCam.fov = 75;
          pCam.updateProjectionMatrix();
          transitionTime.current = 0;
        }
      }
    } else if (returningNodeId) {
      transitionTime.current += delta;

      const isMobile = window.innerWidth <= 768;
      const targetPos = isMobile ? new THREE.Vector3(0, 0, 250) : new THREE.Vector3(0, 0, 50);

      // Easing out interpolation: starts fast and slows down gracefully as it approaches the target
      const moveSpeed = Math.min(delta * 5.0, 1.0);
      camera.position.lerp(targetPos, moveSpeed);

      // Interpolate the look-at target from the node's position to the center [0,0,-200]
      // This ensures the camera appears to come "out" of the node before panning to the center
      const nodeData = constellationData.find(n => n.id === returningNodeId);
      const nodePos = nodeData ? (isMobile && nodeData.mobilePos ? nodeData.mobilePos : nodeData.pos) : new THREE.Vector3(0, 0, 0);

      const lookProgress = Math.min(transitionTime.current / 1.5, 1.0);
      const lookEase = lookProgress * lookProgress * (3 - 2 * lookProgress); // smoothstep
      const currentLookTarget = new THREE.Vector3().copy(nodePos).lerp(new THREE.Vector3(0, 0, -200), lookEase);

      const targetRotation = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(camera.position, currentLookTarget, camera.up)
      );
      camera.quaternion.slerp(targetRotation, Math.min(delta * 10.0, 1.0));

      const dist = camera.position.distanceTo(targetPos);

      // Smoothly restore FOV back to 75
      const pCam = camera as THREE.PerspectiveCamera;
      pCam.fov = THREE.MathUtils.lerp(pCam.fov, 75, delta * 10);
      pCam.updateProjectionMatrix();

      // Because we ease-out, it will smoothly approach the target. 
      // We use a very small threshold so the final snap is completely invisible
      if (dist < 0.1 || transitionTime.current > 3.0) {
        setReturningNode(null);
        pCam.fov = 75;
        pCam.position.copy(targetPos);
        // Snap the rotation exactly to the OrbitControls target to avoid sudden rotation jump
        pCam.quaternion.setFromRotationMatrix(
          new THREE.Matrix4().lookAt(pCam.position, new THREE.Vector3(0, 0, -200), pCam.up)
        );
        pCam.updateProjectionMatrix();
        transitionTime.current = 0;
      }
    } else {
      transitionTime.current = 0;
    }
  });

  return null;
};

const DynamicControls: React.FC = () => {
  const selectedNodeId = useConstellationStore((state) => state.selectedNodeId);
  const transitioningNodeId = useConstellationStore((state) => state.transitioningNodeId);
  const returningNodeId = useConstellationStore((state) => state.returningNodeId);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isDragging ? 'move' : 'default';
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [isDragging]);

  return (
    <OrbitControls
      makeDefault
      enableDamping
      dampingFactor={0.05}
      target={[0, 0, -200]}
      enableZoom={true}
      minDistance={50}
      maxDistance={600}
      enabled={!selectedNodeId && !transitioningNodeId && !returningNodeId}
      onStart={() => setIsDragging(true)}
      onEnd={() => setIsDragging(false)}
    />
  );
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

      <DynamicControls />
      <CameraAnimator />
      <Constellation />
      <FutharkRunes />
    </Canvas>
  );
};
