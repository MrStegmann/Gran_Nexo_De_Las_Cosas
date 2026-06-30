import React from 'react';

export const NewChar: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-2 py-8 animate-[fadeIn_0.5s_ease-out_forwards]">
      <h1 id="nuevo-personaje" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Nuevo personaje</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Al crear un nuevo personaje, debes elegir una de estas dos categorías:</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Novato</strong></li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Normal</strong></li>
      </ul>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Todos los personajes nuevos comienzan en el <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Nivel 1</strong>.</p>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="novato" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Novato - Nivel 1</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Los personajes de categoría <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Novato</strong> tienen las siguientes características:</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">0 puntos de atributos</strong> para repartir.</li>
        <li className="pl-1 sm:pl-2">Pueden elegir <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">hasta 2 hechizos o 2 habilidades</strong>.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">15 puntos de Vida.</strong></li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">5 puntos de Maná y Espíritu.</strong></li>
        <li className="pl-1 sm:pl-2">Pueden tener <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">como máximo 1 Rasgo Positivo</strong>.</li>
        <li className="pl-1 sm:pl-2">Deben tener <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">como mínimo 1 Rasgo Negativo</strong>.</li>
        <li className="pl-1 sm:pl-2">Comienzan con <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">armadura y arma/s básicas</strong>.</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="normal" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Normal - Nivel 1</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">Los personajes de categoría <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Normal</strong> tienen las siguientes características:</p>
      <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">5 puntos de atributos</strong> para repartir libremente.</li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">20 puntos de Vida.</strong></li>
        <li className="pl-1 sm:pl-2"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">10 puntos de Maná y Espíritu.</strong></li>
        <li className="pl-1 sm:pl-2">Pueden tener <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">como máximo 2 Rasgos Positivos</strong>.</li>
        <li className="pl-1 sm:pl-2">Deben tener <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">como mínimo 2 Rasgos Negativos</strong>.</li>
        <li className="pl-1 sm:pl-2">Comienzan con <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">armadura y arma/s básicas</strong>.</li>
        <li className="pl-1 sm:pl-2">Pueden elegir <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">hasta 5 hechizos o 2 habilidades</strong>.</li>
      </ul>

      <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>

      <h1 id="plantilla-talentos" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Plantilla de talentos (A Primera Vista)</h1>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">No es obligatorio mostrar todos los talentos en la ficha.</p>
      <p className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light">
        Puedes copiar la plantilla completa, rellenar únicamente los valores que correspondan a tu personaje y eliminar aquellos talentos que permanezcan en <strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">0</strong> o que no vayas a utilizar.
      </p>

      <h2 id="plantilla" className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">Plantilla</h2>
      <pre><code>{`-- Destreza: 0 --
├─ Precisión: 0
├─ Combate Ágil: 0
├─ Acrobacias: 0
├─ Sigilo: 0
├─ Juego de Manos: 0
└─ Defensa Ágil: 0

-- Fuerza: 0 --
├─ Combate a 2 manos: 0
├─ Combate a 1 mano: 0
├─ Atletismo: 0
├─ Brutalidad: 0
└─ Defensa Robusta: 0

-- Inteligencia: 0 --
├─ Arcano: 0
├─ Vil: 0
├─ Naturaleza: 0
├─ Sombras: 0
└─ Nigromancia: 0

-- Voluntad: 0 --
├─ Resistencia Mágica: 0
├─ Resistencia a la Pérdida de Control: 0
├─ Fe: 0
├─ Conexión Elemental: 0
├─ Chi: 0
└─ Regeneración de Maná: 0

-- Constitución: 0 --
├─ Resiliencia: 0
├─ Resistencia a Aturdimientos: 0
├─ Resistencia a Derribos: 0
├─ Resistencia al Frío: 0
├─ Resistencia al Calor: 0
└─ Fortaleza: 0

-- Sabiduría: 0 --
├─ Profesiones: 0
├─ Conexión Animal: 0
├─ Supervivencia: 0
├─ Percepción: 0
└─ Idiomas:

-- Carisma: 0 --
├─ Persuasión: 0
├─ Diplomacia: 0
├─ Comercio: 0
├─ Provocación: 0
├─ Seducción: 0
└─ Interpretación: 0`}</code></pre>
    </div>
  );
};
