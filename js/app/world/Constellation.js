import { scene, addUpdatable } from '../core/Engine.js';
import { scrambleText } from '../utils/TextEffects.js';

export const leyNodesGroup = new THREE.Group();
export const leyNodes = [];
export let leyLinesMesh = null;
const energyFlows = [];

let nexoShell = null;
const nexoRings = [];

const constellationData = [
    { id: 'mecanicas', label: 'Mecánicas', pos: new THREE.Vector3(-50, 120, -320) },    // Arriba, izquierda, muy al fondo
    { id: 'hechizos', label: 'Hechizos', pos: new THREE.Vector3(140, 60, -120) },       // Derecha, cerca de la cámara
    { id: 'runas', label: 'Runas', pos: new THREE.Vector3(190, 80, -160) },             // Al lado de hechizos
    { id: 'habilidades', label: 'Habilidades', pos: new THREE.Vector3(90, -110, -250) },// Abajo, derecha, profundidad media-lejana
    { id: 'fichas', label: 'Fichas', pos: new THREE.Vector3(-120, -80, -80) },          // Abajo, izquierda, muy cerca
    { id: 'inventario', label: 'Inventario', pos: new THREE.Vector3(-130, 10, -280) }   // Izquierda, medio, al fondo
];

export function buildConstellation() {
    // Limpiar elementos previos para evitar duplicaciones y fugas
    while (leyNodesGroup.children.length > 0) {
        leyNodesGroup.remove(leyNodesGroup.children[0]);
    }
    leyNodes.length = 0;
    nexoRings.length = 0;
    energyFlows.length = 0;

    leyNodesGroup.position.set(0, 0, 0);
    scene.add(leyNodesGroup);

    // 1. EL NEXO CENTRAL MASIVO (Estrella de Neutrones Gigante Multicapa)
    const nexoGroup = new THREE.Group();
    nexoGroup.position.set(0, 0, -200);

    // Luz descomunal cegadora extrema
    const nexoLight = new THREE.PointLight(0xddeeff, 15.0, 3000);
    nexoLight.castShadow = true;
    const nexoLightBlue = new THREE.PointLight(0x0066ff, 12.0, 4000);
    nexoGroup.add(nexoLight);
    nexoGroup.add(nexoLightBlue);

    // Núcleo puro de energía (Estrella de Neutrones)
    const nexoCore = new THREE.Mesh(
        new THREE.SphereGeometry(6.5, 64, 64),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.1, 0.4, 1.0).multiplyScalar(15)
        })
    );
    nexoCore.castShadow = true;
    nexoCore.receiveShadow = true;
    nexoGroup.add(nexoCore);

    // Escudo exterior geométrico (Icosaedro wireframe)
    const nexoShellMat = new THREE.MeshBasicMaterial({
        color: 0x00aaff,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
    });
    nexoShell = new THREE.Mesh(new THREE.IcosahedronGeometry(9.5, 1), nexoShellMat);
    nexoGroup.add(nexoShell);

    // Anillo orbital 1 (Cian)
    const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(12.5, 0.2, 8, 80), ringMat1);
    ring1.rotation.x = Math.PI / 2;
    ring1.rotation.y = 0.2;
    nexoGroup.add(ring1);
    nexoRings.push(ring1);

    // Anillo orbital 2 (Azul oscuro)
    const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0x0055ff,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
    });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(15.5, 0.15, 8, 80), ringMat2);
    ring2.rotation.x = Math.PI / 2;
    ring2.rotation.y = -0.2;
    nexoGroup.add(ring2);
    nexoRings.push(ring2);

    leyNodesGroup.add(nexoGroup);
    leyNodes.push({ group: nexoGroup, hitbox: null, core: nexoCore, shell: nexoShell, data: { pos: new THREE.Vector3(0, 0, -200) } });

    // 2. PLANETAS DEL SISTEMA SOLAR (Estrellas satélite geométricas temáticas)
    const nodeThemes = {
        'mecanicas': {
            color: 0xffb700, // Oro
            emissive: new THREE.Color(0xff7700).multiplyScalar(15),
            geom: new THREE.OctahedronGeometry(2.3, 0),
            shellGeom: new THREE.OctahedronGeometry(3.3, 0)
        },
        'hechizos': {
            color: 0x00f0ff, // Cian
            emissive: new THREE.Color(0x0088ff).multiplyScalar(15),
            geom: new THREE.IcosahedronGeometry(2.3, 0),
            shellGeom: new THREE.IcosahedronGeometry(3.3, 0)
        },
        'runas': {
            color: 0xffffff, // Blanco arcano
            emissive: new THREE.Color(0x88ccff).multiplyScalar(15),
            geom: new THREE.IcosahedronGeometry(2.1, 0),
            shellGeom: new THREE.IcosahedronGeometry(3.1, 0)
        },
        'habilidades': {
            color: 0xe000ff, // Púrpura
            emissive: new THREE.Color(0x8800ff).multiplyScalar(15),
            geom: new THREE.DodecahedronGeometry(2.3, 0),
            shellGeom: new THREE.DodecahedronGeometry(3.3, 0)
        },
        'fichas': {
            color: 0x00ff88, // Verde
            emissive: new THREE.Color(0x00aa33).multiplyScalar(15),
            geom: new THREE.ConeGeometry(2.1, 4.2, 4),
            shellGeom: new THREE.ConeGeometry(3.1, 5.2, 4)
        },
        'inventario': {
            color: 0xff3344, // Rojo
            emissive: new THREE.Color(0xcc0011).multiplyScalar(15),
            geom: new THREE.BoxGeometry(2.4, 2.4, 2.4),
            shellGeom: new THREE.BoxGeometry(3.4, 3.4, 3.4)
        }
    };

    const tethers = [];
    const labelsContainer = document.getElementById('floating-labels-container');
    if (labelsContainer) labelsContainer.innerHTML = '';

    constellationData.forEach(data => {
        const theme = nodeThemes[data.id] || {
            color: 0xffffff,
            emissive: new THREE.Color(0xaaddff).multiplyScalar(15),
            geom: new THREE.SphereGeometry(2.3, 32, 32),
            shellGeom: new THREE.SphereGeometry(3.3, 16, 16)
        };

        // Crear Etiqueta Flotante DOM
        if (labelsContainer) {
            const labelEl = document.createElement('div');
            labelEl.className = 'floating-label';
            labelsContainer.appendChild(labelEl);
            data.labelEl = labelEl;

            // Animación Matrix inicial de aparición
            setTimeout(() => {
                scrambleText(labelEl, data.label.toUpperCase());
            }, Math.random() * 500);
        }

        // Animar el footer flotante
        const footerText = document.getElementById('footer-text');
        if (footerText && !window.footerAnimated) {
            window.footerAnimated = true;
            setTimeout(() => scrambleText(footerText, "© 2026 GRIMORIO INTERACTIVO. TODOS LOS DERECHOS RESERVADOS."), 200);
        }

        const group = new THREE.Group();
        group.position.copy(data.pos);
        group.userData = { id: data.id, label: data.label };

        // Luz dinámica de color temático por cada estrella
        const light = new THREE.PointLight(theme.color, 12.0, 2000);
        const secondaryLight = new THREE.PointLight(0xffffff, 5.0, 2500);
        group.add(light);
        group.add(secondaryLight);

        // Núcleo cristalino del nodo (MeshStandardMaterial para reaccionar a luces)
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0xffffff, // Núcleo muy brillante
            roughness: 0.1,
            metalness: 0.8,
            emissive: theme.emissive,
            emissiveIntensity: 1.0
        });
        const core = new THREE.Mesh(theme.geom, coreMat);
        core.castShadow = true;
        core.receiveShadow = true;
        group.add(core);

        // Escudo de energía rotatorio wireframe
        const shellMat = new THREE.MeshStandardMaterial({
            color: theme.color,
            roughness: 0.1,
            metalness: 0.9,
            wireframe: true,
            transparent: true,
            opacity: 0.35,
            emissive: theme.emissive.clone().multiplyScalar(0.2),
            emissiveIntensity: 0.5
        });
        const shell = new THREE.Mesh(theme.shellGeom, shellMat);
        group.add(shell);

        // Hitbox invisible para detección precisa de hover
        const hitboxMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitbox = new THREE.Mesh(new THREE.SphereGeometry(25, 16, 16), hitboxMat);
        hitbox.userData = group.userData;
        group.add(hitbox);

        leyNodesGroup.add(group);
        leyNodes.push({ group, hitbox, core, shell, data });

        // Tethers gravitacionales y Filamentos de Energía Mágica
        let startPos = new THREE.Vector3(0, 0, -200);
        if (data.id === 'runas') {
            const hechizosData = constellationData.find(d => d.id === 'hechizos');
            if (hechizosData) startPos = hechizosData.pos.clone();
        }
        const endPos = data.pos.clone();

        const flowLines = [];
        const numStrands = 3;
        const segments = 20;

        for (let s = 0; s < numStrands; s++) {
            const geo = new THREE.BufferGeometry();
            const pos = new Float32Array((segments + 1) * 3);
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

            const mat = new THREE.LineBasicMaterial({
                color: new THREE.Color(theme.color).multiplyScalar(12),
                transparent: true,
                opacity: 0.6,
                blending: THREE.AdditiveBlending
            });

            const line = new THREE.Line(geo, mat);
            leyNodesGroup.add(line);
            flowLines.push({
                line: line,
                phaseOffset: Math.random() * Math.PI * 2,
                speed: 2 + Math.random() * 2
            });
        }

        // Hilo de energía central recto y súper tenue
        const lineGeo = new THREE.BufferGeometry().setFromPoints([startPos, endPos]);
        const lineMat = new THREE.LineBasicMaterial({
            color: theme.color,
            transparent: true,
            opacity: 0.1,
            blending: THREE.AdditiveBlending
        });
        const tether = new THREE.Line(lineGeo, lineMat);
        leyNodesGroup.add(tether);
        tethers.push(tether);

        energyFlows.push({
            strands: flowLines,
            startPos: startPos,
            endPos: endPos,
            segments: segments
        });
    });

    leyLinesMesh = tethers;

    // Actualización de animaciones de Constelaciones
    addUpdatable((delta, elapsedTime) => {
        // Pulso arcano de los tethers gravitacionales
        if (leyLinesMesh && Array.isArray(leyLinesMesh)) {
            leyLinesMesh.forEach(tether => {
                tether.material.opacity = 0.1;
            });
        }

        // Animar estrella central (El Nexo)
        if (nexoShell) {
            nexoShell.rotation.y += delta * 0.15;
            nexoShell.rotation.x += delta * 0.08;
        }
        nexoRings.forEach((ring, idx) => {
            const direction = idx % 2 === 0 ? 1 : -1;
            ring.rotation.z += delta * 0.25 * direction;
        });

        // Animar satélites, sus escudos y escalas de hover
        leyNodes.forEach(n => {
            if (n.shell && n.core) {
                n.shell.scale.copy(n.core.scale);
            }
            if (n.core && n.data && n.data.id) {
                n.core.rotation.y += delta * 0.6;
                n.core.rotation.x += delta * 0.3;
            }
            if (n.shell) {
                n.shell.rotation.y -= delta * 0.4;
                n.shell.rotation.z += delta * 0.2;
            }
        });

        // Animar flujos de energía mágica en 3D
        if (energyFlows.length > 0) {
            energyFlows.forEach(flow => {
                flow.strands.forEach(strand => {
                    const positions = strand.line.geometry.attributes.position.array;

                    for (let i = 0; i <= flow.segments; i++) {
                        const p = i / flow.segments;

                        const x = flow.startPos.x + (flow.endPos.x - flow.startPos.x) * p;
                        const y = flow.startPos.y + (flow.endPos.y - flow.startPos.y) * p;
                        const z = flow.startPos.z + (flow.endPos.z - flow.startPos.z) * p;

                        let noiseX = 0;
                        let noiseY = 0;
                        let noiseZ = 0;

                        if (i > 0 && i < flow.segments) {
                            const time = elapsedTime * strand.speed + strand.phaseOffset;
                            const intensity = Math.sin(p * Math.PI);
                            noiseX = Math.sin(p * Math.PI * 6 - time) * 3.0 * intensity;
                            noiseY = Math.cos(p * Math.PI * 4 + time) * 3.0 * intensity;
                            noiseZ = Math.sin(p * Math.PI * 5 + time) * 3.0 * intensity;
                        }

                        positions[i * 3] = x + noiseX;
                        positions[i * 3 + 1] = y + noiseY;
                        positions[i * 3 + 2] = z + noiseZ;
                    }

                    strand.line.geometry.attributes.position.needsUpdate = true;
                    strand.line.material.opacity = 0.4;
                });
            });
        }
    });

    // Exponer la reconstrucción global para el resize event (Engine)
    window.buildLeyLines = buildConstellation;
}
