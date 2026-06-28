import { camera, addUpdatable } from '../core/Engine.js';
import { leyNodesGroup, leyNodes } from '../world/Constellation.js';
import { magicFlowGroup, magicFlowNodes } from '../world/MagicFlow.js';
import { schoolsFlowGroup, schoolsFlowNodes } from '../world/SchoolsFlow.js';
import { skillsFlowGroup, skillsFlowNodes } from '../world/SkillsFlow.js';
import { isWarping } from './WarpSystem.js';

let mouseX = 0;
let mouseY = 0;
export const mouse = new THREE.Vector2();
export const raycaster = new THREE.Raycaster();
export let hoveredNode = null;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

export function initInteraction() {
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.0005;
        mouseY = (event.clientY - windowHalfY) * 0.0005;
        
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    document.addEventListener('click', (event) => {
        if (window.wasDragging) return; // Ignorar clic si estábamos arrastrando la cámara
        
        const t = event.target;
        if (t.tagName === 'BUTTON' || t.tagName === 'A' || t.tagName === 'INPUT' || t.closest('.search-overlay') || t.closest('.kb-layout')) return;

        if (hoveredNode) {
            const userData = hoveredNode.userData;
            
            // Constellation Node Click
            if (leyNodesGroup.visible && !userData.type) {
                if (window.triggerWarpToNode && window.navigateTo) {
                    window.triggerWarpToNode(hoveredNode.position.clone(), () => {
                        window.navigateTo(userData.id);
                    });
                }
            }
            // MagicFlow Node Click
            else if (magicFlowGroup.visible && userData.type === 'magicFlow') {
                if (userData.id === 'btn-intellect' && window.triggerLoadSchools) {
                    window.triggerLoadSchools('intellect');
                } else if (userData.id === 'btn-willpower' && window.triggerLoadSchools) {
                    window.triggerLoadSchools('willpower');
                } else {
                    const targetBtn = document.getElementById(userData.id);
                    if (targetBtn) targetBtn.click();
                }
            }
            // SkillsFlow Node Click (Habilidades)
            else if (skillsFlowGroup.visible && userData.type === 'skillsFlow') {
                if (window.triggerLoadSkills) {
                    let attributeId = userData.id.replace('btn-', '');
                    if (window.triggerWarpToNode) {
                        let targetPos = new THREE.Vector3();
                        hoveredNode.getWorldPosition(targetPos);
                        window.triggerWarpToNode(targetPos, () => {
                            window.triggerLoadSkills(attributeId);
                        }, skillsFlowGroup);
                    } else {
                        window.triggerLoadSkills(attributeId);
                    }
                }
            }
            // SchoolsFlow Node Click (Hechizos)
            else if (schoolsFlowGroup.visible && userData.type === 'schoolFlow') {
                if (window.triggerLoadSpells && userData.data) {
                    if (window.triggerWarpToNode) {
                        let targetPos = new THREE.Vector3();
                        hoveredNode.getWorldPosition(targetPos);
                        window.triggerWarpToNode(targetPos, () => {
                            window.triggerLoadSpells(userData.data);
                        }, schoolsFlowGroup);
                    } else {
                        window.triggerLoadSpells(userData.data);
                    }
                }
            }
            // SchoolsFlow Back Click
            else if (schoolsFlowGroup.visible && userData.type === 'schoolBack') {
                if (window.triggerReturnToAttributes) {
                    window.triggerReturnToAttributes();
                }
            }
        }
    });

    addUpdatable((delta) => {
        // Combinar todos los hitboxes activos según la visibilidad del grupo
        let activeNodes = [];
        if (!isWarping && leyNodesGroup.visible) activeNodes = activeNodes.concat(leyNodes);
        if (!isWarping && magicFlowGroup.visible) activeNodes = activeNodes.concat(magicFlowNodes);
        if (!isWarping && schoolsFlowGroup.visible) activeNodes = activeNodes.concat(schoolsFlowNodes);
        if (!isWarping && skillsFlowGroup.visible) activeNodes = activeNodes.concat(skillsFlowNodes);

        if (activeNodes.length > 0) {
            raycaster.setFromCamera(mouse, camera);
            
            const hitboxes = activeNodes.filter(n => n.hitbox).map(n => n.hitbox);
            const intersects = raycaster.intersectObjects(hitboxes);

            if (intersects.length > 0) {
                document.body.style.cursor = 'pointer';
                const hitGroup = intersects[0].object.parent;
                
                if (hoveredNode !== hitGroup) {
                    // Reset previous node
                    if (hoveredNode) {
                        const oldNodeData = activeNodes.find(n => n.group === hoveredNode);
                        if (oldNodeData && oldNodeData.core) {
                            oldNodeData.data.targetScale = 1.0;
                            oldNodeData.data.targetEmissive = 1.0;
                        }
                    }
                    
                    // Activate new node
                    hoveredNode = hitGroup;
                    const nodeData = activeNodes.find(n => n.group === hoveredNode);
                    
                    if (nodeData) {
                        if (nodeData.core) {
                            nodeData.data.targetScale = 1.5; 
                            nodeData.data.targetEmissive = 4.0; 
                        } 
                        if (nodeData.data.labelEl) {
                            nodeData.data.labelEl.style.textShadow = '0 0 15px rgba(255,255,255,1), 0 0 40px rgba(0,240,255,1)';
                        }
                        
                        // Mascot dialogue specific to Magic Flow
                        if (nodeData.group.userData.type === 'magicFlow' && window.azulitoSay) {
                            window.azulitoSay(nodeData.group.userData.desc);
                        }
                    }
                }
            } else {
                document.body.style.cursor = 'default';
                if (hoveredNode) {
                    const oldNodeData = activeNodes.find(n => n.group === hoveredNode);
                    if (oldNodeData && oldNodeData.core) {
                        oldNodeData.data.targetScale = 1.0;
                        oldNodeData.data.targetEmissive = 1.0;
                    }
                    if (oldNodeData && oldNodeData.data.labelEl) oldNodeData.data.labelEl.style.textShadow = '';
                    hoveredNode = null;
                }
            }
        } else {
            // Si no hay nodos activos (durante el warp o menús cerrados)
            document.body.style.cursor = '';
            hoveredNode = null;
        }

        // Animación suave de los labels 2D del Constellation 
        // (MagicFlow actualiza sus propias labels y scales internamente en su propio addUpdatable)
        if (leyNodesGroup.visible) {
            leyNodes.forEach(n => {
                if (n.core && n.data) {
                    if (n.data.currentScale === undefined) n.data.currentScale = 1.0;
                    if (n.data.targetScale === undefined) n.data.targetScale = 1.0;
                    if (n.data.currentEmissive === undefined) n.data.currentEmissive = 1.0;
                    if (n.data.targetEmissive === undefined) n.data.targetEmissive = 1.0;
                    
                    n.data.currentScale += (n.data.targetScale - n.data.currentScale) * 12 * delta;
                    n.core.scale.set(n.data.currentScale, n.data.currentScale, n.data.currentScale);

                    n.data.currentEmissive += (n.data.targetEmissive - n.data.currentEmissive) * 12 * delta;
                    n.core.material.emissiveIntensity = n.data.currentEmissive;
                }

                if (n.data && n.data.labelEl) {
                    const vector = n.group.position.clone();
                    vector.y += 12; 
                    
                    const viewPos = vector.clone().applyMatrix4(camera.matrixWorldInverse);
                    const isBehind = viewPos.z > 0;
                    
                    vector.project(camera);
                    
                    if (isBehind) {
                        n.data.labelEl.style.display = 'none';
                    } else {
                        n.data.labelEl.style.display = '';
                        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
                        const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;
                        
                        n.data.labelEl.style.left = `${x}px`;
                        n.data.labelEl.style.top = `${y}px`;
                    }
                }
            });
        }
    });
}
