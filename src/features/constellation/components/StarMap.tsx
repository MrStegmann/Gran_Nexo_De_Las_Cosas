import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const StarMap: React.FC = () => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  const [geometry, uniforms] = useMemo(() => {
    const starGeom = new THREE.BufferGeometry();
    const starCount = 10500;
    const starPos = new Float32Array(starCount * 3);
    const starPhase = new Float32Array(starCount);

    const radiusX = 21000;
    const radiusY = 18000;
    const radiusZ = 21000;
    const centerX = 0;
    const centerY = 0;
    const centerZ = -200;

    for (let i = 0; i < starCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);

        const thickness = 1.0 + (Math.random() - 0.5) * 0.1; 

        starPos[i * 3] = centerX + (radiusX * thickness) * Math.sin(phi) * Math.cos(theta);
        starPos[i * 3 + 1] = centerY + (radiusY * thickness) * Math.sin(phi) * Math.sin(theta);
        starPos[i * 3 + 2] = centerZ + (radiusZ * thickness) * Math.cos(phi);
        
        starPhase[i] = Math.random() * Math.PI * 2;
    }

    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeom.setAttribute('phase', new THREE.BufferAttribute(starPhase, 1));

    const shaderUniforms = {
        time: { value: 0.0 },
        color: { value: new THREE.Color(0xffffff) }
    };

    return [starGeom, shaderUniforms];
  }, []);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = timeRef.current;
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={shaderRef}
        uniforms={uniforms}
        vertexShader={`
            attribute float phase;
            varying float vPhase;
            void main() {
                vPhase = phase;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                
                float baseSize = 8.0 + sin(phase) * 4.0;
                float distanceScale = 5000.0 / length(mvPosition.xyz); 
                
                gl_PointSize = baseSize * distanceScale;
                gl_Position = projectionMatrix * mvPosition;
            }
        `}
        fragmentShader={`
            uniform float time;
            uniform vec3 color;
            varying float vPhase;
            void main() {
                vec2 coord = gl_PointCoord - vec2(0.5);
                if(length(coord) > 0.5) discard;
                
                float alpha = 0.5 + 0.5 * sin(time * 0.3 + vPhase);
                alpha = pow(alpha, 2.0);
                
                gl_FragColor = vec4(color, alpha * 0.9);
            }
        `}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
