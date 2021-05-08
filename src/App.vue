<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import http from './utils/http'
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    http
      .post('/login', {
        password: '123',
        username: 'admin',
        code: 'e263'
      })
      .then((res) => {
        console.log(res)
      })
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
