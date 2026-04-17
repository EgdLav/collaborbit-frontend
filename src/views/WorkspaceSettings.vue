<script setup lang="ts">
import { computed, ref } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useRoute } from 'vue-router'

const workspace = ref(null)
const route = useRoute()
const showModal = ref(false)

async function getWorkspace() {
  const response = await $fetch(`/workspaces/${route.params.id}`, 'get')
  workspace.value = response.data
}
async function save(event: Event) {
  const form = event?.target as HTMLFormElement
  const response = await $fetch(`/workspaces/${route.params.id}`, 'post', new FormData(form))
  workspace.value = response.data
}

getWorkspace()
</script>

<template>
  <main class="mx-auto max-w-4xl px-4 py-6">
    <section class="card p-4 sm:p-5">
      <p class="prompt"><b>workspace</b> / settings <span class="kbd">orbit-product</span></p>
      <h1 class="mt-1 text-lg font-semibold">Workspace Settings</h1>
      <p class="mt-1 text-sm text-[color:var(--text-1)]">
        Управляйте названием, доступом и правилами вашего пространства.
      </p>
    </section>
    <form action="#" @submit.prevent="save">
      <section class="mt-4 space-y-4">
        <article class="card p-4">
          <h2 class="text-sm font-semibold">General</h2>
          <div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label class="block">
              <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Workspace name</span>
              <input class="input" type="text" value="Orbit Product Team" />
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Slug</span>
              <input class="input" type="text" value="orbit-product" />
            </label>
          </div>
          <label class="mt-3 block">
            <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Description</span>
            <textarea class="input min-h-[100px] resize-y">
Roadmap, release management and weekly execution.</textarea
            >
          </label>
        </article>

        <article class="card p-4">
          <h2 class="text-sm font-semibold">Danger Zone</h2>
          <p class="mt-1 text-xs text-[color:var(--text-2)]">
            Удаление workspace необратимо: все задачи, комментарии и файлы будут утеряны.
          </p>
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <button class="btn btn-primary h-9 px-3 py-0 text-sm" type="submit">
              Save changes
            </button>
            <button
              class="btn btn-danger h-9 px-3 py-0 text-sm"
              type="button"
              @click="showModal = true"
            >
              Delete workspace
            </button>
          </div>
        </article>
        <transition name="modal">
          <div
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 mt-0"
            v-if="showModal"
          >
            <div class="card w-full max-w-md p-5 modal">
              <h2 class="text-sm font-semibold text-red-500">Delete workspace</h2>

              <p class="mt-2 text-sm text-[color:var(--text-1)]">
                Are you sure you want to delete <b>Orbit Product Team</b>?
              </p>

              <p class="mt-1 text-xs text-[color:var(--text-2)]">
                This action cannot be undone. All tasks, comments and files will be permanently
                deleted.
              </p>

              <div class="mt-4 flex justify-end gap-2">
                <button class="btn h-9 px-3 py-0 text-sm" @click="showModal = false" type="button">
                  Cancel
                </button>
                <button class="btn btn-danger h-9 px-3 py-0 text-sm" type="button">Delete</button>
              </div>
            </div>
          </div>
        </transition>
      </section>
    </form>
  </main>
</template>

<style scoped>
.modal {
  max-width: 300px;
  background: rgb(10 10 10);
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.18s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.modal-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
