<script setup lang="ts">
import { computed, ref } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'

const workspaces = ref(null)
const filters = ref({
  search: '',
})
async function getWorkspaces() {
  const response = await $fetch('/workspaces', 'get', filters.value)
  workspaces.value = response.data
}

getWorkspaces()
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-4">
    <section class="card p-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="prompt"><b>workspace</b> / catalog</p>
          <h1 class="mt-1 text-lg font-semibold">Your Workspaces</h1>
          <p class="mt-1 text-sm text-[color:var(--text-1)]">
            Здесь собраны все пространства, где вы владелец или участник.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <input
            class="input h-9 w-[240px] px-3 py-0 text-sm"
            type="search"
            placeholder="Search workspace..."
            aria-label="Search workspaces"
            v-model="filters.search"
            @change="getWorkspaces"
          />
          <router-link class="btn btn-primary h-9 px-3 py-0 text-sm" to="./workspace-create"
            >Create workspace</router-link
          >
        </div>
      </div>
    </section>

    <section class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <article class="card p-4" v-for="workspace in workspaces" :key="workspace?.id">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-base font-semibold">{{ workspace?.name }}</p>
            <p class="mt-1 text-sm text-[color:var(--text-2)]">slug:{{ workspace?.description }}</p>
            <p class="mt-1 text-sm text-[color:var(--text-2)]">
              {{ workspace?.description }}
            </p>
          </div>
          <span class="badge"
            ><span class="badge-dot"></span
            >{{ workspace?.is_owner == true ? 'Owner' : 'Member' }}</span
          >
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-2 text-xs text-[color:var(--text-2)]">
          <span class="kbd">{{ workspace?.members.length }} members</span>
          <span class="kbd">{{ workspace?.tasks.length }} tasks</span>
        </div>
        <div class="mt-4 flex items-center gap-2">
          <router-link class="btn h-9 px-3 py-0 text-sm" :to="'/workspace/' + workspace?.id">Open</router-link>
          <router-link class="btn btn-ghost h-9 px-3 py-0 text-sm" :to="'/workspace-settings/' + workspace?.id"
            >Settings</router-link>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped></style>
