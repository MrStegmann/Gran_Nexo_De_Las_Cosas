import React from 'react';

export const Armors: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-2 py-8 animate-[fadeIn_0.5s_ease-out_forwards]">
      <h1 id="armaduras" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Armaduras</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Las armaduras son el elemento más importante para reducir el daño recibido durante el combate.</p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="funcionamiento-general" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Funcionamiento general</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Las armaduras no funcionan como un conjunto completo. Cada pieza actúa de forma independiente.</p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Esto significa que:</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Si recibes un golpe en el pecho, solo cuenta la armadura del pecho.</li>
        <li className="pl-1 sm:pl-2">Las demás piezas no reducen ese daño.</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="durabilidad" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Durabilidad</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Cada pieza de armadura tiene una <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">durabilidad</strong>, que representa su vida útil.</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">La durabilidad se reduce cada vez que la pieza recibe un impacto.</li>
        <li className="pl-1 sm:pl-2">Cuando llega a <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">0</strong>, la armadura se considera <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">rota</strong>.</li>
        <li className="pl-1 sm:pl-2">Una armadura rota:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">No reduce daño</li>
            <li className="pl-1 sm:pl-2">No aplica sus efectos especiales</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="tipos-reduccion" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Tipos de reducción</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Cada armadura puede tener:</p>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Reducción física</h3>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Reduce el daño físico recibido.<br />Puede reducir el daño hasta 0.</p>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Reducción mágica</h3>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Reduce el daño mágico recibido.<br />Puede reducir el daño hasta 0.</p>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Movimiento</h3>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Reduce la distancia que el personaje puede moverse sin tirar dados.</p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="requisitos-uso" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Requisitos de uso</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Algunas armaduras requieren atributos mínimos para poder usarse correctamente.</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ejemplo: una armadura de placas puede requerir una cierta cantidad de <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Brutalidad</strong>.</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="piezas-armadura" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Piezas de armadura</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Puedes equipar las siguientes piezas:</p>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Cabeza</h3>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Protege cabeza y cuello.</p>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Pecho</h3>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Protege torso completo, incluyendo hombros, cintura y brazos.</p>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Guantes</h3>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Protegen antebrazos y manos.</p>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Piernas</h3>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Protegen desde la cintura hacia abajo, incluyendo los pies.</p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="tipos-armadura" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Tipos de armadura</h1>

      <h2 id="tela" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Tela</h2>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Reducción física: 0</li>
        <li className="pl-1 sm:pl-2">Reducción mágica: +4</li>
        <li className="pl-1 sm:pl-2">Durabilidad: 2 golpes</li>
        <li className="pl-1 sm:pl-2">Perforante: Vulnerable</li>
        <li className="pl-1 sm:pl-2">Cortante: Vulnerable</li>
        <li className="pl-1 sm:pl-2">Contundente: Vulnerable</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="cuero" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Cuero</h2>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Reducción física: +2</li>
        <li className="pl-1 sm:pl-2">Reducción mágica: +1</li>
        <li className="pl-1 sm:pl-2">Durabilidad: 4 golpes</li>
        <li className="pl-1 sm:pl-2">Perforante: Vulnerable</li>
        <li className="pl-1 sm:pl-2">Cortante: Débil</li>
        <li className="pl-1 sm:pl-2">Contundente: Normal</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="malla" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Malla</h2>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Reducción física: +4</li>
        <li className="pl-1 sm:pl-2">Reducción mágica: 0</li>
        <li className="pl-1 sm:pl-2">Durabilidad: 6 golpes</li>
        <li className="pl-1 sm:pl-2">Perforante: Vulnerable</li>
        <li className="pl-1 sm:pl-2">Cortante: Resistente</li>
        <li className="pl-1 sm:pl-2">Contundente: Débil</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="placas" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Placas</h2>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Reducción física: +6</li>
        <li className="pl-1 sm:pl-2">Reducción mágica: 0</li>
        <li className="pl-1 sm:pl-2">Durabilidad: 8 golpes</li>
        <li className="pl-1 sm:pl-2">Perforante: Resistente</li>
        <li className="pl-1 sm:pl-2">Cortante: Muy resistente</li>
        <li className="pl-1 sm:pl-2">Contundente: Vulnerable</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="efectos-danio" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Efectos contra tipos de daño</h1>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Vulnerable:</strong> no se aplica la reducción física y la durabilidad se reduce el doble.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Débil:</strong> la reducción física se aplica a la mitad.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Normal:</strong> la reducción física se aplica completamente.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Resistente:</strong> el daño se reduce a la mitad.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Muy resistente:</strong> el daño se reduce a 0 y no reduce durabilidad.</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="penalizaciones" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Requisitos y penalizaciones por tipo de armadura</h1>

      <h2 id="penalizacion-malla" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Malla</h2>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Cabeza</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Requisito: 1 Brutalidad</li>
        <li className="pl-1 sm:pl-2">Penalización:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-1 Movimiento</li>
            <li className="pl-1 sm:pl-2">-1 Acrobacias</li>
            <li className="pl-1 sm:pl-2">-1 Defensa Ágil</li>
          </ul>
        </li>
      </ul>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Pecho</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Penalización:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-1 Juego de Manos</li>
          </ul>
        </li>
      </ul>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Guantes</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Requisito: 1 Brutalidad</li>
        <li className="pl-1 sm:pl-2">Penalización:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-1 Movimiento</li>
            <li className="pl-1 sm:pl-2">-1 Acrobacias</li>
            <li className="pl-1 sm:pl-2">-1 Defensa Ágil</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="penalizacion-placas" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Placas</h2>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Cabeza</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Requisito: 1 Brutalidad</li>
        <li className="pl-1 sm:pl-2">Penalización:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-1 Percepción</li>
            <li className="pl-1 sm:pl-2">-1 Acrobacias</li>
            <li className="pl-1 sm:pl-2">-1 Defensa Ágil</li>
          </ul>
        </li>
      </ul>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Pecho</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Requisito: 2 Brutalidad</li>
        <li className="pl-1 sm:pl-2">Penalización:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-5 Movimiento</li>
            <li className="pl-1 sm:pl-2">-2 Acrobacias</li>
            <li className="pl-1 sm:pl-2">-4 Defensa Ágil</li>
            <li className="pl-1 sm:pl-2">-4 Sigilo</li>
          </ul>
        </li>
      </ul>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Guantes</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Requisito: 1 Brutalidad</li>
        <li className="pl-1 sm:pl-2">Penalización:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-2 Juego de Manos</li>
            <li className="pl-1 sm:pl-2">-1 Acrobacias</li>
          </ul>
        </li>
      </ul>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Piernas</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Requisito: 2 Brutalidad</li>
        <li className="pl-1 sm:pl-2">Penalización:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-5 Movimiento</li>
            <li className="pl-1 sm:pl-2">-2 Acrobacias</li>
            <li className="pl-1 sm:pl-2">-4 Defensa Ágil</li>
            <li className="pl-1 sm:pl-2">-4 Sigilo</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="reglas-adicionales" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Reglas adicionales</h2>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Si no cumples los requisitos de una armadura, sus penalizaciones se duplican.</li>
        <li className="pl-1 sm:pl-2">Los requisitos se suman por piezas.
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">Ejemplo: un pecho de placas requiere 2 Brutalidad.</li>
            <li className="pl-1 sm:pl-2">Si añades guantes de placas, necesitas 3 Brutalidad en total.</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="refuerzos" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Refuerzos</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Los refuerzos son mejoras que pueden añadirse a cada pieza de armadura.</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Cada pieza solo puede tener <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">un refuerzo</strong>.</li>
      </ul>

      <h2 id="tipos-refuerzo" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Tipos de refuerzo</h2>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Cuero</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Reducción física: +1</li>
        <li className="pl-1 sm:pl-2">Durabilidad: +1 golpe</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Malla</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Reducción física: +2</li>
        <li className="pl-1 sm:pl-2">Durabilidad: +2 golpes</li>
        <li className="pl-1 sm:pl-2">Defensa Ágil: -1</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Placa</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Reducción física: +3</li>
        <li className="pl-1 sm:pl-2">Durabilidad: +3 golpes</li>
        <li className="pl-1 sm:pl-2">Defensa Ágil: -2</li>
        <li className="pl-1 sm:pl-2">Movimiento: -1</li>
        <li className="pl-1 sm:pl-2">Requisito: 1 Brutalidad</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="combinacion-piezas" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Combinación de piezas</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">También puedes combinar dos tipos de armadura en la misma pieza.</p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Esto permite obtener beneficios de ambas.</p>

      <h2 id="reglas-combinacion" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Reglas importantes</h2>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Máximo 2 tipos de armadura por pieza.</li>
        <li className="pl-1 sm:pl-2">Las piezas combinadas no pueden tener refuerzos.</li>
        <li className="pl-1 sm:pl-2">No se pueden combinar más de dos piezas del mismo tipo.</li>
        <li className="pl-1 sm:pl-2">Malla y placas no se pueden combinar entre sí.</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="efectos-combinar" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Efectos al combinar armaduras</h2>
      <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
        <thead>
          <tr>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Tipo</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Tela</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Cuero</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Malla</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Placa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Tela</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">No permitido</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Sin penalización</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Sin penalización</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Sin penalización</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Cuero</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Sin penalización</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">No permitido</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Duplica efectos negativos</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Duplica efectos negativos</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Malla</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Sin penalización</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Duplica efectos negativos</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">No permitido</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Duplica efectos negativos y requisitos</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Placa</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Sin penalización</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Duplica efectos negativos</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Duplica efectos negativos y requisitos</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">No permitido</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
