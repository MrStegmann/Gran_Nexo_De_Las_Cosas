import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';
import { NodeId } from '../../constellation/enums/NodeId';

export const Equipment: React.FC = () => {
  const setPendingSectionId = useConstellationStore(state => state.setPendingSectionId);
  const setTransitioningNode = useConstellationStore(state => state.setTransitioningNode);
  const navigate = useNavigate();

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setPendingSectionId(sectionId);
    setTransitioningNode(NodeId.INVENTARIO);
    navigate(`/inventario#${sectionId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-2 py-8 animate-[fadeIn_0.5s_ease-out_forwards]">
      <h1 id="equipamiento" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Equipamiento: Armas, Armaduras y Escudos</h1>
      
      <blockquote className="border-l-4 pl-4 italic opacity-80 my-6 border-[var(--theme-color)] bg-[color-mix(in_srgb,var(--theme-color)_5%,transparent)] py-3 pr-4 rounded-r">
        <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
          <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">LA MITIGACIÓN FÍSICA ES VITAL:</strong> Tener una <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">armadura</strong> y/o un <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">escudo</strong> equipados es <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">MUY importante</strong> en este sistema de rol. El daño directo no mitigado puede superar el umbral de salud y causar <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Daño Masivo</strong>, lo cual resulta en heridas físicas graves.
        </p>
      </blockquote>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="importancia-armadura-escudos" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">🛡️ La Importancia de la Armadura y los Escudos</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">En el nexo de combate de este sistema de rol, la supervivencia no depende únicamente de esquivar o tener mucha vida:</p>
      
      <ol className="list-decimal list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:font-bold">
        <li className="pl-1 sm:pl-2">
          <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Evitar el Daño (Armaduras):</strong>
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">La armadura absorbe parte del daño que recibes. Esto se le conoce como <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Reducción Física</strong> o <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Reducción Mágica</strong>.</li>
            <li className="pl-1 sm:pl-2">Si la armadura reduce MÁS del daño que vas a recibir, el daño será 0, pero la armadura perderá durabilidad.</li>
            <li className="pl-1 sm:pl-2">Las armaduras tienen <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">durabilidad</strong> (número de golpes que absorbe antes de romperse). Una armadura rota no reduce daño ni aplica efectos especiales.</li>
            <li className="pl-1 sm:pl-2">Existen cuatro piezas independientes: Cabeza, Pecho, Guantes y Piernas. Solo la pieza que reciba el impacto mitiga ese daño específico.</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">
          <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Uso de Escudos (Defensa Robusta):</strong>
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">Equipar un escudo en la mano secundaria es indispensable para utilizar el talento de <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Defensa Robusta</strong> (Fuerza).</li>
            <li className="pl-1 sm:pl-2">Actúan como una "segunda vida": si fallas un bloqueo, el escudo absorbe el daño en su propia durabilidad, siempre que lo describas activamente en tu <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">emote Active</strong>.</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">
          <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Armas:</strong>
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">Determinan el daño base de tus ataques (de d4 a d12). El daño total se calcula sumando el daño de tu arma al valor de tu talento asociado (redondeado hacia abajo). Los puños desnudos causan <code>1D4</code> de daño base y escalan con Brutalidad o Acrobacias.</li>
          </ul>
        </li>
      </ol>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="resumen-armaduras" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">👕 Resumen de Armaduras</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Las armaduras se dividen por materiales y piezas, cada una con mitigaciones y penalizaciones:</p>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Tipos de Armadura</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Tela:</strong> <code>0</code> Reducción física, <code>+4</code> Reducción mágica. Durabilidad de 2 golpes. Vulnerable a ataques perforantes, cortantes y contundentes.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Cuero:</strong> <code>+2</code> Reducción física, <code>+1</code> Reducción mágica. Durabilidad de 4 golpes. Vulnerable a perforación y débil a cortes.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Malla:</strong> <code>+4</code> Reducción física, <code>0</code> Reducción mágica. Durabilidad de 6 golpes. Vulnerable a perforación, resistente a cortes (daño a la mitad), y débil a golpes contundentes. Requiere Brutalidad y aplica penalizaciones menores de movimiento y defensa ágil en cabeza/guantes.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Placas:</strong> <code>+6</code> Reducción física, <code>0</code> Reducción mágica. Durabilidad de 8 golpes. Resistente a perforantes, muy resistente a cortantes (daño 0 y no reduce durabilidad), y vulnerable a contundentes. Requiere hasta <code>3 Brutalidad</code> total y tiene severas penalizaciones de movimiento, sigilo y defensa ágil.</li>
      </ul>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Refuerzos y Combinaciones</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Refuerzos:</strong> Cada pieza de armadura puede llevar un único refuerzo (Cuero, Malla o Placa) que aumenta su reducción física y durabilidad a cambio de requisitos de Brutalidad o penalizaciones a la Defensa Ágil.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Combinaciones:</strong> Es posible combinar hasta dos materiales por pieza de armadura (p. ej., Cuero/Malla) para promediar estadísticas, pero estas piezas mixtas no admiten refuerzos y no se pueden combinar Malla y Placa entre sí.</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="resumen-escudos" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">🛡️ Resumen de Escudos</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Los escudos mitigan daño físico y permiten realizar golpes contundentes:</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Escudo Ligero:</strong> <code>10</code> durabilidad, <code>+1</code> Reducción física. Golpe: <code>1D4 + Brutalidad</code>.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Escudo Medio:</strong> <code>15</code> durabilidad, <code>+2</code> Reducción física. Golpe: <code>1D6 + Brutalidad</code>. Requiere <code>1 Brutalidad</code>. Penaliza <code>-1</code> Defensa Ágil y Acrobacias.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Escudo Pesado:</strong> <code>20</code> durabilidad, <code>+3</code> Reducción física. Golpe: <code>1D8 + Brutalidad</code>. Requiere <code>2 Brutalidad</code>. Penaliza <code>-4</code> Defensa Ágil/Acrobacias y <code>-2</code> Movimiento.</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="resumen-armas" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">⚔️ Resumen de Armas</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Las armas definen tu potencia ofensiva y se agrupan según su talento base:</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Armas de Combate Ágil (Destreza):</strong> Daga (<code>1D4</code>, doble empuñadura), Látigo (<code>1D4</code>), Hacha de mano (<code>1D6</code>), Bastón (<code>1D6</code>), Hoz (<code>1D4</code>), Lanza (<code>1D6/1D8</code>), Estoque (<code>1D8</code> si la otra mano está libre, si no <code>1D4</code>), Cimitarra (<code>1D6</code>), Espada corta (<code>1D6</code>).</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Armas de Precisión (Destreza/Distancia):</strong> Jabalina (<code>1D6</code>), Ballesta ligera (<code>1D8</code>), Arco corto (<code>1D6</code>), Ballesta de mano (<code>1D6</code>), Arco largo (<code>1D8</code>), Ballesta pesada (<code>1D10</code>), Pistola (<code>1D6</code>), Rifle (<code>1D8</code>), Escopeta (<code>2D6</code>), Lanzacohetes (<code>2D8</code> contundente).</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Armas de Una Mano (Fuerza):</strong> Garrote (<code>1D8</code>), Martillo ligero (<code>1D4</code>), Maza (<code>1D6</code>), Hacha de guerra (<code>1D8</code>), Mangual (<code>1D8</code>), Espada larga (<code>1D8</code>), Lucero del alba (<code>1D8</code>), Tridente (<code>1D6</code>), Martillo de guerra (<code>1D8</code>), Pico de guerra (<code>1D8</code>).</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Armas de Dos Manos (Fuerza):</strong> Garrote grande (<code>1D12</code>), Martillo de guerra (<code>1D10</code>), Tridente (<code>1D8</code>), Espada larga (<code>1D10</code>), Hacha de guerra (<code>1D10</code>), Guja (<code>1D10</code>), Hacha a dos manos (<code>1D12</code>), Espadón (<code>1D12</code>), Alabarda (<code>1D10</code>), Maza a dos manos (<code>1D12</code>), Pica (<code>1D10</code>).</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="acceso-base-datos" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">🧭 Acceso Completo a la Base de Datos de Inventario</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Para obtener detalles de penalizaciones específicas, combinaciones avanzadas, y la guía completa de creación paso a paso de objetos, puedes acceder directamente a la sección interactiva o consultar los documentos:</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">📚 <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Guía de Creación:</strong> <Link to="/inventario#guide" onClick={(e) => handleLinkClick(e, 'guide')} className="underline">Guía completa de TRP3_Extended</Link> (Paso a paso con imágenes).</li>
        <li className="pl-1 sm:pl-2">🛡️ <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Armaduras:</strong> <Link to="/inventario#armors" onClick={(e) => handleLinkClick(e, 'armors')} className="underline">Documento de Armaduras</Link> (Mitigaciones, durabilidad y requisitos).</li>
        <li className="pl-1 sm:pl-2">🛡️ <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Escudos:</strong> <Link to="/inventario#shields" onClick={(e) => handleLinkClick(e, 'shields')} className="underline">Documento de Escudos</Link> (Bloqueo y durabilidad).</li>
        <li className="pl-1 sm:pl-2">⚔️ <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Armas:</strong> <Link to="/inventario#weapons" onClick={(e) => handleLinkClick(e, 'weapons')} className="underline">Documento de Armas</Link> (Daños y tipos de armas).</li>
      </ul>
    </div>
  );
};
