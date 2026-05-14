<script setup lang="ts">
import {ref, computed, onBeforeUnmount, onMounted} from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import {echo} from "@/plugins/echo";

const router = useRouter()
const auth = useAuthStore()

const chats = ref<any[]>([])
const pagination = ref<any>(null)

let channel: any = null

const filters = ref({
  search: '',
  type: '' as '' | 'private' | 'workspace',
  page: '1',
})

const pages = computed(() =>
  Array.from({ length: 5 }, (_, i) => Number(filters.value.page) - 2 + i).filter(
    (p) => p > 0 && p <= (pagination.value?.last_page ?? 1),
  ),
)

async function openChat(chat: any) {
  if (chat.type === 'private') {
    await router.push(`/chat/${chat.other_user?.id}`)
  } else {
    await router.push(`/workspace/${chat.workspace?.id}/chat`)
  }
}

async function getChats() {
  const res = await $fetch('/chats', 'get', {
    search: filters.value.search,
    type: filters.value.type,
    page: filters.value.page,
  })
  chats.value = res?.data?.chats ?? []
  pagination.value = res?.data?.pagination ?? null
}

async function changePage(page: number) {
  if (page < 1 || page > (pagination.value?.last_page ?? 1)) return
  filters.value.page = String(page)
  await getChats()
}

async function applyFilter() {
  filters.value.page = '1'
  await getChats()
}
function connectWebSocket(chatId: number) {
  echo.private(`chat.${chatId}`)
    .listen('MessageSent', (e: any) => {
      const chat = chats.value.find(c => c.id == chatId)
      const index = chats.value.indexOf(chat)
      chat.last_message = e.message

      chats.value.splice(index, 1)

      chats.value.unshift(chat)
    })
}
onMounted(async () => {
  await getChats()
  chats.value.forEach(chat => {
    connectWebSocket(chat.id)
  })
})
onBeforeUnmount(() => {
  chats.value.forEach(chat => {
    echo.leave(`private-chat.${chat.id}`)
  })
})

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
            placeholder="Search chats…"
            aria-label="Search chats"
            v-model="filters.search"
            @input="applyFilter"
          />
        </div>

        <!-- Type -->
        <div class="mt-6">
          <h3 class="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-2)]">
            Type
          </h3>
          <div class="mt-3 flex flex-col gap-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value=""
                v-model="filters.type"
                @change="applyFilter"
              />
              <span class="text-sm">All</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="private"
                v-model="filters.type"
                @change="applyFilter"
              />
              <span class="text-sm">@ Private</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="workspace"
                v-model="filters.type"
                @change="applyFilter"
              />
              <span class="text-sm"># Workspace</span>
            </label>
          </div>
        </div>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <div class="lg:col-span-9">

      <!-- HEADER -->
      <div class="mb-4">
        <p class="prompt"><b>chat</b> / inbox</p>
        <h1 class="mt-1 text-lg font-semibold">Messages</h1>
        <p class="mt-1 text-sm text-[color:var(--text-1)]">
          Your private and workspace conversations.
        </p>
      </div>

      <!-- CHAT LIST -->
      <section class="flex flex-col gap-2">

        <!-- empty state -->
        <div
          v-if="chats.length === 0"
          class="card p-8 flex flex-col items-center justify-center gap-2 text-center"
        >
          <p class="text-sm text-[color:var(--text-2)]">no chats found</p>
          <p class="prompt">
            start a conversation from
            <router-link class="link" to="/find-coworkers">find coworkers</router-link>
          </p>
        </div>

        <!-- chat row -->
        <article
          v-for="chat in chats"
          :key="chat.id"
          class="card jump p-3 flex items-center gap-3 cursor-pointer"
          @click="openChat(chat)"
          role="button"
          :aria-label="`Open chat with ${chat.name}`"
        >
          <!-- avatar -->
          <div class="relative flex-none">
            <img
              v-if="chat?.other_user?.avatar"
              :src="chat.other_user.avatar"
              :alt="chat.other_user?.first_name"
              class="h-10 w-10 rounded-[10px] border border-[color:var(--border)] object-cover"
            />
            <span
              v-else
              class="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] text-sm font-semibold text-[color:var(--text-1)]"
            >
              {{ chat.workspace?.name?.charAt(0)?.toUpperCase() ?? '?' }}
            </span>

            <span
              v-if="chat.type === 'private' && chat.is_online"
              class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[color:var(--bg-0)] bg-[color:var(--success)]"
              aria-label="Online"
            />
          </div>

          <!-- info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2">
              <p class="text-sm font-semibold truncate">
                {{
                  chat.type === 'private'
                    ? (chat.other_user?.first_name + ' ' + (chat.other_user?.last_name ?? '')).trim()
                    : chat.workspace?.name ?? '—'
                }}
              </p>
              <span class="timestamp flex-none">{{ chat.last_message?.created_at ? new Date(chat.last_message.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '' }}</span>
            </div>

            <div class="mt-0.5 flex items-center justify-between gap-2">
              <p class="text-xs text-[color:var(--text-2)] truncate" v-if="chat?.last_message">
                {{ chat.last_message?.user?.id == auth.id ? 'You' : chat.last_message?.user?.first_name }}:
                {{ chat.last_message?.body }}
              </p>
              <p class="text-xs text-[color:var(--text-2)]" v-else>No messages yet</p>

              <span
                v-if="chat.unread_count > 0"
                class="flex-none flex h-5 min-w-5 items-center justify-center rounded-full bg-[rgb(var(--accent-rgb)/0.18)] border border-[rgb(var(--accent-rgb)/0.34)] px-1.5 text-[10px] font-semibold text-[color:var(--text-0)]"
              >
                {{ chat.unread_count > 99 ? '99+' : chat.unread_count }}
              </span>
            </div>
          </div>

          <!-- type badge -->
          <span class="badge flex-none text-[10px]">
            {{ chat.type === 'workspace' ? '# workspace' : '@ private' }}
          </span>
        </article>

      </section>

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
