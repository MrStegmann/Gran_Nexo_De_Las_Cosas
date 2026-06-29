import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useConstellationStore } from '../../features/constellation/store/useConstellationStore';
import './MagicFlow.css';

export interface MagicFlowNodeData {
  id: string;
  label: string;
  color: string; // hex string e.g. '#00f0ff'
  description?: string;
}

export interface MagicFlowProps {
  nodes: MagicFlowNodeData[];
  onClick?: (nodeId: string) => void;
}

// Global uniform for the filament material
const filamentUniforms = {
  uHoverPos: { value: new THREE.Vector3() },
  uHoverColor: { value: new THREE.Color() },
  uHoverIntensity: { value: 0.0 }
};

const filamentMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0xffffff,
  emissiveIntensity: 0.0,
  roughness: 0.2,
  metalness: 0.8,
  transparent: true,
  opacity: 0.9,
  blending: THREE.AdditiveBlending
});

filamentMat.onBeforeCompile = (shader) => {
  shader.uniforms.uHoverPos = filamentUniforms.uHoverPos;
  shader.uniforms.uHoverColor = filamentUniforms.uHoverColor;
  shader.uniforms.uHoverIntensity = filamentUniforms.uHoverIntensity;

  shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    `
    #include <common>
    varying vec3 vWorldPositionMagic;
    `
  ).replace(
    '#include <worldpos_vertex>',
    `
    #include <worldpos_vertex>
    vWorldPositionMagic = (modelMatrix * vec4(transformed, 1.0)).xyz;
    `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
    #include <common>
    varying vec3 vWorldPositionMagic;
    uniform vec3 uHoverPos;
    uniform vec3 uHoverColor;
    uniform float uHoverIntensity;
    `
  ).replace(
    '#include <emissivemap_fragment>',
    `
    #include <emissivemap_fragment>
    
    float dist = distance(vWorldPositionMagic, uHoverPos);
    
    // Proximity variables for global flow and intense center glow
    float globalProximity = smoothstep(20.0, 0.0, dist); 
    float intenseProximity = smoothstep(4.0, 0.0, dist);
    
    // Determine the base flow color: default magical blue, mixed with hovered node color
    vec3 defaultColor = vec3(0.2, 0.6, 1.0);
    vec3 flowColor = mix(defaultColor, uHoverColor, uHoverIntensity);
    
    // Calculate global glow that affects the whole flow when hovered
    float baseGlow = 1.0 + (globalProximity * uHoverIntensity * 8.0);
    
    // Intense bright glow near the hovered node
    float intenseGlow = pow(intenseProximity, 2.0) * uHoverIntensity * 40.0;
    
    // Combine base glow and intense central glow
    vec3 finalEmissive = flowColor * baseGlow + mix(vec3(0.0), vec3(1.0), intenseProximity * 0.8) * intenseGlow;
    
    totalEmissiveRadiance += finalEmissive;
    `
  );
};

// Extracted Glow Texture generation
function createGlowTexture(colorHex: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  if (!context) return null;
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  const c = new THREE.Color(colorHex);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, `rgba(${(c.r * 255) | 0}, ${(c.g * 255) | 0}, ${(c.b * 255) | 0}, 0.8)`);
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

// Subcomponent for each node
const MagicNode: React.FC<{
  node: MagicFlowNodeData;
  position: THREE.Vector3;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onClick?: (nodeId: string) => void;
}> = ({ node, position, isHovered, onHover, onClick }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Sprite>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const baseColor = useMemo(() => new THREE.Color(node.color), [node.color]);
  const haloTex = useMemo(() => createGlowTexture(node.color), [node.color]);

  // Animation values
  const currentEmissive = useRef(1.0);
  const currentScale = useRef(1.0);

  useFrame((state, delta) => {
    const targetEmissive = isHovered ? 2.0 : 1.0;
    const targetScale = isHovered ? 1.2 : 1.0;

    currentEmissive.current += (targetEmissive - currentEmissive.current) * 10 * delta;
    currentScale.current += (targetScale - currentScale.current) * 10 * delta;

    if (coreRef.current) {
      coreRef.current.scale.setScalar(currentScale.current);
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissive.copy(baseColor);
      mat.emissiveIntensity = 0.4 * currentEmissive.current;
    }

    if (shellRef.current) {
      shellRef.current.scale.setScalar(currentScale.current);
      shellRef.current.rotation.y += delta * 0.5;
      shellRef.current.rotation.x += delta * 0.2;
    }

    if (haloRef.current) {
      const haloScale = 4.0 * currentScale.current; // Tighter halo for atmosphere look, scaled up
      haloRef.current.scale.set(haloScale, haloScale, 1);
      (haloRef.current.material as THREE.SpriteMaterial).color.copy(baseColor).multiplyScalar(1.5 * currentEmissive.current);
    }

    if (lightRef.current) {
      const normalizedHover = Math.max(0, (currentEmissive.current - 1.0));
      lightRef.current.intensity = 0.5 + (normalizedHover * 3.0); // Faint light
    }
  });

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
        if (onClick) document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        onHover(false);
        if (onClick) document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(node.id);
      }}
    >
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color={0x1a1a24} roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Atmosphere shell */}
      <mesh ref={shellRef}>
        <sphereGeometry args={[0.96, 32, 32]} />
        <meshBasicMaterial color={baseColor} transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {haloTex && (
        <sprite ref={haloRef}>
          <spriteMaterial map={haloTex} color={baseColor} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      )}

      <pointLight ref={lightRef} color={baseColor} distance={10} intensity={0} decay={2} />

      <Html position={[0, -0.8, 0]} center className="pointer-events-none transition-opacity duration-300 z-10" style={{ opacity: isHovered ? 1 : 0.6 }}>
        <div className="magic-flow-label bg-black/60 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full whitespace-nowrap font-medium text-sm tracking-widest uppercase shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          {node.label}
        </div>
        {isHovered && node.description && (
          <div className="magic-flow-desc mt-2 bg-black/80 backdrop-blur-xl border border-[color:var(--node-color)] text-white/90 p-3 rounded-lg text-xs max-w-[200px] text-center shadow-xl transition-all duration-300" style={{ '--node-color': node.color } as React.CSSProperties}>
            {node.description}
          </div>
        )}
      </Html>

      {/* Invisible Hitbox for easier hovering */}
      <mesh visible={false}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
};

const MagicFlowCameraAnimator: React.FC<{ nodePositions: THREE.Vector3[], nodes: MagicFlowNodeData[] }> = ({ nodePositions, nodes }) => {
  const { camera } = useThree();
  const transitioningAttribute = useConstellationStore(state => state.transitioningAttribute);
  const returningAttribute = useConstellationStore(state => state.returningAttribute);
  const setSelectedAttribute = useConstellationStore(state => state.setSelectedAttribute);
  const setTransitioningAttribute = useConstellationStore(state => state.setTransitioningAttribute);
  const setReturningAttribute = useConstellationStore(state => state.setReturningAttribute);
  
  const transitionTime = useRef(0);
  const startReturnSet = useRef(false);

  useFrame((_, delta) => {
    if (transitioningAttribute) {
      startReturnSet.current = false;
      transitionTime.current += delta;
      const targetIndex = nodes.findIndex(n => n.id === transitioningAttribute);
      if (targetIndex !== -1) {
        const targetPos = nodePositions[targetIndex];
        const speedMultiplier = Math.exp(transitionTime.current * 3.5) - 1;
        const moveSpeed = Math.min(speedMultiplier * delta, 0.9);
        
        camera.position.lerp(targetPos, moveSpeed);
        
        // Orient towards it smoothly
        const lookTarget = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z - 100);
        const targetRotation = new THREE.Quaternion().setFromRotationMatrix(
          new THREE.Matrix4().lookAt(camera.position, lookTarget, camera.up)
        );
        camera.quaternion.slerp(targetRotation, Math.min(moveSpeed * 1.5, 1));
        
        const dist = camera.position.distanceTo(targetPos);
        const pCam = camera as THREE.PerspectiveCamera;
        const targetFov = 75 + Math.min(speedMultiplier * 2.0, 90);
        pCam.fov = THREE.MathUtils.lerp(pCam.fov, targetFov, delta * 15);
        pCam.updateProjectionMatrix();

        if (dist < 1.5) { 
          setSelectedAttribute(transitioningAttribute);
          setTransitioningAttribute(null);
          pCam.fov = 75;
          pCam.position.set(0, 0, 15);
          pCam.rotation.set(0, 0, 0);
          pCam.updateProjectionMatrix();
          transitionTime.current = 0;
        }
      }
    } else if (returningAttribute) {
      transitionTime.current += delta;
      const targetIndex = nodes.findIndex(n => n.id === returningAttribute);
      const nodePos = targetIndex !== -1 ? nodePositions[targetIndex] : new THREE.Vector3(0, 0, 0);

      const pCam = camera as THREE.PerspectiveCamera;

      if (!startReturnSet.current) {
        pCam.position.copy(nodePos);
        pCam.fov = 165; 
        pCam.updateProjectionMatrix();
        startReturnSet.current = true;
      }
      
      const targetPos = new THREE.Vector3(0, 0, 15);
      const moveSpeed = Math.min(delta * 5.0, 1.0);
      camera.position.lerp(targetPos, moveSpeed);
      
      const lookProgress = Math.min(transitionTime.current / 1.5, 1.0);
      const lookEase = lookProgress * lookProgress * (3 - 2 * lookProgress);
      
      // Start by looking through the node (z - 100), then interpolate towards center (0, 0, -100)
      const startLookTarget = new THREE.Vector3(nodePos.x, nodePos.y, nodePos.z - 100);
      const endLookTarget = new THREE.Vector3(0, 0, -100);
      const currentLookTarget = startLookTarget.clone().lerp(endLookTarget, lookEase);

      const targetRotation = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(camera.position, currentLookTarget, camera.up)
      );
      camera.quaternion.slerp(targetRotation, Math.min(delta * 10.0, 1.0));
      
      const dist = camera.position.distanceTo(targetPos);
      pCam.fov = THREE.MathUtils.lerp(pCam.fov, 75, delta * 10);
      pCam.updateProjectionMatrix();
      
      if (dist < 0.1 || transitionTime.current > 3.0) {
        setReturningAttribute(null);
        pCam.fov = 75;
        pCam.position.copy(targetPos);
        pCam.quaternion.setFromRotationMatrix(
          new THREE.Matrix4().lookAt(pCam.position, new THREE.Vector3(0, 0, -100), pCam.up)
        );
        pCam.updateProjectionMatrix();
        transitionTime.current = 0;
        startReturnSet.current = false;
      }
    } else {
      transitionTime.current = 0;
      startReturnSet.current = false;
    }
  });
  
  return null;
};

export const MagicFlow: React.FC<MagicFlowProps> = ({ nodes, onClick }) => {
  const { viewport } = useThree();
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const selectedAttribute = useConstellationStore(state => state.selectedAttribute);
  const transitioningAttribute = useConstellationStore(state => state.transitioningAttribute);

  // Generate dynamic curve
  const { baseCurve, baseFrames } = useMemo(() => {
    const isMobile = viewport.width < viewport.height;
    
    // Total span based on viewport - extended to 1.5x so it starts and ends off-screen
    const span = isMobile ? viewport.height * 1.5 : viewport.width * 1.5;
    const amplitude = isMobile ? viewport.width * 0.3 : viewport.height * 0.3;
    
    const steps = Math.max(10, nodes.length * 4);
    const points: THREE.Vector3[] = [];
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      // Position along primary axis (-span/2 to span/2)
      const primary = -span / 2 + t * span;
      // Normalize t so the visible area (0.2 to 0.8) maps to a full sine wave (0 to 2PI).
      // This ensures the curve crosses exactly at 0 (centered) when entering and exiting the screen.
      const visibleT = (t - 0.2) / 0.6;
      // Wavy motion on secondary axis
      const secondary = Math.sin(visibleT * Math.PI * 2) * amplitude;
      // Slight depth variation
      const tertiary = Math.cos(t * Math.PI * 4) * 0.5;

      if (isMobile) {
        // Vertical primary axis
        points.push(new THREE.Vector3(secondary, -primary, tertiary));
      } else {
        // Horizontal primary axis
        points.push(new THREE.Vector3(primary, secondary, tertiary));
      }
    }

    const curve = new THREE.CatmullRomCurve3(points);
    
    // Precalculate frames for tubes
    const segments = 100;
    const frames = [];
    for (let j = 0; j <= segments; j++) {
      const t = j / segments;
      const spinePoint = curve.getPointAt(t);
      const spineTangent = curve.getTangentAt(t);
      const up = new THREE.Vector3(0, 1, 0);
      if (Math.abs(spineTangent.y) > 0.99) up.set(1, 0, 0);
      const normal = new THREE.Vector3().crossVectors(spineTangent, up).normalize();
      const binormal = new THREE.Vector3().crossVectors(spineTangent, normal).normalize();
      frames.push({ spinePoint, normal, binormal });
    }

    return { baseCurve: curve, baseFrames: frames };
  }, [nodes.length, viewport.width, viewport.height]);

  // Filament data
  const filamentsData = useMemo(() => {
    const filamentCount = 20;
    const data = [];
    for (let i = 0; i < filamentCount; i++) {
      data.push({
        frequency: 0.5 + Math.random() * 2.5,
        amplitude: 0.2 + Math.random() * 1.0, // Reduced width to decrease separation
        phaseShift: Math.random() * Math.PI * 2,
        radius: 0.02 + Math.random() * 0.05,
      });
    }
    return data;
  }, []);

  // Calculate Node positions
  const nodePositions = useMemo(() => {
    return nodes.map((_, i) => {
      // Space evenly within the visible segment of the curve [0.2, 0.8] because the curve spans 1.5x viewport
      const startT = 0.2;
      const endT = 0.8;
      const normalizedT = (i + 1) / (nodes.length + 1);
      const t = startT + (normalizedT * (endT - startT));
      return baseCurve.getPointAt(t);
    });
  }, [baseCurve, nodes]);

  // Tubes Ref
  const tubesGroupRef = useRef<THREE.Group>(null);
  const tubesRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    // Update Filaments uniforms
    const hoveredNode = nodes.find(n => n.id === hoveredNodeId);
    if (hoveredNode) {
      const hoveredIndex = nodes.findIndex(n => n.id === hoveredNodeId);
      const pos = nodePositions[hoveredIndex];
      filamentUniforms.uHoverPos.value.copy(pos);
      filamentUniforms.uHoverColor.value.setStyle(hoveredNode.color);
      filamentUniforms.uHoverIntensity.value = THREE.MathUtils.lerp(filamentUniforms.uHoverIntensity.value, 1.0, delta * 5);
    } else {
      filamentUniforms.uHoverIntensity.value = THREE.MathUtils.lerp(filamentUniforms.uHoverIntensity.value, 0.0, delta * 5);
    }

    // Animate tubes
    const twistTime = state.clock.getElapsedTime() * 0.5;
    const segments = 100;

    for (let i = 0; i < filamentsData.length; i++) {
      const data = filamentsData[i];
      const mesh = tubesRefs.current[i];
      if (!mesh) continue;

      const points = [];
      for (let j = 0; j <= segments; j++) {
        const frame = baseFrames[j];
        const t = j / segments;
        const angle = t * Math.PI * 2 * data.frequency + data.phaseShift - twistTime;
        const envelope = Math.sin(t * Math.PI); // Pinched ends

        const xOffset = Math.cos(angle) * data.amplitude * envelope;
        const yOffset = Math.sin(angle) * data.amplitude * envelope;

        const offset = frame.normal.clone().multiplyScalar(xOffset).add(frame.binormal.clone().multiplyScalar(yOffset));
        points.push(frame.spinePoint.clone().add(offset));
      }

      const filamentCurve = new THREE.CatmullRomCurve3(points);
      const newGeom = new THREE.TubeGeometry(filamentCurve, segments, data.radius, 5, false);
      
      mesh.geometry.dispose();
      mesh.geometry = newGeom;
    }
  });

  return (
    <group>
      <MagicFlowCameraAnimator nodePositions={nodePositions} nodes={nodes} />
      {(!selectedAttribute || transitioningAttribute) && (
        <group ref={tubesGroupRef}>
          {filamentsData.map((data, i) => {
            // Initial empty geometry to be updated in useFrame
            const initialGeom = new THREE.BufferGeometry();
            return (
              <mesh 
                key={i} 
                ref={(el) => tubesRefs.current[i] = el} 
                geometry={initialGeom} 
                material={filamentMat} 
              />
            );
          })}
        </group>
      )}

      {nodes.map((node, i) => (
        <MagicNode
          key={node.id}
          node={node}
          position={nodePositions[i]}
          isHovered={hoveredNodeId === node.id}
          onHover={(hovered) => setHoveredNodeId(hovered ? node.id : null)}
          onClick={onClick}
        />
      ))}
    </group>
  );
};

export default MagicFlow;
