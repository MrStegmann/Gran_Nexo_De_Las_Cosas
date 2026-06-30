import React from 'react';

export const Introduction: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-2 py-8 animate-[fadeIn_0.5s_ease-out_forwards]">
      <h1 id="introduccion" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Introducción</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Este sistema ha sido diseñado para hacer que los roles sean más interesantes y ofrecer una dinámica clara, homogénea y fácil de seguir. Y, también, porque quería hacerlo.
      </p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Este documento explica todas las mecánicas del sistema de forma explícita, intentando evitar vacíos legales o interpretaciones ambiguas. Por ese motivo, puede resultar bastante extenso.
      </p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Además, esta introducción también servirá como guía para crear la ficha de un nuevo personaje.
      </p>

      <h2 id="sistema-sin-clases" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Un sistema sin clases</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Este sistema es <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">classless</strong> (sin clases).
      </p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Esto significa que puedes construir la ficha de tu personaje según el estilo de juego que prefieras, sin estar limitado por una clase predeterminada.
      </p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Las únicas restricciones son:</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2">Los puntos disponibles para repartir.</li>
        <li className="pl-1 sm:pl-2">Los niveles.</li>
        <li className="pl-1 sm:pl-2">Los hechizos.</li>
        <li className="pl-1 sm:pl-2">Las habilidades.</li>
      </ul>

      <h2 id="antes-de-lanzar" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Antes de lanzar un dado</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Para resolver cualquier acción, sigue siempre este orden:</p>
      <ol className="list-decimal list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:font-bold">
        <li className="pl-1 sm:pl-2">Escribe un <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">emote</strong> explicando <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">qué va a hacer tu personaje y cómo lo hará</strong>.</li>
        <li className="pl-1 sm:pl-2">Espera la respuesta del <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Máster</strong>.</li>
        <li className="pl-1 sm:pl-2">Solo entonces, lanza el dado cuando corresponda.</li>
      </ol>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Este sistema utiliza este procedimiento para añadir más dramatismo e incertidumbre a las acciones que no controlas directamente. Por ello, es importante pensar y describir cómo actuará tu personaje antes de depender del resultado de una tirada.
      </p>

      <h2 id="atributos-y-talentos" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Atributos y talentos</h2>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Los <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">atributos</strong> y <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">talentos</strong> deben aparecer siempre en el apartado <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">"A Primera Vista"</strong>.
      </p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Esto facilita al Máster revisar la información del personaje de forma rápida durante la partida.
      </p>
    </div>
  );
};
