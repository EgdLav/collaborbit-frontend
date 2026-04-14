import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/IndexView.vue'),
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/verify-email',
      component: () => import('@/views/VerifyEmail.vue'),
    },
    {
      path: '/chat',
      component: () => import('@/views/ChatView.vue'),
    },
    {
      path: '/my_profile',
      component: () => import('@/views/MyProfileView.vue'),
    },
    {
      path: '/profile',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/tasks',
      component: () => import('@/views/TasksView.vue'),
    },
  ],
})


