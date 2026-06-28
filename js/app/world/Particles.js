import { scene, addUpdatable } from '../core/Engine.js';

export function initParticles() {
    // Partículas (Polvo mágico arcano ambiental)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i=0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 300;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.8,
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Actualización animada
    addUpdatable((delta, elapsedTime) => {
        particlesMesh.rotation.y = -0.02 * elapsedTime;
        particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 2;
    });
}
