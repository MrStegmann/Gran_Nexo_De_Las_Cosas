import React from 'react';
import { Tesseract, type TesseractSection } from '../../../components/Tesseract/Tesseract';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';
import { TesseractSectionId } from '../../../enums/TesseractSectionId';

import { Introduction } from '../components/Introduction';
import { NewChar } from '../components/NewChar';
import { Attributes } from '../components/Attributes';
import { Races } from '../components/Races';
import { Traits } from '../components/Traits';
import { Equipment } from '../components/Equipment';
import { Pets } from '../components/Pets';
import { Specials } from '../components/Specials';
import { StepByStep } from '../components/StepByStep';
import { CharWizard } from '../components/char-wizard/CharWizard';

const sheetSections: TesseractSection[] = [
  {
    id: TesseractSectionId.INTRODUCTION,
    title: 'Introducción',
    markdown: '',
    customComponent: <Introduction />
  },
  {
    id: TesseractSectionId.NEW_CHAR,
    title: 'Nuevo Personaje',
    markdown: '',
    customComponent: <NewChar />
  },
  {
    id: TesseractSectionId.ATTRIBUTES,
    title: 'Atributos',
    markdown: '',
    customComponent: <Attributes />
  },
  {
    id: TesseractSectionId.RACES,
    title: 'Razas',
    markdown: '',
    customComponent: <Races />
  },
  {
    id: TesseractSectionId.TRAITS,
    title: 'Rasgos',
    markdown: '',
    customComponent: <Traits />
  },
  {
    id: TesseractSectionId.EQUIPMENT,
    title: 'Equipamiento',
    markdown: '',
    customComponent: <Equipment />
  },
  {
    id: TesseractSectionId.PETS,
    title: 'Mascotas',
    markdown: '',
    customComponent: <Pets />
  },
  {
    id: TesseractSectionId.SPECIALS,
    title: 'Especiales',
    markdown: '',
    customComponent: <Specials />
  },
  {
    id: TesseractSectionId.STEP_BY_STEP,
    title: 'Crear ficha paso a paso',
    markdown: '',
    customComponent: <CharWizard />
  }
];

export const SheetsFeature: React.FC = () => {
  const setSelectedNode = useConstellationStore((state) => state.setSelectedNode);
  const transitioningNodeId = useConstellationStore((state) => state.transitioningNodeId);
  const returningNodeId = useConstellationStore((state) => state.returningNodeId);

  return (
    <div className={`w-full mt-[1%] h-[80vh] pointer-events-auto relative md:absolute md:top-0 md:left-0 md:mt-0 md:w-[80%] md:h-[95vh] md:max-w-none md:z-40 transition-opacity duration-700 ${transitioningNodeId || returningNodeId ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <Tesseract
        color="#00ff88"
        sections={sheetSections}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};
