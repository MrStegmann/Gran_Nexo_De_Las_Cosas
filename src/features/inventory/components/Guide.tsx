import React from 'react';
import img01 from '../../../assets/documents/inventory/img/extended_objects_database_01.png';
import img02 from '../../../assets/documents/inventory/img/extended_objects_database_02.png';
import img03 from '../../../assets/documents/inventory/img/extended_objects_database_03.png';

export const Guide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-2 py-8 animate-[fadeIn_0.5s_ease-out_forwards]">
      <h1 id="guia-creacion" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Guía de Creación de Equipamiento en Total Roleplay 3: Extended</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Esta guía está diseñada para que todas las armaduras, escudos y armas que crees a través del complemento <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Total Roleplay 3: Extended</strong> sean reconocidas correctamente por nuestro <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Gran Addon de las Cosas</strong>.
      </p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Es fundamental que sigas estas instrucciones al pie de la letra. De lo contrario, el complemento no podrá mostrar la información de tus objetos ni activar sus funciones correspondientes.
      </p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="paso-inicial" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">🛠️ Paso Inicial Común (Para cualquier objeto)</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Para empezar a crear cualquier pieza de equipamiento, sigue estos pasos iniciales dentro del juego:</p>
      <ol className="list-decimal list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:font-bold">
        <li className="pl-1 sm:pl-2">Abre la base de datos haciendo clic en la opción <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Extended objects database</strong> (<em className="italic text-white/60 font-light">Base de datos de objetos extendidos</em>).</li>
      </ol>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light"><img src={img01} alt="Extended objects database 1" /></p>
      <ol start={2} className="list-decimal list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:font-bold">
        <li className="pl-1 sm:pl-2">En la parte inferior de la ventana, dentro de la sección <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Actions</strong> (<em className="italic text-white/60 font-light">Acciones</em>), pulsa sobre el botón <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Create item</strong> (<em className="italic text-white/60 font-light">Crear objeto</em>).</li>
      </ol>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light"><img src={img02} alt="Extended objects database 2" /></p>
      <ol start={3} className="list-decimal list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:font-bold">
        <li className="pl-1 sm:pl-2">En la ventana emergente que aparecerá, selecciona la opción <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Blank item</strong> (<em className="italic text-white/60 font-light">Objeto en blanco</em>).</li>
      </ol>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="creacion-armaduras" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">🛡️ 1. Creación de Armaduras</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Una vez creado el objeto en blanco, configúralo con los siguientes parámetros:</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Calidad del objeto (<em className="italic text-white/60 font-light">Item quality</em>):</strong> Para piezas iniciales, deja la opción predeterminada en <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Common</strong> (<em className="italic text-white/60 font-light">Común</em>).</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Nombre del objeto (<em className="italic text-white/60 font-light">Item name</em>):</strong> Escribe el nombre que prefieras para darle tu toque personal (este campo no afecta al funcionamiento del complemento).</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Texto personalizado izquierdo (<em className="italic text-white/60 font-light">Tooltip left custom text</em>):</strong> Aquí debes especificar el tipo de armadura y, si tiene refuerzo, qué tipo de refuerzo lleva. Es obligatorio respetar estrictamente la siguiente estructura de escritura:
          <br /><em className="italic text-white/60 font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide"><code>tipoArmadura[: Refuerzos-TipoRefuerzo]</code></strong></em>
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">Ejemplos:
              <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
                <li className="pl-1 sm:pl-2"><code>Tela</code></li>
                <li className="pl-1 sm:pl-2"><code>Cuero: Refuerzos-Malla</code></li>
                <li className="pl-1 sm:pl-2"><code>Malla: Refuerzos-Cuero</code></li>
                <li className="pl-1 sm:pl-2"><code>Placa</code></li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Texto personalizado derecho (<em className="italic text-white/60 font-light">Tooltip right custom text</em>):</strong> Especifica la parte del cuerpo a la que corresponde la pieza. Escribe únicamente una de las siguientes opciones: <code>Cabeza</code>, <code>Pecho</code>, <code>Manos</code> o <code>Piernas</code>.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Icono:</strong> Elige el icono visual que más te guste para tu armadura.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Atributos de juego (<em className="italic text-white/60 font-light">Gameplay attributes</em>):</strong> Es obligatorio marcar la casilla <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Wearable</strong> (<em className="italic text-white/60 font-light">Equipable</em>). Las demás opciones de esta sección no son necesarias.</li>
      </ul>

      <blockquote>
        <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">⚠️ <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">¡Importante!</strong> Los campos de texto personalizado izquierdo y derecho son <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">obligatorios</strong>. Si no sigues la estructura indicada, el complemento no reconocerá tu armadura.</p>
      </blockquote>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="creacion-escudos" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">🛡️ 2. Creación de Escudos</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Configura tu escudo en la ventana del objeto en blanco utilizando las siguientes opciones:</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Texto personalizado izquierdo (<em className="italic text-white/60 font-light">Tooltip left custom text</em>):</strong> Escribe el tipo de escudo según su peso. Debes poner una de estas tres opciones: <code>Ligero</code>, <code>Medio</code> o <code>Pesado</code>.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Texto personalizado derecho (<em className="italic text-white/60 font-light">Tooltip right custom text</em>):</strong> Escribe exactamente la palabra: <code>Escudo</code>.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Icono:</strong> Selecciona el icono que prefieras para mostrar en tu equipamiento.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Atributos de juego (<em className="italic text-white/60 font-light">Gameplay attributes</em>):</strong> Es obligatorio marcar la casilla <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Wearable</strong> (<em className="italic text-white/60 font-light">Equipable</em>). El resto de casillas pueden quedar vacías.</li>
      </ul>

      <blockquote>
        <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">⚠️ <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">¡Importante!</strong> Configurar estos dos textos personalizados es <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">obligatorio</strong> para que el complemento identifique correctamente el escudo.</p>
      </blockquote>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="creacion-armas" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">⚔️ 3. Creación de Armas</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Configura tu arma en la ventana del objeto en blanco con los siguientes datos:</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Texto personalizado izquierdo (<em className="italic text-white/60 font-light">Tooltip left custom text</em>):</strong> Este espacio se utiliza para añadir un modificador de mejora que aumentará el daño base del arma. Debes escribir un signo de más seguido del número correspondiente.
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2"><em className="italic text-white/60 font-light">Ejemplos:</em> <code>+1</code>, <code>+2</code>, <code>+3</code>, <code>+4</code></li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Texto personalizado derecho (<em className="italic text-white/60 font-light">Tooltip right custom text</em>):</strong> Escribe el tipo de arma exacto al que pertenece.
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2"><em className="italic text-white/60 font-light">Ejemplos:</em> <code>Daga</code>, <code>Espada corta</code>, <code>Hacha de guerra</code>, etc.</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Icono:</strong> Selecciona el icono representativo que prefieras para tu arma.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Atributos de juego (<em className="italic text-white/60 font-light">Gameplay attributes</em>):</strong> Es obligatorio marcar la casilla <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Wearable</strong> (<em className="italic text-white/60 font-light">Equipable</em>). Deja las demás opciones sin marcar.</li>
      </ul>

      <blockquote>
        <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">⚠️ <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">¡Importante!</strong> El campo de texto personalizado derecho es <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">obligatorio</strong> para la detección del arma.</p>
      </blockquote>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="guardar-equipar" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">💾 ¿Cómo guardar y equipar tus objetos creados?</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Una vez que hayas terminado de rellenar las opciones de tu armadura, escudo o arma, realiza el siguiente procedimiento para utilizarlo:</p>
      <ol className="list-decimal list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:font-bold">
        <li className="pl-1 sm:pl-2">Guarda el objeto pulsando el botón <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Save</strong> (<em className="italic text-white/60 font-light">Guardar</em>).</li>
        <li className="pl-1 sm:pl-2">Busca el objeto recién creado en tu lista de creaciones de la base de datos.</li>
        <li className="pl-1 sm:pl-2">Haz <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">clic derecho</strong> sobre él y selecciona la opción <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Add to main inventory</strong> (<em className="italic text-white/60 font-light">Añadir al inventario principal</em>).</li>
        <li className="pl-1 sm:pl-2">Dirígete a las opciones generales de Total Roleplay 3 y busca el <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">icono de la bolsa</strong>:
          <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
            <li className="pl-1 sm:pl-2">Haz <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">clic izquierdo</strong> sobre el icono para abrir tu inventario/bolsa.</li>
            <li className="pl-1 sm:pl-2">Haz <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">clic derecho</strong> sobre el icono para abrir tu pestaña de equipo del personaje.</li>
          </ul>
        </li>
        <li className="pl-1 sm:pl-2">Con ambas ventanas abiertas, <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">arrastra el objeto</strong> desde tu inventario y suéltalo en el hueco de equipamiento correspondiente. ¡Listo, ya tienes tu pieza equipada!</li>
      </ol>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h2 id="orden-equipo" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">🚨 Información Importante sobre el Orden del Equipo</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">El complemento escanea tu equipamiento en un orden muy específico para determinar las propiedades de tus armas y defensas:</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">El sistema detecta como <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">arma principal</strong> el primer objeto equipable que encuentra en la interfaz.</li>
        <li className="pl-1 sm:pl-2">La lectura de los huecos se realiza <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">de arriba hacia abajo</strong>, comenzando primero por la <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">columna de la izquierda</strong>.</li>
      </ul>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Asegúrate de colocar tus objetos en los huecos correctos respetando las prioridades que desees asignar a tu arma Principal, Secundaria/Escudo o Tercera arma.</p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light"><img src={img03} alt="Extended objects database 3" /></p>
    </div>
  );
};
