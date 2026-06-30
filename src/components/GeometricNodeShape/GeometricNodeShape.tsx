import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Sparkles } from '@react-three/drei';
import { FloatingLabel } from '../FloatingLabel';

export interface GeometricNodeData {
  id: string;
  label: string;
  color?: string;
}

export interface GeometricNodeShapeProps {
  nodes: GeometricNodeData[];
  radius?: number; // The radius of the overall geometric shape
  nodeRadius?: number; // The radius of individual nodes
  lineWidth?: number; // The thickness of the connecting segments
  selectedNodeId?: string | null;
  onNodeClick?: (id: string) => void;
  onNodeHover?: (id: string | null) => void;
}

// ------------------------------------------------------------------
// Internal Segment Component
// ------------------------------------------------------------------
interface SegmentProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  startColor: string;
  endColor: string;
  lineWidth: number;
  isFading?: boolean;
}

const GeometricSegment: React.FC<SegmentProps> = ({ start, end, startColor, endColor, lineWidth, isFading = false }) => {
  const curve = useMemo(() => new THREE.LineCurve3(start, end), [start, end]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        colorStart: { value: new THREE.Color(startColor) },
        colorEnd: { value: new THREE.Color(endColor) },
        uAlpha: { value: 0.6 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorStart;
        uniform vec3 colorEnd;
        uniform float uAlpha;
        varying vec2 vUv;
        void main() {
          // vUv.x interpolates along the tube length
          vec3 finalColor = mix(colorStart, colorEnd, vUv.x);
          gl_FragColor = vec4(finalColor * 2.0, uAlpha); // Emissive multiplier
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [startColor, endColor]);

  // Magic filaments logic
  const baseFrames = useMemo(() => {
    const segments = 20;
    const frames = [];
    const dir = new THREE.Vector3().subVectors(end, start).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    if (Math.abs(dir.y) > 0.99) up.set(1, 0, 0);
    const normal = new THREE.Vector3().crossVectors(dir, up).normalize();
    const binormal = new THREE.Vector3().crossVectors(dir, normal).normalize();
    
    for (let j = 0; j <= segments; j++) {
      const t = j / segments;
      const spinePoint = curve.getPointAt(t);
      frames.push({ spinePoint, normal, binormal });
    }
    return frames;
  }, [curve, start, end]);

  const filamentsData = useMemo(() => {
    const filamentCount = 5; // Reduced count for performance, enough for visual magic
    const data = [];
    for (let i = 0; i < filamentCount; i++) {
      data.push({
        frequency: 1.0 + Math.random() * 2.0,
        amplitude: lineWidth * 3.0 + Math.random() * lineWidth * 2.0, 
        phaseShift: Math.random() * Math.PI * 2,
        radius: lineWidth * 0.3 + Math.random() * lineWidth * 0.4,
      });
    }
    return data;
  }, [lineWidth]);

  const tubesRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    material.uniforms.uAlpha.value = THREE.MathUtils.lerp(
      material.uniforms.uAlpha.value,
      isFading ? 0.0 : 0.6,
      0.1
    );

    const twistTime = state.clock.getElapsedTime() * 1.5;
    const segments = 20;

    for (let i = 0; i < filamentsData.length; i++) {
      const data = filamentsData[i];
      const mesh = tubesRefs.current[i];
      if (!mesh) continue;

      const points = [];
      for (let j = 0; j <= segments; j++) {
        const frame = baseFrames[j];
        const t = j / segments;
        const angle = t * Math.PI * 2 * data.frequency + data.phaseShift - twistTime;
        const envelope = Math.sin(t * Math.PI); // Pinch ends to connect precisely at nodes

        const xOffset = Math.cos(angle) * data.amplitude * envelope;
        const yOffset = Math.sin(angle) * data.amplitude * envelope;

        const offset = frame.normal.clone().multiplyScalar(xOffset).add(frame.binormal.clone().multiplyScalar(yOffset));
        points.push(frame.spinePoint.clone().add(offset));
      }

      const filamentCurve = new THREE.CatmullRomCurve3(points);
      const newGeom = new THREE.TubeGeometry(filamentCurve, segments, data.radius, 4, false);
      
      mesh.geometry.dispose();
      mesh.geometry = newGeom;
    }
  });

  return (
    <group>
      {filamentsData.map((_, i) => (
        <mesh 
          key={i} 
          ref={(el) => tubesRefs.current[i] = el} 
          material={material} 
        >
          {/* Initial empty geometry to avoid errors before first frame */}
          <bufferGeometry />
        </mesh>
      ))}
    </group>
  );
};

// ------------------------------------------------------------------
// Internal Node Component
// ------------------------------------------------------------------
interface NodeProps {
  node: GeometricNodeData;
  position: THREE.Vector3;
  radius: number;
  isSelected?: boolean;
  isAnySelected?: boolean;
  onClick?: (id: string) => void;
  onHover?: (hovered: boolean) => void;
}

const GeometricNode: React.FC<NodeProps> = ({ node, position, radius, isSelected, isAnySelected, onClick, onHover }) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  const baseColor = useMemo(() => new THREE.Color(node.color || '#ffffff'), [node.color]);
  const brightColor = useMemo(() => baseColor.clone().multiplyScalar(2), [baseColor]);
  const hoveredBrightColor = useMemo(() => baseColor.clone().multiplyScalar(3.5), [baseColor]);
  const labelDelay = useMemo(() => Math.random() * 500, []);

  useFrame((_, delta) => {
    const targetScale = hovered ? 1.3 : 1.0;
    const targetOpacity = (isAnySelected && !isSelected) ? 0.0 : 1.0;

    if (groupRef.current) {
      const targetPos = isSelected ? new THREE.Vector3(0, 0, 0) : position;
      groupRef.current.position.lerp(targetPos, 0.1);
    }

    if (coreRef.current && shellRef.current) {
      coreRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      shellRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      const coreMat = coreRef.current.material as THREE.MeshBasicMaterial;
      coreMat.opacity = THREE.MathUtils.lerp(coreMat.opacity !== undefined ? coreMat.opacity : 1, targetOpacity, 0.1);

      const shellMat = shellRef.current.material as THREE.MeshBasicMaterial;
      shellMat.opacity = THREE.MathUtils.lerp(shellMat.opacity, targetOpacity * 0.4, 0.1);

      // Rotación suave del escudo exterior (como el Nexo)
      shellRef.current.rotation.y += delta * 0.15;
      shellRef.current.rotation.x += delta * 0.08;
    }
  });

  const htmlOpacity = isAnySelected ? 0 : (hovered ? 1 : 0.7);

  return (
    <group 
      ref={groupRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; if (onHover) onHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; if (onHover) onHover(false); }}
      onClick={(e) => { e.stopPropagation(); if (onClick) onClick(node.id); }}
    >
      <mesh ref={coreRef}>
        {/* Esfera brillante simulando una estrella intensa */}
        <sphereGeometry args={[radius * 0.6, 32, 32]} />
        <meshBasicMaterial color={hovered ? hoveredBrightColor : brightColor} transparent opacity={1} />
      </mesh>
      
      <mesh ref={shellRef}>
        {/* Icosaedro wireframe como escudo/fulgor (estilo Nexo) */}
        <icosahedronGeometry args={[radius * 0.9, 1]} />
        <meshBasicMaterial 
          color={baseColor} 
          wireframe={true}
          transparent 
          opacity={0.4} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </mesh>

      {/* Invisible Hitbox to capture clicks reliably across the rotating wireframe */}
      <mesh visible={false}>
        <sphereGeometry args={[radius * 1.2, 16, 16]} />
        <meshBasicMaterial />
      </mesh>
      
      <Html position={[0, -radius - 0.5, 0]} center zIndexRange={[9999999, 9990000]} style={{ opacity: htmlOpacity, pointerEvents: 'none' }}>
        <FloatingLabel text={node.label} delay={labelDelay} speed={40} />
      </Html>
    </group>
  );
};

// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
export const GeometricNodeShape: React.FC<GeometricNodeShapeProps> = ({ 
  nodes, 
  radius = 4, 
  nodeRadius = 0.5, 
  lineWidth = 0.05,
  selectedNodeId,
  onNodeClick,
  onNodeHover
}) => {
  const { viewport } = useThree();
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : viewport.width < viewport.height;
  
  const effectiveRadius = isMobile ? radius * 0.5 : radius;
  const effectiveNodeRadius = isMobile ? nodeRadius * 0.8 : nodeRadius;
  
  // Calculate Node Positions
  const positions = useMemo(() => {
    const pos: THREE.Vector3[] = [];
    const n = nodes.length;
    
    // Mantenemos un radio uniforme para que no haya estiramientos (polígono regular).
    // Basado en la dimensión menor para que quepa bien en pantalla y sea grande.
    const dynamicRadius = Math.min(viewport.width, viewport.height) * 0.35;
    const baseRadius = Math.max(effectiveRadius * 1.2, dynamicRadius);
    
    if (n === 1) {
      pos.push(new THREE.Vector3(0, 0, 0));
    } else if (n === 2) {
      // Posicionamos verticalmente de manera simétrica
      pos.push(new THREE.Vector3(0, baseRadius * 0.8, 0));
      pos.push(new THREE.Vector3(0, -baseRadius * 0.8, 0));
    } else {
      // Creamos un polígono regular (círculo) para mantener distancias consistentes
      for (let i = 0; i < n; i++) {
        // Empezamos desde arriba (+Math.PI/2 en Three.js con +Y hacia arriba)
        const angle = (i * 2 * Math.PI) / n + Math.PI / 2; 
        pos.push(new THREE.Vector3(Math.cos(angle) * baseRadius, Math.sin(angle) * baseRadius, 0));
      }
    }

    // Centramos visualmente la figura ajustando según su bounding box
    if (pos.length > 0) {
      let minX = pos[0].x, maxX = pos[0].x;
      let minY = pos[0].y, maxY = pos[0].y;
      for (let i = 1; i < pos.length; i++) {
        if (pos[i].x < minX) minX = pos[i].x;
        if (pos[i].x > maxX) maxX = pos[i].x;
        if (pos[i].y < minY) minY = pos[i].y;
        if (pos[i].y > maxY) maxY = pos[i].y;
      }
      
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;
      
      for (let i = 0; i < pos.length; i++) {
        pos[i].x -= centerX;
        pos[i].y -= centerY;
      }
    }
    
    return pos;
  }, [nodes.length, effectiveRadius, viewport.height, viewport.width]);

  // Calculate Segments (Edges between nodes)
  const segments = useMemo(() => {
    const getEdgePoints = (p1: THREE.Vector3, p2: THREE.Vector3, offset: number) => {
      const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
      const start = new THREE.Vector3().copy(p1).add(dir.clone().multiplyScalar(offset));
      const end = new THREE.Vector3().copy(p2).sub(dir.clone().multiplyScalar(offset));
      return { start, end };
    };

    const e: { start: THREE.Vector3; end: THREE.Vector3; startColor: string; endColor: string }[] = [];
    const n = nodes.length;
    
    if (n === 2) {
      const { start, end } = getEdgePoints(positions[0], positions[1], effectiveNodeRadius);
      e.push({ 
        start, 
        end, 
        startColor: nodes[0].color || '#fff', 
        endColor: nodes[1].color || '#fff' 
      });
    } else if (n > 2) {
      for (let i = 0; i < n; i++) {
        const nextIndex = (i + 1) % n;
        const { start, end } = getEdgePoints(positions[i], positions[nextIndex], effectiveNodeRadius);
        e.push({ 
          start, 
          end, 
          startColor: nodes[i].color || '#fff', 
          endColor: nodes[nextIndex].color || '#fff' 
        });
      }
    }
    return e;
  }, [positions, nodes, effectiveNodeRadius]);

  // Generate random colors for particles based on node colors
  const particleColors = useMemo(() => {
    const count = 150;
    const colors = new Float32Array(count * 3);
    const nodeColors = nodes.map(n => new THREE.Color(n.color || '#ffffff'));
    
    if (nodeColors.length === 0) {
      nodeColors.push(new THREE.Color('#ffffff'));
    }

    for (let i = 0; i < count; i++) {
      const randomColor = nodeColors[Math.floor(Math.random() * nodeColors.length)];
      colors[i * 3] = randomColor.r;
      colors[i * 3 + 1] = randomColor.g;
      colors[i * 3 + 2] = randomColor.b;
    }
    return colors;
  }, [nodes]);

  if (nodes.length === 0) return null;

  return (
    <group>
      {/* Partículas de polvo mágico de fondo (situadas detrás de los nodos en Z=-8 para que no bloqueen) */}
      <Sparkles 
        count={150}
        scale={[30, 30, 4]} 
        size={2.3}
        speed={0.3}
        opacity={0.4}
        color={particleColors}
        position={[0, 0, -8]}
        noise={1}
      />

      {/* Draw Segments */}
      {segments.map((seg, idx) => (
        <GeometricSegment 
          key={`segment-${idx}`}
          start={seg.start}
          end={seg.end}
          startColor={seg.startColor}
          endColor={seg.endColor}
          lineWidth={lineWidth}
          isFading={!!selectedNodeId}
        />
      ))}

      {/* Draw Nodes */}
      {nodes.map((node, idx) => (
        <GeometricNode 
          key={`node-${node.id}`}
          node={node}
          position={positions[idx]}
          radius={effectiveNodeRadius}
          isSelected={node.id === selectedNodeId}
          isAnySelected={!!selectedNodeId}
          onClick={onNodeClick}
          onHover={(hovered) => {
            if (onNodeHover) onNodeHover(hovered ? node.id : null);
          }}
        />
      ))}
    </group>
  );
};
