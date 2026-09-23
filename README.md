# Gran Nexo de las Cosas

Welcome to the official repository of **Gran Nexo de las Cosas**, an interactive web application designed to combine cutting-edge web technology with tabletop role-playing game (TTRPG) experience.

_Available demo at: [https://gran-nexo-de-las-cosas.vercel.app/](https://gran-nexo-de-las-cosas.vercel.app/)_ 

## 🌟 Project Purpose

This application has been created with three fundamental pillars in mind:

1. **3D Experimentation Lab (ThreeJS / React Three Fiber)**
   We explore the potential of 3D web using `Three.js` via `@react-three/fiber` and `@react-three/drei`. The main interface is built around advanced visual components such as "Tesseracts", interactive constellations, geometric nexuses, and dynamic post-processing effects, offering a unique visual immersion.

2. **Comprehensive Tool for Tabletop RPG Groups**
   Developed specifically to facilitate our tabletop RPG group's gaming sessions. It provides a centralized platform to:
   - **Consult Information:** Quickly access compendiums for mechanics, spells, runes, skills, and inventory.
   - **Character Wizard (Char Wizard):** A step-by-step tool designed to create, configure, and review character sheets quickly and intuitively.
   - **Fast Export:** Once the character sheet is ready, the web app generates an encoded string ready to be exported and imported into the in-game Addon or campaign tools.

3. **Experimentation with AI Agents**
   This project serves as a testing and collaborative development environment using artificial intelligence agents (AI Agents) to assist in the development, iteration, and design of software components and mechanics, bringing the workflow to new methodologies.

## 🚀 Core Technologies

- **Frontend Core:** [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **3D Graphics:** [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) + [@react-three/drei](https://github.com/pmndrs/drei) + [@react-three/postprocessing](https://docs.pmnd.rs/react-three-postprocessing)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Routing:** [React Router](https://reactrouter.com/)

- Website: [Gran Nexo de las Cosas](https://gran-nexo-de-las-cosas.vercel.app/)

## 🛠️ Installation & Local Development

To test or contribute to the development of the application, make sure you have Node.js installed.

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Project-CreatingThings
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the local development server**
   ```bash
   npm run dev
   ```
   The server will run by default on the port configured by Vite (usually `http://localhost:5173`).

4. **Build for Production**
   ```bash
   npm run build
   ```
   Production-ready static files will be generated in the `dist` folder.

## 📖 Main Structure

- `src/components/`: General reusable components (Tesseract, Cards, Forms, etc.).
- `src/features/`: Application domain modules (Character Sheets, Constellations, Spells, Skills, Inventory, Runes, Mechanics).
- `src/assets/`: Static resources (Markdown documents, images, JSON databases).

---

*Designed and developed to unify the magic of tabletop RPGs, the immersion of a 3D environment, and the forefront of AI.*
