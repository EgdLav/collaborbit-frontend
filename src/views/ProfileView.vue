<script setup lang="ts">
import { ref } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const user = ref<any>(null)

async function back() {
  if (document.referrer) {
    router.back()
  } else {
    await router.push('/find-coworkers')
  }
}

async function openChat() {
  await router.push(`/chat/${user.value.id}`)
}

async function getProfile() {
  const res = await $fetch(`/users/${route.params.id}`, 'get')
  user.value = res?.data?.user ?? null
}

getProfile()
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-6">

    <!-- loading -->
    <div v-if="!user" class="card p-10 flex items-center justify-center">
      <p class="prompt">loading<span class="animate-pulse">…</span></p>
    </div>

    <template v-else>

      <!-- HEADER CARD — identity block -->
      <section class="card p-5">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">

          <!-- avatar -->
          <div class="flex-none">
            <img
              v-if="user.avatar"
              :src="user.avatar"
              :alt="user.first_name"
              class="h-20 w-20 rounded-[14px] border border-[color:var(--border)] object-cover"
            />
            <span
              v-else
              class="flex h-20 w-20 items-center justify-center rounded-[14px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] text-2xl font-semibold text-[color:var(--text-1)]"
            >
              {{ user.first_name?.charAt(0) }}
            </span>
          </div>

          <!-- name + meta -->
          <div class="flex-1 min-w-0">
            <p class="prompt"><b>user</b> / profile</p>
            <h1 class="mt-1 text-xl font-semibold">
              {{ user.first_name }} {{ user.last_name }}
            </h1>

            <div class="mt-2 flex flex-wrap items-center gap-2">
              <span class="kbd text-xs">{{ user.department ?? 'No department' }}</span>
            </div>

            <p
              v-if="user.bio"
              class="mt-3 text-sm text-[color:var(--text-1)] leading-relaxed"
            >
              {{ user.bio }}
            </p>
            <p v-else class="mt-3 text-sm text-[color:var(--text-2)] italic">
              No bio yet.
            </p>
          </div>
        </div>

        <!-- actions -->
        <div class="mt-4 flex flex-wrap items-center gap-2 border-t border-[color:var(--border)] pt-4">
          <button
            class="btn btn-primary h-9 px-3 py-0 text-sm"
            type="button"
            @click="openChat"
          >
            Message
          </button>
          <button
            class="btn btn-ghost h-9 px-3 py-0 text-sm"
            type="button"
            @click="back"
          >
            ← Back
          </button>
        </div>
      </section>

      <!-- STATS -->
      <section class="mt-4 grid grid-cols-3 gap-3">
        <div class="card p-4 flex flex-col gap-1">
          <p class="text-xs text-[color:var(--text-2)]">Workspaces</p>
          <p class="text-2xl font-semibold">{{ user.statistics?.workspaces ?? 0 }}</p>
        </div>
        <div class="card p-4 flex flex-col gap-1">
          <p class="text-xs text-[color:var(--text-2)]">Tasks executed</p>
          <p class="text-2xl font-semibold">{{ user.statistics?.tasks_executed ?? 0 }}</p>
        </div>
        <div class="card p-4 flex flex-col gap-1">
          <p class="text-xs text-[color:var(--text-2)]">Chats</p>
          <p class="text-2xl font-semibold">{{ user.statistics?.chats ?? 0 }}</p>
        </div>
      </section>

      <!-- SHARED WORKSPACES -->
      <section class="mt-4 card p-4" v-if="user.shared_workspaces?.length">
        <h2 class="text-sm font-semibold">Shared workspaces</h2>
        <div class="mt-3 flex flex-wrap gap-2">
          <router-link
            v-for="ws in user.shared_workspaces"
            :key="ws.id"
            :to="'/workspace/' + ws.id"
            class="kbd text-xs hover:border-[rgb(var(--accent-rgb)/0.4)] transition"
          >
            # {{ ws.name }}
          </router-link>
        </div>
      </section>

    </template>
  </main>
</template>

<style scoped></style>
