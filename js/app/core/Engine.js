export const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x020205, 0.002);

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30000);

const canvas = document.getElementById('bg-canvas');
export const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

// Exponer globalmente para compatibilidad con código antiguo
window.mainScene = scene;
window.mainCamera = camera;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.autoClear = false;

export const composer = new THREE.EffectComposer(renderer);
const renderScene = new THREE.RenderPass(scene, camera);
composer.addPass(renderScene);

export const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.8,  // Fuerza equilibrada para un brillo puro
    0.3,  // Radio concentrado para evitar manchas borrosas (smudges)
    0.2   // Umbral bajo (0.2) para permitir que el fondo brille sutilmente y los nodos estallen
);
composer.addPass(bloomPass);

// Sistema de actualización
const updatables = [];
export function addUpdatable(callback) {
    updatables.push(callback);
}

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Actualizar todos los subsistemas
    updatables.forEach(fn => fn(delta, elapsedTime));

    // Renderizar escena principal a través del compositor (Bloom)
    renderer.clear();
    composer.render();
}

// Empezar bucle
animate();

// Redimensionamiento
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (typeof window.buildLeyLines === 'function') {
        setTimeout(window.buildLeyLines, 100);
    }
});
