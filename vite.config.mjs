import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist", // Cartella di output per il build
    assetsDir: "assets", // Cartella in cui Vite metterà le risorse statiche nella build (es. immagini, CSS)
  },
  base: "/accessibility-dev/",
});
