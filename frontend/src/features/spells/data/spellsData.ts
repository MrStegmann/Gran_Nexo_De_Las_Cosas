import type { MagicFlowNodeData } from '../../../components/MagicFlow';

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
    { id: 'arcane', label: 'Arcano', color: themeColors['theme-arcane'], description: 'Magia pura y matemáticas cósmicas.' },
    { id: 'fel', label: 'Vil', color: themeColors['theme-fel'], description: 'Fuego verde y caos desatado.' },
    { id: 'nature', label: 'Naturaleza', color: themeColors['theme-nature'], description: 'Plantas, venenos y equilibrio vital.' },
    { id: 'shadow', label: 'Sombras', color: themeColors['theme-shadow'], description: 'Vacío, susurros y locura.' },
    { id: 'necro', label: 'Nigromancia', color: themeColors['theme-necro'], description: 'La muerte no es el final.' }
  ],
  voluntad: [
    { id: 'elune', label: 'Elune', color: themeColors['theme-elune'], description: 'Magia lunar y protección astral.' },
    { id: 'holy', label: 'Sagrado', color: themeColors['theme-holy'], description: 'Luz pura, sanación y justicia.' },
    { id: 'elemental', label: 'Elemental', color: themeColors['theme-elemental'], description: 'Tierra, fuego, viento y agua.' },
    { id: 'chi', label: 'Chi', color: themeColors['theme-chi'], description: 'Energía interior y equilibrio.' }
  ]
};
