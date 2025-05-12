import * as THREE from "three";
import { Input } from "./Input";

export class Player {
  private mesh: THREE.Mesh;
  private speed = 5;

  constructor(scene: THREE.Scene, private input: Input) {
    const geo = new THREE.BoxGeometry(1, 1.8, 1);
    const mat = new THREE.MeshLambertMaterial({ color: "#4d7a36" });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.set(0, 0.9, 0);
    scene.add(this.mesh);
  }

  update(dt: number) {
    const dir = new THREE.Vector3(
      (this.input.right ? 1 : 0) - (this.input.left ? 1 : 0),
      0,
      (this.input.backward ? 1 : 0) - (this.input.forward ? 1 : 0)
    ).normalize();
    this.mesh.translateX(dir.x * this.speed * dt);
    this.mesh.translateZ(dir.z * this.speed * dt);
  }

  get position() {
    return this.mesh.position;
  }
}
