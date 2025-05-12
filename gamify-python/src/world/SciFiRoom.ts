import * as THREE from "three";

function neon(color: string) {
  return new THREE.MeshBasicMaterial({ color, toneMapped: false });
}

export class SciFiRoom {
  /** builds a 20×20×6 room with glowing cyan wall strips */
  constructor(scene: THREE.Scene) {
    const FLOOR_SIZE = 20;
    const WALL_H = 6;
    const half = FLOOR_SIZE / 2;

    /* ---------- floor ---------- */
    const floorMat = new THREE.MeshStandardMaterial({ color: "#0e171e" });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE), floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    /* ---------- ceiling ---------- */
    const ceil = floor.clone();
    ceil.position.y = WALL_H;
    ceil.material = new THREE.MeshStandardMaterial({ color: "#081116" });
    ceil.rotation.x = Math.PI / 2;
    scene.add(ceil);

    /* ---------- walls ---------- */
    const wallMat = new THREE.MeshStandardMaterial({ color: "#111c23" });
    const wallGeo = new THREE.BoxGeometry(FLOOR_SIZE, WALL_H, 0.3);
    const back = new THREE.Mesh(wallGeo, wallMat);
    back.position.set(0, WALL_H / 2, -half);
    scene.add(back);

    const front = back.clone();
    front.position.z = half;
    scene.add(front);

    const sideGeo = new THREE.BoxGeometry(0.3, WALL_H, FLOOR_SIZE);
    const left = new THREE.Mesh(sideGeo, wallMat);
    left.position.set(-half, WALL_H / 2, 0);
    scene.add(left);

    const right = left.clone();
    right.position.x = half;
    scene.add(right);

    /* ---------- neon wall strips ---------- */
    const stripGeo = new THREE.BoxGeometry(FLOOR_SIZE, 0.15, 0.05);
    const stripMat = neon("#00e5ff");
    for (const z of [-half + 0.02, half - 0.02]) {
      const strip = new THREE.Mesh(stripGeo, stripMat);
      strip.position.set(0, WALL_H * 0.66, z + (z < 0 ? 0.16 : -0.16));
      scene.add(strip);
    }
    const vStripGeo = new THREE.BoxGeometry(0.05, WALL_H * 0.66, 0.15);
    for (const x of [-half + 0.02, half - 0.02]) {
      const vStrip = new THREE.Mesh(vStripGeo, stripMat);
      vStrip.position.set(x + (x < 0 ? 0.16 : -0.16), WALL_H * 0.33, 0);
      scene.add(vStrip);
    }

    /* ---------- soft fog ---------- */
    scene.fog = new THREE.Fog("#000a11", 25, 40);
  }
}
