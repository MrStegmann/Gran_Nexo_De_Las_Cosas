import React from 'react';
import { Tesseract, type TesseractSection } from '../../../components/Tesseract/Tesseract';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';
import { TesseractSectionId } from '../../../enums/TesseractSectionId';

import combateMd from '../../../assets/documents/system/Combate.md?raw';
import estadosMd from '../../../assets/documents/system/Estados.md?raw';
import heridasMd from '../../../assets/documents/system/Heridas.md?raw';
import reglasMd from '../../../assets/documents/system/Reglas.md?raw';
import recursosMd from '../../../assets/documents/system/Recursos.md?raw';

const systemSections: TesseractSection[] = [
  {
    id: TesseractSectionId.RULES,
    title: 'Reglas',
    markdown: reglasMd
  },
  {
    id: TesseractSectionId.COMBAT,
    title: 'Combate',
    markdown: combateMd
  },
  {
    id: TesseractSectionId.STATES,
    title: 'Estados',
    markdown: estadosMd
  },
  {
    id: TesseractSectionId.WOUNDS,
    title: 'Heridas',
    markdown: heridasMd
  },
  {
    id: TesseractSectionId.RESOURCES,
    title: 'Recursos',
    markdown: recursosMd
  }
];

export const MechanicsFeature: React.FC = () => {
  const setSelectedNode = useConstellationStore((state) => state.setSelectedNode);

  return (
    <div className="w-full mt-[1%] h-[80vh] pointer-events-auto relative md:absolute md:top-0 md:left-0 md:mt-0 md:w-[80%] md:h-[95vh] md:max-w-none md:z-40">
      <Tesseract
        color="#ffb700"
        sections={systemSections}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};
