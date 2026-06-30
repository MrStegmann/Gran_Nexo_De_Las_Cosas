import React from 'react';
import { Tesseract, type TesseractSection } from '../../../components/Tesseract/Tesseract';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';
import { TesseractSectionId } from '../../../enums/TesseractSectionId';

import amorsMd from '../../../assets/documents/inventory/amors.md?raw';
import guideMd from '../../../assets/documents/inventory/guide.md?raw';
import shieldsMd from '../../../assets/documents/inventory/shields.md?raw';
import weaponsMd from '../../../assets/documents/inventory/weapons.md?raw';

const inventorySections: TesseractSection[] = [
  {
    id: TesseractSectionId.GUIDE,
    title: 'Guía',
    markdown: guideMd
  },
  {
    id: TesseractSectionId.ARMORS,
    title: 'Armaduras',
    markdown: amorsMd
  },
  {
    id: TesseractSectionId.SHIELDS,
    title: 'Escudos',
    markdown: shieldsMd
  },
  {
    id: TesseractSectionId.WEAPONS,
    title: 'Armas',
    markdown: weaponsMd
  }
];

export const InventoryFeature: React.FC = () => {
  const setSelectedNode = useConstellationStore((state) => state.setSelectedNode);

  return (
    <div className="w-full mt-[1%] h-[80vh] pointer-events-auto relative md:absolute md:top-0 md:left-0 md:mt-0 md:w-[80%] md:h-[95vh] md:max-w-none md:z-40 flex items-center justify-center">
      <Tesseract
        color="#ff3344"
        sections={inventorySections}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};
