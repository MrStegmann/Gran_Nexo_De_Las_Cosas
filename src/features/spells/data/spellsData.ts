import type { MagicFlowNodeData } from '../../../components/MagicFlow';
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
    id: 'inteligencia',
    label: 'Inteligencia',
    color: '#0044ff', // Darker blue
    description: '¡La zona de los listillos! Aquí hay Arcano, Vil, Naturaleza, Sombras y Nigromancia. ¡No te explotes el cerebro!'
  },
  {
    id: 'voluntad',
    label: 'Voluntad',
    color: '#ffd700',
    description: '¡Pura cabezonería mágica! Fe, Elune, Luz Sagrada, Elemental y Chi. ¡Paz mental y explosiones de luz!'
  }
];



export const schoolsData: Record<'inteligencia' | 'voluntad', MagicFlowNodeData[]> = {
  inteligencia: [
    { id: 'arcane', label: 'Arcano', color: themeColors['theme-arcane'], description: '', spells: arcaneSpells },
    { id: 'fel', label: 'Vil', color: themeColors['theme-fel'], description: '', spells: felSpells },
    { id: 'nature', label: 'Naturaleza', color: themeColors['theme-nature'], description: '', spells: natureSpells },
    { id: 'shadow', label: 'Sombras', color: themeColors['theme-shadow'], description: '', spells: shadowSpells },
    { id: 'necro', label: 'Nigromancia', color: themeColors['theme-necro'], description: '', spells: necroSpells }
  ],
  voluntad: [
    { id: 'elune', label: 'Elune', color: themeColors['theme-elune'], description: '', spells: eluneSpells },
    { id: 'holy', label: 'Sagrado', color: themeColors['theme-holy'], description: '', spells: holySpells },
    { id: 'elemental', label: 'Elemental', color: themeColors['theme-elemental'], description: '', spells: elementalSpells },
    { id: 'chi', label: 'Chi', color: themeColors['theme-chi'], description: '', spells: chiSpells }
  ]
};
