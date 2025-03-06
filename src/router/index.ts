import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Cadernos',
      component: () => import('@/views/BooksView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/caderno/:slug',
      name: 'Caderno',
      component: () => import('@/views/BookContentView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const store = useStore()
  const token = !!store.getters['auth/token']
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  next(true)
})

export default router
