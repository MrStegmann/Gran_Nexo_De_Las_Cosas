export const NodeId = {
  MECANICAS: 'mecanicas',
  HECHIZOS: 'hechizos',
  RUNAS: 'runas',
  HABILIDADES: 'habilidades',
  FICHAS: 'fichas',
  INVENTARIO: 'inventario'
} as const;

export type NodeId = typeof NodeId[keyof typeof NodeId];
