<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore.ts'
import { computed } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useRoute } from 'vue-router'

const auth = useAuthStore()
const token = computed(() => auth.token)
const route = useRoute()

async function logout() {
  await $fetch('/logout', 'post')
  auth.logout()
}
</script>

<template>
  <header class="navbar">
    <div class="mx-auto max-w-6xl px-4 py-3">
      <div class="flex items-center justify-between gap-4">
        <a class="flex items-center gap-2" href="./index.html" aria-label="CollabOrbit Home">
          <span
            class="inline-flex h-8 w-8 items-center justify-center rounded-[10px] border border-[color:var(--border)] bg-[color:var(--panel)] font-mono text-xs text-[color:var(--text-1)]"
          >
            CO
          </span>
          <span class="text-sm font-semibold tracking-wide">CollabOrbit</span>
          <span
            class="ml-2 hidden rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] px-2 py-1 text-xs text-[color:var(--text-2)] sm:inline"
          >
            tasks + chat
          </span>
        </a>

        <nav class="hidden items-center gap-3 text-sm sm:flex">
          <router-link class="link" to="/tasks">Tasks</router-link>
          <a class="link" href="./chat">Chat</a>
          <a class="link" href="./my_profile">Settings</a>
        </nav>

        <div class="flex items-center gap-2">
          <router-link
            v-if="!token"
            class="btn"
            :class="route.path == '/login' ? 'btn-primary' : 'btn-ghost'"
            to="/login"
            >Login</router-link>
          <router-link
            v-if="!token"
            class="btn"
            :class="route.path == '/register' ? 'btn-primary' : 'btn-ghost'"
            to="/register"
            >Register</router-link>
          <router-link
            v-if="token"
            class="btn"
            :class="route.path == '/find-coworkers' ? 'btn-primary' : 'btn-ghost'"
            to="/find-coworkers"
            >Find coworkers</router-link>
          <button v-if="token" class="btn btn-danger" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
