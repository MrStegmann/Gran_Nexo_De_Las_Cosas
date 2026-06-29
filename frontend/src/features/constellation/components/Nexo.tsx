import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Nexo: React.FC = () => {
  const shellRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (shellRef.current) {
      shellRef.current.rotation.y += delta * 0.15;
      shellRef.current.rotation.x += delta * 0.08;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.25;
    }
  });

  return (
    <group position={[0, 0, -200]}>
      <pointLight color={0xddeeff} intensity={15.0} distance={3000} castShadow />
      <pointLight color={0x0066ff} intensity={12.0} distance={4000} />

      {/* Core */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[10.725, 64, 64]} />
        <meshBasicMaterial color={new THREE.Color(0.1, 0.4, 1.0).multiplyScalar(15)} />
      </mesh>

      {/* Shell */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[15.675, 1]} />
        <meshBasicMaterial color={0x00aaff} wireframe transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0.2, 0]}>
        <torusGeometry args={[20.625, 0.33, 8, 80]} />
        <meshBasicMaterial color={0x00f0ff} transparent opacity={0.45} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, -0.2, 0]}>
        <torusGeometry args={[25.575, 0.2475, 8, 80]} />
        <meshBasicMaterial color={0x0055ff} transparent opacity={0.35} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
