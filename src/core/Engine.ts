import * as THREE from "three";

export class Engine {
  // public so other classes can check elapsed time
  public clock: THREE.Clock;

  // internal objects
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  constructor(private canvas: HTMLCanvasElement) {
    /* ---------- Scene & Camera ---------- */
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 5);

    /* ---------- Renderer ---------- */
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000a11); // dark‑teal background

    /* ---------- Lights ---------- */
    const ambient = new THREE.AmbientLight(0x404040, 1.5);
    this.scene.add(ambient);

    const dir = new THREE.DirectionalLight(0x77ffff, 1.2);
    dir.position.set(5, 10, 2);
    this.scene.add(dir);

    /* ---------- Clock ---------- */
    this.clock = new THREE.Clock();

    /* ---------- Events & Start Loop ---------- */
    window.addEventListener("resize", this.onResize);
    this.animate();
  }

  /* ========== Public helpers ========== */
  getScene(): THREE.Scene {
    return this.scene;
  }

  /* ========== Private internals ========== */
  private animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  private onResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}
