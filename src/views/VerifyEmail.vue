<script setup lang="ts">
import { $fetch } from '@/fetch/fetch.ts'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const route = useRoute()
const status = ref<'loading' | 'success' | 'error'>('loading')
const message = ref('Verifying...')
onMounted(async () => {
  const query = route.query as Record<string, string>

  const response = await $fetch('/email/verify', 'get', query)

  if (response.error) {
    status.value = 'error'
    message.value = 'Something went wrong.'
  } else {
    status.value = 'success'
    message.value = 'Your email has been successfully confirmed. You can now log into your account.'
  }
})
</script>

<template>
  <main
    class="mx-auto flex min-h-[calc(100vh-60px)] max-w-6xl items-center justify-center px-4 py-12"
  >
    <section class="w-full max-w-md">
      <div class="card p-4 sm:p-6 text-center">
        <div class="mb-6">
          <svg
            v-if="status === 'success'"
            class="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <!-- ERROR -->
        <svg
          v-if="status === 'error'"
          class="mx-auto h-16 w-16 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 6l12 12M6 18L18 6"
          />
        </svg>
        <h1 class="text-2xl font-semibold">{{ message }}</h1>
        <router-link
          v-if="status === 'success'"
          to="/login"
          class="btn btn-primary mt-6 inline-block"
        >
          Go to Login
        </router-link>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
