import type { MagicFlowNodeData } from '../../../components/MagicFlow';
import { AttributeId } from '../../constellation/enums/AttributeId';
import { SchoolId } from '../enums/SchoolId';
import arcaneSpells from '../../../data/meta/arcane.json';
import felSpells from '../../../data/meta/fel.json';
import natureSpells from '../../../data/meta/nature.json';
import shadowSpells from '../../../data/meta/shadow.json';
import necroSpells from '../../../data/meta/necromance.json';
import eluneSpells from '../../../data/meta/elune.json';
import holySpells from '../../../data/meta/holy_light.json';
import elementalSpells from '../../../data/meta/elemental.json';
import chiSpells from '../../../data/meta/chi.json';

export const themeColors: Record<string, string> = {
  'theme-arcane': '#00f0ff',
  'theme-fel': '#00ff2a',
  'theme-nature': '#32cd32',
  'theme-shadow': '#7a00ff',
  'theme-necro': '#00a8ff',
  'theme-elune': '#e0e0ff',
  'theme-holy': '#ffd700',
  'theme-elemental': '#ff4500',
  'theme-chi': '#00ffb2'
};

export const mainAttributes: MagicFlowNodeData[] = [
  {
    id: AttributeId.INTELIGENCIA,
    label: 'Inteligencia',
    color: '#0044ff', // Darker blue
    description: '¡La zona de los listillos! Aquí hay Arcano, Vil, Naturaleza, Sombras y Nigromancia. ¡No te explotes el cerebro!'
  },
  {
    id: AttributeId.VOLUNTAD,
    label: 'Voluntad',
    color: '#ffd700',
    description: '¡Pura cabezonería mágica! Fe, Elune, Luz Sagrada, Elemental y Chi. ¡Paz mental y explosiones de luz!'
  }
];



export const schoolsData: Record<typeof AttributeId.INTELIGENCIA | typeof AttributeId.VOLUNTAD, MagicFlowNodeData[]> = {
  [AttributeId.INTELIGENCIA]: [
    { id: SchoolId.ARCANE, label: 'Arcano', color: themeColors['theme-arcane'], description: 'Magia del orden y el espacio. Controla el tiempo y la pura realidad analítica.', spells: arcaneSpells },
    { id: SchoolId.FEL, label: 'Vil', color: themeColors['theme-fel'], description: 'Fuego verde y caos absoluto. Magia corrupta que exige un alto precio.', spells: felSpells },
    { id: SchoolId.NATURE, label: 'Naturaleza', color: themeColors['theme-nature'], description: 'El poder de los bosques y las bestias. Curación, veneno y fuerzas primigenias.', spells: natureSpells },
    { id: SchoolId.SHADOW, label: 'Sombras', color: themeColors['theme-shadow'], description: 'Oscuridad, maldiciones y engaños. Domina la psique y los miedos profundos.', spells: shadowSpells },
    { id: SchoolId.NECRO, label: 'Nigromancia', color: themeColors['theme-necro'], description: 'Magia de la muerte y la descomposición. Levanta a los caídos a tu servicio.', spells: necroSpells }
  ],
  [AttributeId.VOLUNTAD]: [
    { id: SchoolId.ELUNE, label: 'Elune', color: themeColors['theme-elune'], description: 'La pálida luz de la diosa lunar. Serenidad y poder ancestral de las estrellas.', spells: eluneSpells },
    { id: SchoolId.HOLY, label: 'Sagrado', color: themeColors['theme-holy'], description: 'La fuerza de la devoción y la Luz pura. Sana a tus aliados y quema la oscuridad.', spells: holySpells },
    { id: SchoolId.ELEMENTAL, label: 'Elemental', color: themeColors['theme-elemental'], description: 'Fuego, agua, tierra y viento. Canaliza la furia indomable de los elementos.', spells: elementalSpells },
    { id: SchoolId.CHI, label: 'Chi', color: themeColors['theme-chi'], description: 'La energía vital interior fluye. Golpes precisos, niebla y equilibrio espiritual.', spells: chiSpells }
  ]
};
