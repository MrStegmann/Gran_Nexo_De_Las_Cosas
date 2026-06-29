export const ATTR_ICONS: Record<string, string> = {
  Destreza: '🏃',
  Fuerza: '💪',
  Inteligencia: '🔮',
  Voluntad: '🌀',
  Constitución: '❤️',
  Sabiduría: '🦉',
  Carisma: '🗣️'
};

export const ATTR_KEY_MAP: Record<string, string> = {
  Destreza: 'dexterity',
  Fuerza: 'strength',
  Inteligencia: 'intelligence',
  Voluntad: 'willpower',
  Constitución: 'constitution',
  Sabiduría: 'wisdom',
  Carisma: 'charisma'
};

export const CAT_KEY_MAP: Record<string, string> = {
  Novato: 'noob',
  Normal: 'normal',
  Elite: 'elite',
  Boss: 'boss'
};

export const ATTR_DESC: Record<string, string> = {
  Destreza: 'Agilidad, precisión, sigilo, esquiva.',
  Fuerza: 'Combate físico potente, resistencia bruta, atletismo.',
  Inteligencia: 'Hechizos arcanos, viles, naturaleza, sombras, nigromancia. Cada punto +1 Maná.',
  Voluntad: 'Hechizos de Fe, Elemental, Chi. Resistencia mental. Cada punto +1 Espíritu.',
  Constitución: 'Resistencia física y estados negativos. Cada punto +1 Vida.',
  Sabiduría: 'Percepción, supervivencia, artesanía, relación con animales.',
  Carisma: 'Interacción con NPCs: persuasión, diplomacia, comercio...'
};

export const CATEGORY_DATA: Record<string, any> = {
  Novato: { attrPoints: 0, slots: 2, hpBase: 15, resourceBase: 5, positiveSlots: 2, negativeMin: 2 },
  Normal: { attrPoints: 5, slots: 5, hpBase: 20, resourceBase: 10, positiveSlots: 2, negativeMin: 2 }
};

export const STEP_META = [
  { icon: '🪪', title: 'Identidad' },
  { icon: '💪', title: 'Atributos' },
  { icon: '✨', title: 'Talentos' },
  { icon: '🎭', title: 'Rasgos' },
  { icon: '⚡', title: 'Aptitudes' },
  { icon: '📖', title: 'Hechizos & Hab.' },
  { icon: '🏆', title: 'Profesión' }
];

export const INITIAL_STATE = {
  nombre: '',
  apellidos: '',
  categoria: 'Normal',
  raza: '',
  razaSecundaria: '',
  faccion: '',
  razaData: null,
  isWorgenCurse: false,
  atributos: { Destreza: 0, Fuerza: 0, Inteligencia: 0, Voluntad: 0, Constitución: 0, Sabiduría: 0, Carisma: 0 },
  talentos: {},
  rasgosPositivos: [],
  rasgosNegativos: [],
  aptitudes: [],
  hechizos: '',
  habilidades: '',
  profesion: '',
  profesionDesc: ''
};
