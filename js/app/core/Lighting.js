import { scene } from './Engine.js';

export function initLighting() {
    // 💡 1. Luz Ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Luz general más brillante
    scene.add(ambientLight);

    // 🔦 2. Luz Direccional (Sol galáctico lejano que baña la escena)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Sol mucho más intenso
    directionalLight.position.set(200, 500, 300);
    // B. Decirle a la luz que genere sombras
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
}
