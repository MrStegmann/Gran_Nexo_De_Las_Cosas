import React from 'react';
import { Tesseract, type TesseractSection } from '../../../components/Tesseract/Tesseract';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';

const sampleSections: TesseractSection[] = [
  {
    id: 'combate',
    title: 'Combate',
    markdown: `
# Reglas de Combate

El combate en el Gran Nexo es dinámico y rápido.

## Iniciativa
Todos los participantes lanzan un d20 y añaden su modificador de Agilidad. Los empates se resuelven a favor de quien tenga mayor atributo base.

## Acciones en tu turno
Durante tu turno puedes realizar:
* Una Acción Principal (Atacar, Lanzar Hechizo)
* Una Acción Rápida (Moverte, Usar Objeto)
* Una Reacción (fuera de tu turno)

### Atacar
Tira 1d20 + modificador de arma contra la Defensa del objetivo.

> "El buen ataque es el que no se ve venir." - *Mael, Maestro de Espadas*
    `
  },
  {
    id: 'estados',
    title: 'Estados',
    markdown: `
# Estados Alterados

Los personajes pueden sufrir varias condiciones durante la aventura.

## Ceguera
El personaje sufre desventaja en todas las tiradas de ataque y percepción visual.
* **Cura:** Magia Restauradora o tras 1 descanso largo.

## Envenenamiento
Recibe 1d4 de daño directo al inicio de cada turno.
* **Cura:** Antídoto o Magia Purificadora.

### Veneno Paralizante
Una variante letal que además reduce tu movimiento a 0.
    `
  },
  {
    id: 'recursos',
    title: 'Recursos',
    markdown: `
# Gestión de Recursos

Los héroes usan distintos recursos para potenciar sus habilidades.

## Puntos de Vida (HP)
Representan la vitalidad. Si llegan a 0, el personaje cae Inconsciente.

## Puntos de Magia (MP)
Se usan para conjurar magia y activar habilidades arcanas. Se recuperan descansando.

### Descanso Corto
Recuperas la mitad de tus MP máximos y puedes gastar *Dados de Golpe* para sanar HP.
    `
  }
];

export const MechanicsFeature: React.FC = () => {
  const setSelectedNode = useConstellationStore((state) => state.setSelectedNode);

  return (
    <div className="w-[98%] mt-[1%] md:w-full md:mt-0 max-w-5xl h-[75vh] md:h-[80vh] pointer-events-auto relative">
      <Tesseract 
        color="#ffb700" 
        sections={sampleSections}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};
