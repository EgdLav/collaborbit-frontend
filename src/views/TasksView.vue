<script setup lang="ts">
import { ref, computed } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

const tasks = ref<any[]>([])
const pagination = ref<any>(null)

const filters = ref({
  search: '',
  status: '' as '' | 'todo' | 'in_progress' | 'done',
  workspace_id: '' as string,
  page: '1',
})

const workspaces = ref<any[]>([])

const pages = computed(() =>
  Array.from({ length: 5 }, (_, i) => Number(filters.value.page) - 2 + i).filter(
    (p) => p > 0 && p <= (pagination.value?.last_page ?? 1),
  ),
)

// due date helpers
function isOverdue(due: string | null) {
  if (!due) return false
  return new Date(due) < new Date()
}

function formatDate(due: string | null) {
  if (!due) return null
  return new Date(due).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const statusMeta: Record<string, { label: string; cls: string; dot: string }> = {
  todo:        { label: 'To Do',       cls: 'badge',          dot: 'badge-dot badge-todo' },
  in_progress: { label: 'In Progress', cls: 'badge badge-progress', dot: 'badge-dot badge-progress' },
  done:        { label: 'Done',        cls: 'badge badge-done',     dot: 'badge-dot badge-done' },
}

function statusOf(task: any) {
  return statusMeta[task.status] ?? statusMeta['todo']
}

async function getTasks() {
  const res = await $fetch('/tasks', 'get', {
    search:       filters.value.search,
    status:       filters.value.status,
    workspace_id: filters.value.workspace_id,
    page:         filters.value.page,
  })
  tasks.value      = res?.data?.tasks      ?? []
  pagination.value = res?.data?.pagination ?? null
}

async function applyFilter() {
  filters.value.page = '1'
  await getTasks()
}

async function changePage(page: number) {
  if (page < 1 || page > (pagination.value?.last_page ?? 1)) return
  filters.value.page = String(page)
  await getTasks()
}

// load workspaces for filter dropdown
async function loadWorkspaces() {
  const res = await $fetch('/workspaces', 'get')
  workspaces.value = res?.data ?? []
}

loadWorkspaces()
getTasks()
</script>

<template>
  <main class="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-12">

    <!-- SIDEBAR FILTERS -->
    <aside class="sidebar lg:col-span-3">
      <div class="px-4 py-4">
        <h2 class="text-sm font-semibold">Filters</h2>

        <!-- Search -->
        <div class="mt-4">
          <input
            class="input h-9 px-3 py-0 text-sm"
            type="search"
            placeholder="Search tasks…"
            aria-label="Search tasks"
            v-model="filters.search"
            @input="applyFilter"
          />
        </div>

        <!-- Status -->
        <div class="mt-6">
          <h3 class="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-2)]">
            Status
          </h3>
          <div class="mt-3 flex flex-col gap-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="status" value=""            v-model="filters.status" @change="applyFilter" />
              <span class="text-sm">All</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="status" value="todo"        v-model="filters.status" @change="applyFilter" />
              <span class="text-sm">To Do</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="status" value="in_progress" v-model="filters.status" @change="applyFilter" />
              <span class="text-sm">In Progress</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="status" value="done"        v-model="filters.status" @change="applyFilter" />
              <span class="text-sm">Done</span>
            </label>
          </div>
        </div>

        <!-- Workspace -->
        <div class="mt-6" v-if="workspaces.length > 0">
          <h3 class="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-2)]">
            Workspace
          </h3>
          <div class="mt-3 flex flex-col gap-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="workspace" value="" v-model="filters.workspace_id" @change="applyFilter" />
              <span class="text-sm">All</span>
            </label>
            <label
              v-for="ws in workspaces"
              :key="ws.id"
              class="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="workspace"
                :value="String(ws.id)"
                v-model="filters.workspace_id"
                @change="applyFilter"
              />
              <span class="text-sm truncate">{{ ws.name }}</span>
            </label>
          </div>
        </div>
      </div>
    </aside>

    <!-- MAIN -->
    <div class="lg:col-span-9">

      <!-- HEADER -->
      <div class="mb-4">
        <p class="prompt"><b>tasks</b> / assigned to me</p>
        <h1 class="mt-1 text-lg font-semibold">My Tasks</h1>
        <p class="mt-1 text-sm text-[color:var(--text-1)]">
          All tasks where you are the executor.
        </p>
      </div>

      <!-- EMPTY STATE -->
      <div
        v-if="tasks.length === 0"
        class="card p-10 flex flex-col items-center justify-center gap-2 text-center"
      >
        <p class="text-sm text-[color:var(--text-2)]">no tasks found</p>
        <p class="prompt">you have no assigned tasks yet</p>
      </div>

      <!-- TASK LIST -->
      <div class="flex flex-col gap-2">
        <article
          v-for="task in tasks"
          :key="task.id"
          class="card jump p-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4 cursor-pointer"
          @click="router.push(`/workspace/${task.workspace?.id}`)"
        >
          <!-- left: status dot -->
          <div class="flex-none pt-0.5">
            <span :class="statusOf(task).dot + ' block h-2.5 w-2.5 rounded-full mt-1'" />
          </div>

          <!-- center: main info -->
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <p class="text-sm font-semibold">{{ task.name }}</p>
              <span :class="statusOf(task).cls" class="text-[10px]">
                <span :class="statusOf(task).dot" />
                {{ statusOf(task).label }}
              </span>
            </div>

            <p
              v-if="task.description"
              class="mt-1 text-xs text-[color:var(--text-2)] line-clamp-2"
            >
              {{ task.description }}
            </p>

            <!-- meta row -->
            <div class="mt-2 flex flex-wrap items-center gap-2">
              <span class="kbd text-[10px]">
                # {{ task.workspace?.name ?? 'workspace' }}
              </span>
              <span class="kbd text-[10px]">
                {{ task.category?.name ?? 'uncategorized' }}
              </span>
              <span
                v-if="task.due_date"
                class="kbd text-[10px]"
                :class="isOverdue(task.due_date) && task.status !== 'done'
                  ? 'border-[rgb(251,113,133,0.4)] text-[color:var(--danger)]'
                  : ''"
              >
                {{ isOverdue(task.due_date) && task.status !== 'done' ? '⚠ ' : '' }}{{ formatDate(task.due_date) }}
              </span>
            </div>
          </div>

          <!-- right: workspace avatar / arrow -->
          <div class="flex-none flex items-center gap-2 self-center sm:self-start sm:pt-0.5">
            <img
              v-if="task.workspace?.avatar"
              :src="task.workspace.avatar"
              :alt="task.workspace.name"
              class="h-7 w-7 rounded-[8px] border border-[color:var(--border)] object-cover"
            />
            <span class="text-xs text-[color:var(--text-2)]">→</span>
          </div>
        </article>
      </div>

      <!-- PAGINATION -->
      <div
        v-if="pagination && pagination.last_page > 1"
        class="mt-6 flex items-center justify-center gap-2"
      >
        <button
          class="btn btn-ghost h-9 px-3 py-0 text-xs"
          type="button"
          @click="changePage(Number(filters.page) - 1)"
        >
          ← Previous
        </button>

        <div class="flex gap-1">
          <button
            v-for="p in pages"
            :key="p"
            class="btn h-9 px-3 py-0 text-xs"
            :class="pagination?.current_page === p ? 'btn-primary' : 'btn-ghost'"
            type="button"
            @click="changePage(p)"
          >
            {{ p }}
          </button>
        </div>

        <button
          class="btn btn-ghost h-9 px-3 py-0 text-xs"
          type="button"
          @click="changePage(Number(filters.page) + 1)"
        >
          Next →
        </button>
      </div>

    </div>
  </main>
</template>

<style scoped></style>
