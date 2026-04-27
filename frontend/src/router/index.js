import { createRouter, createWebHistory } from 'vue-router'
import Home from "../module/task-manager/view/task-manager.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
