import { scene, addUpdatable } from '../core/Engine.js';

function createRuneTexture(text) {
    const canvas2d = document.createElement('canvas');
    canvas2d.width = 64;
    canvas2d.height = 64;
    const ctx = canvas2d.getContext('2d');
    
    ctx.font = 'bold 36px "Outfit", sans-serif';
    ctx.fillStyle = '#00f0ff'; // Azul mágico arcano
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Brillo mágico intenso
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 20;
    
    ctx.fillText(text, 32, 32);
    
    return new THREE.CanvasTexture(canvas2d);
}

// Runas Futhark
const runeSymbols = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛟ', 'ᛞ'];
const texturePool = runeSymbols.map(sym => createRuneTexture(sym));

const runesGroup = new THREE.Group();

class RuneColumn {
    constructor() {
        this.runes = [];
        this.count = Math.floor(Math.random() * 6) + 4; // Entre 4 y 9 runas por columna
        this.spacing = 4;
        
        this.state = 'DEAD';
        this.timer = Math.random() * 80; // Desfase inicial brutal para pura aleatoriedad
        this.waitTime = Math.random() * 30 + 10; // Entre 10 y 40 segundos de espera
        this.currentIndex = 0;
        
        for (let i = 0; i < this.count; i++) {
            const texture = texturePool[Math.floor(Math.random() * texturePool.length)];
            const material = new THREE.SpriteMaterial({ 
                map: texture, 
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                fog: false
            });
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(6, 6, 1);
            this.runes.push(sprite);
            runesGroup.add(sprite);
        }
    }
    
    spawn() {
        const maxRadius = 15000;
        const minRadius = 4000; // Aumentado para que no aparezcan pegadas unas a otras o a la cámara
        
        const u = Math.random();
        const v = Math.random();
        // Distribución volumétrica: r = maxRadius * cbrt(random)
        // Usamos un rango entre minRadius y maxRadius
        const r = minRadius + (maxRadius - minRadius) * Math.pow(Math.random(), 1/3);
        
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        
        this.x = r * Math.sin(phi) * Math.cos(theta);
        this.y = r * Math.sin(phi) * Math.sin(theta);
        this.z = -200 + r * Math.cos(phi);
        
        // Escalar según la distancia para que siempre se vean de buen tamaño en pantalla
        const scaleFactor = r / 1000;
        this.spacing = (25 + Math.random() * 20) * scaleFactor; // Separación más aleatoria
        
        // Tamaños base mucho más erráticos
        const baseSize = 20 + Math.random() * 50; 
        const finalSize = baseSize * scaleFactor;

        for (let i = 0; i < this.count; i++) {
            const texture = texturePool[Math.floor(Math.random() * texturePool.length)];
            this.runes[i].material.map = texture;
            this.runes[i].position.set(this.x, this.y - (i * this.spacing), this.z);
            this.runes[i].material.opacity = 0;
            
            this.runes[i].scale.set(finalSize, finalSize, 1);
        }
        
        this.state = 'APPEARING';
        this.timer = 0;
        this.currentIndex = 0;
        this.idleDuration = 2.0; // Exactamente 2 segundos como pidió el usuario
        this.driftSpeed = Math.random() * 0.5 + 0.2; 
    }
    
    update(delta) {
        if (this.state === 'APPEARING') {
            this.timer += delta;
            if (this.timer > 0.1) {
                this.timer = 0;
                if (this.currentIndex < this.count) {
                    this.runes[this.currentIndex].material.opacity = Math.random() * 0.3 + 0.7; 
                    this.currentIndex++;
                } else {
                    this.state = 'IDLE';
                    this.timer = 0;
                }
            }
        } 
        else if (this.state === 'IDLE') {
            this.timer += delta;
            for (let i = 0; i < this.count; i++) {
                this.runes[i].position.y -= this.driftSpeed * delta;
                if(Math.random() > 0.98) {
                    this.runes[i].material.opacity = Math.random() * 0.5 + 0.5;
                }
            }
            if (this.timer > this.idleDuration) {
                this.state = 'DISAPPEARING';
                this.timer = 0;
                this.currentIndex = 0;
            }
        } 
        else if (this.state === 'DISAPPEARING') {
            this.timer += delta;
            for (let i = 0; i < this.count; i++) {
                this.runes[i].position.y -= this.driftSpeed * delta;
            }
            if (this.timer > 0.1) {
                this.timer = 0;
                if (this.currentIndex < this.count) {
                    this.runes[this.currentIndex].material.opacity = 0;
                    this.currentIndex++;
                } else {
                    this.state = 'DEAD';
                    this.timer = 0;
                }
            }
        } 
        else if (this.state === 'DEAD') {
            this.timer += delta;
            if (this.timer > this.waitTime) { 
                this.spawn();
                this.waitTime = Math.random() * 30 + 10; // Siguiente tiempo aleatorio (10 a 40 segundos)
            }
        }
    }
}

export function initRunes() {
    scene.add(runesGroup);

    // Mapa estelar esferoidal que rodea la constelación
    const starGeom = new THREE.BufferGeometry();
    const starCount = 10500; // Reducido un 50% a petición del usuario
    const starPos = new Float32Array(starCount * 3);
    const starPhase = new Float32Array(starCount);
    
    const radiusX = 21000; // Radio aumentado un 50% adicional
    const radiusY = 18000;
    const radiusZ = 21000;
    const centerX = 0;
    const centerY = 0;
    const centerZ = -200; // Centro de la estrella central

    for (let i = 0; i < starCount; i++) {
        // Coordenadas esféricas uniformes
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);

        // Añadimos algo de grosor a la "cáscara" de la esfera (shell thickness)
        const thickness = 1.0 + (Math.random() - 0.5) * 0.1; 

        starPos[i * 3] = centerX + (radiusX * thickness) * Math.sin(phi) * Math.cos(theta);
        starPos[i * 3 + 1] = centerY + (radiusY * thickness) * Math.sin(phi) * Math.sin(theta);
        starPos[i * 3 + 2] = centerZ + (radiusZ * thickness) * Math.cos(phi);
        
        starPhase[i] = Math.random() * Math.PI * 2;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeom.setAttribute('phase', new THREE.BufferAttribute(starPhase, 1));
    
    const starMat = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            color: { value: new THREE.Color(0xffffff) }
        },
        vertexShader: `
            attribute float phase;
            varying float vPhase;
            void main() {
                vPhase = phase;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                
                // Aplicamos atenuación por distancia. Si no hacemos esto, el tamaño en píxeles es fijo 
                // y alejarlos no se nota visualmente. Al dividir por la distancia, al alejarse se hacen más pequeños.
                float baseSize = 8.0 + sin(phase) * 4.0; // Tamaño base más grande que se reduce con la distancia
                float distanceScale = 5000.0 / length(mvPosition.xyz); 
                
                gl_PointSize = baseSize * distanceScale;
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform vec3 color;
            varying float vPhase;
            void main() {
                vec2 coord = gl_PointCoord - vec2(0.5);
                if(length(coord) > 0.5) discard;
                
                // Pulsar muy lentamente (velocidad 0.3)
                float alpha = 0.5 + 0.5 * sin(time * 0.3 + vPhase);
                alpha = pow(alpha, 2.0); // Curva de apagado más pronunciada
                
                gl_FragColor = vec4(color, alpha * 0.9);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    
    const stars = new THREE.Points(starGeom, starMat);
    scene.add(stars);
    
    const columnsCount = 75; // Reducido aún más para que sea un evento raro y mágico
    const columns = [];
    for(let i=0; i<columnsCount; i++) {
        columns.push(new RuneColumn());
    }

    addUpdatable((delta, elapsedTime) => {
        columns.forEach(col => col.update(delta));
        if (starMat.uniforms) {
            starMat.uniforms.time.value = elapsedTime;
        }
    });
}
