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
    { id: SchoolId.ARCANE, label: 'Arcano', color: themeColors['theme-arcane'], description: '', spells: arcaneSpells },
    { id: SchoolId.FEL, label: 'Vil', color: themeColors['theme-fel'], description: '', spells: felSpells },
    { id: SchoolId.NATURE, label: 'Naturaleza', color: themeColors['theme-nature'], description: '', spells: natureSpells },
    { id: SchoolId.SHADOW, label: 'Sombras', color: themeColors['theme-shadow'], description: '', spells: shadowSpells },
    { id: SchoolId.NECRO, label: 'Nigromancia', color: themeColors['theme-necro'], description: '', spells: necroSpells }
  ],
  [AttributeId.VOLUNTAD]: [
    { id: SchoolId.ELUNE, label: 'Elune', color: themeColors['theme-elune'], description: '', spells: eluneSpells },
    { id: SchoolId.HOLY, label: 'Sagrado', color: themeColors['theme-holy'], description: '', spells: holySpells },
    { id: SchoolId.ELEMENTAL, label: 'Elemental', color: themeColors['theme-elemental'], description: '', spells: elementalSpells },
    { id: SchoolId.CHI, label: 'Chi', color: themeColors['theme-chi'], description: '', spells: chiSpells }
  ]
};
