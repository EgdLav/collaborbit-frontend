<script setup lang="ts">
import { onMounted } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.ts'
import { notify } from '@/services/notify.ts'

const router = useRouter()
const auth = useAuthStore()

async function submit(event: Event) {
  document.querySelectorAll('.error').forEach((e) => e.remove())

  const form = event.target as HTMLFormElement
  const response = await $fetch('/workspaces', 'post', new FormData(form))

  if (response.error) {
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
    await router.push('/workspaces')
    // auth.setToken(response.data.token)
  }
}

onMounted(() =>
  document.querySelectorAll('input').forEach((e) => (e.onchange = () => e.setCustomValidity(''))),
)
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-6">
    <section class="card p-4 sm:p-5">
      <p class="prompt"><b>workspace</b> / create</p>
      <h1 class="mt-1 text-lg font-semibold">Create Workspace</h1>

      <form class="mt-5 space-y-4" @submit.prevent="submit">
        <label class="block">
          <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Workspace name</span>
          <input class="input" type="text" placeholder="Cosmo startup" name="name" />
        </label>

        <label class="block">
          <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Slug</span>
          <input class="input" type="text" placeholder="cosmo-startup" name="slug" />
          <span class="help mt-1 block">Используется в URL и invite links.</span>
        </label>

        <label class="block">
          <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Description</span>
          <textarea
            class="input min-h-[110px] resize-y"
            placeholder="What this workspace is for..."
            name="description"
          ></textarea>
        </label>

        <div class="flex flex-wrap items-center gap-2 pt-1">
          <button class="btn btn-primary h-10 px-4 py-0 text-sm" type="submit">
            Create workspace
          </button>
          <router-link class="btn btn-ghost h-10 px-4 py-0 text-sm" to="/workspaces"
            >Cancel</router-link
          >
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped></style>
