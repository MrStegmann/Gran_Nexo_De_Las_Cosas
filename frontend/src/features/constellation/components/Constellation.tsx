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

const AnimatedTether: React.FC<{ startPos: THREE.Vector3; endPos: THREE.Vector3; color: number }> = ({ startPos, endPos, color }) => {
  const segments = 20;
  const numStrands = 3;

  const strands = useMemo(() => {
    return Array.from({ length: numStrands }).map(() => ({
      phaseOffset: Math.random() * Math.PI * 2,
      speed: 2 + Math.random() * 2,
    }));
  }, []);

  const lineRefs = useRef<(THREE.BufferGeometry | null)[]>([]);

  useFrame((state) => {
    const elapsedTime = state.clock.elapsedTime;
    
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
          <bufferGeometry ref={(el) => (lineRefs.current[idx] = el)}>
            <bufferAttribute attach="attributes-position" count={segments + 1} array={new Float32Array((segments + 1) * 3)} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial color={new THREE.Color(color).multiplyScalar(12)} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </line>
      ))}
    </group>
  );
};

const TetherLines: React.FC<{ nodes: Array<{ id: NodeId; label: string; pos: THREE.Vector3 }> }> = ({ nodes }) => {
  const lines = useMemo(() => {
    return nodes.map(data => {
      const theme = nodeThemes[data.id] || { color: 0xffffff };
      let startPos = new THREE.Vector3(0, 0, -200);
      if (data.id === NodeId.RUNAS) {
        const hechizosData = nodes.find(d => d.id === NodeId.HECHIZOS);
        if (hechizosData) startPos = hechizosData.pos.clone();
      }
      const endPos = data.pos.clone();
      return { startPos, endPos, color: theme.color, id: data.id };
    });
  }, [nodes]);

  return (
    <group>
      {lines.map((line) => (
        <AnimatedTether key={`tether-${line.id}`} startPos={line.startPos} endPos={line.endPos} color={line.color} />
      ))}
    </group>
  );
};

const StarMap: React.FC = () => {
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

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = state.clock.elapsedTime;
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
      <StarMap />
      <Nexo />
      {nodes.map((data) => (
        <LeyNode key={data.id} id={data.id} label={data.label} pos={data.pos} />
      ))}
      <TetherLines nodes={nodes} />
    </group>
  );
};
