import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertices4D: number[][] = [];
for (let i = 0; i < 16; i++) {
  vertices4D.push([
    (i & 1) ? 1 : -1,
    (i & 2) ? 1 : -1,
    (i & 4) ? 1 : -1,
    (i & 8) ? 1 : -1,
  ]);
}

const edges4D: number[][] = [];
for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 4; j++) {
    const bit = 1 << j;
    if ((i & bit) === 0) {
      edges4D.push([i, i | bit]);
    }
  }
}

const TesseractMesh: React.FC<{ colorHex: string; isHovered: boolean }> = ({ colorHex, isHovered }) => {
  const lineRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const currentSpeed = useRef(0.8);

  const geom = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame((state, delta) => {
    // Determine target speed based on state
    let targetSpeed = 0.8;
    let targetOpacity = 0.6;

    if (isHovered) {
      targetSpeed = 0.8 * 1.10; // 10% faster when hovered
      targetOpacity = 0.9;
    }

    // Smoothly interpolate current speed towards target speed
    currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, targetSpeed, delta * 5);

    // Update material opacity for the glow effect
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 10);
    }
  });

  // Custom time accumulator to handle variable speeds smoothly
  const timeAccumulator = useRef(0);

  useFrame((state, delta) => {
    timeAccumulator.current += delta * currentSpeed.current;
    const t = timeAccumulator.current;

    // Rotation angles for 4D planes
    const c = Math.cos(t);
    const s = Math.sin(t);
    const c2 = Math.cos(t * 0.5);
    const s2 = Math.sin(t * 0.5);

    const projected3D = vertices4D.map(v => {
      let x = v[0], y = v[1], z = v[2], w = v[3];

      // Rotate in XW plane
      let nx = x * c - w * s;
      let nw = x * s + w * c;
      x = nx;
      w = nw;

      // Rotate in YW plane
      let ny = y * c2 - w * s2;
      nw = y * s2 + w * c2;
      y = ny;
      w = nw;

      // Stereographic projection from 4D to 3D
      const distance = 2.5;
      const scale = 1.0 / (distance - w);
      return new THREE.Vector3(x * scale, y * scale, z * scale);
    });

    const positions = new Float32Array(edges4D.length * 2 * 3);
    edges4D.forEach((edge, i) => {
      const p1 = projected3D[edge[0]];
      const p2 = projected3D[edge[1]];

      positions[i * 6] = p1.x;
      positions[i * 6 + 1] = p1.y;
      positions[i * 6 + 2] = p1.z;
      positions[i * 6 + 3] = p2.x;
      positions[i * 6 + 4] = p2.y;
      positions[i * 6 + 5] = p2.z;
    });

    if (lineRef.current) {
      lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }

    // Rotate the 3D projection slightly to give depth
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.x = t * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={lineRef} geometry={geom}>
        <lineBasicMaterial color={colorHex} transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
};

export interface BackButtonProps {
  onClick: () => void;
  colorHex: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, colorHex }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onClick();
  };

  return (
    <div className="absolute bottom-18 left-4 sm:left-8 md:bottom-14 md:left-8 z-30 pointer-events-none">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group pointer-events-auto relative w-16 h-16 cursor-pointer outline-none border-none hover:border-none focus:outline-none focus:border-none ring-0 focus:ring-0"
        style={{ background: 'transparent', backgroundColor: 'transparent', boxShadow: 'none', border: 'none', outline: 'none' }}
        aria-label="Volver al menú principal"
      >
        <div className="absolute inset-0 transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
          {/* 3D Canvas */}
          <div className={`absolute inset-0 w-full h-full pointer-events-none overflow-visible transition-all duration-300 ${isHovered ? 'drop-shadow-[0_0_8px_currentColor]' : ''}`} style={{ color: colorHex }}>
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
              <ambientLight intensity={1} />
              <TesseractMesh colorHex={colorHex} isHovered={isHovered} />
            </Canvas>
          </div>

          {/* Center Icon Overlay */}
          <div className={`absolute inset-0 z-10 flex items-center justify-center transition-transform pointer-events-none ${isHovered ? '-translate-x-1' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 drop-shadow-[0_0_8px_currentColor]" style={{ color: colorHex }}>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
};
