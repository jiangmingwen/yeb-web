declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<any, any, any>
  export default component
}

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string
  }
}
