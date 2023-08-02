import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const vuefirePkg = JSON.parse(
  readFileSync(resolve(__dirname, 'node_modules/vuefire/package.json'), 'utf-8')
)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  define: {
    __VUEFIRE_VERSION__: JSON.stringify(vuefirePkg.version),
  },
})
