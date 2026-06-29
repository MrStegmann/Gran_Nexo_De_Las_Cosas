import React, { useState, useEffect, useMemo } from 'react';
import { constellationData } from '../data/constellationData';
import { StarMap } from './StarMap';
import { Nexo } from './Nexo';
import { LeyNode } from './LeyNode';
import { TetherLines } from './TetherLines';
import { useConstellationStore } from '../store/useConstellationStore';
import { InsideNode } from './InsideNode';

export const Constellation: React.FC = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const selectedNodeId = useConstellationStore((state) => state.selectedNodeId);

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

  if (selectedNodeId) {
    return <InsideNode nodeId={selectedNodeId} />;
  }

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
