import React from 'react';
import { Tesseract, type TesseractSection } from '../../components/Tesseract/Tesseract';
import { useConstellationStore } from '../constellation/store/useConstellationStore';
import { TesseractSectionId } from '../../enums/TesseractSectionId';

import { MainInfo, mainInfoSearchText } from './screens/MainInfo';
import { Gathering, gatheringMatchSearch } from './screens/Gathering';

const professionsSections: TesseractSection[] = [
  {
    id: TesseractSectionId.PROFESSIONS_INFO,
    title: 'Información',
    markdown: '', // Not used, we use custom component instead
    customComponent: <MainInfo />,
    matchSearch: (query) => mainInfoSearchText.includes(query.toLowerCase())
  },
  {
    id: TesseractSectionId.PROFESSIONS_GATHERING,
    title: 'Recolección',
    markdown: '', // Not used
    customComponent: <Gathering />,
    matchSearch: gatheringMatchSearch
  }
];

export const ProfessionsFeature: React.FC = () => {
  const setSelectedNode = useConstellationStore((state) => state.setSelectedNode);
  const transitioningNodeId = useConstellationStore((state) => state.transitioningNodeId);
  const returningNodeId = useConstellationStore((state) => state.returningNodeId);

  return (
    <div className={`w-full mt-[1%] h-[80vh] pointer-events-auto relative md:absolute md:top-0 md:left-0 md:mt-0 md:w-[80%] md:h-[95vh] md:max-w-none md:z-40 transition-opacity duration-700 ${transitioningNodeId || returningNodeId ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <Tesseract
        color="#ffd700" // Amarillo para profesiones
        sections={professionsSections}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};
