import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Porta del server di sviluppo
    open: true, // Apre automaticamente il browser
  },
  build: {
    outDir: "dist", // Cartella di output per il build
    assetsDir: "assets", // Cartella in cui Vite metterà le risorse statiche nella build (es. immagini, CSS)
    sourcemap: true, // Utile per il debug in produzione
  },
  base: "/accessibility-dev/", // Percorso base per l'app in produzione
});
