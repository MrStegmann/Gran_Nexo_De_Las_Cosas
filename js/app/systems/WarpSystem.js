import { camera, addUpdatable } from '../core/Engine.js';
import { leyNodesGroup, leyNodes } from '../world/Constellation.js';
import { hoveredNode, mouse } from './Interaction.js';
import { scrambleText } from '../utils/TextEffects.js';

export let isWarping = false;
export let isWarpingReturn = false;

let warpTarget = null;
let warpStack = [];
let warpCallback = null;
const originalFov = 75;

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let orbitTheta = 0.62; // ~36 grados
let orbitPhi = 1.15; // ~66 grados
let orbitRadius = 297.32;
let targetOrbitRadius = 297.32; // Para zoom suave
window.wasDragging = false;
let dragDist = 0;

export function initWarpSystem() {
    document.addEventListener('wheel', (e) => {
        if (!isWarping && !isWarpingReturn && (window.currentSection === 'inicio' || !window.currentSection)) {
            targetOrbitRadius += e.deltaY * 0.5;
            // Limitar: mínimo 40 (cerca), máximo 450 (para que no pierdan brillo por la niebla)
            targetOrbitRadius = Math.max(40, Math.min(450, targetOrbitRadius));
        }
    });

    document.addEventListener('mousedown', (e) => {
        if (e.button === 0) { // Permitir rotación en cualquier sección (Nexo y Flows)
            isDragging = true;
            dragDist = 0;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y
            };
            
            dragDist += Math.abs(deltaMove.x) + Math.abs(deltaMove.y);
            if (dragDist > 5) {
                window.wasDragging = true;
            }

            orbitTheta -= deltaMove.x * 0.005;
            orbitPhi -= deltaMove.y * 0.005;
            
            // Restringir el giro vertical para no ponernos boca abajo
            orbitPhi = Math.max(0.1, Math.min(Math.PI - 0.1, orbitPhi));

            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        setTimeout(() => { window.wasDragging = false; }, 10);
    });

    window.triggerWarpToNode = function(targetPos, callback, group = null) {
        if (isWarping || isWarpingReturn) return;
        isWarping = true;
        warpCallback = callback;
        window.currentWarpGroup = group || leyNodesGroup;
        
        // Ocultar cualquier contenedor de etiquetas posible
        const floatingLabels = document.getElementById('floating-labels-container');
        if (floatingLabels) floatingLabels.style.opacity = '0';
        
        const skillsLabels = document.getElementById('skillsflow-labels-container');
        if (skillsLabels) skillsLabels.style.opacity = '0';
        
        const schoolsLabels = document.getElementById('schoolsflow-labels-container');
        if (schoolsLabels) schoolsLabels.style.opacity = '0';

        const footerElement = document.getElementById('main-footer');
        if (footerElement) footerElement.style.opacity = '0';

        if (hoveredNode) {
            const oldNodeData = leyNodes.find(n => n.group === hoveredNode);
            if (oldNodeData && oldNodeData.core) oldNodeData.data.targetScale = 1.0;
            if (oldNodeData && oldNodeData.data.labelEl) oldNodeData.data.labelEl.style.textShadow = '';
        }

        if (!targetPos) {
            targetPos = new THREE.Vector3((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 30, -250);
        }
        
        warpStack.push(targetPos.clone());
        warpTarget = targetPos.clone();
    };

    window.triggerWarpReturn = function(callback, group = null) {
        if (isWarping || isWarpingReturn) return;
        isWarpingReturn = true;
        
        const flash = document.getElementById('warp-flash');
        if (flash) flash.classList.add('flash-active');
        
        if (callback) callback();

        const groupToShow = group || window.currentWarpGroup || leyNodesGroup;
        if (groupToShow) groupToShow.visible = true;
        
        window.currentWarpGroup = null;

        let returnTarget = warpStack.length > 0 ? warpStack.pop() : null;

        const nexoCamPos = new THREE.Vector3(
            0 + targetOrbitRadius * Math.sin(orbitPhi) * Math.sin(orbitTheta),
            0 + targetOrbitRadius * Math.cos(orbitPhi),
            -200 + targetOrbitRadius * Math.sin(orbitPhi) * Math.cos(orbitTheta)
        );

        if (returnTarget) {
            // El objetivo físico de la cámara al volver respeta la rotación actual del usuario
            const flowRadius = 60;
            warpTarget = new THREE.Vector3(
                0 + flowRadius * Math.sin(orbitPhi) * Math.sin(orbitTheta),
                0 + flowRadius * Math.cos(orbitPhi),
                0 + flowRadius * Math.sin(orbitPhi) * Math.cos(orbitTheta)
            );
            // Queremos hacer una transición suave de la mirada desde el nodo (donde estábamos) hacia el centro (0,0,0)
            window.warpReturnLookAt = new THREE.Vector3(0, 0, 0);
            window.warpReturnCurrentLookAt = returnTarget.clone(); 
        } else {
            warpTarget = nexoCamPos.clone();
            camera.position.copy(nexoCamPos).add(new THREE.Vector3(0, 0, 50));
            window.warpReturnLookAt = new THREE.Vector3(0, 0, -200); 
            window.warpReturnCurrentLookAt = null;
        }

        camera.fov = originalFov; 
        camera.updateProjectionMatrix();

        const floatingLabels = document.getElementById('floating-labels-container');
        if (floatingLabels && (groupToShow === leyNodesGroup)) {
            floatingLabels.style.opacity = '1';
            leyNodes.forEach(n => {
                if (n.data && n.data.labelEl) scrambleText(n.data.labelEl, n.data.label.toUpperCase());
            });
        }
        
        const skillsLabels = document.getElementById('skillsflow-labels-container');
        if (skillsLabels && (groupToShow !== leyNodesGroup)) {
            skillsLabels.style.opacity = '1';
        }

        const schoolsLabels = document.getElementById('schoolsflow-labels-container');
        if (schoolsLabels && (groupToShow !== leyNodesGroup)) {
            schoolsLabels.style.opacity = '1';
        }

        const footerElement = document.getElementById('main-footer');
        const footerText = document.getElementById('footer-text');
        if (footerElement && footerText) {
            footerElement.style.opacity = '1';
            scrambleText(footerText, "© 2026 GRIMORIO INTERACTIVO. TODOS LOS DERECHOS RESERVADOS.");
        }

        setTimeout(() => {
            if (flash) flash.classList.remove('flash-active');
        }, 100);
    };

    addUpdatable((delta) => {
        if (isWarping && warpTarget) {
            const distToTarget = camera.position.distanceTo(warpTarget);
            const speed = Math.max(120, distToTarget * 3) * delta; 
            
            const dir = new THREE.Vector3().subVectors(warpTarget, camera.position).normalize();
            camera.position.add(dir.multiplyScalar(speed));
            
            if (camera.fov < 140) {
                camera.fov += 120 * delta;
                camera.updateProjectionMatrix();
            }

            camera.lookAt(warpTarget);

            if (distToTarget < 20) {
                const flash = document.getElementById('warp-flash');
                if (flash) flash.classList.add('flash-active');
                
                if (window.currentWarpGroup) {
                    window.currentWarpGroup.visible = false;
                }
                
                if (warpCallback) {
                    warpCallback();
                    warpCallback = null;
                }

                setTimeout(() => {
                    isWarping = false;
                    const flowRadius = 60;
                    camera.position.set(
                        0 + flowRadius * Math.sin(orbitPhi) * Math.sin(orbitTheta),
                        0 + flowRadius * Math.cos(orbitPhi),
                        0 + flowRadius * Math.sin(orbitPhi) * Math.cos(orbitTheta)
                    );
                    camera.lookAt(0, 0, 0);
                    camera.fov = originalFov;
                    camera.updateProjectionMatrix();
                    
                    if (flash) {
                        setTimeout(() => flash.classList.remove('flash-active'), 100);
                    }
                }, 50);
            }
        }

        if (isWarpingReturn && warpTarget) {
            const distToTarget = camera.position.distanceTo(warpTarget);
            const speed = Math.max(150, distToTarget * 4) * delta; 
            
            const dir = new THREE.Vector3().subVectors(warpTarget, camera.position).normalize();
            camera.position.add(dir.multiplyScalar(speed));

            let lookAtPos;
            if (window.warpReturnCurrentLookAt && window.warpReturnLookAt) {
                window.warpReturnCurrentLookAt.lerp(window.warpReturnLookAt, 6 * delta);
                lookAtPos = window.warpReturnCurrentLookAt;
            } else {
                lookAtPos = window.warpReturnLookAt || new THREE.Vector3(0, 0, -200);
            }
            camera.lookAt(lookAtPos);

            if (distToTarget < 5) {
                isWarpingReturn = false;
                camera.position.copy(warpTarget); 
                camera.lookAt(lookAtPos);
                camera.fov = originalFov;
                camera.updateProjectionMatrix();
            }
        }

        if (!isWarping && !isWarpingReturn) {
            const isNexo = window.currentSection === 'inicio' || !window.currentSection;
            if (isNexo) {
                // Suavizado del zoom
                orbitRadius += (targetOrbitRadius - orbitRadius) * 10 * delta;
                
                const targetCameraPos = new THREE.Vector3(
                    0 + orbitRadius * Math.sin(orbitPhi) * Math.sin(orbitTheta),
                    0 + orbitRadius * Math.cos(orbitPhi),
                    -200 + orbitRadius * Math.sin(orbitPhi) * Math.cos(orbitTheta)
                );
                camera.position.lerp(targetCameraPos, 0.1);
                camera.lookAt(0, 0, -200);
            } else {
                // Rotación de 360 grados sin cambiar la distancia al Flow
                const flowRadius = 60;
                const targetCameraPos = new THREE.Vector3(
                    0 + flowRadius * Math.sin(orbitPhi) * Math.sin(orbitTheta),
                    0 + flowRadius * Math.cos(orbitPhi),
                    0 + flowRadius * Math.sin(orbitPhi) * Math.cos(orbitTheta)
                );
                camera.position.lerp(targetCameraPos, 0.1);
                camera.lookAt(0, 0, 0);
            }
        }
    });
}
