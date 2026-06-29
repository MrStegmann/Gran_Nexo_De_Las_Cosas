import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const runeSymbols = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛟ', 'ᛞ'];

// Reuse textures globally so we don't recreate canvases on each mount
const texturePool = runeSymbols.map(sym => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.font = 'bold 36px "Outfit", sans-serif';
        ctx.fillStyle = '#00f0ff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 20;
        ctx.fillText(sym, 32, 32);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
});

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
        s.z = -200 + r * Math.cos(phi);
        
        const scaleFactor = r / 1000;
        s.spacing = (25 + Math.random() * 20) * scaleFactor;
        
        const baseSize = 20 + Math.random() * 50; 
        const finalSize = baseSize * scaleFactor;

        for (let i = 0; i < count; i++) {
            const sprite = spritesRef.current[i];
            if (sprite) {
                const texture = texturePool[Math.floor(Math.random() * texturePool.length)];
                sprite.material.map = texture;
                sprite.position.set(s.x, s.y - (i * s.spacing), s.z);
                sprite.material.opacity = 0;
                sprite.scale.set(finalSize, finalSize, 1);
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
            if (s.timer > 0.1) {
                s.timer = 0;
                if (s.currentIndex < count) {
                    const sprite = spritesRef.current[s.currentIndex];
                    if (sprite) sprite.material.opacity = Math.random() * 0.3 + 0.7;
                    s.currentIndex++;
                } else {
                    s.status = 'IDLE';
                    s.timer = 0;
                }
            }
        } else if (s.status === 'IDLE') {
            s.timer += delta;
            for (let i = 0; i < count; i++) {
                const sprite = spritesRef.current[i];
                if (sprite) {
                    sprite.position.y -= s.driftSpeed * delta;
                    if(Math.random() > 0.98) {
                        sprite.material.opacity = Math.random() * 0.5 + 0.5;
                    }
                }
            }
            if (s.timer > s.idleDuration) {
                s.status = 'DISAPPEARING';
                s.timer = 0;
                s.currentIndex = 0;
            }
        } else if (s.status === 'DISAPPEARING') {
            s.timer += delta;
            for (let i = 0; i < count; i++) {
                const sprite = spritesRef.current[i];
                if (sprite) {
                    sprite.position.y -= s.driftSpeed * delta;
                }
            }
            if (s.timer > 0.1) {
                s.timer = 0;
                if (s.currentIndex < count) {
                    const sprite = spritesRef.current[s.currentIndex];
                    if (sprite) sprite.material.opacity = 0;
                    s.currentIndex++;
                } else {
                    s.status = 'DEAD';
                    s.timer = 0;
                }
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
                    />
                </sprite>
            ))}
        </group>
    );
};

export const FutharkRunes: React.FC = () => {
    // 25 columns for a good cascade spread
    const columnCount = 25;
    
    return (
        <group>
            {Array.from({ length: columnCount }).map((_, i) => (
                <RuneColumn key={i} />
            ))}
        </group>
    );
};
