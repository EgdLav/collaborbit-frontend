<script setup lang="ts">
import { computed, ref } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useRoute, useRouter } from 'vue-router'
import { notify } from '@/services/notify.ts'
import BaseModal from '@/components/BaseModal.vue'
import { useAuthStore } from '@/stores/authStore.ts'

const auth = useAuthStore()

const workspace = ref({
  name: '',
  slug: '',
  description: '',
  members: [],
})
type DraggedTask = {
  task: {
    id: number
  }
  fromCategory: {
    id: number
  }
}
const route = useRoute()
const router = useRouter()
const showModal = ref(false)
const showDeleteModal = ref(false)
const draggedTask = ref<DraggedTask | null>(null)
const isDragging = ref(false)

async function back() {
  if (document.referrer) {
    router.back()
  } else {
    await router.push('/workspaces') // fallback page
  }
}
async function getWorkspace() {
  const response = await $fetch(`/workspaces/${route.params.id}`, 'get')
  workspace.value = response.data.workspace
}
async function createCategory(event: Event) {
  const form = event?.target as HTMLFormElement
  const response = await $fetch(
    `/workspaces/${route.params.id}/categories`,
    'post',
    new FormData(form),
  )
  workspace.value = response.data.workspace
  if (!response.error) {
    notify(response.message, 'success')
    showModal.value = false
    await getWorkspace()
  }
}

// changing task category
async function onDragStart(event: DragEvent, task: any, category: any) {
  isDragging.value = true
  draggedTask.value = {
    task,
    fromCategory: category,
  }
}
function onDragEnd() {
  isDragging.value = false
  draggedTask.value = null
}
async function onDrop(targetCategory: any) {
  if (!draggedTask.value) return

  const { task, fromCategory } = draggedTask.value

  if (fromCategory.id === targetCategory.id) return

  const response = await $fetch(
    `/workspaces/${route.params.id}/categories/${fromCategory.id}/tasks/${task.id}/category`,
    'PATCH',
    { category_id: targetCategory.id },
  )

  if (!response.error) {
    notify(response.message, 'success')
    await getWorkspace()
  }

  draggedTask.value = null
}

getWorkspace()

function formatDate(d: string | null) {
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
</script>

<template>
  <main class="mx-auto max-w-[1400px] px-4 py-4">
    <section class="card p-4">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div class="flex justify-between">
            <p class="prompt"><b>workspace</b> / {{ workspace.name }}</p>
          </div>
          <h1 class="mt-1 text-lg font-semibold">{{ workspace.name }}</h1>
          <p class="mt-1 text-sm text-[color:var(--text-1)]">
            {{ workspace.description }}
          </p>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs text-[color:var(--text-2)] sm:grid-cols-4">
          <span class="kbd justify-center">{{ workspace?.members?.length ?? 0 }} coworkers</span>
          <span class="kbd justify-center">{{ workspace?.tasks?.length ?? 0 }} tasks</span>
        </div>
        <div class="flex">
          <button class="btn btn-ghost h-9 px-3 py-0 text-sm" type="button" @click="back">
            ← Back
          </button>
        </div>
      </div>
    </section>

    <section class="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-4">
      <aside class="card p-4 xl:col-span-1">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold">Coworkers</h2>
          <router-link
            class="btn btn-ghost h-8 px-2 py-0 text-xs"
            type="button"
            to="/find-coworkers"
            >Invite</router-link
          >
        </div>
        <div class="mt-3 space-y-2">
          <article
            class="rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-2)] px-3 py-2"
            v-for="member in workspace?.members"
            :key="member?.id"
          >
            <p class="text-sm font-medium">{{ member?.first_name }}</p>
            <p class="text-xs text-[color:var(--text-2)]">
              {{ member?.department }}
              {{ member?.id == workspace?.owner?.id ? '• Owner' : '' }}
            </p>
          </article>
        </div>
      </aside>

      <section class="xl:col-span-3">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <section
            :class="[
              'rounded-xl border transition-all duration-150',
              isDragging && draggedTask?.fromCategory?.id !== category.id
                ? 'border-[rgba(16,185,129,0.4)] bg-[rgba(16,185,129,0.04)] scale-[1.01]'
                : 'border-[color:var(--border)] bg-[color:var(--bg-1)]',
            ]"
            v-for="category in workspace?.categories"
            :key="category?.id"
            @dragover.prevent
            @drop="onDrop(category)"
          >
            <header class="border-b border-[color:var(--border)] px-3 py-3">
              <p class="text-sm font-semibold">
                {{ category.name }}
                <span class="text-xs text-[color:var(--text-2)]">{{ category.tasks.length }}</span>
              </p>
            </header>
            <div class="space-y-2 p-3">
              <router-link
                :to="
                  '/workspace/' + workspace?.id + '/category/' + category.id + '/task/' + task.id
                "
                class="task-card block"
                v-for="task in category?.tasks"
                :key="task?.id"
                draggable="true"
                @dragstart="onDragStart($event, task, category)"
                @dragend="onDragEnd"
              >
                <!-- top row: name + badges -->
                <div class="flex items-start justify-between gap-2">
                  <p class="text-sm font-semibold leading-snug">{{ task.name }}</p>
                  <div class="flex flex-shrink-0 gap-1 pt-0.5">
                    <span
                      v-if="String(task.creator.id) === String(auth.id)"
                      class="task-badge task-badge--creator"
                      >CREATOR</span
                    >
                    <span
                      v-if="String(task.executor.id) === String(auth.id)"
                      class="task-badge task-badge--executor"
                      >EXECUTOR</span
                    >
                  </div>
                </div>
                <p class="mt-1 text-xs text-[color:var(--text-2)] line-clamp-1">
                  {{ task.description }}
                </p>
                <p class="mt-2 text-xs text-[color:var(--text-2)]">
                  {{ task.executor?.first_name }} ·
                  <span :class="isOverdue(task.due_date) ? 'text-[color:var(--danger)]' : ''">
                    {{ formatDate(task.due_date) }}{{ isOverdue(task.due_date) ? ' ⚠' : '' }}
                  </span>
                </p>
              </router-link>
              <div class="rounded-lg border border-dashed border-[color:var(--border)]">
                <router-link
                  :to="'/create-task/' + workspace?.id + '/' + category?.id"
                  class="btn btn-ghost w-full text-center px-3 py-2 text-sm"
                  >+ Add task</router-link
                >
              </div>
            </div>
          </section>
          <button
            v-if="workspace?.is_owner"
            class="btn btn-primary rounded-xl border-dashed min-h-[120px] text-sm font-medium"
            @click="showModal = true"
          >
            + Add category
          </button>
        </div>
      </section>
      <BaseModal v-model="showModal">
        <div
          class="flex items-center justify-between gap-3 border-b border-[color:var(--border)] pb-4"
        >
          <div>
            <h2 class="text-base font-semibold">Create Category</h2>
            <p class="mt-1 text-xs text-[color:var(--text-2)]">
              Add a new category to organize your tasks
            </p>
          </div>
        </div>

        <form class="mt-4 space-y-4" @submit.prevent="createCategory">
          <div>
            <label for="category-name" class="mb-2 block text-sm font-medium">Category Name</label>
            <input
              id="category-name"
              type="text"
              autocomplete="off"
              class="input"
              placeholder="e.g. Development, Design, Marketing"
              required
              aria-required="true"
              name="name"
            />
          </div>

          <div class="divider"></div>

          <div class="flex items-center justify-end gap-2">
            <button type="button" class="btn btn-ghost" @click="showModal = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Create Category</button>
          </div>
        </form>
      </BaseModal>
    </section>
  </main>
</template>
