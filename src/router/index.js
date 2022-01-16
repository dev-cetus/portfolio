import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/Contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: {
      title: 'Contact'
    }
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      title: 'Search'
    }
  }
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = "Cetus - Portfolio - " + to.meta.title
  next()
})

export default router
