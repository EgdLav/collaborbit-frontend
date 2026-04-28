<script setup lang="ts">
import { ref } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useRoute, useRouter } from 'vue-router'
import { notify } from '@/services/notify.ts'
import BaseModal from '@/components/BaseModal.vue'

const workspace = ref({
  name: '',
  slug: '',
  description: '',
})

const categories = ref([])

const route = useRoute()
const router = useRouter()
const showModal = ref(false)

async function back() {
  if (document.referrer) {
    router.back()
  } else {
    await router.push('/workspaces')
  }
}

async function getWorkspace() {
  const response = await $fetch(`/workspaces/${route.params.id}`, 'get')

  if (!response.data?.workspace.is_owner) {
    await back()
  }

  workspace.value = response.data.workspace
  categories.value = response.data.workspace.categories || []
}

async function save(event: Event) {
  const form = event?.target as HTMLFormElement
  const response = await $fetch(`/workspaces/${route.params.id}`, 'post', new FormData(form))

  workspace.value = response.data.workspace

  if (!response.error) {
    notify(response.message, 'success')
    await router.push('/workspaces')
  }
}

async function del() {
  const response = await $fetch(`/workspaces/${route.params.id}`, 'delete')

  if (!response.error) {
    notify(response.message, 'success')
    await router.push('/workspaces')
  }
}

// 🧠 delete category
async function deleteCategory(id: number) {
  const response = await $fetch(`/workspaces/${route.params.id}/categories/${id}`, 'delete')

  if (!response.error) {
    categories.value = categories.value.filter((c) => c.id !== id)
    notify(response.message, 'success')
  }
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
      <input class="input" type="hidden" name="_method" value="patch" />

      <section class="mt-4 space-y-4">
        <!-- GENERAL -->
        <article class="card p-4">
          <h2 class="text-sm font-semibold">General</h2>

          <div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label class="block">
              <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Workspace name</span>
              <input class="input" type="text" name="name" v-model="workspace.name" />
            </label>

            <label class="block">
              <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Slug</span>
              <input class="input" type="text" v-model="workspace.slug" name="slug" />
            </label>
          </div>

          <label class="mt-3 block">
            <span class="mb-1.5 block text-sm text-[color:var(--text-1)]">Description</span>
            <textarea
              class="input min-h-[100px] resize-y"
              name="description"
              v-model="workspace.description"
            ></textarea>
          </label>
        </article>

        <article class="card p-4">
          <h2 class="text-sm font-semibold">Categories</h2>

          <div v-if="categories.length" class="mt-3 space-y-2">
            <div
              v-for="category in categories"
              :key="category.id"
              class="flex items-center justify-between border border-[var(--border)] rounded px-3 py-2"
            >
              <span class="text-sm">{{ category.name }}</span>

              <button
                class="btn btn-danger h-8 px-2 text-xs"
                type="button"
                @click="deleteCategory(category.id)"
              >
                Delete
              </button>
            </div>
          </div>

          <p v-else class="mt-3 text-sm text-[color:var(--text-2)]">No categories yet</p>
        </article>

        <!-- DANGER ZONE -->
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

            <button class="btn btn-ghost h-9 px-3 py-0 text-sm" type="button" @click="back">
              Exit without changes
            </button>
          </div>
        </article>

        <!-- MODAL -->
        <BaseModal v-model="showModal">
          <h2 class="text-sm font-semibold text-red-500">Delete workspace</h2>

          <p class="mt-2 text-sm text-[color:var(--text-1)]">
            Are you sure you want to delete <b>{{ workspace.name }}</b
            >?
          </p>

          <p class="mt-1 text-xs text-[color:var(--text-2)]">This action cannot be undone.</p>

          <div class="mt-4 flex justify-end gap-2">
            <button class="btn h-9 px-3 py-0 text-sm" type="button" @click="showModal = false">
              Cancel
            </button>

            <button class="btn btn-danger h-9 px-3 py-0 text-sm" type="button" @click="del">
              Delete
            </button>
          </div>
        </BaseModal>
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
