<script setup lang="ts">
import { computed, ref } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useRoute, useRouter } from 'vue-router'
import { notify } from '@/services/notify.ts'

const workspace = ref({
  name: '',
  slug: '',
  description: '',
  members: [],
})
const route = useRoute()
const router = useRouter()
const showModal = ref(false)

async function back() {
  if (document.referrer) {
    router.back()
  } else {
    await router.push('/workspaces') // fallback page
  }
}
async function getWorkspace() {
  const response = await $fetch(`/workspaces/${route.params.id}`, 'get')
  if (response.status == 403 || !response.data?.workspace.is_owner) {
    await back()
  }
  workspace.value = response.data.workspace
}
async function save(event: Event) {
  const form = event?.target as HTMLFormElement
  const response = await $fetch(`/workspaces/${route.params.id}`, 'post', new FormData(form))
  workspace.value = response.data.workspace
  if (!response.error) {
    notify(response.message, 'success')
    await back()
  }
}
async function del() {
  const response = await $fetch(`/workspaces/${route.params.id}`, 'delete')
  if (!response.error) {
    console.log(response)
    notify(response.message, 'success')
    await back()
  }
  await back()
}

getWorkspace()
</script>

<template>
  <main class="mx-auto max-w-[1400px] px-4 py-4">
    <section class="card p-4">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p class="prompt"><b>workspace</b> / orbit-product <span class="kbd">active</span></p>
          <h1 class="mt-1 text-lg font-semibold">{{ workspace.name }}</h1>
          <p class="mt-1 text-sm text-[color:var(--text-1)]">
            {{ workspace.description }}
          </p>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs text-[color:var(--text-2)] sm:grid-cols-4">
          <span class="kbd justify-center">{{ workspace?.members?.length }} coworkers</span>
          <span class="kbd justify-center">{{ workspace?.tasks?.length }} tasks</span>
        </div>
      </div>
    </section>

    <section class="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-4">
      <aside class="card p-4 xl:col-span-1">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold">Coworkers</h2>
          <button class="btn btn-ghost h-8 px-2 py-0 text-xs" type="button">Invite</button>
        </div>
        <div class="mt-3 space-y-2">
          <article
            class="rounded-[10px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.02)] px-3 py-2"
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
            class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(255,255,255,0.02)]"
            v-for="category in workspace?.categories"
            :key="category?.id"
          >
            <header class="border-b border-dashed border-[color:var(--border)] px-3 py-3">
              <p class="text-sm font-semibold">
                {{ category.name }}
                <span class="text-xs text-[color:var(--text-2)]">{{ category.tasks.length }}</span>
              </p>
            </header>
            <div class="space-y-2 p-3">
              <article
                class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(0,0,0,0.18)] px-3 py-2"
                v-for="task in category?.tasks"
                :key="task?.id"
              >
                <p class="text-sm font-semibold">{{ task.name }}</p>
                <p class="text-sm text-[color:var(--text-2)]">{{ task.description }}</p>
                <p class="mt-2 text-xs text-[color:var(--text-2)]">{{ task.executor.first_name }} · {{task.due_date}}</p>
              </article>
              <article
                class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(0,0,0,0.18)]"
              >
                <router-link
                  :to="'/create-task/' + workspace.id + '/' + category.id"
                  class="btn btn-primary w-full text-center px-3 py-2"
                  >Add task</router-link
                >
              </article>
            </div>
          </section>

          <section
            class="rounded-[10px] border border-dashed border-[color:rgb(var(--accent-rgb)/0.28)] bg-[color:rgb(var(--accent-rgb)/0.06)]"
          >
            <header
              class="border-b border-dashed border-[color:rgb(var(--accent-rgb)/0.28)] px-3 py-3"
            >
              <p class="text-sm font-semibold">
                In Progress <span class="text-xs text-[color:var(--text-2)]">3</span>
              </p>
            </header>
            <div class="space-y-2 p-3">
              <article
                class="rounded-[10px] border border-dashed border-[color:rgb(var(--accent-rgb)/0.28)] bg-[rgba(0,0,0,0.16)] px-3 py-2"
              >
                <p class="text-sm font-semibold">Invite acceptance flow</p>
                <p class="mt-2 text-xs text-[color:var(--text-2)]">#auth · Egor · today</p>
              </article>
              <article
                class="rounded-[10px] border border-dashed border-[color:rgb(var(--accent-rgb)/0.28)] bg-[rgba(0,0,0,0.16)] px-3 py-2"
              >
                <p class="text-sm font-semibold">Kanban drag visual hint</p>
                <p class="mt-2 text-xs text-[color:var(--text-2)]">#tasks · Mark · 0.5d</p>
              </article>
            </div>
          </section>

          <section
            class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(255,255,255,0.02)]"
          >
            <header class="border-b border-dashed border-[color:var(--border)] px-3 py-3">
              <p class="text-sm font-semibold">
                Done <span class="text-xs text-[color:var(--text-2)]">9</span>
              </p>
            </header>
            <div class="space-y-2 p-3">
              <article
                class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(0,0,0,0.18)] px-3 py-2"
              >
                <p class="text-sm font-semibold">Role permissions map</p>
                <p class="mt-2 text-xs text-[color:var(--text-2)]">#settings · done</p>
              </article>
              <article
                class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(0,0,0,0.18)] px-3 py-2"
              >
                <p class="text-sm font-semibold">Workspace slug validation</p>
                <p class="mt-2 text-xs text-[color:var(--text-2)]">#backend · merged</p>
              </article>
            </div>
          </section>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped></style>
