export const AttributeId = {
  INTELIGENCIA: 'inteligencia',
  VOLUNTAD: 'voluntad',
  CONSTITUCION: 'constitucion',
  FUERZA: 'fuerza',
  DESTREZA: 'destreza',
} as const;

export type AttributeId = typeof AttributeId[keyof typeof AttributeId];
