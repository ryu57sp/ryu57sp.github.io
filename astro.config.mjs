// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
// https://astro.build/config

export default defineConfig({
  site: 'https://ryu57sp.github.io/',
  base: '/',
  vite: {
    plugins: [tailwindcss()],
    buildEnd() {
      fs.writeFileSync(path.resolve("docs", ".nojekyll"), "");
    },
  },
});
