import React from 'react';

interface Props {
  searchQuery?: string;
  activeFilter?: string;
}

const statesData = [
  {
    title: "Muerte",
    description: "Un personaje muere cuando sus puntos de vida llegan a 0 y no se le ha salvado dentro de la misma sesión en la que murió.\n\nEl estado previo a la muerte se le conoce como pre-muerte y es un estado dónde el personaje no podrá hacer nada hasta que otro le salve de la muerte.\n\nDurante esta fase, si el personaje recibe cualquier fuente de sanación que aumente sus puntos de vida, abandonará el estado de pre-muerte y volverá a la vida, perdiendo su turno por el estupor de volver a la vida.\n\nEn esta fase, el personaje no puede ser levantado como un no-muerto controlado por otro.\n\nAl pasar el tiempo para poder salvar al personaje, pasará a estar muerto por lo que, ninguna poción, conocimientos médicos ni hechizos podrán devolverlo a la vida.\n\nHay situaciones que, por su contexto, no entra en juego la interfase de pre-muerte y se entiende, directamente, como el personaje muerto. Por ejemplo:\n- Tu personaje ha explotado en mil pedazos.\n- Estás completamente sólo y no hay nadie para salvarte.",
    table: null
  },
  {
    title: "Sangrado",
    description: "Un estado en que el personaje pierde salud por cada turno que pase o por cada minuto (el máster decidirá como contará el tiempo de la forma más justa).\n\nEste estado puede revertirse con sanaciones con la intención de cortar el sangrado o con vendajes y atención de primeros auxilios.",
    table: {
      dificultad: "La dificultad de salvación va en función del estado de gravedad del personaje establecido en el apartado Heridas.",
      comoSalvarse: "En el momento que un personaje fuera a sufrir cualquier tipo de sangrado, éste tiene una oportunidad de salvarse de este estado. A no ser que el efecto sea insalvable.",
      ocurreCuando: "- Por habilidades.<br /><br />- Por una pifia en defensa frente a un arma cortante.<br /><br />- Por hechizos.",
      consecuencias: "1d4 HP + #Turno por turno (En combate)<br /><br />- #Turno se refiere a la cantidad de turnos que han pasado desde que el personaje se desangra y no ha hecho nada por detenerlo<br /><br />- #Min HP por minuto (Fuera de combate)<br /><br />- #Min se refiere a los minutos que han pasado desde que el personaje se desangra y no se ha hecho nada por detenerlo.",
      salvacion: "1d20 Constitución + Fortaleza"
    }
  },
  {
    title: "Aturdido",
    description: "Un estado que hace perder la opción de realizar cualquier tipo de acción mientras dura el efecto, volviendo al personaje completamente vulnerable a cualquier acción contra él.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función del origen del aturdimiento.",
      comoSalvarse: "En el momento que un personaje fuera a sufrir cualquier tipo de aturdimiento, éste tiene una oportunidad de salvarse de este estado. A no ser que el efecto sea insalvable.",
      ocurreCuando: "- Por habilidades.<br /><br />- Por el ambiente.<br /><br />- Por golpe contundente tras sufrir pifia en defensa.<br /><br />- Por acción directa para aturdir.<br /><br />- Por hechizos.",
      consecuencias: "Pierde 1 turno como mínimo. La cantidad total de turnos dependerá del origen del aturdimiento.<br /><br />Incapacidad total para realizar cualquier acción. No puede defenderse.<br /><br />Los ataques contra personajes aturdidos SIEMPRE son críticos.",
      salvacion: "1d20 Constitución + Res. Aturdimientos."
    }
  },
  {
    title: "Derribado",
    description: "Un estado que deja en desventaja al personaje que la sufre, quedando tirada en el suelo hasta que se reincorpore. Los personajes derribados siguen pudiendo defenderse y realizar ataques desde el suelo.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función del origen del derribo.",
      comoSalvarse: "En el momento que un personaje fuera a sufrir cualquier tipo de derribo, éste tiene una oportunidad de salvarse de este estado. A no ser que el efecto sea insalvable.",
      ocurreCuando: "- Por habilidades.<br /><br />- Por el ambiente.<br /><br />- Por acciones directas que derriben.<br /><br />- Por hechizos.",
      consecuencias: "Pierde 1 acción en reincorporarse.<br /><br />Permanece en el suelo hasta que se reincorpore.<br /><br />Los enemigos tienen ventajas sobre este personaje.",
      salvacion: "1d20 Constitución + Res. Derribos"
    }
  },
  {
    title: "Fatigado",
    description: "Un estado que consume la energía física del personaje haciendo que sus defensas se vean mermadas en efectividad. Este estado puede ocurrir por el tiempo transcurrido por combate de forma natural, o puede ser provocado de forma artificial.\n\nSi este estado se obtiene de forma NATURAL, no se podrá evitar con una salvación.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función del origen de la fatiga.",
      comoSalvarse: "En el momento que un personaje fuera a sufrir cualquier tipo de fatiga artificial, éste tiene una oportunidad de salvarse de este estado. A no ser que el efecto sea insalvable.",
      ocurreCuando: "- Por hechizos.<br /><br />- Por objetos consumibles.<br /><br />- Por hechizos.<br /><br />- Por tiempo de combate",
      consecuencias: "Reducción de cualquier defensa en -1 por acumulación.<br /><br />A partir de 4 acumulaciones, también reduce la Fortaleza y la Resistencia mágica por acumulación.",
      salvacion: "1d20 Constitución + Fortaleza<br /><br />1d20 Fuerza + Atletismo"
    }
  },
  {
    title: "Enraizado",
    description: "Un estado que imposibilita al personaje a moverse del sitio y, en ocasiones, a realizar cualquier acción, dependiendo de hasta dónde está enraizado.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función del tipo de enraizado (mayormente, determinado por los hechizos)",
      comoSalvarse: "En el momento que un personaje fuera a sufrir cualquier tipo de enraizado, éste tiene una oportunidad de salvarse de este estado. A no ser que el efecto sea insalvable.",
      ocurreCuando: "- Por hechizos.<br /><br />- Por objetos consumibles.<br /><br />- Por hechizos.<br /><br />- Por tiempo de combate",
      consecuencias: "No puedes moverte.<br /><br />Defensa ágil anulada",
      salvacion: "1d20 Fuerza + Brutalidad<br /><br />1d20 Destreza + Acrobacias"
    }
  },
  {
    title: "Enfermo",
    description: "Un estado que debilita la salud general del personaje debido a una dolencia o infección.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función del origen o virulencia de la enfermedad.",
      comoSalvarse: "En el momento que un personaje fuera a contraer cualquier tipo de enfermedad, éste tiene una oportunidad de salvarse de este estado. A no ser que el efecto sea insalvable. Adicionalmente, puede tratarse con pociones, conocimientos médicos o hechizos.",
      ocurreCuando: "- Por ambiente insalubre o putrefacto.<br /><br />- Por ataques de criaturas infecciosas.<br /><br />- Por consumo de alimentos en mal estado.<br /><br />- Por hechizos o maldiciones.",
      consecuencias: "Determinado por la enfermedad específica.",
      salvacion: "1d20 Constitución + Resiliencia"
    }
  },
  {
    title: "Asustado",
    description: "El miedo invade al personaje, mermando su confianza y capacidad de concentración ante el peligro.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función de lo terrorífico que sea el origen del miedo.",
      comoSalvarse: "En el momento que un personaje fuera a asustarse, éste tiene una oportunidad de salvarse de este estado. A no ser que el efecto sea insalvable. También se puede superar si la fuente del miedo es eliminada.",
      ocurreCuando: "- Por presencia de monstruos o entidades aterradoras.<br /><br />- Por hechizos o habilidades de intimidación.<br /><br />- Por situaciones de extremo peligro.",
      consecuencias: "No se pueden sumar los talentos en tiradas ofensivas o de habilidad mientras se esté frente a la fuente del miedo.",
      salvacion: "1d20 Voluntad + Res. Pérdida de control"
    }
  },
  {
    title: "Pérdida de control",
    description: "El personaje cae bajo la influencia externa o impulsos irracionales, perdiendo su autonomía.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función del poder de quien o qué impone el control.",
      comoSalvarse: "En el momento que un personaje fuera a perder el control, éste tiene una oportunidad de salvarse de este estado. A no ser que el efecto sea insalvable. Puede revertirse si el controlador pierde el enfoque o mediante habilidades específicas de purificación mental.",
      ocurreCuando: "- Por hechizos de control mental.<br /><br />- Por artefactos malditos.<br /><br />- Por toxinas alucinógenas.",
      consecuencias: "Pierdes el control de tu personaje y el Máster determina tus acciones.",
      salvacion: "1d20 Voluntad + Res. Pérdida de control"
    }
  },
  {
    title: "Quemado",
    description: "Las quemaduras graves dañan el tejido y reducen la resistencia física del personaje.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función de la intensidad de la fuente de calor o fuego.",
      comoSalvarse: "En el momento que un personaje fuera a sufrir quemaduras, éste tiene una oportunidad de evitar parte o todo el daño. A no ser que el fuego sea ineludible. Posteriormente, requiere tratamiento médico, mágico o tiempo de descanso.",
      ocurreCuando: "- Por exposición prolongada al fuego o calor extremo.<br /><br />- Por hechizos ígneos.<br /><br />- Por explosiones.<br /><br />- Tras sufrir el estado Incendiado.",
      consecuencias: "Dependiendo de la gravedad, la Resiliencia se reduce a 0 o se aplica un penalizador de hasta -5.",
      salvacion: "1d20 Constitución + Fortaleza"
    }
  },
  {
    title: "Locura",
    description: "La mente del personaje se quiebra temporalmente, provocando comportamientos erráticos e impredecibles.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función de la magnitud del trauma mental.",
      comoSalvarse: "En el momento que un personaje fuera a caer en la locura, éste tiene una oportunidad de salvarse de este estado resistiendo mentalmente. A no ser que el efecto sea insalvable.",
      ocurreCuando: "- Por presenciar horrores cósmicos o visiones perturbadoras.<br /><br />- Por hechizos de manipulación mental extrema.<br /><br />- Por daño severo prolongado.",
      consecuencias: "Pierdes el control y debes lanzar 1d3 para determinar el efecto:<br /><br />1: Huyes aterrado.<br /><br />2: Quedas paralizado (Aturdido).<br /><br />3: Atacas al objetivo más cercano (aliado o a ti mismo).",
      salvacion: "1d20 Voluntad + Res. Pérdida de control"
    }
  },
  {
    title: "Cegado",
    description: "La pérdida total o parcial de la visión dificulta cualquier acción que requiera precisión visual.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función del origen de la ceguera.",
      comoSalvarse: "En el momento que un personaje fuera a sufrir ceguera, éste tiene una oportunidad de protegerse la vista o apartar la mirada. A no ser que el efecto sea insalvable.",
      ocurreCuando: "- Por destellos de luz intensos.<br /><br />- Por hechizos.<br /><br />- Por toxinas o polvos arrojados a los ojos.<br /><br />- Por ambiente oscuro severo.",
      consecuencias: "El ataque y la defensa reciben una penalización de -5.",
      salvacion: "1d20 Constitución + Fortaleza"
    }
  },
  {
    title: "Agarrado",
    description: "El personaje está inmovilizado por una fuerza externa, limitando su libertad de movimiento.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad está determinada normalmente por la tirada o fuerza del oponente (FUE + Brutalidad).",
      comoSalvarse: "En el momento que un personaje fuera a ser agarrado, o en su propio turno si ya lo está, éste tiene una oportunidad de zafarse del agarre. A no ser que el efecto sea insalvable debido a una diferencia de tamaño descomunal.",
      ocurreCuando: "- Por acciones físicas de un enemigo (agarrar).<br /><br />- Por trampas.<br /><br />- Por hechizos o criaturas con extremidades prensiles.",
      consecuencias: "Incapacidad para realizar acciones de movimiento y penalización de -2 a la Defensa Ágil.",
      salvacion: "1d20 Fuerza + Brutalidad<br /><br />1d20 Destreza + Acrobacias"
    }
  },
  {
    title: "Desarmado",
    description: "El personaje ha perdido su arma principal o herramienta de combate.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad está determinada normalmente por la tirada o habilidad del oponente (DEX + Juego de manos).",
      comoSalvarse: "En el momento que un personaje fuera a ser desarmado, éste tiene una oportunidad de retener su arma mediante un agarre firme o movimientos rápidos.",
      ocurreCuando: "- Por acciones físicas de un enemigo (desarmar).<br /><br />- Por pifias al atacar.<br /><br />- Por hechizos o habilidades específicas.",
      consecuencias: "Pérdida inmediata del objeto empuñado. El arma cae al suelo cerca o a cierta distancia.",
      salvacion: "1d20 Destreza + Juego de manos<br /><br />1d20 Fuerza + Brutalidad (si el desarme se basa en fuerza bruta)"
    }
  },
  {
    title: "Cojera",
    description: "Una lesión en las extremidades inferiores que reduce drásticamente la movilidad.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función de la gravedad del golpe recibido.",
      comoSalvarse: "En el momento que un personaje reciba un golpe crítico en las piernas o caiga desde gran altura, éste tiene una oportunidad de evitar la cojera. Generalmente requiere atención médica para curarse.",
      ocurreCuando: "- Por daño masivo en las piernas.<br /><br />- Por trampas.<br /><br />- Por caídas pronunciadas.",
      consecuencias: "El movimiento se reduce a 10 metros (máximo 20 con crítico) y se anulan los talentos en pruebas físicas.",
      salvacion: "1d20 Constitución + Fortaleza"
    }
  },
  {
    title: "Resucitado",
    description: "El choque de volver a la vida deja al personaje en un estado de debilidad extrema.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 15 (Base)</strong>. Esta dificultad puede variar en función del método de resurrección o del tiempo que ha estado muerto.",
      comoSalvarse: "Dado que es un estado posterior a revivir, no se puede \"evitar\" al resucitar. La salvación se realiza para superar el choque y reducir sus efectos o recuperarse más rápido.",
      ocurreCuando: "- Tras volver a la vida mediante magias poderosas o curaciones excepcionales desde el estado de pre-muerte.",
      consecuencias: "Todas las capacidades mermadas (sin bonificación de atributos ni talentos) hasta realizar un descanso largo o recibir sanación restauradora específica.",
      salvacion: "1d20 Constitución + Fortaleza"
    }
  },
  {
    title: "Paranoia",
    description: "Un miedo irracional y obsesivo impide al personaje interactuar con el objeto de su desconfianza.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función de la intensidad de la paranoia.",
      comoSalvarse: "En el momento que un personaje fuera a sufrir de paranoia, éste tiene una oportunidad de sobreponerse con racionalidad y fuerza de voluntad.",
      ocurreCuando: "- Por hechizos de ilusión o control mental.<br /><br />- Por consumo de drogas o toxinas alucinógenas.<br /><br />- Por fatiga mental extrema.",
      consecuencias: "Imposibilidad de realizar acciones directas sobre aquello que causa la paranoia.",
      salvacion: "1d20 Voluntad + Res. Pérdida de control"
    }
  },
  {
    title: "Vértigo",
    description: "La inestabilidad sensorial provoca que el personaje pierda el equilibrio fácilmente.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función del origen del vértigo.",
      comoSalvarse: "En el momento que un personaje fuera a sufrir vértigo, éste tiene una oportunidad de estabilizarse y mantener el enfoque.",
      ocurreCuando: "- Por hechizos o toxinas.<br /><br />- Por ataques severos a la cabeza (aturdimiento parcial).<br /><br />- Por estar en alturas elevadas (si sufre acrofobia).",
      consecuencias: "Todas las acciones requieren una prueba de equilibrio previa para poder ejecutarse.",
      salvacion: "1d20 Destreza + Acrobacias<br /><br />1d20 Constitución + Fortaleza"
    }
  },
  {
    title: "Incendiado",
    description: "El personaje está envuelto en llamas, sufriendo daño continuo mientras el fuego no se extinga.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función del tipo de fuego (mágico, químico, natural).",
      comoSalvarse: "En el momento que un personaje fuera a incendiarse, éste tiene una oportunidad de esquivarlo o sofocarlo rápidamente. Puede salvarse usando una acción para rodar por el suelo o apagarse con agua.",
      ocurreCuando: "- Por hechizos de fuego.<br /><br />- Por trampas inflamables.<br /><br />- Por explosiones o contacto prolongado con superficies ardientes.",
      consecuencias: "Daño periódico al final de cada turno (1d4 base). El dado de daño aumenta en un paso (+1 al valor del dado) por cada turno transcurrido sin apagarse. Puede dejar el estado Quemado tras sofocarse.",
      salvacion: "1d20 Destreza + Acrobacias (Para apagarse)<br /><br />1d20 Constitución + Res. Calor (Para resistir el efecto inicial)"
    }
  },
  {
    title: "Embelesado",
    description: "El personaje está bajo un influjo emocional o mágico que nubla su juicio y voluntad.",
    table: {
      dificultad: "<strong className='font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide'> 10 (Base)</strong>. Esta dificultad puede variar en función del carisma o poder de quien embelece.",
      comoSalvarse: "En el momento que un personaje fuera a ser embelesado, éste tiene una oportunidad de resistir la influencia manteniendo la cordura y frialdad. A no ser que el efecto sea insalvable.",
      ocurreCuando: "- Por hechizos de encantamiento.<br /><br />- Por habilidades sociales o de seducción de criaturas sobrenaturales.<br /><br />- Por feromonas.",
      consecuencias: "Incapacidad para razonar con claridad; las acciones son dictadas por las emociones o por la figura de adoración sin control del jugador.",
      salvacion: "1d20 Voluntad + Res. Pérdida de control"
    }
  }
];

export const States: React.FC<Props> = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-2 py-8 animate-[fadeIn_0.5s_ease-out_forwards]">
      <h1 id="estados-alterados" className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--theme-color)] [text-shadow:0_0_15px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] mb-8 pb-3 border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] mt-8 first:mt-0 uppercase tracking-widest">Estados alterados</h1>

      {statesData.map((state, index) => (
        <React.Fragment key={state.title}>
          <h2 id={state.title.toLowerCase().replace(/\s+/g, '-')} className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white/90 [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_40%,transparent)] mt-10 mb-4 pb-2 border-b border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] tracking-wide">{state.title}</h2>
          {state.description.split('\n\n').map((paragraph, pIndex) => {
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={pIndex} className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-white/80 text-sm md:text-base font-sans font-light marker:text-[var(--theme-color)] marker:[text-shadow:0_0_5px_var(--theme-color)]">
                  {paragraph.split('\n').map((item, iIndex) => (
                    <li key={iIndex} className="pl-1 sm:pl-2" dangerouslySetInnerHTML={{ __html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">$1</strong>') }} />
                  ))}
                </ul>
              );
            }
            return <p key={pIndex} className="mb-4 leading-relaxed text-white/80 text-sm md:text-base font-sans font-light" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">$1</strong>') }} />;
          })}
          
          {state.table && (
            <table className="w-full text-left border-collapse mb-8 bg-black/40 rounded border border-[color-mix(in_srgb,var(--theme-color)_20%,transparent)] block sm:table overflow-x-auto whitespace-nowrap sm:whitespace-normal font-sans text-sm backdrop-blur-sm">
              <thead className="">
                <tr className="">
                  <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Propiedad</th>
                  <th align="left" className="bg-[color-mix(in_srgb,var(--theme-color)_15%,transparent)] px-4 py-3 font-mono font-semibold text-[var(--theme-color)] border-b border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)] tracking-wide uppercase text-xs">Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Dificultad de Salvación</strong></td>
                  <td align="left" dangerouslySetInnerHTML={{ __html: state.table.dificultad }}  className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"/>
                </tr>
                <tr>
                  <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Cómo salvarse</strong></td>
                  <td align="left" dangerouslySetInnerHTML={{ __html: state.table.comoSalvarse }}  className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"/>
                </tr>
                <tr>
                  <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Ocurre cuando</strong></td>
                  <td align="left" dangerouslySetInnerHTML={{ __html: state.table.ocurreCuando }}  className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"/>
                </tr>
                <tr>
                  <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Consecuencias</strong></td>
                  <td align="left" dangerouslySetInnerHTML={{ __html: state.table.consecuencias }}  className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"/>
                </tr>
                <tr>
                  <td align="left" className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"><strong className="font-medium text-white [text-shadow:0_0_8px_color-mix(in_srgb,var(--theme-color)_60%,transparent)] tracking-wide">Salvación</strong></td>
                  <td align="left" dangerouslySetInnerHTML={{ __html: state.table.salvacion }}  className="px-4 py-3 text-white/70 border-b border-[color-mix(in_srgb,var(--theme-color)_10%,transparent)] align-top font-light"/>
                </tr>
              </tbody>
            </table>
          )}
          {index < statesData.length - 1 && <hr  className="my-10 border-t border-[color-mix(in_srgb,var(--theme-color)_30%,transparent)]"/>}
        </React.Fragment>
      ))}
    </div>
  );
};
