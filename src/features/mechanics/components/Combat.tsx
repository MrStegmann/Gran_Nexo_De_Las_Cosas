import React from 'react';

interface Props {
  searchQuery?: string;
  activeFilter?: string;
}

export const Combat: React.FC<Props> = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-2 py-8 animate-[fadeIn_0.5s_ease-out_forwards]">
      <h1 id="combate" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Combate</h1>

      <h2 id="iniciativa" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Iniciativa</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Cuando vaya a suceder un combate, todos los personajes (jugadores y NPCs) lanzarán <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">1D100</strong> para determinar el orden de turnos.</p>

      <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
        <thead>
          <tr>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Tirada</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Efecto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Crítico NATURAL</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">En el primer turno, el personaje podrá actuar <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">dos veces</strong> en vez de una.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Pifia NATURAL</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">El personaje sufrirá Aturdimiento por Iniciativa. (No hará nada durante el primer turno).</td>
          </tr>
        </tbody>
      </table>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="resolucion-de-turnos-estados-y-cds" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Resolución de Turnos, Estados y CD’s</h2>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">El <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">daño o efecto en el tiempo</strong> se resuelve al final del turno del personaje afectado. Si el personaje hace algo para quitarse el estado antes de terminar su turno, no se le aplicará.</li>
        <li className="pl-1 sm:pl-2">Si recibe el daño o efecto cuando ya ha resuelto su turno, se aplicará inmediatamente el primer daño/efecto.</li>
        <li className="pl-1 sm:pl-2">Los <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">tiempos de reutilización</strong> (hechizos, objetos, etc.) comienzan su cuenta regresiva a partir del siguiente turno de su lanzamiento. Se reduce el tiempo de reutilización al final del turno del personaje.</li>
        <li className="pl-1 sm:pl-2">Los <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">estados alterados de pérdida de control</strong> (aturdimiento, miedo, control mental) se aplican inmediatamente. Si el personaje ya ha resuelto su turno, se aplicarán al siguiente.</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="rango-efectivo-de-accion" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Rango Efectivo de Acción</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Es el rango <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">menor a 10 metros</strong> que hay entre el personaje y su destino (ej. un enemigo).<br />
      Esta distancia es la mínima necesaria para no tener que gastar una acción extra de movimiento para atacar o interactuar.</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Cuerpo a cuerpo:</strong> Necesita estar a menos de 10 metros del objetivo.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">A distancia:</strong> Necesita estar a menos de 10 metros dentro de su alcance. (Ej: Si un mago alcanza 30m, estar entre 30m y 40m se considera rango efectivo).</li>
        <li className="pl-1 sm:pl-2">Si el objetivo está a <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">más de 10 metros</strong>, el personaje SÍ tendrá que gastar obligatoriamente una acción de movimiento para acercarse.</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="turnos" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Turnos</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Se dividen en dos fases que ocurren casi simultáneamente: <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Ofensiva</strong> (el atacante actúa) y <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Defensiva</strong> (el defensor responde).</p>

      <h3 id="fase-ofensiva" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Fase Ofensiva</h3>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Durante la fase ofensiva, todos los personajes disponen de <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">2 acciones principales</strong> (más posibles acciones adicionales). El turno termina cuando se agotan o el jugador decide finalizar.</p>

      <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
        <thead>
          <tr>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Acción</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Restricciones / Reglas</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Detalles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Atacar</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">1 vez por turno (salvo excepciones).</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Cualquier acción dañina directa (armas, hechizos, objetos explosivos, arrojar). Empuñar 2 armas cuenta como 1 ataque con 2 golpes. No incluye daño indirecto (trampas, entorno).</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Movimiento</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Gratis 1 vez (20m).</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Para moverse otra vez: 1d20 + FUE + Atletismo.<br /><br />Pifia: 0m. &lt;10: 10m. &gt;=10: 20m. Crítico: 30m. (La armadura reduce la distancia máxima).</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Agarrar</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">-</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">1d20 + FUE + Brutalidad vs 1d20 + DES + Acrobacias (o FUE + Brutalidad).</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Empujar</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Previene ataques de oportunidad si tiene éxito.</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">1d20 + FUE + Brutalidad vs 1d20 + DES + Acrobacias (o FUE + Brutalidad).</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Escalar / Saltar</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">-</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">1d20 + FUE + Atletismo.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Desarmar</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">-</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">1d20 + DES + Juego de Manos vs 1d20 + DES + Juego de Manos. (No gasta movimiento si está a rango efectivo).</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Lanzar hechizos o Habilidades</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Limitado por Maná/Espíritu/CD.</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Puedes usar tantos como acciones/recursos tengas (no aplica a hechizos de daño).</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Reincorporarse</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Genera ataque de oportunidad si hay enemigos.</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Anula estado Derribado. Sin tirada (salvo que haya un objeto pesado: 1d20 + FUE + Brutalidad).</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Guardia</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">1 vez por turno.</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">+2 a la Defensa del próximo ataque. El personaje no puede moverse o perderá el bonus.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Disparo de Precisión</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">1 vez por turno.</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">+2 al ataque a distancia. Solo si no hay enemigos en rango efectivo.</td>
          </tr>
        </tbody>
      </table>

      <h3 id="fase-defensiva" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Fase Defensiva</h3>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Cuando te atacan (a ti o a un compañero), dispones de <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">1 acción defensiva</strong>.</p>

      <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
        <thead>
          <tr>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Acción</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Restricciones / Reglas</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Detalles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Defensa</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">-</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Puedes defenderte de <em className="italic text-white/60 font-light">todos</em> los ataques recibidos. Declaras <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Defensa Robusta</strong> (escudo/arma) o <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Defensa Ágil</strong> (esquivar/desviar). Crítico en defensa gana siempre o genera contraataque.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Hechizos / Habilidades</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Si están listos y lo permiten.</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Deben estar marcados como &quot;Puede usarse en Defensa&quot;.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Interceptar</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">1 vez por turno.</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Un personaje a rango efectivo asume el ataque en lugar del objetivo inicial (debe declararse antes de la defensa original).</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">No Defenderse</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">-</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Recibes el daño directamente (se tiran dados de daño sin defensa).</td>
          </tr>
        </tbody>
      </table>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="acciones-adicionales" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Acciones Adicionales</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Son acciones simples sin coste adicional. Solo se pueden hacer <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">1 vez por turno</strong>.</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Percepción física:</strong> 1d20 + Sabiduría + Percepción.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Percepción mágica:</strong> 1d20 + Inteligencia.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Retrasar turno:</strong> (1 vez por combate, en el 1er turno). Eliges no actuar cuando te toca y pasas al final de la ronda.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Intercambio:</strong> Pasar un objeto a otro jugador.
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">&lt;10m:</strong> Sin tirada.</li>
            <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">&gt;10m:</strong> Objetos ligeros (1d20 DES + Armas a distancia ligeras), Objetos pesados (1d20 FUE + Armas a distancia pesadas).</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Pedir acción a otro jugador:</strong> Permite a otro jugador que aún tenga acciones gastar una en tu turno (ej. para esquivar tu hechizo de área o salir de la línea de fuego).</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="ventajas-y-desventajas" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Ventajas y Desventajas</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Situaciones de combate que alteran las tiradas. Se pueden acumular.</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Tirar con Ventaja:</strong> Lanzas dos dados y te quedas con el resultado más <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">alto</strong>.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Tirar con Desventaja:</strong> Lanzas dos dados y te quedas con el resultado más <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">bajo</strong>.</li>
      </ul>

      <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
        <thead>
          <tr>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Condición</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Efecto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Flanqueo</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Atacantes tiran con <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Ventaja</strong> (al atacar a un objetivo por varios flancos).</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Derribo</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">El objetivo derribado tira con <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Desventaja en Defensa</strong>.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Altura</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">El que está por encima de su objetivo tira con <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Ventaja en Defensa</strong>.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Espalda</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">El atacante tira con <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Ventaja</strong>; el defensor tira con <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Desventaja</strong>.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Oscuridad / Visibilidad Reducida</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">-5</strong> a Defensa, <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">-5</strong> a Ataque, <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">-5</strong> a Percepción visual.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
