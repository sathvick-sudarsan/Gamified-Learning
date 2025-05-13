import "./styles/hud.css";
import {Engine} from "./core/Engine";
import {Input} from "./core/Input";
import {Player} from "./core/Player";
import {Terminal} from "./world/Terminal";
import { SciFiRoom } from "./world/SciFiRoom";
import {CodePanel} from "./ui/CodePanel";
import {linearSearch} from "./missions/linearsearch";

const canvas = document.querySelector<HTMLCanvasElement>("#app-canvas")!;
const eng = new Engine(canvas);

new SciFiRoom(eng.getScene());
const inp = new Input();
const ply = new Player(eng.getScene(), inp);
const term = new Terminal(eng.getScene());
const panel = new CodePanel();

let guiOpen=false;

function loop(){
  const dt = eng.clock.getDelta();
  ply.update(dt);

  if(term.intersects(ply.position) && inp.interact && !guiOpen){
    guiOpen=true; inp.clearInteract();
    panel.open(linearSearch.starterCode, linearSearch.tests, linearSearch.timeLimit)
         .then(pass=>{
           guiOpen=false;
           alert(pass?"🎉 Mission passed!":"💀 Mission failed");
         });
  }

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
