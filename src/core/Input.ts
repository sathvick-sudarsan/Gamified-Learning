export class Input {
  forward = false;
  backward = false;
  left = false;
  right = false;
  private _interact = false;

  constructor() {
    window.addEventListener("keydown", (e) => this.on(e, true));
    window.addEventListener("keyup",   (e) => this.on(e, false));
  }

  get interact(){ return this._interact; }
  clearInteract(){ this._interact = false; }

  private on(e: KeyboardEvent, down: boolean){
    switch(e.key.toLowerCase()){
      case "w":case "arrowup":    this.forward  = down;break;
      case "s":case "arrowdown":  this.backward = down;break;
      case "a":case "arrowleft":  this.left     = down;break;
      case "d":case "arrowright": this.right    = down;break;
      case "e":
        if(down) this._interact = true;          // single edge
        break;
    }
  }
}
