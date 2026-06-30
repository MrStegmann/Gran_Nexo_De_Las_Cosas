import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useConstellationStore } from '../store/useConstellationStore';
import { nodeThemes } from '../data/constellationData';
import { NodeId } from '../enums/NodeId';
import { FloatingLabel } from '../../../components/FloatingLabel';

export interface LeyNodeProps {
  id: NodeId;
  label: string;
  pos: THREE.Vector3;
}

export const LeyNode: React.FC<LeyNodeProps> = ({ id, label, pos }) => {
  const setHoveredNode = useConstellationStore((state) => state.setHoveredNode);
  const setTransitioningNode = useConstellationStore((state) => state.setTransitioningNode);
  const hoveredNodeId = useConstellationStore((state) => state.hoveredNodeId);
  const selectedNodeId = useConstellationStore((state) => state.selectedNodeId);

  const theme = nodeThemes[id] || {
    color: 0xffffff,
    emissive: new THREE.Color(0xaaddff).multiplyScalar(11.25),
    geom: new THREE.SphereGeometry(3.795, 32, 32),
    shellGeom: new THREE.SphereGeometry(5.445, 16, 16)
  };

  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  // Refs for the shockwave effect
  const shockwaveRef = useRef<THREE.Mesh>(null);
  const shockwaveMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const shockwaveTime = useRef<number>(0);
  const isShockwaveActive = useRef<boolean>(false);

  const longPressTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef<boolean>(false);

  const isHovered = hoveredNodeId === id;
  const isSelected = selectedNodeId === id;
  const labelDelay = useMemo(() => Math.random() * 500, []);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.6;
      coreRef.current.rotation.x += delta * 0.3;

      const targetScale = isHovered || isSelected ? 1.2 : 1.0;
      coreRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);

      const material = coreRef.current.material as THREE.MeshStandardMaterial;
      if (material) {
        const targetIntensity = isHovered || isSelected ? 1.65 : 1.0;
        material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetIntensity, delta * 5);
      }
    }
    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.4;
      shellRef.current.rotation.z += delta * 0.2;

      if (coreRef.current) {
        shellRef.current.scale.copy(coreRef.current.scale);
      }

      const material = shellRef.current.material as THREE.MeshStandardMaterial;
      if (material) {
        const targetIntensity = isHovered || isSelected ? 1.5 : 0.5;
        material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetIntensity, delta * 5);
      }
    }

    // Shockwave animation
    if (isShockwaveActive.current && shockwaveRef.current && shockwaveMaterialRef.current) {
      shockwaveTime.current += delta;
      const progress = shockwaveTime.current / 3.0; // 3 seconds duration

      if (progress >= 1.0) {
        isShockwaveActive.current = false;
        shockwaveRef.current.visible = false;
      } else {
        // Expands outwards non-linearly
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const scale = 1 + easeOut * 30; // Expands to 30x its initial size
        shockwaveRef.current.scale.set(scale, scale, scale);

        // Fades out opacity
        shockwaveMaterialRef.current.opacity = 0.5 * (1 - progress);
      }
    }
  });

  return (
    <group position={pos}>
      <Html position={[0, 12, 0]} center zIndexRange={[9999999, 9990000]} style={{ pointerEvents: 'none' }}>
        <FloatingLabel text={label} delay={labelDelay} />
      </Html>
      <pointLight color={theme.color} intensity={9.0} distance={2000} />
      <pointLight color={0xffffff} intensity={3.75} distance={2500} />

      {/* Core */}
      <mesh ref={coreRef} geometry={theme.geom} castShadow receiveShadow>
        <meshStandardMaterial
          color={0xffffff}
          roughness={0.1}
          metalness={0.8}
          emissive={theme.emissive}
          emissiveIntensity={1.0}
        />
      </mesh>

      {/* Shell */}
      <mesh ref={shellRef} geometry={theme.shellGeom}>
        <meshStandardMaterial
          color={theme.color}
          roughness={0.1}
          metalness={0.9}
          wireframe
          transparent
          opacity={0.35}
          emissive={theme.emissive.clone().multiplyScalar(0.2)}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Hitbox */}
      <mesh
        onPointerOver={(e) => { 
          e.stopPropagation(); 
          if (e.pointerType === 'mouse') {
            setHoveredNode(id); 
          }
          if (!document.body.classList.contains('is-dragging')) {
            document.body.style.cursor = 'pointer'; 
          }
        }}
        onPointerOut={(e) => { 
          e.stopPropagation(); 
          setHoveredNode(null); 
          if (!document.body.classList.contains('is-dragging')) {
            document.body.style.cursor = 'default'; 
          }
          if (longPressTimeout.current) {
            clearTimeout(longPressTimeout.current);
            longPressTimeout.current = null;
          }
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          isLongPress.current = false;
          if (e.pointerType !== 'mouse') {
            longPressTimeout.current = setTimeout(() => {
              isLongPress.current = true;
              setHoveredNode(id);
            }, 400); // 400ms for long press
          }
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          if (longPressTimeout.current) {
            clearTimeout(longPressTimeout.current);
            longPressTimeout.current = null;
          }
          if (isLongPress.current && e.pointerType !== 'mouse') {
            setHoveredNode(null);
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (e.delta > 2) {
            return;
          }
          if (isLongPress.current) {
            return;
          }
          setTransitioningNode(id);
          console.log(`Nodo seleccionado para transición: ${label} (${id})`);

          // Trigger shockwave
          isShockwaveActive.current = true;
          shockwaveTime.current = 0;
          if (shockwaveRef.current) {
            shockwaveRef.current.visible = true;
          }
        }}
      >
        <sphereGeometry args={[25, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Shockwave Effect */}
      <mesh ref={shockwaveRef} visible={false} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.0, 64]} />
        <meshBasicMaterial
          ref={shockwaveMaterialRef}
          color={theme.color}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
