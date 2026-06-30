export const TesseractSectionId = {
  // Sheets
  INTRODUCTION: 'introduction',
  NEW_CHAR: 'newChar',
  ATTRIBUTES: 'attributes',
  RACES: 'races',
  TRAITS: 'traits',
  EQUIPMENT: 'equipment',
  PETS: 'pets',
  SPECIALS: 'specials',
  STEP_BY_STEP: 'stepByStep',

  // Inventory
  GUIDE: 'guide',
  ARMORS: 'amors',
  SHIELDS: 'shields',
  WEAPONS: 'weapons',

  // Mechanics
  RULES: 'reglas',
  COMBAT: 'combate',
  STATES: 'estados',
  WOUNDS: 'heridas',
  RESOURCES: 'recursos',
} as const;

export type TesseractSectionId = typeof TesseractSectionId[keyof typeof TesseractSectionId];
