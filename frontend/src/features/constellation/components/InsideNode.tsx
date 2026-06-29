import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { nodeThemes } from '../data/constellationData';
import { NodeId } from '../enums/NodeId';

interface InsideNodeProps {
  nodeId: NodeId;
}

export const InsideNode: React.FC<InsideNodeProps> = ({ nodeId }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const theme = nodeThemes[nodeId];

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.05;
      meshRef.current.rotation.y += delta * 0.07;
      meshRef.current.rotation.z += delta * 0.03;
    }
  });

  if (!theme) return null;

  return (
    <group>
      <mesh ref={meshRef} geometry={theme.geom} scale={[30, 30, 30]}>
        <meshBasicMaterial 
          color={theme.color} 
          wireframe={true} 
          transparent={true} 
          opacity={0.15} 
          side={THREE.DoubleSide} 
        />
      </mesh>
    </group>
  );
};
