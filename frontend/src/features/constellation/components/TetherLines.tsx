import React, { useMemo } from 'react';
import * as THREE from 'three';
import { nodeThemes } from '../data/constellationData';
import { NodeId } from '../enums/NodeId';
import { AnimatedTether } from './AnimatedTether';

interface TetherLinesProps {
  nodes: Array<{ id: NodeId; label: string; pos: THREE.Vector3 }>;
}

export const TetherLines: React.FC<TetherLinesProps> = ({ nodes }) => {
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
