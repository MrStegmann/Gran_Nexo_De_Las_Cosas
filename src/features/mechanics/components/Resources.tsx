import React from 'react';

interface Props {
  searchQuery?: string;
  activeFilter?: string;
}

export const Resources: React.FC<Props> = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-2 py-8 animate-[fadeIn_0.5s_ease-out_forwards]">
      <h1 id="recursos-del-personaje" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Recursos del Personaje</h1>
      
      <h2 id="puntos-de-vida-hp" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Puntos de Vida (HP)</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Todos los jugadores tienen como vida base <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">20 puntos de vida</strong> (Normal). Los puntos de vida se pueden aumentar al subir de nivel, subiendo el atributo Constitución, mediante beneficios mágicos o armaduras especiales.</p>
      
      <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
        <thead>
          <tr>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Característica</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Escalado</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Cada punto de Constitución añade <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">+1</strong> a la vida máxima.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Pre-muerte</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Cuando la vida llega a 0, el personaje se encuentra en estado pre-muerto. Aún puede ser salvado por otro jugador mediante hechizos, pociones o conocimientos médicos. Si no es salvado en la misma sesión, morirá.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Muerte</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Un jugador muerto puede ser resucitado como zombie por otro personaje, quedando bajo el completo control de su amo.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Recuperación</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Se pueden recuperar con pociones, sanaciones mágicas o intervención médica.</td>
          </tr>
        </tbody>
      </table>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="mana" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Maná</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">El maná es usado por los personajes que usen hechizos de inteligencia (Arcano, Vil, Sombras, Naturaleza, Nigromancia).</p>
      
      <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
        <thead>
          <tr>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Característica</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Escalado</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Cada punto de Inteligencia (INT) añade <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">+1</strong> al máximo de Maná.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Regeneración</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Al final de su turno, el personaje tira <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">1d4 + Regeneración de Maná</strong>.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Agotamiento (Fatiga Mágica)</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Si el maná se agota, el personaje puede seguir lanzando hechizos a costa de perder <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">puntos de vida</strong>.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Penalización por Pre-muerte</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Al entrar en estado de pre-muerte, los personajes <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">pierden todo su maná</strong>.</td>
          </tr>
        </tbody>
      </table>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="espiritu" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Espíritu</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">El espíritu es usado por los personajes que usen hechizos de voluntad (Fe, Chi, Elemental). Es un recurso <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">limitado</strong> y no se regenera con el tiempo.</p>
      
      <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
        <thead>
          <tr>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Característica</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Escalado</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Cada punto de Voluntad (VOL) añade <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">+1</strong> al máximo de Espíritu.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Regeneración</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Solo se recupera realizando oraciones, meditación o armonizando con los elementos. Requiere superar una tirada de <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">1d20 Voluntad + Talento</strong> (revisar apartado de Magias). Si tiene éxito, recupera <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">1d4 + Talento</strong>.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Agotamiento</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Cuando el espíritu se agota, <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">no se pueden lanzar más hechizos</strong> (ni siquiera a costa de salud).</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Penalización por Pre-muerte</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Al entrar en estado de pre-muerte, los personajes <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">NO pierden su espíritu</strong>.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
