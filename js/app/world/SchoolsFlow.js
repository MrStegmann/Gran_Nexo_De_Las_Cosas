import { scene, addUpdatable, camera } from '../core/Engine.js';
import { scrambleText } from '../utils/TextEffects.js';

export const schoolsFlowGroup = new THREE.Group();
export const schoolsFlowNodes = [];
const filamentsGroup = new THREE.Group();
let filamentsData = [];
let baseFrames = [];
let filamentUniforms = null;
let baseCurve = null;
let currentLabels = [];
let flowParticles = null;

const themeColors = {
    'theme-arcane': 0x00f0ff,
    'theme-fel': 0x00ff2a,
    'theme-nature': 0x32cd32,
    'theme-shadow': 0x7a00ff,
    'theme-necro': 0x00a8ff,
    'theme-elune': 0xe0e0ff,
    'theme-holy': 0xffd700,
    'theme-elemental': 0xff4500,
    'theme-chi': 0x00ffb2
};

function createGlowTexture(colorHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
    const c = new THREE.Color(colorHex);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, `rgba(${(c.r * 255) | 0}, ${(c.g * 255) | 0}, ${(c.b * 255) | 0}, 0.8)`);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
}

export function initSchoolsFlow() {
    schoolsFlowGroup.visible = false;
    scene.add(schoolsFlowGroup);
    schoolsFlowGroup.add(filamentsGroup);

    const nodeGeom = new THREE.SphereGeometry(1.8, 32, 32);
    const hitboxGeom = new THREE.SphereGeometry(12, 16, 16);
    const hitboxMat = new THREE.MeshBasicMaterial({ visible: false });

    // Base Material for filaments
    const filamentMat = new THREE.MeshStandardMaterial({
        color: 0xd0e8ff,      // Tono base blanquecino-frío
        emissive: 0xffffff,   // Emisión blanca pura para glow
        emissiveIntensity: 0.05, // Reducido para no tapar los nodos
        roughness: 0.1,
        metalness: 0.3,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });

    window.buildSchoolsFlow = function (attribute) {
        filamentsGroup.clear();
        const toRemove = [];
        schoolsFlowGroup.children.forEach(c => {
            if (c !== filamentsGroup) toRemove.push(c);
        });
        toRemove.forEach(c => schoolsFlowGroup.remove(c));

        schoolsFlowNodes.length = 0;
        filamentsData = [];
        baseFrames = [];
        currentLabels.forEach(el => el.remove());
        currentLabels = [];

        const schools = window.schoolsData[attribute];
        if (!schools) return;

        baseCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-150, 15, 0),
            new THREE.Vector3(-125, 0, 15),
            new THREE.Vector3(-100, -15, 0),
            new THREE.Vector3(-75, 0, -15),
            new THREE.Vector3(-50, 15, 0),
            new THREE.Vector3(-25, 0, 15),
            new THREE.Vector3(0, -15, 0),
            new THREE.Vector3(25, 0, -15),
            new THREE.Vector3(50, 15, 0),
            new THREE.Vector3(75, 0, 15),
            new THREE.Vector3(100, -15, 0),
            new THREE.Vector3(125, 0, -15),
            new THREE.Vector3(150, 15, 0)
        ]);

        const segments = 100;
        for (let j = 0; j <= segments; j++) {
            const t = j / segments;
            const spinePoint = baseCurve.getPointAt(t);
            const spineTangent = baseCurve.getTangentAt(t);
            const up = new THREE.Vector3(0, 1, 0);
            if (Math.abs(spineTangent.y) > 0.99) up.set(1, 0, 0);
            const normal = new THREE.Vector3().crossVectors(spineTangent, up).normalize();
            const binormal = new THREE.Vector3().crossVectors(spineTangent, normal).normalize();
            baseFrames.push({ spinePoint, normal, binormal });
        }

        filamentUniforms = {
            uHoverPos: { value: new THREE.Vector3(0, 0, 0) },
            uHoverColor: { value: new THREE.Color(0xffffff) },
            uHoverIntensity: { value: 0.0 }
        };

        const schFilamentMat = filamentMat.clone();
        schFilamentMat.onBeforeCompile = (shader) => {
            shader.uniforms.uHoverPos = filamentUniforms.uHoverPos;
            shader.uniforms.uHoverColor = filamentUniforms.uHoverColor;
            shader.uniforms.uHoverIntensity = filamentUniforms.uHoverIntensity;
            shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWorldPositionSch;\n').replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWorldPositionSch = (modelMatrix * vec4(transformed, 1.0)).xyz;\n');
            shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vWorldPositionSch;\nuniform vec3 uHoverPos;\nuniform vec3 uHoverColor;\nuniform float uHoverIntensity;\n').replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\nfloat dist = distance(vWorldPositionSch, uHoverPos);\nfloat proximity = smoothstep(25.0, 5.0, dist);\nfloat factorCubo = pow(proximity, 3.0);\nvec3 localEmissive = mix(vec3(1.0), uHoverColor, 0.9) * (factorCubo * uHoverIntensity * 15.0);\ntotalEmissiveRadiance += localEmissive;\n');
        };

        const filamentCount = 15;
        for (let i = 0; i < filamentCount; i++) {
            const frequency = 1.0 + Math.random() * 3.0;
            const amplitude = 0.5 + Math.random() * 2.5;
            const phaseShift = Math.random() * Math.PI * 2;
            const radius = 0.05 + Math.random() * 0.1;

            const points = [];
            for (let j = 0; j <= segments; j++) {
                const frame = baseFrames[j];
                const t = j / segments;
                const angle = t * Math.PI * 2 * frequency + phaseShift;
                const envelope = Math.sin(t * Math.PI);
                const xOffset = Math.cos(angle) * amplitude * envelope;
                const yOffset = Math.sin(angle) * amplitude * envelope;
                const offset = frame.normal.clone().multiplyScalar(xOffset).add(frame.binormal.clone().multiplyScalar(yOffset));
                points.push(frame.spinePoint.clone().add(offset));
            }
            const filamentCurve = new THREE.CatmullRomCurve3(points);
            const filamentGeom = new THREE.TubeGeometry(filamentCurve, segments, radius, 5, false);
            const filamentMesh = new THREE.Mesh(filamentGeom, schFilamentMat);
            filamentsGroup.add(filamentMesh);
            filamentsData.push({ mesh: filamentMesh, frequency, amplitude, phaseShift, radius });
        }

        const labelsContainer = document.getElementById('magicflow-labels-container');

        function createFlowElement(id, name, colorHex, t, type, data) {
            const pos = baseCurve.getPointAt(t);
            const group = new THREE.Group();
            group.position.copy(pos);
            group.userData = { id, type, data };

            const coreMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex).multiplyScalar(80.0) });
            const core = new THREE.Mesh(nodeGeom, coreMat);
            group.add(core);

            // Escudo de energía rotatorio wireframe
            const shellMat = new THREE.MeshBasicMaterial({
                color: colorHex,
                wireframe: true,
                transparent: true,
                opacity: 0.9,
                blending: THREE.AdditiveBlending
            });
            const shell = new THREE.Mesh(new THREE.SphereGeometry(2.6, 12, 12), shellMat);
            group.add(shell);

            const tex = createGlowTexture(colorHex);
            const haloMat = new THREE.SpriteMaterial({ map: tex, color: new THREE.Color(colorHex).multiplyScalar(4.0), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
            const halo = new THREE.Sprite(haloMat);
            halo.scale.set(10, 10, 1);
            group.add(halo);

            const hoverLight = new THREE.PointLight(colorHex, 0, 30);
            group.add(hoverLight);

            const hitbox = new THREE.Mesh(hitboxGeom, hitboxMat);
            hitbox.userData = group.userData;
            group.add(hitbox);

            let labelEl = null;
            if (labelsContainer) {
                labelEl = document.createElement('div');
                labelEl.className = 'floating-label flow-label hidden';
                labelEl.textContent = name.toUpperCase();
                labelsContainer.appendChild(labelEl);
                currentLabels.push(labelEl);
            }

            schoolsFlowGroup.add(group);
            schoolsFlowNodes.push({
                group, core, shell, halo, hoverLight, hitbox, labelEl,
                data: { currentScale: 1.0, targetScale: 1.0, currentEmissive: 1.0, targetEmissive: 1.0, baseColor: new THREE.Color(colorHex), active: false, wasHovered: false, label: name }
            });
        }

        // Agrupar todos los nodos en el centro de la pantalla, pero con un poco más de separación (t entre 0.33 y 0.67)
        const totalNodes = schools.length;
        const startT = 0.33;
        const endT = 0.67;
        const range = endT - startT;

        // Añadir los nodos de escuelas
        for (let i = 0; i < schools.length; i++) {
            const t = startT + (range * (i / Math.max(1, totalNodes - 1)));
            const school = schools[i];
            const colorHex = themeColors[school.theme] || 0xffffff;
            createFlowElement(school.id, school.name, colorHex, t, 'schoolFlow', school);
        }
    };

    window.hideSchoolsFlow = function () {
        schoolsFlowGroup.visible = false;
        currentLabels.forEach(el => el.classList.add('hidden'));
    };

    addUpdatable((delta) => {
        const schoolSelection = document.getElementById('school-selection');
        const isActive = window.currentSection === 'hechizos' && schoolSelection && !schoolSelection.classList.contains('hidden');

        schoolsFlowGroup.visible = isActive;

        if (isActive && baseFrames.length > 0) {
            const labelsContainer = document.getElementById('magicflow-labels-container');
            if (labelsContainer && labelsContainer.style.opacity === '0') {
                labelsContainer.style.opacity = '1';
            }

            const activeNodes = schoolsFlowNodes.filter(n => n.data.currentEmissive > 1.05);
            let hoveringNode = null;
            let intensity = 0;

            if (activeNodes.length > 0 && filamentUniforms) {
                hoveringNode = activeNodes.reduce((prev, current) => (prev.data.currentEmissive > current.data.currentEmissive) ? prev : current);
                intensity = (hoveringNode.data.currentEmissive - 1.0) / 3.0;

                filamentUniforms.uHoverPos.value.copy(hoveringNode.group.position);
                filamentUniforms.uHoverColor.value.copy(hoveringNode.data.baseColor);
                filamentUniforms.uHoverIntensity.value = intensity;
            } else if (filamentUniforms) {
                filamentUniforms.uHoverIntensity.value -= delta * 5.0;
                if (filamentUniforms.uHoverIntensity.value < 0) filamentUniforms.uHoverIntensity.value = 0;
            }

            const twistTime = Date.now() * 0.001 * 1.5;
            for (let i = 0; i < filamentsData.length; i++) {
                const data = filamentsData[i];
                const points = [];
                for (let j = 0; j <= 100; j++) {
                    const frame = baseFrames[j];
                    const t = j / 100;
                    const angle = t * Math.PI * 2 * data.frequency + data.phaseShift - twistTime;
                    const envelope = Math.sin(t * Math.PI);
                    const xOffset = Math.cos(angle) * data.amplitude * envelope;
                    const yOffset = Math.sin(angle) * data.amplitude * envelope;

                    const offset = frame.normal.clone().multiplyScalar(xOffset).add(frame.binormal.clone().multiplyScalar(yOffset));
                    points.push(frame.spinePoint.clone().add(offset));
                }
                const filamentCurve = new THREE.CatmullRomCurve3(points);
                const newGeom = new THREE.TubeGeometry(filamentCurve, 100, data.radius, 5, false);

                data.mesh.geometry.dispose();
                data.mesh.geometry = newGeom;
            }

            // Partículas en suspensión eliminadas

            schoolsFlowNodes.forEach(n => {
                const { core, shell, halo, hoverLight, group, labelEl, data } = n;

                data.currentScale += (data.targetScale - data.currentScale) * 12 * delta;
                core.scale.set(data.currentScale, data.currentScale, data.currentScale);
                if (shell) {
                    shell.scale.copy(core.scale);
                    shell.rotation.y += delta * 0.5;
                    shell.rotation.x += delta * 0.2;
                }

                data.currentEmissive += (data.targetEmissive - data.currentEmissive) * 12 * delta;

                core.material.color.copy(data.baseColor).multiplyScalar(80.0 * data.currentEmissive);

                // Halo 
                if (halo) {
                    const haloScale = 8 * data.currentScale; // Un poco más grande para impactar más
                    halo.scale.set(haloScale, haloScale, 1);
                    halo.material.color.copy(data.baseColor).multiplyScalar(12.0 * data.currentEmissive);
                }

                const normalizedHover = Math.max(0, (data.currentEmissive - 1.0) / 3.0);
                hoverLight.intensity = normalizedHover * 300.0;

                if (labelEl) {
                    if (!data.wasHovered) {
                        labelEl.classList.remove('hidden');
                        scrambleText(labelEl, data.label.toUpperCase());
                        data.wasHovered = true;
                    }

                    const vector = group.position.clone();
                    vector.y += 6;
                    
                    const viewPos = vector.clone().applyMatrix4(camera.matrixWorldInverse);
                    const isBehind = viewPos.z > 0;
                    
                    vector.project(camera);
                    
                    if (isBehind) {
                        labelEl.style.display = 'none';
                    } else {
                        labelEl.style.display = '';
                        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
                        const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;
                        labelEl.style.left = `${x}px`;
                        labelEl.style.top = `${y}px`;
                    }
                }
            });
        } else {
            schoolsFlowNodes.forEach(n => {
                if (n.labelEl) n.labelEl.classList.add('hidden');
                n.data.wasHovered = false;
            });
        }
    });
}
