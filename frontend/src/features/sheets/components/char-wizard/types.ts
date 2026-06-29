export interface CharacterAptitude {
  nombre: string;
  tipo: string;
  acciones: number;
  cooldown: number;
  descripcion: string;
}

export interface TraitSelection {
  nombre: string;
  nivel?: number | null;
}

export interface CharacterState {
  nombre: string;
  apellidos: string;
  categoria: string;
  raza: string;
  razaSecundaria: string;
  faccion: string;
  razaData: any;
  isWorgenCurse: boolean;
  atributos: Record<string, number>;
  talentos: Record<string, number>;
  rasgosPositivos: TraitSelection[];
  rasgosNegativos: string[];
  aptitudes: CharacterAptitude[];
  hechizos: string;
  habilidades: string;
  profesion: string;
  profesionDesc: string;
}

export interface MetaData {
  racesData: any;
  attributesData: any;
  positiveTraits: any[];
  negativeTraits: any[];
  racesKeys: string[];
  attributesKeys: any[];
}
