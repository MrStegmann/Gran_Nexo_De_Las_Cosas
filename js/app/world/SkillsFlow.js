import { scene, addUpdatable, camera } from '../core/Engine.js';
import { scrambleText } from '../utils/TextEffects.js';

export const skillsFlowGroup = new THREE.Group();
export const skillsFlowNodes = [];
const filamentsGroup = new THREE.Group(); // Contenedor para rotarlos todos

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

export function initSkillsFlow() {
    skillsFlowGroup.visible = false;
    skillsFlowGroup.position.set(0, 0, 0);
    scene.add(skillsFlowGroup);

    skillsFlowGroup.add(filamentsGroup);

    const baseCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-150, 0, 0),
        new THREE.Vector3(-125, 15, 2),
        new THREE.Vector3(-100, 20, 5),
        new THREE.Vector3(-75, 15, 2),
        new THREE.Vector3(-50, 0, 0),
        new THREE.Vector3(-25, -15, 2),
        new THREE.Vector3(0, -20, 5),
        new THREE.Vector3(25, -15, 2),
        new THREE.Vector3(50, 0, 0),
        new THREE.Vector3(75, 15, 2),
        new THREE.Vector3(100, 20, 5),
        new THREE.Vector3(125, 15, 2),
        new THREE.Vector3(150, 0, 0)
    ]);

    // Uniforms para inyectar en el shader
    const filamentUniforms = {
        uHoverPos: { value: new THREE.Vector3(0, 0, 0) },
        uHoverColor: { value: new THREE.Color(0xffffff) },
        uHoverIntensity: { value: 0.0 }
    };

    // Material Colectivo Reactivo (Con Brillo Base)
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

    // Inyección del Shader de Emisión por Proximidad
    filamentMat.onBeforeCompile = (shader) => {
        shader.uniforms.uHoverPos = filamentUniforms.uHoverPos;
        shader.uniforms.uHoverColor = filamentUniforms.uHoverColor;
        shader.uniforms.uHoverIntensity = filamentUniforms.uHoverIntensity;

        // 1. Exportar posición mundial al fragment shader
        shader.vertexShader = shader.vertexShader.replace(
            '#include <common>',
            `
            #include <common>
            varying vec3 vWorldPositionMagic;
            `
        ).replace(
            '#include <worldpos_vertex>',
            `
            #include <worldpos_vertex>
            vWorldPositionMagic = (modelMatrix * vec4(transformed, 1.0)).xyz;
            `
        );

        // 2. Modificar la emisión local
        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <common>',
            `
            #include <common>
            varying vec3 vWorldPositionMagic;
            uniform vec3 uHoverPos;
            uniform vec3 uHoverColor;
            uniform float uHoverIntensity;
            `
        ).replace(
            '#include <emissivemap_fragment>',
            `
            #include <emissivemap_fragment>
            
            float dist = distance(vWorldPositionMagic, uHoverPos);
            // La cercanía máxima es a 5 unidades, se disipa a 25 unidades
            float proximity = smoothstep(25.0, 5.0, dist);
            
            // Fogonazo local con el color del nodo (sin forzar blanco puro)
            float factorCubo = pow(proximity, 3.0);
            // Mezclamos sutilmente con un 10% de blanco para que se sienta caliente, pero predomina el color mágico
            vec3 localEmissive = mix(vec3(1.0), uHoverColor, 0.9) * (factorCubo * uHoverIntensity * 15.0);
            
            totalEmissiveRadiance += localEmissive;
            `
        );
    };

    // Crear 20 filamentos trenzados
    const filamentCount = 20;
    const segments = 100;

    // Pre-calcular la curva base estática para máxima optimización de CPU
    const baseFrames = [];
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

    const filamentsData = [];

    for (let i = 0; i < filamentCount; i++) {
        const frequency = 1.0 + Math.random() * 3.0; // Cuántas vueltas da
        const amplitude = 0.5 + Math.random() * 2.5; // Qué tan gorda es la trenza
        const phaseShift = Math.random() * Math.PI * 2; // Desfase
        const radius = 0.05 + Math.random() * 0.1;

        const points = [];
        for (let j = 0; j <= segments; j++) {
            const frame = baseFrames[j];
            const t = j / segments;
            const angle = t * Math.PI * 2 * frequency + phaseShift;

            // Hacemos que los extremos converjan multiplicando por una envolvente (ej. senoide t=0 a t=1)
            const envelope = Math.sin(t * Math.PI);

            const xOffset = Math.cos(angle) * amplitude * envelope;
            const yOffset = Math.sin(angle) * amplitude * envelope;

            const offset = frame.normal.clone().multiplyScalar(xOffset).add(frame.binormal.clone().multiplyScalar(yOffset));
            points.push(frame.spinePoint.clone().add(offset));
        }

        const filamentCurve = new THREE.CatmullRomCurve3(points);
        const filamentGeom = new THREE.TubeGeometry(filamentCurve, segments, radius, 5, false);
        const filamentMesh = new THREE.Mesh(filamentGeom, filamentMat);
        filamentsGroup.add(filamentMesh);

        filamentsData.push({ mesh: filamentMesh, frequency, amplitude, phaseShift, radius });
    }

    // Partículas que fluyen suavemente (mantenemos pero más dispersas)
    const flowParticlesGeom = new THREE.BufferGeometry();
    const flowCount = 400;
    // 2. Nodos Interactivos con PointLight
    const nodeGeom = new THREE.SphereGeometry(1.8, 32, 32);
    const hitboxGeom = new THREE.SphereGeometry(12, 16, 16);
    const hitboxMat = new THREE.MeshBasicMaterial({ visible: false });
    const labelsContainer = document.getElementById('skillsflow-labels-container');

    function createNode(id, label, colorHex, x, y, z, hoverDesc) {
        const group = new THREE.Group();
        group.position.set(x, y, z);
        group.userData = { id, type: 'skillsFlow', desc: hoverDesc };

        // Núcleo Visual Mágico
        const coreMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(colorHex).multiplyScalar(15.0)
        });
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

        // HALO GLOW
        const tex = createGlowTexture(colorHex);
        const haloMat = new THREE.SpriteMaterial({
            map: tex,
            color: new THREE.Color(colorHex).multiplyScalar(4.0),
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const halo = new THREE.Sprite(haloMat);
        halo.scale.set(10, 10, 1);
        group.add(halo);

        // ** LA CLAVE DEL FOCO LOCAL: PointLight **
        const hoverLight = new THREE.PointLight(colorHex, 0, 30);
        group.add(hoverLight);

        // Hitbox
        const hitbox = new THREE.Mesh(hitboxGeom, hitboxMat);
        hitbox.userData = group.userData;
        group.add(hitbox);

        // Etiqueta DOM
        let labelEl = null;
        if (labelsContainer) {
            labelEl = document.createElement('div');
            labelEl.className = 'floating-label flow-label hidden';
            labelEl.textContent = label.toUpperCase();
            labelsContainer.appendChild(labelEl);
        }

        skillsFlowGroup.add(group);

        const nodeData = {
            group, core, shell, halo, hoverLight, hitbox, labelEl,
            data: {
                currentScale: 1.0,
                targetScale: 1.0,
                currentEmissive: 1.0,
                targetEmissive: 1.0,
                baseColor: new THREE.Color(colorHex),
                active: false,
                wasHovered: false,
                label: label
            }
        };
        skillsFlowNodes.push(nodeData);
    }

    // Nodos centrados perfectamente en las crestas de la curva base diagonal
    const posStrength = baseCurve.getPointAt(0.38);
    const posDexterity = baseCurve.getPointAt(0.50);
    const posConstitution = baseCurve.getPointAt(0.62);
    createNode('btn-strength', 'Fuerza', 0xff3333, posStrength.x, posStrength.y, posStrength.z, "¡Fuerza bruta! Cuidado no rompas nada al pulsar...");
    createNode('btn-dexterity', 'Destreza', 0xffff00, posDexterity.x, posDexterity.y, posDexterity.z, "¡Agilidad pura! Cuidado que resbala...");
    createNode('btn-constitution', 'Constitución', 0xff8800, posConstitution.x, posConstitution.y, posConstitution.z, "¡Piedra inamovible! Aguante, salud y muchas cicatrices...");

    // 3. Loop de Actualización Vivo
    addUpdatable((delta) => {
        const attributeSelection = document.getElementById('skills-attribute-selection');
        const isActive = window.currentSection === 'habilidades' && attributeSelection && !attributeSelection.classList.contains('hidden');

        skillsFlowGroup.visible = isActive;

        if (isActive) {
            // Asegurar que el contenedor global de etiquetas sea visible tras el warp
            const labelsContainer = document.getElementById('skillsflow-labels-container');
            if (labelsContainer && labelsContainer.style.opacity === '0') {
                labelsContainer.style.opacity = '1';
            }

            // Buscar nodos activos para coloración LOCAL inmersiva
            const activeNodes = skillsFlowNodes.filter(n => n.data.currentEmissive > 1.05);
            let hoveringNode = null;
            let intensity = 0;

            if (activeNodes.length > 0) {
                hoveringNode = activeNodes.reduce((prev, current) => (prev.data.currentEmissive > current.data.currentEmissive) ? prev : current);
                intensity = (hoveringNode.data.currentEmissive - 1.0) / 3.0; // de 0 a 1

                // Actualizar Shader Uniforms
                filamentUniforms.uHoverPos.value.copy(hoveringNode.group.position);
                filamentUniforms.uHoverColor.value.copy(hoveringNode.data.baseColor);
                filamentUniforms.uHoverIntensity.value = intensity;
            } else {
                filamentUniforms.uHoverIntensity.value -= delta * 5.0;
                if (filamentUniforms.uHoverIntensity.value < 0) filamentUniforms.uHoverIntensity.value = 0;
            }

            // Animar Filamentos retorciéndose en su sitio sin mover el eje global
            const twistTime = Date.now() * 0.001 * 1.5; // Velocidad de rotación in-place
            for (let i = 0; i < filamentCount; i++) {
                const data = filamentsData[i];
                const points = [];
                for (let j = 0; j <= segments; j++) {
                    const frame = baseFrames[j];
                    const t = j / segments;
                    // El sumando twistTime hace que la trenza se enrosque dinámicamente
                    const angle = t * Math.PI * 2 * data.frequency + data.phaseShift - twistTime;
                    const envelope = Math.sin(t * Math.PI);
                    const xOffset = Math.cos(angle) * data.amplitude * envelope;
                    const yOffset = Math.sin(angle) * data.amplitude * envelope;

                    const offset = frame.normal.clone().multiplyScalar(xOffset).add(frame.binormal.clone().multiplyScalar(yOffset));
                    points.push(frame.spinePoint.clone().add(offset));
                }
                const filamentCurve = new THREE.CatmullRomCurve3(points);
                const newGeom = new THREE.TubeGeometry(filamentCurve, segments, data.radius, 5, false);

                data.mesh.geometry.dispose(); // Prevenir fugas de memoria
                data.mesh.geometry = newGeom;
            }

            // C. Actualizar Nodos e Iluminación Local
            skillsFlowNodes.forEach(n => {
                const { core, shell, halo, hoverLight, group, labelEl, data } = n;

                // Interpolación de estado Hover
                data.currentScale += (data.targetScale - data.currentScale) * 12 * delta;
                core.scale.set(data.currentScale, data.currentScale, data.currentScale);
                if (shell) {
                    shell.scale.copy(core.scale);
                    shell.rotation.y += delta * 0.5;
                    shell.rotation.x += delta * 0.2;
                }

                data.currentEmissive += (data.targetEmissive - data.currentEmissive) * 12 * delta;

                // Núcleo (Explosión mucho más brillante en hover)
                core.material.color.copy(data.baseColor).multiplyScalar(40.0 * data.currentEmissive);

                if (halo) {
                    const haloScale = 8 * data.currentScale;
                    halo.scale.set(haloScale, haloScale, 1);
                    halo.material.color.copy(data.baseColor).multiplyScalar(6.0 * data.currentEmissive);
                }

                // Luz Dinámica Localizada (Aumentado de 80 a 150)
                const normalizedHover = Math.max(0, (data.currentEmissive - 1.0) / 3.0);
                // Reducida la intensidad cruda para no "quemar" el color del PointLight en las mallas cercanas
                hoverLight.intensity = normalizedHover * 60.0;

                // Projection de Etiquetas (Animación de Runas a Letras al aparecer)
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
            skillsFlowNodes.forEach(n => {
                if (n.labelEl) n.labelEl.classList.add('hidden');
                n.data.wasHovered = false;
            });
        }
    });
}
