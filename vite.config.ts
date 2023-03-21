import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  /** 代理配置/端口配置 */
  server: {
    port: 1011,
    host: '0.0.0.0',
    cors: true
  }
})
