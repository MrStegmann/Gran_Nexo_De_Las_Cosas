import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const runeSymbols = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛟ', 'ᛞ'];

let texturePool: THREE.CanvasTexture[] = [];
let texturesInitialized = false;
let initPromise: Promise<void> | null = null;

const initTextures = () => {
    if (texturesInitialized) return Promise.resolve();
    if (initPromise) return initPromise;
    
    initPromise = document.fonts.ready.then(() => {
        texturePool = runeSymbols.map(sym => {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.font = 'bold 36px "Outfit", "Segoe UI Historic", "Segoe UI Symbol", sans-serif';
                ctx.fillStyle = '#00f0ff';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 10;
                ctx.fillText(sym, 32, 32);
            }
            const tex = new THREE.CanvasTexture(canvas);
            tex.needsUpdate = true;
            return tex;
        });
        texturesInitialized = true;
    });
    
    return initPromise;
};

const RuneColumn = () => {
    const count = useMemo(() => Math.floor(Math.random() * 6) + 4, []);
    const spritesRef = useRef<(THREE.Sprite | null)[]>([]);
    
    const state = useRef({
        status: 'DEAD',
        timer: Math.random() * 80,
        waitTime: Math.random() * 30 + 10,
        currentIndex: 0,
        idleDuration: 2.0,
        driftSpeed: Math.random() * 0.5 + 0.2,
        x: 0, y: 0, z: 0,
        spacing: 4,
        scale: 6
    });

    const spawn = () => {
        const s = state.current;
        const maxRadius = 15000;
        const minRadius = 4000;
        
        const u = Math.random();
        const v = Math.random();
        const r = minRadius + (maxRadius - minRadius) * Math.pow(Math.random(), 1/3);
        
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        
        s.x = r * Math.sin(phi) * Math.cos(theta);
        s.y = r * Math.sin(phi) * Math.sin(theta);
        s.z = -5000 + r * Math.cos(phi);
        
        const scaleFactor = r / 1000;
        s.spacing = 30 * scaleFactor;
        
        const baseSize = 30; 
        const finalSize = baseSize * scaleFactor;

        for (let i = 0; i < count; i++) {
            const sprite = spritesRef.current[i];
            if (sprite) {
                const texture = texturePool[Math.floor(Math.random() * texturePool.length)];
                sprite.material.map = texture;
                sprite.position.set(s.x, s.y - (i * s.spacing), s.z);
                sprite.material.opacity = 0;
                sprite.scale.set(0.01, 0.01, 1);
                sprite.userData = { targetScale: finalSize, targetOpacity: 0.1 };
            }
        }
        
        s.status = 'APPEARING';
        s.timer = 0;
        s.currentIndex = 0;
        s.idleDuration = 2.0;
        s.driftSpeed = Math.random() * 0.5 + 0.2;
    };

    useFrame((_, delta) => {
        const s = state.current;
        
        if (s.status === 'APPEARING') {
            s.timer += delta;
            if (s.timer > 0.1 && s.currentIndex < count) {
                s.timer = 0;
                s.currentIndex++;
            }
            
            let allAppeared = true;
            for (let i = 0; i < count; i++) {
                const sprite = spritesRef.current[i];
                if (sprite && sprite.userData) {
                    sprite.position.y -= s.driftSpeed * delta;
                    if (i < s.currentIndex) {
                        sprite.scale.x = THREE.MathUtils.lerp(sprite.scale.x, sprite.userData.targetScale, delta * 8);
                        sprite.scale.y = THREE.MathUtils.lerp(sprite.scale.y, sprite.userData.targetScale, delta * 8);
                        sprite.material.opacity = THREE.MathUtils.lerp(sprite.material.opacity, sprite.userData.targetOpacity, delta * 8);
                        
                        if (sprite.scale.x < sprite.userData.targetScale * 0.95) {
                            allAppeared = false;
                        }
                    } else {
                        allAppeared = false;
                    }
                }
            }
            
            if (s.currentIndex >= count && allAppeared) {
                s.status = 'IDLE';
                s.timer = 0;
            }
        } else if (s.status === 'IDLE') {
            s.timer += delta;
            for (let i = 0; i < count; i++) {
                const sprite = spritesRef.current[i];
                if (sprite) {
                    sprite.position.y -= s.driftSpeed * delta;
                    // No random opacity flicker for uniform brightness
                }
            }
            if (s.timer > s.idleDuration) {
                s.status = 'DISAPPEARING';
                s.timer = 0;
                s.currentIndex = count - 1;
            }
        } else if (s.status === 'DISAPPEARING') {
            s.timer += delta;
            if (s.timer > 0.1 && s.currentIndex >= 0) {
                s.timer = 0;
                s.currentIndex--;
            }

            let allDisappeared = true;
            for (let i = 0; i < count; i++) {
                const sprite = spritesRef.current[i];
                if (sprite) {
                    sprite.position.y -= s.driftSpeed * delta;
                    if (i > s.currentIndex) {
                        sprite.scale.x = THREE.MathUtils.lerp(sprite.scale.x, 0.01, delta * 8);
                        sprite.scale.y = THREE.MathUtils.lerp(sprite.scale.y, 0.01, delta * 8);
                        sprite.material.opacity = THREE.MathUtils.lerp(sprite.material.opacity, 0, delta * 8);
                        
                        if (sprite.scale.x > 0.1) {
                            allDisappeared = false;
                        }
                    } else {
                        allDisappeared = false;
                    }
                }
            }

            if (s.currentIndex < 0 && allDisappeared) {
                s.status = 'DEAD';
                s.timer = 0;
            }
        } else if (s.status === 'DEAD') {
            s.timer += delta;
            if (s.timer > s.waitTime) {
                spawn();
                s.waitTime = Math.random() * 30 + 10;
            }
        }
    });

    return (
        <group>
            {Array.from({ length: count }).map((_, i) => (
                <sprite 
                    key={i} 
                    ref={(el) => { spritesRef.current[i] = el; }}
                >
                    <spriteMaterial 
                        transparent 
                        opacity={0} 
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                        fog={false}
                        map={texturePool[0]}
                    />
                </sprite>
            ))}
        </group>
    );
};

export const FutharkRunes: React.FC = () => {
    // 25 columns for a good cascade spread
    const columnCount = 25;
    const [ready, setReady] = useState(texturesInitialized);

    useEffect(() => {
        if (!texturesInitialized) {
            initTextures().then(() => setReady(true));
        }
    }, []);

    if (!ready) return null;
    
    return (
        <group>
            {Array.from({ length: columnCount }).map((_, i) => (
                <RuneColumn key={i} />
            ))}
        </group>
    );
};
