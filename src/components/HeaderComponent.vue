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
const showMobileNav = ref(false)

onClickOutside(menuRef, () => {
  showMenu.value = false
})

async function logout() {
  await $fetch('/logout', 'post')
  auth.logout()
  await router.push('/login')
}

function closeMobileNav() {
  showMobileNav.value = false
}
</script>

<template>
  <header class="navbar">
    <div class="mx-auto max-w-6xl px-4 py-3">
      <div class="flex items-center justify-between gap-4">

        <!-- LOGO -->
        <router-link class="logo-link flex items-center gap-2" to="/workspaces" @click="closeMobileNav">
          <span
            class="inline-flex h-8 w-8 items-center justify-center rounded-[10px] border border-[color:var(--border)] bg-[color:var(--panel)] font-mono text-xs"
          >
            CO
          </span>
          <span class="text-sm font-semibold tracking-wide">CollabOrbit</span>
        </router-link>

        <!-- DESKTOP NAV -->
        <nav class="hidden items-center gap-3 text-sm sm:flex" v-if="token">
          <router-link class="link" to="/workspaces">Workspaces</router-link>
          <router-link class="link" to="/invites">Invites</router-link>
          <router-link class="link" to="/chats">Chats</router-link>
          <router-link class="link" to="/find-coworkers">Find coworkers</router-link>
          <router-link class="link" to="/tasks">Tasks</router-link>
        </nav>

        <!-- RIGHT -->
        <div class="flex items-center gap-2">

          <!-- NOT AUTH -->
          <template v-if="!token">
            <router-link
              class="btn"
              :class="route.path === '/login' ? 'btn-primary' : 'btn-ghost'"
              to="/login"
            >Login</router-link>
            <router-link
              class="btn"
              :class="route.path === '/register' ? 'btn-primary' : 'btn-ghost'"
              to="/register"
            >Register</router-link>
          </template>

          <!-- AUTH -->
          <template v-else>
            <!-- hamburger — mobile only -->
            <button
              class="btn btn-ghost h-9 w-9 p-0 sm:hidden"
              type="button"
              :aria-label="showMobileNav ? 'Close menu' : 'Open menu'"
              @click="showMobileNav = !showMobileNav"
            >
              <span class="flex flex-col gap-[5px] items-center justify-center w-4">
                <span
                  class="block h-px w-full bg-[color:var(--text-1)] transition-all duration-200"
                  :class="showMobileNav ? 'rotate-45 translate-y-[6px]' : ''"
                />
                <span
                  class="block h-px w-full bg-[color:var(--text-1)] transition-all duration-200"
                  :class="showMobileNav ? 'opacity-0' : ''"
                />
                <span
                  class="block h-px w-full bg-[color:var(--text-1)] transition-all duration-200"
                  :class="showMobileNav ? '-rotate-45 -translate-y-[6px]' : ''"
                />
              </span>
            </button>

            <!-- avatar + dropdown -->
            <div class="relative" ref="menuRef">
              <img
                @click="showMenu = !showMenu"
                :src="avatar || 'https://i.pravatar.cc/100'"
                alt="Avatar"
                class="inline-flex h-9 w-9 flex-none cursor-pointer items-center justify-center rounded-[10px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] object-cover"
              />
              <transition name="fade">
                <div v-if="showMenu" class="menu">
                  <router-link to="/my-profile" class="menu-item text-center" @click="showMenu = false">
                    Profile
                  </router-link>
                  <div class="divider mt-2 mb-2"></div>
                  <button @click="logout" class="menu-item danger w-full text-center">Logout</button>
                </div>
              </transition>
            </div>
          </template>
        </div>
      </div>

      <!-- MOBILE NAV DRAWER -->
      <transition name="mobile-nav">
        <nav
          v-if="token && showMobileNav"
          class="mt-3 flex flex-col gap-1 border-t border-[color:var(--border)] pt-3 sm:hidden"
        >
          <router-link
            class="menu-item"
            to="/workspaces"
            @click="closeMobileNav"
          >Workspaces</router-link>
          <router-link
            class="menu-item"
            to="/invites"
            @click="closeMobileNav"
          >Invites</router-link>
          <router-link
            class="menu-item"
            to="/chats"
            @click="closeMobileNav"
          >Chats</router-link>
          <router-link
            class="menu-item"
            to="/find-coworkers"
            @click="closeMobileNav"
          >Find coworkers</router-link>
          <router-link
            class="menu-item"
            to="/tasks"
            @click="closeMobileNav"
          >Tasks</router-link>
        </nav>
      </transition>
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

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 0.18s ease;
}
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
