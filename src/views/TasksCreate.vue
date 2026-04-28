<script setup lang="ts">
import { $fetch } from '@/fetch/fetch.ts'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { notify } from '@/services/notify.ts'

const route = useRoute()
const router = useRouter()
const workspace = ref(
  (await $fetch(`/workspaces/${route.params.workspace_id}`, 'get'))?.data?.workspace,
)
const category = ref(
  (
    await $fetch(
      `/workspaces/${route.params.workspace_id}/categories/${route.params.category_id}`,
      'get',
    )
  )?.data.category,
)
async function submit(event: Event) {
  document.querySelectorAll('.error').forEach((e) => e.remove())

  const form = event.target as HTMLFormElement
  const response = await $fetch(
    `/workspaces/${route.params.workspace_id}/categories/${route.params.category_id}/tasks`,
    'post',
    new FormData(form),
  )

  if (response.error) {
    console.log(response)
    for (const name in response.data.errors) {
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
    await router.push(`/workspace/${workspace.value.id}`)
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
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-6">
    <section class="card p-4 sm:p-5">
      <p class="prompt"><b>task</b> / create</p>
      <h1 class="mt-1 mb-3 text-lg font-semibold">Create Task</h1>
      <div class="mb-5 flex items-center gap-3">
        <div
          class="flex items-center gap-2 rounded-full border border-[color:rgb(var(--accent-rgb)/0.28)] bg-[color:rgb(var(--accent-rgb)/0.06)] px-3 py-1.5"
        >
          <span class="text-xs text-[color:rgb(var(--accent-rgb)/0.8)]">WORKSPACE:</span>
          <span class="text-sm font-medium text-[color:var(--text-0)]">{{ workspace?.name }}</span>
        </div>
        <span class="text-xs text-[color:var(--text-2)]">→</span>
        <div
          class="flex items-center gap-2 rounded-full border border-[color:rgb(var(--accent-rgb)/0.28)] bg-[color:rgb(var(--accent-rgb)/0.06)] px-3 py-1.5"
        >
          <span class="text-xs text-[color:rgb(var(--accent-rgb)/0.8)]">CATEGORY:</span>
          <span class="text-sm font-medium text-[color:var(--text-0)]">{{ category?.name }}</span>
        </div>
      </div>

      <form class="mt-5 space-y-4" @submit.prevent="submit">
        <label class="block">
          <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Task name</span>
          <input
            class="input"
            type="text"
            placeholder="e.g., Implement authentication"
            name="name"
          />
        </label>

        <label class="block">
          <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Description</span>
          <textarea
            class="input min-h-[110px] resize-y"
            placeholder="What this task is about..."
            name="description"
          ></textarea>
        </label>

        <label class="block">
          <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Preview image</span>
          <input
            class="input"
            type="file"
            placeholder="default.png"
            accept="image/*"
            value="default.png"
            name="preview"
          />
          <span class="help mt-1 block">Имя файла превью.</span>
        </label>

        <label class="block">
          <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Files</span>
          <input class="input" type="file" multiple name="files[]" @change="handleFiles" />
        </label>

        <label class="block">
          <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Executor</span>
          <select class="input" name="executor_id">
            <option v-for="member in workspace?.members" :key="member.id" :value="member.id">
              {{ member.first_name }}
            </option>
          </select>
        </label>

        <label class="block">
          <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Due date</span>
          <input class="input" type="date" name="due_date" />
        </label>

        <div class="flex flex-wrap items-center gap-2 pt-1">
          <button class="btn btn-primary h-10 px-4 py-0 text-sm" type="submit">Create task</button>
          <router-link
            class="btn btn-ghost h-10 px-4 py-0 text-sm"
            :to="'/workspace/' + route.params.workspace_id"
            >Cancel</router-link
          >
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped></style>
