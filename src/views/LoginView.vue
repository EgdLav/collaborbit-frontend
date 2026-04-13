<script setup lang="ts">
import { onMounted } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.ts'

const router = useRouter()
const auth = useAuthStore()

async function submit(event: Event) {
  document.querySelectorAll('.error').forEach((e) => e.remove())

  const form = event.target as HTMLFormElement
  const response = await $fetch('/login', 'post', new FormData(form))

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
    auth.setToken(response.token)
    await router.push('/')
  }
}

onMounted(() =>
  document.querySelectorAll('input').forEach((e) => (e.onchange = () => e.setCustomValidity(''))),
)
</script>

<template>
  <main
    class="mx-auto flex min-h-[calc(100vh-60px)] max-w-6xl items-center justify-center px-4 py-12"
  >
    <section class="w-full max-w-md">
      <div class="card p-4 sm:p-6">
        <h1 class="text-lg font-semibold">Sign in</h1>
        <p class="mt-1 text-sm text-[color:var(--text-1)]">Войдите в свой профиль</p>

        <form class="mt-6 space-y-4" method="post" @submit.prevent="submit">
          <div>
            <label class="mb-2 block text-sm text-[color:var(--text-1)]" for="email">Email</label>
            <input
              class="input"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="you@studio.dev"
            />
            <p class="help mt-2">Мы используем email только для входа и уведомлений.</p>
          </div>

          <div>
            <div class="flex items-center justify-between gap-3">
              <label class="mb-2 block text-sm text-[color:var(--text-1)]" for="password"
                >Password</label
              >
            </div>
            <input
              class="input"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              placeholder="••••••••"
            />
          </div>

          <div class="flex items-center gap-2 pt-1">
            <button class="btn btn-primary w-full" type="submit">Login</button>
          </div>
        </form>
      </div>

      <p class="mt-4 text-center text-sm text-[color:var(--text-2)]">
        Нет аккаунта?
        <router-link class="link" to="/register">Создать</router-link>
      </p>
    </section>
  </main>
</template>

<style scoped></style>
