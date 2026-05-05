<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useAuthStore } from '@/stores/authStore.ts'
import {useRoute, useRouter} from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const chat = ref(null)
const messages = ref<any[]>([])
const messageInput = ref('')
const messagesContainer = ref<HTMLElement | null>(null)


async function back() {
  if (document.referrer) {
    router.back()
  } else {
    await router.push('/workspaces') // fallback page
  }
}
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!messageInput.value.trim()) return

  const content = messageInput.value
  messageInput.value = ''

  messages.value.push({
    id: Date.now(),
    is_mine: true,
    user: {
      avatar:auth.avatar
    },
    body: content,
    status: 'sending',
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    date: new Date().toLocaleDateString()
  })

  await scrollToBottom()
  await $fetch(`/chats/${chat.value.id}/messages`, 'post', { body: content })
}
function autoResize(e: Event) {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'

  // prevent page jump weirdness
  scrollToBottom()
}
onMounted(async () => {

  if (route.params.user_id) {
    chat.value = (await $fetch(`/chats/private/${route.params.user_id}`, 'post'))?.data?.chat
  }
  if (route.params.workspace_id) {
    chat.value = (await $fetch(`/workspaces/${route.params.workspace_id}/chat`, 'get'))?.data?.chat
  }
  messages.value = (await $fetch(`/chats/${chat.value.id}/messages`, 'get'))?.data?.messages.reverse()
  await scrollToBottom()
  // const response = await $fetch('/chat/messages', 'get')
  // if (!response.error && response.data) {
  //   messages.value = response.data.map((msg: any) => ({
  //     ...msg,
  //     isOwn: msg.authorId === auth.id,
  //   }))
  //   await scrollToBottom()
  // }
})
function handleInputKey(e: KeyboardEvent) {
  if (e.key === 'Enter' && e.ctrlKey) {
    e.preventDefault()
    sendMessage()
  }

  if (e.key === 'Enter' && !e.ctrlKey) {
    e.preventDefault()

    const el = e.target as HTMLTextAreaElement
    const start = el.selectionStart
    const end = el.selectionEnd

    messageInput.value =
      messageInput.value.substring(0, start) +
      '\n' +
      messageInput.value.substring(end)

    nextTick(() => {
      el.selectionStart = el.selectionEnd = start + 1
    })
  }
}
</script>

<template>
  <main class="chat-page">
    <div class="card p-4">
      <div class="mb-4 flex items-center gap-4">
        <button @click="back()" class="btn btn-ghost">← Back</button>
        <div>
          <h1 class="text-sm font-semibold">Chat</h1>
          <p class="mt-1 text-xs text-[color:var(--text-2)]">Team workspace conversation</p>
        </div>
      </div>

      <!-- Messages -->
      <div
        ref="messagesContainer"
        class="mb-4 h-[calc(100vh-280px)] space-y-3 overflow-y-auto rounded-lg border border-[color:var(--border)] bg-[rgba(255,255,255,0.01)] p-4"
      >
        <div v-if="messages.length === 0" class="flex h-full items-center justify-center">
          <p class="text-xs text-[color:var(--text-2)]">No messages yet</p>
        </div>

        <div v-for="message in messages" :key="message.id" class="flex gap-3">
          <img
            :src="message?.user?.avatar"
            class="h-8 w-8 flex-none rounded-[10px] border border-[color:var(--border)]"
          />
          <div class="flex-1">
            <div class="flex items-baseline gap-2">
              <span class="text-xs font-medium text-[color:var(--text-0)]">{{
                  message?.user?.first_name
                }}</span>
              <span class="text-xs text-[color:var(--text-2)]">{{ message?.time }}</span>
            </div>
            <div :class="['message-bubble mt-1', message?.is_mine && 'message-bubble--me']">
              <p class="text-sm text-[color:var(--text-0)]">{{ message?.body }}</p>
            </div>
            <span class="text-xs text-[color:var(--text-2)]">{{ message?.status == 'sending' ? 'sending...' : '' }}</span>
          </div>
        </div>
      </div>

      <!-- Input -->
      <form @submit.prevent="sendMessage" class="flex gap-2">
        <textarea
          v-model="messageInput"
          placeholder="Type a message..."
          class="chat-input"
          rows="1"
          @keydown="handleInputKey"
          @input="autoResize"
        />
        <button type="submit" :disabled="!messageInput.trim()" class="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  </main>
</template>

<style scoped>
.chat-input {
  width: 100%;
  min-height: 42px;
  max-height: 140px;

  padding: 10px 12px;
  box-sizing: border-box;

  border-radius: 12px;
  border: 1px solid var(--border);

  background: rgba(255,255,255,0.03);

  font-size: 14px;
  line-height: 20px;

  resize: none;
  overflow-y: auto;

  outline: none;
  padding-bottom: 14px;
}

/* optional: smoother feel */
.chat-input:focus {
  border-color: rgba(var(--accent-rgb), 0.5);
}
.messages {
  height: calc(100vh - 220px);
  overflow-y: auto;
  overscroll-behavior: contain; /* kills scroll chaining */
  scrollbar-gutter: stable;
}
.chat-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
