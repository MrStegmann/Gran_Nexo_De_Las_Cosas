import * as THREE from 'three';
import { NodeId } from '../enums/NodeId';

export const constellationData = [
    { id: NodeId.MECANICAS, label: 'Mecánicas', pos: new THREE.Vector3(-50, 120, -320), mobilePos: new THREE.Vector3(-45, 180, -320) },
    { id: NodeId.HECHIZOS, label: 'Hechizos', pos: new THREE.Vector3(140, 60, -120), mobilePos: new THREE.Vector3(45, 108, -120) },
    { id: NodeId.RUNAS, label: 'Runas', pos: new THREE.Vector3(190, 80, -160), mobilePos: new THREE.Vector3(100, 200, -220) },
    { id: NodeId.HABILIDADES, label: 'Habilidades', pos: new THREE.Vector3(90, -110, -250), mobilePos: new THREE.Vector3(45, -36, -250) },
    { id: NodeId.FICHAS, label: 'Fichas', pos: new THREE.Vector3(-120, -80, -80), mobilePos: new THREE.Vector3(-45, -108, -80) },
    { id: NodeId.INVENTARIO, label: 'Inventario', pos: new THREE.Vector3(-130, 10, -280), mobilePos: new THREE.Vector3(45, -180, -280) }
];

export const nodeThemes: Record<NodeId, { color: number, emissive: THREE.Color, geom: THREE.BufferGeometry, shellGeom: THREE.BufferGeometry }> = {
    [NodeId.MECANICAS]: {
        color: 0xffb700,
        emissive: new THREE.Color(0xff7700).multiplyScalar(15),
        geom: new THREE.OctahedronGeometry(2.3, 0),
        shellGeom: new THREE.OctahedronGeometry(3.3, 0)
    },
    [NodeId.HECHIZOS]: {
        color: 0x00f0ff,
        emissive: new THREE.Color(0x0088ff).multiplyScalar(15),
        geom: new THREE.IcosahedronGeometry(2.3, 0),
        shellGeom: new THREE.IcosahedronGeometry(3.3, 0)
    },
    [NodeId.RUNAS]: {
        color: 0xffffff,
        emissive: new THREE.Color(0x88ccff).multiplyScalar(15),
        geom: new THREE.IcosahedronGeometry(2.1, 0),
        shellGeom: new THREE.IcosahedronGeometry(3.1, 0)
    },
    [NodeId.HABILIDADES]: {
        color: 0xe000ff,
        emissive: new THREE.Color(0x8800ff).multiplyScalar(15),
        geom: new THREE.DodecahedronGeometry(2.3, 0),
        shellGeom: new THREE.DodecahedronGeometry(3.3, 0)
    },
    [NodeId.FICHAS]: {
        color: 0x00ff88,
        emissive: new THREE.Color(0x00aa33).multiplyScalar(15),
        geom: new THREE.ConeGeometry(2.1, 4.2, 4),
        shellGeom: new THREE.ConeGeometry(3.1, 5.2, 4)
    },
    [NodeId.INVENTARIO]: {
        color: 0xff3344,
        emissive: new THREE.Color(0xcc0011).multiplyScalar(15),
        geom: new THREE.BoxGeometry(2.4, 2.4, 2.4),
        shellGeom: new THREE.BoxGeometry(3.4, 3.4, 3.4)
    }
};
