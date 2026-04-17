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
      component: () => import('@/views/VerifyEmailView.vue'),
    },
    {
      path: '/find-coworkers',
      component: () => import('@/views/CoworkersFindView.vue'),
    },
    {
      path: '/workspace-create',
      component: () => import('@/views/WorkspaceCreate.vue'),
    },
    {
      path: '/workspace/:id',
      component: () => import('@/views/WorkspaceView.vue'),
    },
    {
      path: '/workspaces',
      component: () => import('@/views/WorkspacesView.vue'),
    },
    {
      path: '/workspace-settings/:id',
      component: () => import('@/views/WorkspaceSettings.vue'),
    },
    {
      path: '/invites',
      component: () => import('@/views/Invites.vue'),
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


