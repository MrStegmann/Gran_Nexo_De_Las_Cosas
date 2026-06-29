import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const AnimatedTether: React.FC<{ startPos: THREE.Vector3; endPos: THREE.Vector3; color: number }> = ({ startPos, endPos, color }) => {
  const segments = 20;
  const numStrands = 3;

  const strands = useMemo(() => {
    return Array.from({ length: numStrands }).map(() => ({
      phaseOffset: Math.random() * Math.PI * 2,
      speed: 2 + Math.random() * 2,
    }));
  }, []);

  const lineRefs = useRef<(THREE.BufferGeometry | null)[]>([]);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const elapsedTime = timeRef.current;
    
    strands.forEach((strand, index) => {
      const geo = lineRefs.current[index];
      if (!geo) return;
      
      const positions = geo.attributes.position.array as Float32Array;

      for (let i = 0; i <= segments; i++) {
        const p = i / segments;

        const x = startPos.x + (endPos.x - startPos.x) * p;
        const y = startPos.y + (endPos.y - startPos.y) * p;
        const z = startPos.z + (endPos.z - startPos.z) * p;

        let noiseX = 0;
        let noiseY = 0;
        let noiseZ = 0;

        if (i > 0 && i < segments) {
          const time = elapsedTime * strand.speed + strand.phaseOffset;
          const intensity = Math.sin(p * Math.PI);
          noiseX = Math.sin(p * Math.PI * 6 - time) * 3.0 * intensity;
          noiseY = Math.cos(p * Math.PI * 4 + time) * 3.0 * intensity;
          noiseZ = Math.sin(p * Math.PI * 5 + time) * 3.0 * intensity;
        }

        positions[i * 3] = x + noiseX;
        positions[i * 3 + 1] = y + noiseY;
        positions[i * 3 + 2] = z + noiseZ;
      }

      geo.attributes.position.needsUpdate = true;
    });
  });

  return (
    <group>
      {/* Central thin straight tether */}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={2} array={new Float32Array([startPos.x, startPos.y, startPos.z, endPos.x, endPos.y, endPos.z])} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </line>

      {/* Floating animated magic filaments */}
      {strands.map((_, idx) => (
        <line key={idx}>
          <bufferGeometry ref={(el) => (lineRefs.current[idx] = el as any)}>
            <bufferAttribute attach="attributes-position" count={segments + 1} array={new Float32Array((segments + 1) * 3)} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial color={new THREE.Color(color).multiplyScalar(12)} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </line>
      ))}
    </group>
  );
};
