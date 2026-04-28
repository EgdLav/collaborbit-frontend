<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore.ts'
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { $fetch } from '@/fetch/fetch.ts'
import { useRoute, useRouter } from 'vue-router'

const auth = useAuthStore()

const token = computed(() => auth.token)
const avatar = computed(() => auth.avatar)

const route = useRoute()
const router = useRouter()

const showMenu = ref(false)
const menuRef = ref(null)

onClickOutside(menuRef, () => {
  showMenu.value = false
})

async function logout() {
  await $fetch('/logout', 'post')
  auth.logout()
  await router.push('/login')
}
</script>

<template>
  <header class="navbar">
    <div class="mx-auto max-w-6xl px-4 py-3">
      <div class="flex items-center justify-between gap-4">
        <!-- LOGO -->
        <router-link class="flex items-center gap-2" to="/workspaces">
          <span
            class="inline-flex h-8 w-8 items-center justify-center rounded-[10px] border border-[color:var(--border)] bg-[color:var(--panel)] font-mono text-xs"
          >
            CO
          </span>
          <span class="text-sm font-semibold tracking-wide">CollabOrbit</span>
        </router-link>

        <nav class="hidden items-center gap-3 text-sm sm:flex">
          <router-link class="link" to="/tasks">Tasks</router-link>
          <a class="link" href="./chat">Chat</a>
          <a class="link" href="./my_profile">Settings</a>
          <router-link
            class="link"
            to="/find-coworkers"
          >
            Find coworkers
          </router-link>
        </nav>

        <!-- RIGHT -->
        <div class="flex items-center gap-2 relative">
          <!-- NOT AUTH -->
          <template v-if="!token">
            <router-link
              class="btn"
              :class="route.path == '/login' ? 'btn-primary' : 'btn-ghost'"
              to="/login"
            >
              Login
            </router-link>

            <router-link
              class="btn"
              :class="route.path == '/register' ? 'btn-primary' : 'btn-ghost'"
              to="/register"
            >
              Register
            </router-link>
          </template>

          <!-- AUTH -->
          <template v-else>
            <div class="relative" ref="menuRef">
              <img
                @click="showMenu = !showMenu"
                :src="avatar || 'https://i.pravatar.cc/100'"
                class="inline-flex h-12 w-12 flex-none items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] font-semibold text-sm text-[color:var(--text-1)]"
              />
              <transition name="fade">
                <div
                  v-if="showMenu"
                  class="menu flex flex-col gap-2 bg-white text-gray-800 p-3 rounded-lg shadow-lg border border-gray-200"
                >
                  <router-link to="/my_profile" class="btn btn-ghost" @click="showMenu = false">
                    Profile
                  </router-link>

                  <div class="divider"></div>

                  <button @click="logout" class="btn btn-danger">Logout</button>
                </div>
              </transition>
            </div>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
