// Entry point for the 3D application
import { initLighting } from './core/Lighting.js';
import { initRunes } from './world/Runes.js';
import { buildConstellation } from './world/Constellation.js';
import { initMagicFlow } from './world/MagicFlow.js';
import { initSchoolsFlow } from './world/SchoolsFlow.js';
import { initSkillsFlow } from './world/SkillsFlow.js';
import { initInteraction } from './systems/Interaction.js';
import { initWarpSystem } from './systems/WarpSystem.js';
import { initNavigation } from './ui/Navigation.js';

// Importar el motor solo para asegurar que se ejecuta y se crea la escena
import { camera } from './core/Engine.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Motor 3D (Escena, Cámara, Render, Loop)
    initLighting();
    initRunes();
    buildConstellation(); // El Nexo (Pantalla Inicio)
    initMagicFlow();     // Entorno de Atributos/Escuelas de Magia
    initSchoolsFlow();
    initSkillsFlow();    // Entorno de Atributos de Habilidades

    // 3. Inicializar Sistemas
    initNavigation();
    initInteraction();
    initWarpSystem();

    // Posición y orientación inicial de la cámara para perspectiva isométrica
    camera.position.set(160, 120, 20);
    camera.lookAt(0, 0, -200);
});
