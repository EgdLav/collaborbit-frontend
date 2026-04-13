<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.ts'

const router = useRouter()
const auth = useAuthStore()

async function submit(event: Event) {
  document.querySelectorAll('.error').forEach((e) => e.remove())

  const form = event.target as HTMLFormElement
  const response = await $fetch('/register', 'post', new FormData(form))

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

const avatar = ref<File | null>(null)
const preview = ref<string | null>(null)

function onAvatarChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  avatar.value = file
  preview.value = URL.createObjectURL(file)
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
        <h1 class="text-lg font-semibold">Create account</h1>
        <form class="mt-6 space-y-4" method="post" @submit.prevent="submit">
          <div>
            <label class="mb-2 block text-sm text-[color:var(--text-1)]" for="name"
              >First name</label
            >
            <input
              class="input"
              id="name"
              name="first_name"
              type="text"
              autocomplete="name"
              placeholder="Ivan"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm text-[color:var(--text-1)]" for="name"
              >Last name</label
            >
            <input
              class="input"
              id="name"
              name="last_name"
              type="text"
              autocomplete="name"
              placeholder="Ivanov"
            />
          </div>

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
          </div>

          <div>
            <label class="mb-2 block text-sm text-[color:var(--text-1)]" for="password"
              >Password</label
            >
            <input
              class="input"
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              placeholder="8 chars minimum"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm text-[color:var(--text-1)]" for="avatar">Avatar</label>
            <div class="flex flex-col gap-3">
              <input
                class="input"
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                @change="onAvatarChange"
              />
              <div v-if="preview" class="flex justify-center">
                <img
                  :src="preview"
                  alt="Avatar preview"
                  class="h-24 w-24 rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          <div class="flex items-start gap-2">
            <input
              class="mt-1 h-4 w-4 rounded border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)]"
              type="checkbox"
              name="terms"
            />
            <p class="text-sm text-[color:var(--text-1)]">
              Согласен с
              <a class="link" href="#">terms</a>
              и
              <a class="link" href="#">privacy</a>.
            </p>
          </div>

          <div class="pt-1">
            <button class="btn btn-primary w-full" type="submit">Register</button>
          </div>
        </form>
      </div>

      <p class="mt-4 text-center text-sm text-[color:var(--text-2)]">
        Уже есть аккаунт?
        <router-link class="link" to="/login">Войти</router-link>
      </p>
    </section>
  </main>
</template>

<style scoped></style>
