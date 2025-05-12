import { defineConfig } from "vite";
import string from "vite-plugin-string";

export default defineConfig({
  base: "/Gamified-Learning/",   // <‑‑ GitHub Pages sub‑path
  plugins: [string()],
  server: { port: 5173 },
});
