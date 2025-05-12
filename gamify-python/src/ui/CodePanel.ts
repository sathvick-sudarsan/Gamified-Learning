import * as monaco from "monaco-editor";

export class CodePanel{
  private root = document.getElementById("code-panel") as HTMLDivElement;
  private editor!: monaco.editor.IStandaloneCodeEditor;
  private py: any|null = null;
  private timer = 0;
  private resolver!: (ok:boolean)=>void;

  async open(starter:string, tests:string[], limit=60):Promise<boolean>{
    // show UI
    this.root.classList.add("show");

    // monaco
    if(!this.editor){
      this.editor = monaco.editor.create(this.root,{
        value:starter,language:"python",theme:"vs-dark",fontSize:14
      });
    }else this.editor.setValue(starter);

    // load pyodide once
    if(!this.py) await this.loadPyodide();

    // timer
    let t=limit;
    const timerEl = document.getElementById("timer")!;
    timerEl.textContent = `⏱ ${t}s`;
    this.timer = window.setInterval(()=>{
      t--;
      timerEl.textContent = `⏱ ${t}s`;
      if(t<=0) this.finish(false);
    },1000);

    // run handler
    (document.getElementById("run-btn")!).onclick = async ()=>{
      const src = this.editor.getValue()+"\n"+tests.join("\n");
      try{ await this.py.runPythonAsync(src); this.finish(true); }
      catch{ alert("❌ Tests failed – try again!"); }
    };

    return new Promise<boolean>(res=>this.resolver=res);
  }

  /* ---------------- helpers ---------------- */

  private finish(ok:boolean){
    clearInterval(this.timer);
    this.root.classList.remove("show");
    this.resolver(ok);
  }

  private async loadPyodide(){
    await new Promise<void>((ok,err)=>{
      const s=document.createElement("script");
      s.src="https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
      s.onload=()=>ok(); s.onerror=()=>err();
      document.head.appendChild(s);
    });
    // @ts-ignore
    this.py = await globalThis.loadPyodide();
  }
}
