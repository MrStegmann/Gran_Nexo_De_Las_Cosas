import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useConstellationStore } from '../store/useConstellationStore';

import { constellationData, nodeThemes } from '../data/constellationData';
import { NodeId } from '../enums/NodeId';

const Nexo: React.FC = () => {
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
        <sphereGeometry args={[6.5, 64, 64]} />
        <meshBasicMaterial color={new THREE.Color(0.1, 0.4, 1.0).multiplyScalar(15)} />
      </mesh>

      {/* Shell */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[9.5, 1]} />
        <meshBasicMaterial color={0x00aaff} wireframe transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0.2, 0]}>
        <torusGeometry args={[12.5, 0.2, 8, 80]} />
        <meshBasicMaterial color={0x00f0ff} transparent opacity={0.45} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, -0.2, 0]}>
        <torusGeometry args={[15.5, 0.15, 8, 80]} />
        <meshBasicMaterial color={0x0055ff} transparent opacity={0.35} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

interface LeyNodeProps {
  id: NodeId;
  label: string;
  pos: THREE.Vector3;
}

const LeyNode: React.FC<LeyNodeProps> = ({ id, label, pos }) => {
  const setHoveredNode = useConstellationStore((state) => state.setHoveredNode);
  const setSelectedNode = useConstellationStore((state) => state.setSelectedNode);
  const hoveredNodeId = useConstellationStore((state) => state.hoveredNodeId);
  const selectedNodeId = useConstellationStore((state) => state.selectedNodeId);

  const theme = nodeThemes[id] || {
    color: 0xffffff,
    emissive: new THREE.Color(0xaaddff).multiplyScalar(15),
    geom: new THREE.SphereGeometry(2.3, 32, 32),
    shellGeom: new THREE.SphereGeometry(3.3, 16, 16)
  };

  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  
  // Refs for the shockwave effect
  const shockwaveRef = useRef<THREE.Mesh>(null);
  const shockwaveMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const shockwaveTime = useRef<number>(0);
  const isShockwaveActive = useRef<boolean>(false);

  const isHovered = hoveredNodeId === id;
  const isSelected = selectedNodeId === id;

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.6;
      coreRef.current.rotation.x += delta * 0.3;

      const targetScale = isHovered || isSelected ? 1.2 : 1.0;
      coreRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);

      const material = coreRef.current.material as THREE.MeshStandardMaterial;
      if (material) {
        const targetIntensity = isHovered || isSelected ? 3.0 : 1.0;
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
      <pointLight color={theme.color} intensity={12.0} distance={2000} />
      <pointLight color={0xffffff} intensity={5.0} distance={2500} />

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
        onPointerOver={(e) => { e.stopPropagation(); setHoveredNode(id); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHoveredNode(null); document.body.style.cursor = 'default'; }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedNode(id);
          console.log(`Nodo seleccionado: ${label} (${id})`);
          
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

const TetherLines: React.FC<{ nodes: Array<{ id: NodeId; label: string; pos: THREE.Vector3 }> }> = ({ nodes }) => {
  // A simplified tether component for now, just drawing the straight lines to the center.
  // Flowing energy strands can be added back efficiently using line segments in a useFrame.
  const lines = useMemo(() => {
    return nodes.map(data => {
      const theme = nodeThemes[data.id] || { color: 0xffffff };
      let startPos = new THREE.Vector3(0, 0, -200);
      if (data.id === NodeId.RUNAS) {
        const hechizosData = nodes.find(d => d.id === NodeId.HECHIZOS);
        if (hechizosData) startPos = hechizosData.pos.clone();
      }
      const endPos = data.pos.clone();
      return { startPos, endPos, color: theme.color };
    });
  }, [nodes]);

  return (
    <group>
      {lines.map((line, idx) => {
        const points = [line.startPos, line.endPos];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <primitive key={`tether-${idx}`} object={new THREE.Line(lineGeo)}>
            <lineBasicMaterial attach="material" color={line.color} transparent opacity={0.1} blending={THREE.AdditiveBlending} />
          </primitive>
        );
      })}
    </group>
  );
};

export const Constellation: React.FC = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nodes = useMemo(() => {
    return constellationData.map((data) => {
      return {
        ...data,
        pos: (isMobile && data.mobilePos) ? data.mobilePos : data.pos
      };
    });
  }, [isMobile]);

  return (
    <group>
      <Nexo />
      {nodes.map((data) => (
        <LeyNode key={data.id} id={data.id} label={data.label} pos={data.pos} />
      ))}
      <TetherLines nodes={nodes} />
    </group>
  );
};
