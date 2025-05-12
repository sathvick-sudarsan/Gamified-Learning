export interface Mission {
    id: string;
    title: string;
    prompt: string;
    starterCode: string;
    tests: string[];   // pytest‑style assertions for later
    timeLimit: number; // seconds
    reward: string;
  }
  