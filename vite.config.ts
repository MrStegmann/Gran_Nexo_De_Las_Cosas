import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  // @ts-expect-error: vite-plugin-federation types are incompatible with module: nodenext
  federation({
    name: "gran-nexo-de-las-cosas",
    filename: "remoteEntry.js",
    exposes: {
      "./GranNexoDeLasCosas": "./src/App.tsx",
    },
    shared: ["react", "react-dom"],
  }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
