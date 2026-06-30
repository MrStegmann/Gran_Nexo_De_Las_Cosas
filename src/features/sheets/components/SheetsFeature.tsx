import React from 'react';
import { Tesseract, type TesseractSection } from '../../../components/Tesseract/Tesseract';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';
import { TesseractSectionId } from '../../../enums/TesseractSectionId';

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
    id: TesseractSectionId.INTRODUCTION,
    title: 'Introducción',
    markdown: introductionMd
  },
  {
    id: TesseractSectionId.NEW_CHAR,
    title: 'Nuevo Personaje',
    markdown: newCharMd
  },
  {
    id: TesseractSectionId.ATTRIBUTES,
    title: 'Atributos',
    markdown: attributesMd
  },
  {
    id: TesseractSectionId.RACES,
    title: 'Razas',
    markdown: racesMd
  },
  {
    id: TesseractSectionId.TRAITS,
    title: 'Rasgos',
    markdown: traitsMd
  },
  {
    id: TesseractSectionId.EQUIPMENT,
    title: 'Equipamiento',
    markdown: equipmentMd
  },
  {
    id: TesseractSectionId.PETS,
    title: 'Mascotas',
    markdown: petsMd
  },
  {
    id: TesseractSectionId.SPECIALS,
    title: 'Especiales',
    markdown: specialsMd
  },
  {
    id: TesseractSectionId.STEP_BY_STEP,
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
