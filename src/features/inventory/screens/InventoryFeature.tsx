import React from 'react';
import { Tesseract, type TesseractSection } from '../../../components/Tesseract/Tesseract';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';
import { TesseractSectionId } from '../../../enums/TesseractSectionId';

import { Guide } from '../components/Guide';
import { Armors } from '../components/Armors';
import { Shields } from '../components/Shields';
import { Weapons } from '../components/Weapons';

const inventorySections: TesseractSection[] = [
  {
    id: TesseractSectionId.GUIDE,
    title: 'Guía',
    markdown: '',
    customComponent: <Guide />
  },
  {
    id: TesseractSectionId.ARMORS,
    title: 'Armaduras',
    markdown: '',
    customComponent: <Armors />
  },
  {
    id: TesseractSectionId.SHIELDS,
    title: 'Escudos',
    markdown: '',
    customComponent: <Shields />
  },
  {
    id: TesseractSectionId.WEAPONS,
    title: 'Armas',
    markdown: '',
    customComponent: <Weapons />
  }
];

export const InventoryFeature: React.FC = () => {
  const setSelectedNode = useConstellationStore((state) => state.setSelectedNode);
  const transitioningNodeId = useConstellationStore((state) => state.transitioningNodeId);
  const returningNodeId = useConstellationStore((state) => state.returningNodeId);

  return (
    <div className={`w-full mt-[1%] h-[80vh] pointer-events-auto relative md:absolute md:top-0 md:left-0 md:mt-0 md:w-[80%] md:h-[95vh] md:max-w-none md:z-40 flex items-center justify-center transition-opacity duration-700 ${transitioningNodeId || returningNodeId ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <Tesseract
        color="#ff3344"
        sections={inventorySections}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};
