import React from 'react';
import { Tesseract, type TesseractSection } from '../../../components/Tesseract/Tesseract';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';

import introductionMd from '../../../assets/documents/sheet/introduction.md?raw';
import newCharMd from '../../../assets/documents/sheet/newChar.md?raw';
import attributesMd from '../../../assets/documents/sheet/attributes.md?raw';
import racesMd from '../../../assets/documents/sheet/races.md?raw';
import traitsMd from '../../../assets/documents/sheet/traits.md?raw';
import equipmentMd from '../../../assets/documents/sheet/equipment.md?raw';
import petsMd from '../../../assets/documents/sheet/pets.md?raw';
import specialsMd from '../../../assets/documents/sheet/specials.md?raw';

import { CharWizard } from './char-wizard/CharWizard';

const sheetSections: TesseractSection[] = [
  {
    id: 'introduction',
    title: 'Introducción',
    markdown: introductionMd
  },
  {
    id: 'newChar',
    title: 'Crear Ficha',
    markdown: newCharMd
  },
  {
    id: 'attributes',
    title: 'Atributos',
    markdown: attributesMd
  },
  {
    id: 'races',
    title: 'Razas',
    markdown: racesMd
  },
  {
    id: 'traits',
    title: 'Rasgos',
    markdown: traitsMd
  },
  {
    id: 'equipment',
    title: 'Equipamiento',
    markdown: equipmentMd
  },
  {
    id: 'pets',
    title: 'Mascotas',
    markdown: petsMd
  },
  {
    id: 'specials',
    title: 'Especiales',
    markdown: specialsMd
  },
  {
    id: 'stepByStep',
    title: 'Crear ficha paso a paso',
    markdown: '', // Will use customComponent instead
    customComponent: <CharWizard />
  }
];

export const SheetsFeature: React.FC = () => {
  const setSelectedNode = useConstellationStore((state) => state.setSelectedNode);

  return (
    <div className="w-full mt-[1%] h-[80vh] pointer-events-auto relative md:absolute md:top-0 md:left-0 md:mt-0 md:w-[80%] md:h-[95vh] md:max-w-none md:z-40">
      <Tesseract
        color="#00ff88"
        sections={sheetSections}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};
