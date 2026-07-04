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
  ARMORS: 'armors',
  SHIELDS: 'shields',
  WEAPONS: 'weapons',

  // Mechanics
  RULES: 'reglas',
  COMBAT: 'combate',
  STATES: 'estados',
  WOUNDS: 'heridas',
  RESOURCES: 'recursos',

  // Professions
  PROFESSIONS_INFO: 'informacion',
  PROFESSIONS_GATHERING: 'recoleccion',
} as const;

export type TesseractSectionId = typeof TesseractSectionId[keyof typeof TesseractSectionId];
