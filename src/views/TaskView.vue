<script setup lang="ts">
import { ref } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.ts'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const task = ref<any>(null)

function formatDate(d: string | null) {
  console.log(d)
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function isOverdue(d: string | null) {
  if (!d) return false
  return new Date(d) < new Date()
}

function fileName(path: string) {
  return path.split('/').pop() ?? path
}

function fileExt(path: string) {
  return path.split('.').pop()?.toUpperCase() ?? 'FILE'
}

async function getTask() {
  const res = await $fetch(
    `/workspaces/${route.params.workspace_id}/categories/${route.params.category_id}/tasks/${route.params.id}`,
    'get',
  )
  task.value = res?.data?.task ?? null
}

getTask()
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-6">

    <div v-if="!task" class="card p-10 flex items-center justify-center">
      <p class="prompt">loading<span class="animate-pulse">…</span></p>
    </div>

    <template v-else>

      <!-- HEADER -->
      <section class="card p-5">
        <div class="mb-4 flex flex-wrap items-center gap-2">
          <div class="flex items-center gap-2 rounded-full border border-[color:rgb(var(--accent-rgb)/0.28)] bg-[color:rgb(var(--accent-rgb)/0.06)] px-3 py-1.5">
            <span class="text-xs text-[color:rgb(var(--accent-rgb)/0.8)]">WORKSPACE:</span>
            <span class="text-sm font-medium">{{ task.workspace?.name }}</span>
          </div>
          <span class="text-xs text-[color:var(--text-2)]">→</span>
          <div class="flex items-center gap-2 rounded-full border border-[color:rgb(var(--accent-rgb)/0.28)] bg-[color:rgb(var(--accent-rgb)/0.06)] px-3 py-1.5">
            <span class="text-xs text-[color:rgb(var(--accent-rgb)/0.8)]">CATEGORY:</span>
            <span class="text-sm font-medium">{{ task.category?.name }}</span>
          </div>
        </div>

        <p class="prompt"><b>task</b> / view</p>
        <h1 class="mt-1 text-xl font-semibold">{{ task.name }}</h1>

        <p
          v-if="task.description"
          class="mt-3 text-sm text-[color:var(--text-1)] leading-relaxed whitespace-pre-wrap"
        >
          {{ task.description }}
        </p>
        <p v-else class="mt-3 text-sm text-[color:var(--text-2)] italic">No description.</p>

        <!-- actions -->
        <div class="mt-5 flex flex-wrap items-center gap-2 border-t border-[color:var(--border)] pt-4">
          <router-link
            v-if="task.creator_id == auth.id || task.executor_id == auth.id || task.workspace?.is_owner"
            class="btn btn-primary h-9 px-3 py-0 text-sm"
            :to="`/update-task/${task.workspace_id}/${task.category_id}/${task.id}`"
          >
            Edit task
          </router-link>
          <button
            class="btn btn-ghost h-9 px-3 py-0 text-sm"
            type="button"
            @click="router.back()"
          >
            ← Back
          </button>
        </div>
      </section>

      <!-- META GRID -->
      <section class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

        <div class="card p-3 flex flex-col gap-1">
          <p class="text-xs text-[color:var(--text-2)]">Due date</p>
          <p
            class="text-sm font-semibold"
            :class="isOverdue(task.due_date) ? 'text-[color:var(--danger)]' : ''"
          >
            {{ formatDate(task.due_date) }}
            <span v-if="isOverdue(task.due_date)" class="text-xs"> ⚠</span>
          </p>
        </div>

        <div class="card p-3 flex flex-col gap-1">
          <p class="text-xs text-[color:var(--text-2)]">Created</p>
          <p class="text-sm font-semibold">{{ formatDate(task.created_at) }}</p>
        </div>

        <div class="card p-3 flex flex-col gap-1">
          <p class="text-xs text-[color:var(--text-2)]">Creator</p>
          <div class="flex items-center gap-2 mt-0.5">
            <img
              v-if="task.creator?.avatar"
              :src="task.creator.avatar"
              class="h-5 w-5 rounded-[6px] border border-[color:var(--border)] object-cover flex-none"
            />
            <p class="text-sm font-semibold truncate">
              {{ task.creator?.first_name ?? '—' }}
            </p>
          </div>
        </div>

        <div class="card p-3 flex flex-col gap-1">
          <p class="text-xs text-[color:var(--text-2)]">Executor</p>
          <div class="flex items-center gap-2 mt-0.5">
            <img
              v-if="task.executor?.avatar"
              :src="task.executor.avatar"
              class="h-5 w-5 rounded-[6px] border border-[color:var(--border)] object-cover flex-none"
            />
            <p class="text-sm font-semibold truncate">
              {{ task.executor?.first_name ?? '—' }}
            </p>
          </div>
        </div>

      </section>

      <!-- PREVIEW IMAGE -->
      <section
        v-if="task.preview && task.preview !== 'default.png'"
        class="mt-4 card p-4"
      >
        <h2 class="text-sm font-semibold">Preview</h2>
        <img
          :src="task.preview"
          :alt="task.name"
          class="mt-3 w-full rounded-[10px] border border-[color:var(--border)] object-cover max-h-[400px]"
        />
      </section>

      <!-- FILES -->
      <section v-if="task.files?.length" class="mt-4 card p-4">
        <h2 class="text-sm font-semibold">Files <span class="text-xs text-[color:var(--text-2)]">{{ task.files.length }}</span></h2>
        <div class="mt-3 flex flex-col gap-2">
          <a
            v-for="(file, i) in task.files"
            :key="i"
            :href="file"
            target="_blank"
            download
            class="flex items-center gap-3 rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(255,255,255,0.02)] px-3 py-2 transition hover:border-[rgb(var(--accent-rgb)/0.35)] hover:bg-[rgba(255,255,255,0.035)]"
          >
            <span class="kbd text-[10px] flex-none">{{ fileExt(file) }}</span>
            <span class="text-sm truncate text-[color:var(--text-1)]">{{ fileName(file) }}</span>
            <span class="ml-auto text-xs text-[color:var(--text-2)] flex-none">↓ download</span>
          </a>
        </div>
      </section>

    </template>
  </main>
</template>

<style scoped></style>
