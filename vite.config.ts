import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  build: {
    outDir: "dist",
    lib: {
      entry: {
        "mlibre-point-map": "src/components/mlibre-point-map/mlibre-point-map.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      /**
       * To keep components standalone, Lit will not be included in the bundle.
       * Instead, lit may be provided by the consuming project as a dependency.
       * Similarly, maplibre-gl should be provided by the consuming project.
       * Externalizing maplibre-gl can significantly reduce bundle size and build time.
       * If an application is running in an environment where maplibre-gl is already loaded
       * (e.g., a larger application that includes maplibre-gl), externalizing it can avoid redundant loading
       */
      external: [/^lit/, /^maplibre-gl/],
      // Could also be simplified with https://www.npmjs.com/package/rollup-plugin-node-externals
    },
  },
  server: {
    open: false,
  },
});
