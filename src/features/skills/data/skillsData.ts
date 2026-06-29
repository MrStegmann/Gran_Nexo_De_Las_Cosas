import type { MagicFlowNodeData } from '../../../components/MagicFlow';

export const themeColors: Record<string, string> = {
  'theme-constitution': '#ff4500', // Orange-red
  'theme-strength': '#cc0000',     // Red
  'theme-dexterity': '#00cc66',    // Green
};

export const skillsAttributes: MagicFlowNodeData[] = [
  {
    id: 'constitucion',
    label: 'Constitución',
    color: themeColors['theme-constitution'],
    description: 'La base de tu resistencia física y aguante. ¡Para que no te derriben al primer golpe!',
    skills: [
      { Nombre: "Resiliencia", Descripción: "Aumenta tu capacidad para soportar daño físico continuo.", "Tipo de habilidad": "Pasiva", Efecto: "Reduce daño recibido un 5%", Coste: "Ninguno" },
      { Nombre: "Resistencia a Aturdimientos", Descripción: "Dificulta que los enemigos te aturdan.", "Tipo de habilidad": "Pasiva", Efecto: "Resistencia a stun aumentada", Coste: "Ninguno" },
      { Nombre: "Resistencia a Derribos", Descripción: "Te mantienes firme ante ataques pesados.", "Tipo de habilidad": "Pasiva", Efecto: "Inmunidad parcial a derribos", Coste: "Ninguno" },
      { Nombre: "Resistencia al Frío", Descripción: "Soportas temperaturas gélidas con facilidad.", "Tipo de habilidad": "Pasiva", Efecto: "Resistencia al daño por frío", Coste: "Ninguno" },
      { Nombre: "Resistencia al Calor", Descripción: "Soportas altas temperaturas.", "Tipo de habilidad": "Pasiva", Efecto: "Resistencia al daño por fuego", Coste: "Ninguno" },
      { Nombre: "Fortaleza", Descripción: "Una demostración de pura resistencia.", "Tipo de habilidad": "Activa", Efecto: "Ignora el dolor temporalmente", Coste: "Energía" }
    ]
  },
  {
    id: 'fuerza',
    label: 'Fuerza',
    color: themeColors['theme-strength'],
    description: 'Puro poder físico. ¡Aplasta a tus enemigos y levanta objetos pesados!',
    skills: [
      { Nombre: "Combate a 2 manos", Descripción: "Dominio de armas pesadas.", "Tipo de habilidad": "Pasiva", Efecto: "Mayor daño con armas a dos manos", Coste: "Ninguno" },
      { Nombre: "Combate a 1 mano", Descripción: "Dominio de armas ligeras.", "Tipo de habilidad": "Pasiva", Efecto: "Mayor velocidad de ataque", Coste: "Ninguno" },
      { Nombre: "Atletismo", Descripción: "Capacidad física general para saltar y trepar.", "Tipo de habilidad": "Pasiva", Efecto: "Mejora en pruebas atléticas", Coste: "Ninguno" },
      { Nombre: "Brutalidad", Descripción: "Golpes devastadores que merman al enemigo.", "Tipo de habilidad": "Activa", Efecto: "Golpe contundente que aturde", Coste: "Energía" },
      { Nombre: "Defensa Robusta", Descripción: "Usas tu fuerza para bloquear.", "Tipo de habilidad": "Activa", Efecto: "Bloqueo efectivo de ataques físicos", Coste: "Energía" }
    ]
  },
  {
    id: 'destreza',
    label: 'Destreza',
    color: themeColors['theme-dexterity'],
    description: 'Agilidad, reflejos y precisión en el combate. ¡Muévete como el viento!',
    skills: [
      { Nombre: "Precisión", Descripción: "Tus ataques encuentran los puntos débiles.", "Tipo de habilidad": "Pasiva", Efecto: "Aumenta probabilidad de crítico", Coste: "Ninguno" },
      { Nombre: "Combate Ágil", Descripción: "Movimientos rápidos en el combate cuerpo a cuerpo.", "Tipo de habilidad": "Pasiva", Efecto: "Mayor evasión pasiva", Coste: "Ninguno" },
      { Nombre: "Acrobacias", Descripción: "Movimientos evasivos rápidos.", "Tipo de habilidad": "Activa", Efecto: "Esquiva el próximo ataque", Coste: "Energía" },
      { Nombre: "Sigilo", Descripción: "Capacidad de pasar desapercibido.", "Tipo de habilidad": "Pasiva", Efecto: "Menor radio de detección", Coste: "Ninguno" },
      { Nombre: "Juego de Manos", Descripción: "Destreza manual para trampas y cerrojos.", "Tipo de habilidad": "Activa", Efecto: "Facilita abrir cerraduras", Coste: "Ninguno" },
      { Nombre: "Defensa Ágil", Descripción: "Usas tu velocidad para desviar ataques.", "Tipo de habilidad": "Activa", Efecto: "Parada rápida de ataques", Coste: "Energía" }
    ]
  }
];
