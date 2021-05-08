import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  esbuild: {
    jsxInject: `import { h } from 'vue'`,
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "@/assets/styles/var.less";`
        },
        javascriptEnabled: true
      }
    }
  },
  server: {
    proxy: {
      '/login': {
        target: 'http://localhost:9000',
        changeOrigin: true
      }
    }
  }
})
