<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore.ts'
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { $fetch } from '@/fetch/fetch.ts'
import { useRoute, useRouter } from 'vue-router'

const auth = useAuthStore()

const token  = computed(() => auth.token)
const avatar = computed(() => auth.avatar)

const route  = useRoute()
const router = useRouter()

const showMenu      = ref(false)
const menuRef       = ref(null)
const showMobileNav = ref(false)

onClickOutside(menuRef, () => { showMenu.value = false })

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
    <div class="mx-auto max-w-6xl px-4">
      <div class="flex h-14 items-center justify-between gap-4">

        <!-- Logo -->
        <router-link
          class="logo-link flex items-center gap-2 flex-shrink-0"
          to="/workspaces"
          @click="closeMobileNav"
        >
          <img src="/logo.svg" alt="CollabOrbit" class="h-7 w-7" />
          <span class="text-sm font-semibold text-[color:var(--text-0)] tracking-tight">
            CollabOrbit
          </span>
        </router-link>

        <!-- Desktop nav -->
        <nav v-if="token" class="hidden sm:flex items-center gap-1">
          <router-link class="nav-link" to="/workspaces">Workspaces</router-link>
          <router-link class="nav-link" to="/invites">Invites</router-link>
          <router-link class="nav-link" to="/chats">Chats</router-link>
          <router-link class="nav-link" to="/find-coworkers">Find coworkers</router-link>
        </nav>

        <!-- Right side -->
        <div class="flex items-center gap-2">

          <!-- Unauthenticated -->
          <template v-if="!token">
            <router-link
              class="btn btn-ghost text-sm"
              :class="{ 'btn-primary': route.path === '/login' }"
              to="/login"
            >Login</router-link>
            <router-link
              class="btn btn-primary text-sm"
              :class="{ 'btn-ghost': route.path !== '/register' }"
              to="/register"
            >Register</router-link>
          </template>

          <!-- Authenticated -->
          <template v-else>

            <!-- Hamburger (mobile) -->
            <button
              class="btn btn-ghost h-8 w-8 p-0 sm:hidden"
              type="button"
              :aria-label="showMobileNav ? 'Close menu' : 'Open menu'"
              @click="showMobileNav = !showMobileNav"
            >
              <span class="flex flex-col gap-[5px] items-center justify-center w-[14px]">
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

            <!-- Avatar + dropdown -->
            <div class="relative" ref="menuRef">
              <button
                class="flex h-8 w-8 items-center justify-center rounded-lg border border-[color:var(--border)] overflow-hidden hover:border-[color:var(--border-strong)] transition-colors duration-150 focus-visible:outline-none"
                type="button"
                :aria-label="showMenu ? 'Close account menu' : 'Open account menu'"
                @click="showMenu = !showMenu"
              >
                <img
                  :src="avatar || 'https://i.pravatar.cc/100'"
                  alt="Avatar"
                  class="h-full w-full object-cover"
                />
              </button>

              <transition name="fade">
                <div v-if="showMenu" class="menu">
                  <router-link
                    to="/my-profile"
                    class="menu-item"
                    @click="showMenu = false"
                  >
                    Profile
                  </router-link>
                  <div class="divider my-1"></div>
                  <button
                    class="menu-item danger"
                    @click="logout"
                  >
                    Sign out
                  </button>
                </div>
              </transition>
            </div>

          </template>
        </div>
      </div>

      <!-- Mobile nav drawer -->
      <transition name="mobile-nav">
        <nav
          v-if="token && showMobileNav"
          class="flex flex-col gap-0.5 border-t border-[color:var(--border)] py-2 sm:hidden"
        >
          <router-link class="menu-item" to="/workspaces"     @click="closeMobileNav">Workspaces</router-link>
          <router-link class="menu-item" to="/invites"        @click="closeMobileNav">Invites</router-link>
          <router-link class="menu-item" to="/chats"          @click="closeMobileNav">Chats</router-link>
          <router-link class="menu-item" to="/find-coworkers" @click="closeMobileNav">Find coworkers</router-link>
          <router-link class="menu-item" to="/tasks"          @click="closeMobileNav">Tasks</router-link>
        </nav>
      </transition>
    </div>
  </header>
</template>
