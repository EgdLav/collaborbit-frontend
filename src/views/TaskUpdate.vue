<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useRoute, useRouter } from 'vue-router'
import { notify } from '@/services/notify.ts'
import BaseModal from '@/components/BaseModal.vue'

const route = useRoute()
const router = useRouter()

const task = ref<any>(null)
const workspace = ref<any>(null)
const showDeleteModal = ref(false)

async function getData() {
  const [wsRes, taskRes] = await Promise.all([
    $fetch(`/workspaces/${route.params.workspace_id}`, 'get'),
    $fetch(
      `/workspaces/${route.params.workspace_id}/categories/${route.params.category_id}/tasks/${route.params.id}`,
      'get',
    ),
  ])
  workspace.value = wsRes?.data?.workspace ?? null
  task.value = taskRes?.data?.task ?? null
}

async function submit(event: Event) {
  document.querySelectorAll('.error').forEach((e) => e.remove())

  const form = event.target as HTMLFormElement
  const response = await $fetch(
    `/workspaces/${route.params.workspace_id}/categories/${route.params.category_id}/tasks/${route.params.id}`,
    'post',
    new FormData(form),
  )

  if (response.error) {
    for (const name in response.data?.errors) {
      const input = document.querySelector(`[name="${name}"]`) as HTMLInputElement | null
      if (input) {
        input.setCustomValidity(response.data.errors[name])
        input.insertAdjacentHTML(
          'afterend',
          `<span class="error mt-2">${response.data.errors[name]}</span>`,
        )
      }
    }
  } else {
    notify(response.message, 'success')
    await router.push(`/workspace/${route.params.workspace_id}`)
  }
}

async function deleteTask() {
  const response = await $fetch(
    `/workspaces/${route.params.workspace_id}/categories/${route.params.category_id}/tasks/${route.params.id}`,
    'delete',
  )

  if (!response.error) {
    notify(response.message, 'success')
    await router.push(`/workspace/${route.params.workspace_id}`)
  }
}

function handleFiles(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files) return
  if (input.files.length > 20) {
    input.insertAdjacentHTML('afterend', `<span class="error mt-2">Max 20 files allowed</span>`)
    input.value = ''
  }
}

onMounted(() =>
  document.querySelectorAll('input').forEach((e) => (e.onchange = () => e.setCustomValidity(''))),
)

getData()
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-6">

    <div v-if="!task" class="card p-10 flex items-center justify-center">
      <p class="prompt">loading<span class="animate-pulse">…</span></p>
    </div>

    <template v-else>
      <section class="card p-4 sm:p-5">
        <p class="prompt"><b>task</b> / edit</p>
        <h1 class="mt-1 mb-3 text-lg font-semibold">Edit Task</h1>

        <div class="mb-5 flex flex-wrap items-center gap-3">
          <div class="flex items-center gap-2 rounded-full border border-[color:rgb(var(--accent-rgb)/0.28)] bg-[color:rgb(var(--accent-rgb)/0.06)] px-3 py-1.5">
            <span class="text-xs text-[color:rgb(var(--accent-rgb)/0.8)]">WORKSPACE:</span>
            <span class="text-sm font-medium">{{ workspace?.name }}</span>
          </div>
          <span class="text-xs text-[color:var(--text-2)]">→</span>
          <div class="flex items-center gap-2 rounded-full border border-[color:rgb(var(--accent-rgb)/0.28)] bg-[color:rgb(var(--accent-rgb)/0.06)] px-3 py-1.5">
            <span class="text-xs text-[color:rgb(var(--accent-rgb)/0.8)]">CATEGORY:</span>
            <span class="text-sm font-medium">{{ task.category?.name }}</span>
          </div>
        </div>

        <form class="space-y-4" @submit.prevent="submit">
          <input type="hidden" name="_method" value="patch" />

          <label class="block">
            <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Task name</span>
            <input
              class="input"
              type="text"
              name="name"
              :value="task.name"
              autocomplete="off"
            />
          </label>

          <label class="block">
            <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Description</span>
            <textarea
              class="input min-h-[110px] resize-y"
              name="description"
            >{{ task.description }}</textarea>
          </label>

          <label class="block">
            <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Preview image</span>
            <input
              class="input"
              type="file"
              accept="image/*"
              name="preview"
            />
            <span class="help mt-1 block">Leave empty to keep current preview.</span>
          </label>

          <label class="block">
            <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Files</span>
            <input class="input" type="file" multiple name="files[]" @change="handleFiles" />
            <span class="help mt-1 block">Leave empty to keep existing files.</span>
          </label>

          <label class="block">
            <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Executor</span>
            <select class="input" name="executor_id">
              <option
                v-for="member in workspace?.members"
                :key="member.id"
                :value="member.id"
                :selected="member.id === task.executor_id"
              >
                {{ member.first_name }}
              </option>
            </select>
          </label>

          <label class="block">
            <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Due date</span>
            <input class="input" type="date" name="due_date" :value="task.due_date" />
          </label>

          <!-- ACTIONS — WorkspaceSettings style -->
          <div class="flex flex-wrap items-center gap-2 pt-1 border-t border-[color:var(--border)]">
            <button class="btn btn-primary h-9 px-3 py-0 text-sm" type="submit">
              Save changes
            </button>

            <button
              class="btn btn-ghost h-9 px-3 py-0 text-sm"
              type="button"
              @click="router.back()"
            >
              Cancel
            </button>

            <button
              class="ml-auto h-9 px-3 text-sm text-red-400 hover:text-red-300 opacity-60 hover:opacity-100 transition"
              type="button"
              @click="showDeleteModal = true"
            >
              Delete task
            </button>
          </div>
        </form>
      </section>
    </template>

    <!-- DELETE MODAL -->
    <BaseModal v-model="showDeleteModal">
      <h2 class="text-sm font-semibold text-red-500">Delete task</h2>

      <p class="mt-2 text-sm text-[color:var(--text-1)]">
        Are you sure you want to delete <b>{{ task?.name }}</b>?
      </p>

      <p class="mt-1 text-xs text-[color:var(--text-2)]">This action cannot be undone.</p>

      <div class="mt-4 flex justify-end gap-2">
        <button class="btn h-9 px-3 py-0 text-sm" type="button" @click="showDeleteModal = false">
          Cancel
        </button>
        <button class="btn btn-danger h-9 px-3 py-0 text-sm" type="button" @click="deleteTask">
          Delete
        </button>
      </div>
    </BaseModal>

  </main>
</template>

<style scoped></style>
