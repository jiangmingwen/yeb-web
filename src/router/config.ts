import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout.vue'
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue'),
    name: 'Login'
  },
  {
    path: '',
    component: Layout,
    children: [{
      path: '/welcome',
      component: () => import('@/pages/welcome/index.vue'),
      name: 'Welcome'
    }]
  },

]

export default routes
