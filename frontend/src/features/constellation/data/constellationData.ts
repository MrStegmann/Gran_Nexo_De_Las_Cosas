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
        emissive: new THREE.Color(0xff7700).multiplyScalar(11.25),
        geom: new THREE.OctahedronGeometry(3.795, 0),
        shellGeom: new THREE.OctahedronGeometry(5.445, 0)
    },
    [NodeId.HECHIZOS]: {
        color: 0x00f0ff,
        emissive: new THREE.Color(0x0088ff).multiplyScalar(11.25),
        geom: new THREE.IcosahedronGeometry(3.795, 0),
        shellGeom: new THREE.IcosahedronGeometry(5.445, 0)
    },
    [NodeId.RUNAS]: {
        color: 0xffffff,
        emissive: new THREE.Color(0x88ccff).multiplyScalar(11.25),
        geom: new THREE.IcosahedronGeometry(3.465, 0),
        shellGeom: new THREE.IcosahedronGeometry(5.115, 0)
    },
    [NodeId.HABILIDADES]: {
        color: 0xe000ff,
        emissive: new THREE.Color(0x8800ff).multiplyScalar(11.25),
        geom: new THREE.DodecahedronGeometry(3.795, 0),
        shellGeom: new THREE.DodecahedronGeometry(5.445, 0)
    },
    [NodeId.FICHAS]: {
        color: 0x00ff88,
        emissive: new THREE.Color(0x00aa33).multiplyScalar(11.25),
        geom: new THREE.ConeGeometry(3.465, 6.93, 4),
        shellGeom: new THREE.ConeGeometry(5.115, 8.58, 4)
    },
    [NodeId.INVENTARIO]: {
        color: 0xff3344,
        emissive: new THREE.Color(0xcc0011).multiplyScalar(11.25),
        geom: new THREE.BoxGeometry(3.96, 3.96, 3.96),
        shellGeom: new THREE.BoxGeometry(5.61, 5.61, 5.61)
    }
};
