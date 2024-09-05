import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue
        isCustomElement: (tag) =>
        tag.startsWith('mlibre-')
      },
    },
  })],
  
})
