import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'Home'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title ? document.title = to.meta.title : document.title = 'Cetus'
  next()
})

export default router
