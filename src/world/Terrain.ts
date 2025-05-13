import * as THREE from "three";

/* tiny deterministic pseudo‑noise (hash) */
function noise2D(x:number,y:number){
  const n = Math.sin(x*12.9898 + y*78.233)*43758.5453;
  return n - Math.floor(n);
}

export class Terrain{
  constructor(scene:THREE.Scene){
    const size=40, seg=120;
    const geo = new THREE.PlaneGeometry(size,size,seg,seg);
    const pos = geo.attributes.position as THREE.BufferAttribute;

    for(let i=0;i<pos.count;i++){
      const x = pos.getX(i), y = pos.getY(i);
      const h = (noise2D(x*0.3,y*0.3)-0.5)*4; // height ±2
      pos.setZ(i, h);
    }
    geo.computeVertexNormals();

    const mat = new THREE.MeshLambertMaterial({color:"#1b2835",side:THREE.DoubleSide});
    const mesh = new THREE.Mesh(geo,mat);
    mesh.rotation.x = -Math.PI/2;
    scene.add(mesh);
  }
}
