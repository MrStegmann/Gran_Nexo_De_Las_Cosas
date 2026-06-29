import { NodeId } from '../../constellation/enums/NodeId';

export const AZULITO_SPEECHES: Record<string, string> = {
  DEFAULT: "¡Hola! Soy Azulito. Toca uno de los nodos estelares para descubrir más sobre este universo.",
  [NodeId.MECANICAS]: "En Mecánicas encontrarás las reglas fundamentales que rigen este mundo. ¡Presta mucha atención!",
  [NodeId.HECHIZOS]: "¡Magia y misterio! Los Hechizos te permitirán alterar la realidad misma si sabes cómo usarlos.",
  [NodeId.RUNAS]: "Las Runas son fragmentos de poder antiguo. Colecciónalas para obtener ventajas únicas.",
  [NodeId.HABILIDADES]: "Tus Habilidades definen quién eres. Descubre todo tu potencial y mejora constantemente.",
  [NodeId.FICHAS]: "Aquí puedes gestionar tus Fichas de personaje. ¡Cada detalle cuenta en tu aventura!",
  [NodeId.INVENTARIO]: "Revisa tu Inventario para ver todos los objetos y tesoros que has acumulado en tu viaje.",
  WARNING: "¡Cuidado! Parece que algo no va del todo bien. Mantén los ojos abiertos.",
  ERROR: "¡Ups! Algo se ha roto en el tejido del espacio-tiempo. Estamos intentando arreglarlo."
};
