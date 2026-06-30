# Gran Nexo de las Cosas (Project Creating Things)

Bienvenido al repositorio oficial de **Gran Nexo de las Cosas**, una aplicación web interactiva diseñada para combinar tecnología de vanguardia en la web con la experiencia del rol de mesa.

## 🌟 Propósito del Proyecto

Esta aplicación ha sido creada con tres pilares fundamentales en mente:

1. **Laboratorio de Experimentación 3D (ThreeJS / React Three Fiber)**
   Exploramos el potencial de la web 3D utilizando `Three.js` a través de `@react-three/fiber` y `@react-three/drei`. La interfaz principal está construida alrededor de componentes visuales avanzados como "Tesseracts", constelaciones interactivas, nexos geométricos y efectos de post-procesamiento dinámicos, ofreciendo una inmersión visual única.

2. **Herramienta Integral para Grupo de Rol**
   Desarrollada específicamente para facilitar las partidas de nuestro grupo de rol. Proporciona una plataforma centralizada para:
   - **Consultar Información:** Acceder rápidamente a compendios de mecánicas, hechizos, runas, habilidades e inventario.
   - **Asistente de Fichas (Char Wizard):** Una herramienta paso a paso diseñada para crear, configurar y revisar fichas de personajes de forma rápida e intuitiva.
   - **Exportación Rápida:** Una vez que la ficha está lista, la web genera una cadena codificada lista para ser exportada e importada en el Addon in-game o en las herramientas de la campaña.

3. **Experimentación con AI Agents**
   Este proyecto sirve como entorno de pruebas y desarrollo colaborativo utilizando agentes de inteligencia artificial (AI Agents) para asistir en el desarrollo, iteración y diseño de los componentes y las mecánicas de software, llevando el flujo de trabajo a nuevas metodologías.

## 🚀 Tecnologías Principales

- **Frontend Core:** [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Gráficos 3D:** [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) + [@react-three/drei](https://github.com/pmndrs/drei) + [@react-three/postprocessing](https://docs.pmnd.rs/react-three-postprocessing)
- **Estilos y UI:** [Tailwind CSS](https://tailwindcss.com/)
- **Manejo de Estado:** [Zustand](https://github.com/pmndrs/zustand)
- **Enrutamiento:** [React Router](https://reactrouter.com/)

## 🛠️ Instalación y Desarrollo Local

Para probar o contribuir al desarrollo de la aplicación, asegúrate de tener Node.js instalado.

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd Project-CreatingThings
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo local**
   ```bash
   npm run dev
   ```
   El servidor se levantará por defecto en el puerto configurado por Vite (habitualmente `http://localhost:5173`).

4. **Compilar para Producción**
   ```bash
   npm run build
   ```
   Los archivos estáticos listos para producción se generarán en la carpeta `dist`.

## 📖 Estructura Principal

- `src/components/`: Componentes reutilizables generales (Tesseract, Cards, Formularios, etc.).
- `src/features/`: Módulos de dominio de la aplicación (Fichas, Constelación, Hechizos, Habilidades, Inventario, Runas, Mecánicas).
- `src/assets/`: Recursos estáticos (documentos Markdown, imágenes, bases de datos en JSON).

---

*Diseñado y desarrollado para unificar la magia del rol, la inmersión del entorno 3D y la vanguardia de la IA.*
