import React from 'react';

interface Props {
  searchQuery?: string;
  activeFilter?: string;
}

export const Rules: React.FC<Props> = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-2 py-8 animate-[fadeIn_0.5s_ease-out_forwards]">
      <h1 id="reglas-generales" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Reglas Generales</h1>

      <h2 id="alcance" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Alcance</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">El alcance efectivo de ataques a distancia o hechizos va delimitado por el Máster de forma aproximada, a lo que sería lógico para cada situación. Por lo que los siguientes valores deberían ser utilizados a modo de referencia:</p>

      <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
        <thead>
          <tr>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Arma / Tipo</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Alcance Efectivo (Aprox)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Arco Largo</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">40 metros</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Hechizos, Pistolas y Arcos Cortos</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">30 metros</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Rifle de Precisión</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">50 metros</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Escopeta</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">10 metros</td>
          </tr>
        </tbody>
      </table>

      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Esto se tiene en cuenta para evitar situaciones inverosímiles por parte de los personajes (para que no se &quot;flipen&quot;).</p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="fatiga" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Fatiga</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">La Fatiga es un estado que se obtiene al no realizar ningún tipo de descanso, ni comer ni beber agua, afectando negativamente a las capacidades del personaje.</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Al obtener este estado, todas las tiradas se verán reducidas de forma gradual restando <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">-1 por cada periodo prolongado</strong> (a juicio del Máster).</li>
        <li className="pl-1 sm:pl-2">La acumulación excesiva de este estado puede conllevar a la muerte del personaje.</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="diferencia-de-tamano-y-fuerza" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Diferencia de Tamaño y Fuerza</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Se refiere a la diferencia clara de tamaño que pueda existir entre dos razas independientemente de sus talentos asignados. Esto queda a interpretación del máster.</p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light"><em className="italic text-white/60 font-light">Ejemplo: Un Gnomo que se defiende con Def. Robusta frente al ataque de un Orco o un Tauren. Por muy alto que sea el dado, incluso si fuera defensa CRÍTICA, el Gnomo quedará derribado.</em></p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="criticos-y-pifias" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Críticos y Pifias</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Tanto para los críticos como para las pifias se tendrá en cuenta, exclusivamente, los dados naturales (sin sumar atributos ni talentos: 20 es Crítico, 1 es Pifia).</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Pifia vs Pifia:</strong> Se resuelve en que gana la Defensa, aunque se considera que el ataque no fue efectivo a pesar de que la Defensa tampoco lo fuera.</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="supercritico-y-super-contraataque" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Supercrítico y Super Contraataque</h2>

      <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
        <thead>
          <tr>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Situación</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Condición</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Efecto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Supercrítico</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">El atacante saca <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Crítico</strong> frente a una <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Pifia</strong> de la defensa.</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Harás el <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">máximo daño</strong> posible.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Super Contraataque</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">El defensor saca <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Crítico</strong> frente a una <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Pifia</strong> del atacante.</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Tienes un bonus al ataque de <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">+5</strong> en tu siguiente acción.</td>
          </tr>
        </tbody>
      </table>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="emboscadas" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Emboscadas</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Situaciones especiales de oportunidad para acabar con un enemigo (o que acaben contigo). Solo pueden hacerse <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Cuerpo a Cuerpo</strong>.</p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Solo se pueden llevar a cabo si <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">nadie te ha visto o detectado antes</strong>. Si durante un combate usas invisibilidad pero ya te habían detectado, NO tienes oportunidad de emboscada.</p>

      <ol className="list-decimal list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:font-bold">
        <li className="pl-1 sm:pl-2">
          <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Tirada Inicial:</strong> El emboscador tira <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Sigilo vs Percepción</strong>.</p>
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Éxito:</strong> Mantiene el modo emboscada.</li>
            <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Fallo:</strong> El modo emboscada termina, pero el emboscador sigue pudiendo sorprender al objetivo. Este tendrá posibilidad de defenderse y no habrá muerte instantánea.<br />
            <em className="italic text-white/60 font-light">(Las tiradas pueden repetirse si la emboscada dura mucho o el emboscador hace ruido).</em></li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">
          <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Ataque de Emboscada (a Rango Efectivo):</strong> Se tira <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">1d20 + Destreza</strong>.</p>
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Crítico:</strong> Mata instantáneamente al objetivo. (El emboscado puede hacer una tirada de Salvación; si logra crítico, sufre daño normal).</li>
            <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">&gt;10:</strong> Daño de arma. Si es arma fina, se calcula como daño crítico. Si no, daño normal.</li>
            <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">&lt;10:</strong> Daño de arma. Si es arma fina, daño normal. Si no, mitad de daño.</li>
            <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Pifia:</strong> La emboscada fracasa. No se hace daño.</li>
          </ul>
        </li>
      </ol>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="ataques-de-oportunidad" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Ataques de Oportunidad</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Ocurren durante tu turno y son situaciones en tu contra al realizar ciertas acciones (como dar la espalda a un enemigo con visión y rango). Todos los que cumplan las condiciones podrán aprovecharla siguiendo el orden de turnos.</p>

      <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
        <thead>
          <tr>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Situación</th>
            <th align="center" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">¿Genera Ataque de Oportunidad?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Lanzar un hechizo básico/potente frente a un enemigo cuerpo a cuerpo</td>
            <td align="center" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Sí</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Dar la espalda a un enemigo</td>
            <td align="center" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Sí</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Huir dejando de ver al enemigo</td>
            <td align="center" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Sí</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Cargar armas a distancia pesadas frente a un enemigo cuerpo a cuerpo</td>
            <td align="center" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Sí</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Estar flanqueado</td>
            <td align="center" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">No</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Empujar/derribar al enemigo exitosamente antes de huir</td>
            <td align="center" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">No</td>
          </tr>
        </tbody>
      </table>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="terreno-adverso" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Terreno Adverso</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Un escenario que limita las capacidades de los jugadores/NPCs y que puede llegar a provocar daño en el tiempo.</p>

      <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
        <thead>
          <tr>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Terreno</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Efectos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Frío Extremo</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Si no se protege, debe salvar con <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">1d20 + CON + Res. Frío</strong>. Si falla, obtiene acumulación de <em className="italic text-white/60 font-light">Hipotermia</em> (a 5 acumulaciones, muere). Entrar en calor las reduce.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Calor Extremo</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Si no se protege, debe salvar con <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">1d20 + CON + Res. Calor</strong>. Si falla, obtiene acumulación de <em className="italic text-white/60 font-light">Insolación</em> (a 5 acumulaciones, muere). Buscar fresco las reduce.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Suelo Embarrado</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Limita el movimiento a la mitad. Elimina el movimiento gratis (SIEMPRE requiere tirada de Atletismo para moverse).</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Suelo Putrefacto</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Afecta la salud. 2 turnos de gracia. Al 3er turno se pierde -1 de HP y -1 a todos los atributos/talentos por turno (hasta mínimo 0).</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Suelo Resbaladizo</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Todas las acciones defensivas, de movimiento o acrobacias requieren tirada de <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Destreza + Acrobacias</strong> para mantener el equilibrio. Si falla, la acción se anula y queda <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Derribado</strong>.</td>
          </tr>
        </tbody>
      </table>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="distancia-de-percepcion" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Distancia de Percepción</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">La distancia aproximada (visual o auditiva) a la que los personajes pueden detectar algo. Es una referencia para el Máster (varía según la situación), pero generalmente la <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">distancia de percepción base es de 200 metros</strong>.</p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="doble-empunadura" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Doble Empuñadura</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Empuñar un arma en cada mano permite realizar <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">dos ataques</strong> en una sola acción (cada ataque con su tirada y penalización). El objetivo se defiende de ambos ataques.<br />
      <em className="italic text-white/60 font-light">Solo las armas con el atributo &quot;Doble empuñadura&quot; pueden usarse así.</em> Atacar desarmado con ambos puños aplica penalización de Combate Ágil. Las armas de 2 manos o versátiles siempre reciben penalización incluso si atacas con una.</p>

      <h3 id="penalizaciones-por-doble-empunadura" className="text-lg sm:text-xl font-mono font-medium text-[var(--theme-color)] opacity-90 mt-8 mb-3 uppercase tracking-wider">Penalizaciones por Doble Empuñadura</h3>

      <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
        <thead>
          <tr>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Tipo</th>
            <th align="center" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Mano dominante</th>
            <th align="center" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Mano secundaria</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Combate Ágil</strong></td>
            <td align="center" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">-1</td>
            <td align="center" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">-3</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Precisión</strong></td>
            <td align="center" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">-2</td>
            <td align="center" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">-4</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Combate 1 mano</strong></td>
            <td align="center" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">-4</td>
            <td align="center" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">-6</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Combate 2 manos</strong></td>
            <td align="center" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">-5</td>
            <td align="center" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">-7</td>
          </tr>
        </tbody>
      </table>

      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light"><em className="italic text-white/60 font-light">(Los rasgos Ambidiestro Ágil y Ambidiestro Robusto eliminan ciertos aspectos de estas penalizaciones).</em></p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="debilidades-y-vulnerabilidades" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Debilidades y Vulnerabilidades</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Son desventajas (ocultas o no) que aumentan el efecto de ciertas acciones sobre el objetivo.</p>

      <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
        <thead>
          <tr>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Tipo</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Penalización</th>
            <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Ejemplo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Debilidad</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">+2</strong> a los efectos recibidos.</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Daño de fuego a NPC débil al fuego recibe +2 extra.</td>
          </tr>
          <tr>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Vulnerabilidad</strong></td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">+4</strong> a los efectos recibidos. Explotarla puede provocar efectos extra (a discreción del Máster).</td>
            <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light">Daño de fuego a NPC vulnerable recibe +4 extra y, por ejemplo, queda aturdido.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
