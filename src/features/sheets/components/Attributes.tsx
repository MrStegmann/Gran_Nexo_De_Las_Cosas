import React from 'react';

export const Attributes: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-2 py-8 animate-[fadeIn_0.5s_ease-out_forwards]">
      <h1 id="atributos-y-talentos" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Atributos y talentos</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Los <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">atributos</strong> son las estadísticas principales de cada personaje. Cada atributo contiene varios <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">talentos</strong>, que representan habilidades más específicas dentro de ese atributo.
      </p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Por cada <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">1 punto de atributo</strong>, se obtienen <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">2 puntos de talento</strong> para esa misma rama.
      </p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Los <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">talentos</strong> son especializaciones dentro de cada atributo. Los puntos de talento solo pueden usarse dentro de su propio atributo. Por ejemplo, los puntos de Fuerza no pueden usarse en Destreza, y viceversa.
      </p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        No tener puntos en un atributo o talento no impide realizar acciones relacionadas con él.
      </p>
      
      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="destreza" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Destreza</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        La destreza representa el equilibrio, la precisión física y la agilidad del personaje. Está enfocada en personajes rápidos, ágiles o sigilosos.
      </p>

      <h2 id="precision" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Precisión</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Habilidad para usar armas a distancia ligeras (como arcos, ballestas de una mano o pistolas) y para lanzar objetos ligeros o armas como dagas o tomahawks.</p>

      <h2 id="combate-agil" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Combate ágil</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Habilidad para usar armas rápidas y ligeras, como estoques, espadas cortas y dagas.</p>

      <h2 id="acrobacias" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Acrobacias</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Habilidad para realizar movimientos de parkour, mantener el equilibrio y moverse con agilidad.<br />
        Los ataques sin armas también se benefician de este talento.
      </p>

      <h2 id="sigilo" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Sigilo</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Habilidad para moverse sin ser visto ni escuchado, aprovechando sombras o escondites.<br />
        El sigilo no hace invisible al personaje.
      </p>

      <h2 id="juego-de-manos" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Juego de manos</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Habilidad para robar, usar ganzúas, realizar trucos, desarmar o evitar ser desarmado. Incluye acciones que requieren manos rápidas.</p>

      <h2 id="defensa-agil" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Defensa ágil</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Habilidad para esquivar o desviar ataques. Permite reposicionarse durante la defensa sin perder el movimiento si tiene éxito.<br />
        También permite defenderse de forma ágil y acrobática.
      </p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="fuerza" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Fuerza</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">La fuerza permite realizar acciones físicas más brutas que ágiles. Está enfocada en personajes como bárbaros o guerreros.</p>

      <h2 id="combate-dos-manos" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Combate con armas de dos manos</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Estilo de combate con armas de dos manos. Determina la probabilidad de éxito y el daño al usar este tipo de armas.</p>

      <h2 id="combate-una-mano" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Combate con armas de una mano</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Estilo de combate con armas de una mano. Determina la probabilidad de éxito y el daño con este tipo de armas, incluyendo la mano no dominante.</p>

      <h2 id="atletismo" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Atletismo</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Determina la capacidad de saltar, correr, resistir el cansancio y lanzar objetos a distancia.</p>

      <h2 id="brutalidad" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Brutalidad</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Habilidad para realizar acciones físicas intensas, como romper puertas, destruir objetos, levantar o mover objetos pesados o ganar forcejeos.<br />
        También influye en el robo de armas, ataques sin armas y el lanzamiento de armas o objetos con intención de dañar.<br />
        Druidas en forma animal y monjes también utilizan este talento.
      </p>

      <h2 id="defensa-robusta" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Defensa robusta</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Habilidad para bloquear o parar ataques con escudos o armas. No permite reposicionarse durante la defensa.<br />
        También se usa para resistir ataques de aplastamiento.
      </p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="inteligencia" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Inteligencia</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">La inteligencia representa el conocimiento sobre la magia, su uso, comprensión y detección.</p>

      <h2 id="arcano" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Arcano</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Conocimiento de la magia arcana en todas sus formas. Incluye magos pirotécnicos y criománticos.<br />
        Mejora la detección de magia arcana.
      </p>

      <h2 id="vil" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Vil</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Conocimiento de la magia vil y su uso. Incluye invocación de demonios y su estudio.<br />
        Mejora la detección de magia vil.
      </p>

      <h2 id="naturaleza" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Naturaleza</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Conocimiento de la magia de la naturaleza en todas sus formas.<br />
        Mejora la detección de magia natural.
      </p>

      <h2 id="sombras" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Sombras</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Conocimiento de la magia de sombras, incluyendo el vacío y sus derivados.<br />
        Mejora la detección de magia de sombras.
      </p>

      <h2 id="nigromancia" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Nigromancia</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Conocimiento de la magia nigromántica, incluyendo no muertos, magia drust, enfermedades y la muerte.<br />
        Mejora la detección de magia nigromántica.
      </p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="voluntad" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Voluntad</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Este atributo representa la conexión con los elementos, el espíritu interior, la Luz o Elune, además de la resistencia mental y mágica.</p>

      <h2 id="resistencia-magica" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Resistencia mágica</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Reduce el daño mágico recibido. Por cada punto, reduce 1 punto de daño (mínimo 1).<br />
        Nunca reduce el daño a cero.<br />
        No se aplica si el daño ya fue reducido por armadura.<br />
        Si es negativo, aumenta el daño recibido.
      </p>

      <h2 id="resistencia-perdida-control" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Resistencia a la pérdida de control</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Mejora la capacidad de mantener el control del personaje ante influencias externas, como control mental, instintos o efectos alquímicos.<br />
        También reduce la facilidad con la que el personaje puede ser provocado.
      </p>

      <h2 id="fe" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Fe</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Permite conectar con la Luz o Elune y recibir respuesta.<br />
        Habilita el uso de hechizos relacionados con estas fuerzas.
      </p>

      <h2 id="conexion-elemental" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Conexión elemental</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Permite conectar con los elementos y recibir respuesta para usar sus poderes.</p>

      <h2 id="chi" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Chi</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Permite usar el espíritu interior para potenciar las capacidades físicas del personaje.</p>

      <h2 id="regeneracion-mana" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Regeneración de maná</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Aumenta la regeneración de maná por turno.</p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="constitucion" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Constitución</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Este atributo representa la vitalidad, resistencia física y capacidad de soportar daño, aturdimientos y derribos.</p>

      <h2 id="resiliencia" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Resiliencia</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Resistencia a venenos y enfermedades naturales.<br />
        En -5, el personaje se vuelve débil a venenos y enfermedades.
      </p>

      <h2 id="resistencia-aturdimientos" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Resistencia a aturdimientos</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Reduce la duración o impacto de los aturdimientos.<br />
        Con +5, anula aturdimientos de 1 turno y reduce los demás a la mitad.<br />
        En -5, el personaje es más vulnerable a aturdimientos.
      </p>

      <h2 id="resistencia-derribos" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Resistencia a derribos</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Reduce la probabilidad de ser derribado por golpes, empujes o efectos.<br />
        Con +5, permite levantarse sin gastar acción.<br />
        En -5, el personaje es más vulnerable a derribos.
      </p>

      <h2 id="resistencia-frio" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Resistencia al frío</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Reduce el daño por frío ambiental y ciertos hechizos de escarcha.<br />
        Con +3, anula el daño por frío ambiental.<br />
        En -5, el personaje es más vulnerable al frío.
      </p>

      <h2 id="resistencia-calor" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Resistencia al calor</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Reduce el daño por calor ambiental y ciertos hechizos de fuego.<br />
        Con +3, anula el daño por calor ambiental.<br />
        En -5, el personaje es más vulnerable al calor.
      </p>

      <h2 id="fortaleza" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Fortaleza</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Reduce el daño recibido directamente. Por cada punto, reduce 1 punto de daño (mínimo 1).<br />
        Nunca reduce el daño a cero.<br />
        No se aplica si el daño ya fue reducido por armadura.<br />
        Si es negativo, aumenta el daño recibido.
      </p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="sabiduria" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Sabiduría</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Este atributo representa la intuición, el sentido común, la percepción, las profesiones y el conocimiento práctico.</p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Las profesiones cuentan como un talento propio.<br />
        Cada idioma también cuenta como un talento independiente, excepto el idioma nativo por historia.<br />
        Máximo: 2 idiomas dominados.
      </p>

      <h2 id="profesiones" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Profesiones</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Permite el conocimiento de una profesión específica.<br />
        Los puntos pueden repartirse entre una o varias profesiones.<br />
        Consultar la lista de profesiones en su sección correspondiente.
      </p>

      <h2 id="conexion-animales" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Conexión con los animales</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Permite comprender y comunicarse con animales sin necesidad de magia.</p>

      <h2 id="supervivencia" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Supervivencia</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Permite orientarse, seguir rastros, pescar, realizar primeros auxilios, encender fuego y crear trampas básicas.</p>

      <h2 id="percepcion" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Percepción</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Permite interpretar información mediante los sentidos (vista, oído, olfato y gusto).</p>

      <h2 id="idiomas" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Idiomas</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Permite hablar y comprender idiomas adicionales.<br />
        Máximo de 2 idiomas dominados por personaje.
      </p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="carisma" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Carisma</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Este atributo influye en la interacción con personajes no jugadores. No afecta a otros jugadores.</p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Las tiradas se enfrentan directamente al talento equivalente del personaje no jugador.<br />
        Ejemplo: persuadir se enfrenta a resistencia del objetivo.<br />
        La provocación se enfrenta a resistencia a la pérdida de control.
      </p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Aunque se supere una tirada, los personajes no jugadores siguen teniendo lógica propia y no realizarán acciones imposibles.</p>

      <h2 id="persuasion" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Persuasión</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Habilidad para influir en un personaje no jugador mediante razones o argumentos.</p>

      <h2 id="diplomacia" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Diplomacia</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Habilidad para negociar, mantener relaciones y tratar con respeto a personajes no jugadores.</p>

      <h2 id="comercio" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Comercio</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Habilidad para mejorar compras, ventas o intercambios, e influir en acuerdos económicos.</p>

      <h2 id="provocacion" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Provocación</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Habilidad para hacer que un personaje no jugador ataque al personaje.</p>

      <h2 id="seduccion" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Seducción</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Habilidad para atraer o enamorar a personajes no jugadores.</p>

      <h2 id="interpretacion" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Interpretación</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Habilidad para actuar, cantar o realizar representaciones de forma creíble y llamativa.</p>
    </div>
  );
};
