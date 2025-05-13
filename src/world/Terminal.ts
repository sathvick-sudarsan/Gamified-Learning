import * as THREE from "three";

export class Terminal {
  public mesh: THREE.Group;
  private box = new THREE.Box3();

  constructor(scene: THREE.Scene) {
    this.mesh = new THREE.Group();

    /* ---------- base ---------- */
    const baseGeo = new THREE.BoxGeometry(1.2, 0.6, 0.8);
    const baseMat = new THREE.MeshStandardMaterial({ color: "#141414" });
    const base = new THREE.Mesh(baseGeo, baseMat);
    this.mesh.add(base);

    /* ---------- screen ---------- */
    const screenGeo = new THREE.PlaneGeometry(1, 0.6);
    const screenMat = new THREE.MeshBasicMaterial({ color: "#00e5ff", opacity: 0.9, transparent: true });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 0.7, -0.41);
    this.mesh.add(screen);

    /* ---------- subtle glow (halo) ---------- */
    const haloGeo = new THREE.PlaneGeometry(1.1, 0.7);
    const haloMat = new THREE.MeshBasicMaterial({ color: "#00e5ff", opacity: 0.2, transparent: true });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.copy(screen.position).setZ(-0.42);
    this.mesh.add(halo);

    /* ---------- positioning ---------- */
    this.mesh.position.set(0, 0.3, 0);          // center of room
    scene.add(this.mesh);
  }

  /** AABB check with small margin */
  intersects(point: THREE.Vector3) {
    this.box.setFromObject(this.mesh);
    return this.box.expandByScalar(0.3).containsPoint(point);
  }
}
