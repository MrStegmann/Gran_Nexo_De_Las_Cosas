import React from 'react';

export const Races: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-2 py-8 animate-[fadeIn_0.5s_ease-out_forwards]">
      <h1 id="razas" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Razas</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Cada raza proporciona ventajas y desventajas en diferentes talentos del personaje.</p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="mestizos" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Mestizos</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Los personajes mestizos pueden combinar ventajas y desventajas de ambas razas.</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Pueden tener hasta un máximo de <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">+3 en ventajas</strong></li>
        <li className="pl-1 sm:pl-2">Pueden tener hasta un máximo de <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">-3 en desventajas</strong></li>
      </ul>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Además, todos los mestizos heredan el apartado especial de cada una de sus razas de origen, salvo que por historia o lore se indique lo contrario.
      </p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="alianza" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Alianza</h2>

      <h3 id="humanos" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Humanos</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+1 Adaptabilidad</li>
            <li className="pl-1 sm:pl-2">+1 Diplomacia</li>
            <li className="pl-1 sm:pl-2">+1 Resistencia a Aturdimientos</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-2 Resistencia a la Pérdida de Control</li>
            <li className="pl-1 sm:pl-2">-1 Resiliencia</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 id="enanos" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Enanos</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+1 Resistencia al Frío</li>
            <li className="pl-1 sm:pl-2">+1 Brutalidad</li>
            <li className="pl-1 sm:pl-2">+1 Defensa Robusta</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-1 Juego de Manos</li>
            <li className="pl-1 sm:pl-2">-2 Diplomacia</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 id="gnomos" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Gnomos</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+1 Perfeccionamiento</li>
            <li className="pl-1 sm:pl-2">+1 Juego de Manos</li>
            <li className="pl-1 sm:pl-2">+1 Resistencia Mágica</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-2 Vida</li>
            <li className="pl-1 sm:pl-2">-1 Resiliencia</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 id="kaldoreis" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Kaldoreis</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+1 Sigilo</li>
            <li className="pl-1 sm:pl-2">+1 Defensa Ágil</li>
            <li className="pl-1 sm:pl-2">+1 Atletismo</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-1 Arcano</li>
            <li className="pl-1 sm:pl-2">-2 Comercio</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Especial:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">Visión nocturna</li>
            <li className="pl-1 sm:pl-2">Audición superior</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 id="draeneis" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Draeneis</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+1 Resistencia Mágica</li>
            <li className="pl-1 sm:pl-2">+2 Fe (Luz)</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-2 Conexión Elemental</li>
            <li className="pl-1 sm:pl-2">-1 Sigilo</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 id="queldoreis" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Quel’doreis</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+2 Resistencia Mágica</li>
            <li className="pl-1 sm:pl-2">+1 Arcano</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-1 Brutalidad</li>
            <li className="pl-1 sm:pl-2">-2 Defensa Robusta</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Especial:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">Audición superior</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="horda" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Horda</h2>

      <h3 id="orcos" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Orcos</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+1 Brutalidad</li>
            <li className="pl-1 sm:pl-2">+2 Conexión Elemental</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-2 Sigilo</li>
            <li className="pl-1 sm:pl-2">-1 Defensa Ágil</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Especial:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">Superfuerza</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 id="tauren" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Tauren</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+2 Fortaleza</li>
            <li className="pl-1 sm:pl-2">+1 Naturaleza</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-2 Defensa Ágil</li>
            <li className="pl-1 sm:pl-2">-1 Sigilo</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Especial:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">Superfuerza</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 id="no-muertos" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">No-muertos</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+2 Resistencia a la Pérdida de Control</li>
            <li className="pl-1 sm:pl-2">+1 Nigromancia</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-2 Diplomacia</li>
            <li className="pl-1 sm:pl-2">-1 Regeneración de Maná</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Especial:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">Reemplazo de miembros</li>
            <li className="pl-1 sm:pl-2">Inmune a venenos</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 id="sindorei" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Sin’dorei</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+2 Resistencia Mágica</li>
            <li className="pl-1 sm:pl-2">+1 Vil</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-1 Resistencia a la Pérdida de Control</li>
            <li className="pl-1 sm:pl-2">-2 Defensa Robusta</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Especial:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">Audición superior</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 id="goblins" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Goblins</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+2 Comercio</li>
            <li className="pl-1 sm:pl-2">+1 Juego de Manos</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-2 Diplomacia</li>
            <li className="pl-1 sm:pl-2">-1 Fe</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 id="trol" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Trol</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+1 Defensa Ágil</li>
            <li className="pl-1 sm:pl-2">+2 Naturaleza</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-2 Fe</li>
            <li className="pl-1 sm:pl-2">-1 Diplomacia</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Especial:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">Regeneración</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="otras-razas" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Otras razas / neutrales</h2>

      <h3 id="pandaren" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Pandaren</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+2 Chi</li>
            <li className="pl-1 sm:pl-2">+1 Resistencia a la Pérdida de Control</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-1 Resiliencia</li>
            <li className="pl-1 sm:pl-2">-2 Provocación</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 id="vrykul" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Vrykul</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+1 Brutalidad</li>
            <li className="pl-1 sm:pl-2">+1 Fortaleza</li>
            <li className="pl-1 sm:pl-2">+1 Resistencia al Frío</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-2 Sigilo</li>
            <li className="pl-1 sm:pl-2">-1 Resistencia a la Pérdida de Control</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Especial:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">Superfuerza</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 id="dragon-azul" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Dragón azul</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+3 Fortaleza</li>
            <li className="pl-1 sm:pl-2">+3 Resistencia Mágica</li>
            <li className="pl-1 sm:pl-2">+3 Arcano</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-3 Resistencia a la Pérdida de Control</li>
            <li className="pl-1 sm:pl-2">-5 Sigilo</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Especial:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">Innato: Arcano</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="especiales" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Especiales</h2>

      <h3 id="huargen" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Huargen</h3>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Los huargen no se consideran una raza en sí misma, sino una condición que afecta a una raza existente.</p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        En todos los casos, el personaje mantiene las ventajas y desventajas de su raza original.<br />
        Si el personaje sufre la maldición, además obtiene los siguientes cambios:
      </p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 id="forma-huargen" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Forma Huargen</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+2 Atletismo</li>
            <li className="pl-1 sm:pl-2">+2 Brutalidad</li>
            <li className="pl-1 sm:pl-2">+2 Resistencia Mágica</li>
            <li className="pl-1 sm:pl-2">+2 Percepción</li>
            <li className="pl-1 sm:pl-2">+2 Resiliencia</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-5 Resistencia a la Pérdida de Control</li>
            <li className="pl-1 sm:pl-2">-3 Sigilo</li>
            <li className="pl-1 sm:pl-2">-2 Juego de Manos</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Especial:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">A cuatro patas: gran movilidad</li>
            <li className="pl-1 sm:pl-2">Superfuerza</li>
          </ul>
        </li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h3 id="forma-humana" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Forma Humana</h3>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Ventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">+1 Atletismo</li>
            <li className="pl-1 sm:pl-2">+1 Brutalidad</li>
            <li className="pl-1 sm:pl-2">+1 Resistencia Mágica</li>
            <li className="pl-1 sm:pl-2">+1 Percepción</li>
            <li className="pl-1 sm:pl-2">+1 Resiliencia</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Desventajas:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">-2 Resistencia a la Pérdida de Control</li>
            <li className="pl-1 sm:pl-2">-2 Sigilo</li>
            <li className="pl-1 sm:pl-2">-1 Juego de Manos</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
