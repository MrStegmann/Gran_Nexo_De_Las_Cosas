export const SchoolId = {
  ARCANE: 'arcane',
  FEL: 'fel',
  NATURE: 'nature',
  SHADOW: 'shadow',
  NECRO: 'necro',
  ELUNE: 'elune',
  HOLY: 'holy',
  ELEMENTAL: 'elemental',
  CHI: 'chi',
} as const;

export type SchoolId = typeof SchoolId[keyof typeof SchoolId];
