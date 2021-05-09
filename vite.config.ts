import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

/* 路径方法 */
const pathResolver = (pathStr: string): string => {
  return resolve(__dirname, '.', pathStr)
}

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
  resolve: {
    alias: {
      '@': pathResolver('./src')
    }
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true
      }
    }
  }
})
