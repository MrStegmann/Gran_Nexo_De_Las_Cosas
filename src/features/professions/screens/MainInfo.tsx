import React from "react";
import { renderWithHighlights } from "../../../components/Tesseract/Tesseract";

export const mainInfoSearchText = `Profesiones: Resumen Cada personaje puede elegir una profesión inicial como parte de su trasfondo (máximo 1). Esta profesión cuenta con tres niveles de maestría. A medida que avancen, los jugadores podrán aprender nuevas profesiones o subir de nivel su profesión elegida mediante Misiones de Profesión dirigidas por el Máster.
El objetivo de las profesiones es ofrecer al personaje una forma secundaria de obtener ingresos o desarrollar sus capacidades en situaciones que requieren de una profesión (reparar armas y armaduras, forjar nuevas armas en el mismísimo infierno glacial, etc).
Será el Máster quien defina la dificultad y el desarrollo de una Misión de Profesión.
Las profesiones constaran de 6 niveles: Novato, Aprendiz, Artesano, Experto, Maestro y Gran Maestro; que ofrecerán distintas ventajas en su profesión que se detallarán más adelante.
Además, cada nivel "desbloquea" el conocimiento necesario para trabajar materiales más raros (esto implica que trabajar ciertos materiales no tendrá una dificultad elevada, sino que te cuesta menos).
También, cada nivel ofrece un mejor dado de calidad. Este dado de calidad se tirará siempre que se finalice exitosamente un trabajo y estará asociado a las indicadas por el nivel de profesión.
Tabla de niveles Nivel Nombre Experiencia Materiales Calidad Ventajas
1 Novato Trasfondo inicial Comunes 1D4
2 Aprendiz 100 Exp Comunes 1D4 + nivel
3 Artesano 250 XP + Misión Poco comunes 1D6 + nivel Ventaja en tiradas de profesión
4 Experto 500 XP Raros 1D8 + nivel
5 Maestro 1000 XP + Misión Épicos 1D10 + nivel
6 Gran Maestro 2000 XP + Misión Magnánima Legendarios 1D12 + nivel
Tabla de dificultad Rareza del Material Nivel Requerido DT Inspección / Rastreo DT Recolección / Forja Ejemplos
Común Nivel 1 (Novato) DT 10 DT 10 Hierro, Tela de Lino, Cobre
Poco Común Nivel 3 (Artesano) DT 12 DT 14 Acero, Cuero Curtido, Raíz de Plata
Raro Nivel 4 (Experto) DT 15 DT 18 Mitril, Tela de Seda sutil, Flor de Loto
Épico Nivel 5 (Maestro) DT 18 DT 22 Adamantita, Escamas de Dragón Menor
Legendario Nivel 6 (Gran Maestro) DT 22 DT 26 Elementium, Sangre de Dios Antiguo
Cómo funciona Las Profesiones se realizan con tiradas de Sabiduría, a las que le sumaremos el nivel de nuestra profesión. Es decir, si estás inspeccionando o trabajando en una Veta para saber su pureza, lanzarías: 1D20 + Sabiduría + Nivel Profesión.
El proceso de fabricación seguirá tres pasos que afectarán a la calidad final.
Superar cada fase de creación otorga un modificador (+2, +1, -1 o -2) en función del resultado del dado:
+2 si es un crítico
+1 si supera la dificultad
-1 si no supera la dificultad
-2 si saca pifia
Al final del proceso de 3 pasos de fabricación, se lanzará el dado de Calidad de tu nivel más los modificadores.
Por ejemplo: Eres herrero novato y fabricas una espada de hierro:
Fundición: Fundes el mineral para su forja - 1D20 + Sab + Nivel (Resultado: 10)
Forja: Golpea para dar forma al metal y esas cosas de macho herrero - 1D20 + Sab + Nivel (Resultado: 14)
Templanza: Templas el metal para fortalecerlo - 1D20 + Sab + Nivel (Resultado: 1)
Ahora que tenemos todo, tirada de Calidad - 1D4 + 2 - 2
El resultado de la calidad nos servirá para determinar el precio del trabajo.
Lista de profesiones Nombre Descripción Proceso 1 Proceso 2 Proceso 3
Herrería Forja y reparación de armas/armaduras de metal. Fundición Forja Templanza
Sastrería Confección de ropas y armaduras de tela. Remiendos de armaduras de tela Patronaje Confección Remate
Peletería Curtido de pieles y armaduras de cuero. Remiendos de armaduras de cuero. Desuello Curtido Remache
Carpintería Trabajo de madera para arcos y bastones. Talla Ensamblaje Barnizado
Minería Extracción y fundición de metales. Prospección Extracción Refinado
Joyería Talla de gemas y creación de anillos. Tallado Engaste Pulido
Cocina Preparación de comidas y raciones. Aderezo Cocción Emplatado
Ingeniería Creación de artilugios y mecanismos. Calibración Ensamblaje Ajuste
Encantamiento Imbuir con magia objetos y equipo. Foco Canalización Sellado
Inscripción Creación de pergaminos y runas. Formulación Trazado Consagración
Alquimia Elaboración de pociones, elixires y venenos. Maceración Destilación Catalización
Herboristería Recolección y tratamiento de plantas. Rastreo Cosecha Secado
Medicina Anatomía, cirugía de campo y curación. Diagnóstico Tratamiento Sutura
`.toLowerCase();

export const MainInfo: React.FC<{ searchQuery?: string }> = ({ searchQuery = "" }) => {
  return renderWithHighlights(
    <div className="w-full text-left space-y-6">
      <h2 className="text-2xl font-bold text-yellow-500 mb-4 border-b border-white/20 pb-2">
        Profesiones: Resumen
      </h2>

      <p className="text-lg">
        Cada personaje puede elegir una profesión inicial como parte de su trasfondo (máximo 1). Esta profesión cuenta con tres niveles de maestría. A medida que avancen, los jugadores podrán aprender nuevas profesiones o subir de nivel su profesión elegida mediante Misiones de Profesión dirigidas por el Máster.
      </p>

      <p className="text-lg">
        El objetivo de las profesiones es ofrecer al personaje una forma secundaria de obtener ingresos o desarrollar sus capacidades en situaciones que requieren de una profesión (reparar armas y armaduras, forjar nuevas armas en el mismísimo infierno glacial, etc).
      </p>

      <p className="text-lg">
        Será el Máster quien defina la dificultad y el desarrollo de una Misión de Profesión.
      </p>

      <p className="text-lg">
        Las profesiones constaran de 6 niveles: <strong>Novato, Aprendiz, Artesano, Experto, Maestro y Gran Maestro</strong>; que ofrecerán distintas ventajas en su profesión que se detallarán más adelante.
      </p>

      <p className="text-lg">
        Además, cada nivel "desbloquea" el conocimiento necesario para trabajar materiales más raros (esto implica que trabajar ciertos materiales no tendrá una dificultad elevada, sino que te cuesta menos).
      </p>

      <p className="text-lg">
        También, cada nivel ofrece un mejor dado de calidad. Este dado de calidad se tirará siempre que se finalice exitosamente un trabajo y estará asociado a las indicadas por el nivel de profesión.
      </p>

      <h3 className="text-xl font-bold text-yellow-400 mt-8 mb-4 border-b border-white/10 pb-2">Tabla de niveles</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-white/20">
          <thead>
            <tr className="bg-white/10">
              <th className="border border-white/20 p-2 text-center">Nivel</th>
              <th className="border border-white/20 p-2">Nombre</th>
              <th className="border border-white/20 p-2">Experiencia</th>
              <th className="border border-white/20 p-2">Materiales</th>
              <th className="border border-white/20 p-2 text-center">Calidad</th>
              <th className="border border-white/20 p-2">Ventajas</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-white/20 p-2 text-center">1</td><td className="border border-white/20 p-2">Novato</td><td className="border border-white/20 p-2">Trasfondo inicial</td><td className="border border-white/20 p-2">Comunes</td><td className="border border-white/20 p-2 text-center">1D4</td><td className="border border-white/20 p-2"></td></tr>
            <tr className="bg-white/5"><td className="border border-white/20 p-2 text-center">2</td><td className="border border-white/20 p-2">Aprendiz</td><td className="border border-white/20 p-2">100 Exp</td><td className="border border-white/20 p-2">Comunes</td><td className="border border-white/20 p-2 text-center">1D4 + nivel</td><td className="border border-white/20 p-2"></td></tr>
            <tr><td className="border border-white/20 p-2 text-center">3</td><td className="border border-white/20 p-2">Artesano</td><td className="border border-white/20 p-2">250 XP + Misión</td><td className="border border-white/20 p-2">Poco comunes</td><td className="border border-white/20 p-2 text-center">1D6 + nivel</td><td className="border border-white/20 p-2">Ventaja en tiradas de profesión</td></tr>
            <tr className="bg-white/5"><td className="border border-white/20 p-2 text-center">4</td><td className="border border-white/20 p-2">Experto</td><td className="border border-white/20 p-2">500 XP</td><td className="border border-white/20 p-2">Raros</td><td className="border border-white/20 p-2 text-center">1D8 + nivel</td><td className="border border-white/20 p-2"></td></tr>
            <tr><td className="border border-white/20 p-2 text-center">5</td><td className="border border-white/20 p-2">Maestro</td><td className="border border-white/20 p-2">1000 XP + Misión</td><td className="border border-white/20 p-2">Épicos</td><td className="border border-white/20 p-2 text-center">1D10 + nivel</td><td className="border border-white/20 p-2"></td></tr>
            <tr className="bg-white/5"><td className="border border-white/20 p-2 text-center">6</td><td className="border border-white/20 p-2">Gran Maestro</td><td className="border border-white/20 p-2">2000 XP + Misión Magnánima</td><td className="border border-white/20 p-2">Legendarios</td><td className="border border-white/20 p-2 text-center">1D12 + nivel</td><td className="border border-white/20 p-2"></td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold text-yellow-400 mt-8 mb-4 border-b border-white/10 pb-2">Tabla de dificultad</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-white/20">
          <thead>
            <tr className="bg-white/10">
              <th className="border border-white/20 p-2">Rareza del Material</th>
              <th className="border border-white/20 p-2">Nivel Requerido</th>
              <th className="border border-white/20 p-2 text-center">DT Inspección / Rastreo</th>
              <th className="border border-white/20 p-2 text-center">DT Recolección / Forja</th>
              <th className="border border-white/20 p-2">Ejemplos</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-white/20 p-2 text-gray-300">Común</td><td className="border border-white/20 p-2">Nivel 1 (Novato)</td><td className="border border-white/20 p-2 text-center text-blue-300">DT 10</td><td className="border border-white/20 p-2 text-center text-red-300">DT 10</td><td className="border border-white/20 p-2">Hierro, Tela de Lino, Cobre</td></tr>
            <tr className="bg-white/5"><td className="border border-white/20 p-2 text-green-400">Poco Común</td><td className="border border-white/20 p-2">Nivel 3 (Artesano)</td><td className="border border-white/20 p-2 text-center text-blue-300">DT 12</td><td className="border border-white/20 p-2 text-center text-red-300">DT 14</td><td className="border border-white/20 p-2">Acero, Cuero Curtido, Raíz de Plata</td></tr>
            <tr><td className="border border-white/20 p-2 text-blue-400">Raro</td><td className="border border-white/20 p-2">Nivel 4 (Experto)</td><td className="border border-white/20 p-2 text-center text-blue-300">DT 15</td><td className="border border-white/20 p-2 text-center text-red-300">DT 18</td><td className="border border-white/20 p-2">Mitril, Tela de Seda sutil, Flor de Loto</td></tr>
            <tr className="bg-white/5"><td className="border border-white/20 p-2 text-purple-400">Épico</td><td className="border border-white/20 p-2">Nivel 5 (Maestro)</td><td className="border border-white/20 p-2 text-center text-blue-300">DT 18</td><td className="border border-white/20 p-2 text-center text-red-300">DT 22</td><td className="border border-white/20 p-2">Adamantita, Escamas de Dragón Menor</td></tr>
            <tr><td className="border border-white/20 p-2 text-orange-400">Legendario</td><td className="border border-white/20 p-2">Nivel 6 (Gran Maestro)</td><td className="border border-white/20 p-2 text-center text-blue-300">DT 22</td><td className="border border-white/20 p-2 text-center text-red-300">DT 26</td><td className="border border-white/20 p-2">Elementium, Sangre de Dios Antiguo</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold text-yellow-400 mt-8 mb-4 border-b border-white/10 pb-2">Cómo funciona</h3>

      <p className="text-lg">
        Las Profesiones se realizan con tiradas de <strong>Sabiduría</strong>, a las que le sumaremos el nivel de nuestra profesión. Es decir, si estás inspeccionando o trabajando en una Veta para saber su pureza, lanzarías: <code className="bg-white/10 px-2 py-1 rounded">1D20 + Sabiduría + Nivel Profesión</code>.
      </p>

      <p className="text-lg">
        El proceso de fabricación seguirá tres pasos que afectarán a la calidad final.
      </p>

      <p className="text-lg">
        Superar cada fase de creación otorga un modificador (+2, +1, -1 o -2) en función del resultado del dado:
      </p>

      <ul className="list-disc list-inside space-y-2 text-lg">
        <li><strong>+2</strong> si es un crítico</li>
        <li><strong>+1</strong> si supera la dificultad</li>
        <li><strong>-1</strong> si no supera la dificultad</li>
        <li><strong>-2</strong> si saca pifia</li>
      </ul>

      <p className="text-lg">
        Al final del proceso de 3 pasos de fabricación, se lanzará el dado de Calidad de tu nivel más los modificadores.
      </p>

      <div className="bg-white/5 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg">
        <p className="text-lg font-bold mb-2">Por ejemplo:</p>
        <p className="mb-2">Eres herrero novato y fabricas una espada de hierro:</p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li><strong>Fundición:</strong> Fundes el mineral para su forja - <code className="bg-white/10 px-1 rounded">1D20 + Sab + Nivel</code> (Resultado: 10)</li>
          <li><strong>Forja:</strong> Golpea para dar forma al metal y esas cosas de macho herrero - <code className="bg-white/10 px-1 rounded">1D20 + Sab + Nivel</code> (Resultado: 14)</li>
          <li><strong>Templanza:</strong> Templas el metal para fortalecerlo - <code className="bg-white/10 px-1 rounded">1D20 + Sab + Nivel</code> (Resultado: 1)</li>
        </ul>
        <p>Ahora que tenemos todo, tirada de Calidad - <code className="bg-white/10 px-1 rounded">1D4 + 2 - 2</code></p>
      </div>

      <p className="text-lg">
        El resultado de la calidad nos servirá para determinar el precio del trabajo.
      </p>

      <h3 className="text-xl font-bold text-yellow-400 mt-8 mb-4 border-b border-white/10 pb-2">Lista de profesiones</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-white/20 mb-8">
          <thead>
            <tr className="bg-white/10">
              <th className="border border-white/20 p-2">Nombre</th>
              <th className="border border-white/20 p-2">Descripción</th>
              <th className="border border-white/20 p-2">Proceso 1</th>
              <th className="border border-white/20 p-2">Proceso 2</th>
              <th className="border border-white/20 p-2">Proceso 3</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-white/20 p-2 font-bold">Herrería</td><td className="border border-white/20 p-2">Forja y reparación de armas/armaduras de metal.</td><td className="border border-white/20 p-2">Fundición</td><td className="border border-white/20 p-2">Forja</td><td className="border border-white/20 p-2">Templanza</td></tr>
            <tr className="bg-white/5"><td className="border border-white/20 p-2 font-bold">Sastrería</td><td className="border border-white/20 p-2">Confección de ropas y armaduras de tela. Remiendos de armaduras de tela</td><td className="border border-white/20 p-2">Patronaje</td><td className="border border-white/20 p-2">Confección</td><td className="border border-white/20 p-2">Remate</td></tr>
            <tr><td className="border border-white/20 p-2 font-bold">Peletería</td><td className="border border-white/20 p-2">Curtido de pieles y armaduras de cuero. Remiendos de armaduras de cuero.</td><td className="border border-white/20 p-2">Desuello</td><td className="border border-white/20 p-2">Curtido</td><td className="border border-white/20 p-2">Remache</td></tr>
            <tr className="bg-white/5"><td className="border border-white/20 p-2 font-bold">Carpintería</td><td className="border border-white/20 p-2">Trabajo de madera para arcos y bastones.</td><td className="border border-white/20 p-2">Talla</td><td className="border border-white/20 p-2">Ensamblaje</td><td className="border border-white/20 p-2">Barnizado</td></tr>
            <tr><td className="border border-white/20 p-2 font-bold">Minería</td><td className="border border-white/20 p-2">Extracción y fundición de metales.</td><td className="border border-white/20 p-2">Prospección</td><td className="border border-white/20 p-2">Extracción</td><td className="border border-white/20 p-2">Refinado</td></tr>
            <tr className="bg-white/5"><td className="border border-white/20 p-2 font-bold">Joyería</td><td className="border border-white/20 p-2">Talla de gemas y creación de anillos.</td><td className="border border-white/20 p-2">Tallado</td><td className="border border-white/20 p-2">Engaste</td><td className="border border-white/20 p-2">Pulido</td></tr>
            <tr><td className="border border-white/20 p-2 font-bold">Cocina</td><td className="border border-white/20 p-2">Preparación de comidas y raciones.</td><td className="border border-white/20 p-2">Aderezo</td><td className="border border-white/20 p-2">Cocción</td><td className="border border-white/20 p-2">Emplatado</td></tr>
            <tr className="bg-white/5"><td className="border border-white/20 p-2 font-bold">Ingeniería</td><td className="border border-white/20 p-2">Creación de artilugios y mecanismos.</td><td className="border border-white/20 p-2">Calibración</td><td className="border border-white/20 p-2">Ensamblaje</td><td className="border border-white/20 p-2">Ajuste</td></tr>
            <tr><td className="border border-white/20 p-2 font-bold">Encantamiento</td><td className="border border-white/20 p-2">Imbuir con magia objetos y equipo.</td><td className="border border-white/20 p-2">Foco</td><td className="border border-white/20 p-2">Canalización</td><td className="border border-white/20 p-2">Sellado</td></tr>
            <tr className="bg-white/5"><td className="border border-white/20 p-2 font-bold">Inscripción</td><td className="border border-white/20 p-2">Creación de pergaminos y runas.</td><td className="border border-white/20 p-2">Formulación</td><td className="border border-white/20 p-2">Trazado</td><td className="border border-white/20 p-2">Consagración</td></tr>
            <tr><td className="border border-white/20 p-2 font-bold">Alquimia</td><td className="border border-white/20 p-2">Elaboración de pociones, elixires y venenos.</td><td className="border border-white/20 p-2">Maceración</td><td className="border border-white/20 p-2">Destilación</td><td className="border border-white/20 p-2">Catalización</td></tr>
            <tr className="bg-white/5"><td className="border border-white/20 p-2 font-bold">Herboristería</td><td className="border border-white/20 p-2">Recolección y tratamiento de plantas.</td><td className="border border-white/20 p-2">Rastreo</td><td className="border border-white/20 p-2">Cosecha</td><td className="border border-white/20 p-2">Secado</td></tr>
            <tr><td className="border border-white/20 p-2 font-bold">Medicina</td><td className="border border-white/20 p-2">Anatomía, cirugía de campo y curación.</td><td className="border border-white/20 p-2">Diagnóstico</td><td className="border border-white/20 p-2">Tratamiento</td><td className="border border-white/20 p-2">Sutura</td></tr>
          </tbody>
        </table>
      </div>
    </div>,
    searchQuery
  ) as React.ReactElement;
};
