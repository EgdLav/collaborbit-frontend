import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/IndexView.vue'),
      meta: { title: 'Home' },
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue'),
      meta: { title: 'Login' },
    },
    {
      path: '/register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { title: 'Register' },
    },
    {
      path: '/verify-email',
      component: () => import('@/views/VerifyEmailView.vue'),
      meta: { title: 'Email Verification' },
    },
    {
      path: '/find-coworkers',
      component: () => import('@/views/CoworkersFindView.vue'),
      meta: { title: 'Find Coworkers' },
    },
    {
      path: '/workspace-create',
      component: () => import('@/views/WorkspaceCreate.vue'),
      meta: { title: 'Create Workspace' },
    },
    {
      path: '/workspace/:id',
      component: () => import('@/views/WorkspaceView.vue'),
      meta: { title: 'Workspace' },
    },
    {
      path: '/workspaces',
      component: () => import('@/views/WorkspacesView.vue'),
      meta: { title: 'Workspaces' },
    },
    {
      path: '/workspace-settings/:id',
      component: () => import('@/views/WorkspaceSettings.vue'),
      meta: { title: 'Workspace Settings' },
    },
    {
      path: '/create-task/:workspace_id/:category_id',
      component: () => import('@/views/TasksCreate.vue'),
      meta: { title: 'Task Creating' },
    },
    {
      path: '/invites',
      component: () => import('@/views/Invites.vue'),
      meta: { title: 'Invitations' },
    },
    {
      path: '/chat/:user_id',
      component: () => import('@/views/ChatView.vue'),
      meta: { title: 'Chat' },
    },
    {
      path: '/chats',
      component: () => import('@/views/ChatsView.vue'),
      meta: { title: 'Chats' },
    },
    {
      path: '/workspace/:workspace_id/chat',
      component: () => import('@/views/ChatView.vue'),
      meta: { title: 'Workspace Chat' },
    },
    {
      path: '/my-profile',
      component: () => import('@/views/MyProfileView.vue'),
      meta: { title: 'My Profile' },
    },
    {
      path: '/profile/:id',
      component: () => import('@/views/ProfileView.vue'),
      meta: { title: 'Profile' },
    },
    {
      path: '/workspace/:workspace_id/category/:category_id/task/:id',
      component: () => import('@/views/TaskView.vue'),
      meta: { title: 'Task Viewing' },
    },
    {
      path: '/workspace/:workspace_id/category/:category_id/task/:id/update',
      component: () => import('@/views/TaskUpdate.vue'),
      meta: { title: 'Task Updating' },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFound.vue'),
      meta: { title: 'Not Found' },
    },
  ],
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · Collaborbit` : 'Collaborbit'
})
