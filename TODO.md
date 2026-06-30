
# src\features\sheets\components\char-wizard
- Al cambiar de paso, el scroll permanece al final. Cada vez que pasa de página debe volver al principio para una experiencia guiada más natural.
- Añadir buscador de hechizos y habilidades para el paso Hechizos & Habilidades
  - Reducir las ranuras disponibles en función de los hechizos/habilidades seleccionadas.
  - Añadir una lista a la derecha o abajo donde estén los hechizos y habilidades seleccionadas con información básica de cada uno.
- Eliminar del paso final los campos:
  - ¿Qué sabe hacer?
  - "Sin nombre"
  - Campo profesión con lista de profesión (Sin rellenar, marcar como "WIP").
- Botón Ficha Completa no hace nada. Cambiar texto a "Terminado" y que reinicie el Wizard, volviendo al paso inicial. Añadir un modal de confirmación.
  - Titulo: ¿Has exportado los datos?
  - Descripción: Recuerda aplicar la exportación en el Addon antes de finalizar.


# src\features\skills\components\SkillList.tsx
- Los filtros Activos y pasivos no funcionan. No filtran.
- Las cards de las habilidades se ven superpuestas unas encimas de otras.
- Crea un encabezado que separe Pasivas de Activas en la lista.
- Para moviles: Una sola columna.
- Para tablets y desktop: 4 columnas.

# src\features\spells\components\SpellList.tsx
- Los filtros Trucos, Rapidos, Basicos y Potentes no funcionan. No filtran.
- Las cards de los hechizos se ven superpuestas unas encimas de otras.
- Para moviles: Una sola columna.
- Para tablets y desktop: 4 columnas.

# General
- Al pulsar y arrastrar para mover la camara, si mantienes pulsado y arrastras sobre un Nodo, accede al nodo. No debe ocurrir.