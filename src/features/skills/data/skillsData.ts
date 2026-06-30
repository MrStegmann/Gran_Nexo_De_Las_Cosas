import type { MagicFlowNodeData } from '../../../components/MagicFlow';

export const themeColors: Record<string, string> = {
  'theme-constitution': '#ff4500', // Orange-red
  'theme-strength': '#cc0000',     // Red
  'theme-dexterity': '#00cc66',    // Green
};

import constitutionSkills from '../../../data/meta/constitution_skills.json';
import strengthSkills from '../../../data/meta/strength_skills.json';
import dexSkills from '../../../data/meta/dex_skills.json';

export const skillsAttributes: MagicFlowNodeData[] = [
  {
    id: 'constitucion',
    label: 'Constitución',
    color: themeColors['theme-constitution'],
    description: 'La base de tu resistencia física y aguante. ¡Para que no te derriben al primer golpe!',
    skills: constitutionSkills
  },
  {
    id: 'fuerza',
    label: 'Fuerza',
    color: themeColors['theme-strength'],
    description: 'Puro poder físico. ¡Aplasta a tus enemigos y levanta objetos pesados!',
    skills: strengthSkills
  },
  {
    id: 'destreza',
    label: 'Destreza',
    color: themeColors['theme-dexterity'],
    description: 'Agilidad, reflejos y precisión en el combate. ¡Muévete como el viento!',
    skills: dexSkills
  }
];
