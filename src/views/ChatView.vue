<script setup lang="ts">
import {ref, nextTick, onMounted, onBeforeUnmount} from 'vue'
import {$fetch} from '@/fetch/fetch.ts'
import {useAuthStore} from '@/stores/authStore.ts'
import {useRoute, useRouter} from 'vue-router'
import {echo} from '@/plugins/echo'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const chat = ref<any>(null)
const messages = ref<any[]>([])
const messageInput = ref('')

const messagesContainer = ref<HTMLElement | null>(null)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const loading = ref(false)
const hasMore = ref(true)

let channel: any = null

async function back() {
  if (document.referrer) {
    router.back()
  } else {
    await router.push('/chats')
  }
}

const scrollToBottom = async (smooth = false) => {
  await nextTick()
  if (!messagesContainer.value) return
  messagesContainer.value.scrollTo({
    top: messagesContainer.value.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto',
  })
}

function resizeTextarea() {
  if (!textareaRef.value) return
  textareaRef.value.style.height = '0px'
  const newHeight = Math.min(textareaRef.value.scrollHeight, 140)
  textareaRef.value.style.height = `${newHeight}px`
}
function handleInputKey(e: KeyboardEvent) {
  if (e.key === 'Enter' && e.ctrlKey) {
    e.preventDefault()
    sendMessage()
    return
  }

  if (e.key === 'Enter' && !e.ctrlKey) {
    e.preventDefault()
    const el = e.target as HTMLTextAreaElement
    const start = el.selectionStart
    const end = el.selectionEnd
    messageInput.value =
      messageInput.value.substring(0, start) + '\n' + messageInput.value.substring(end)
    nextTick(() => {
      resizeTextarea()
      el.selectionStart = el.selectionEnd = start + 1
      el.scrollTop = el.scrollHeight
      scrollToBottom()
    })
  }
}

function onScroll() {
  const el = messagesContainer.value
  if (!el) return

  console.log(el.scrollTop)

  if (el.scrollTop < 100 && !loading.value && hasMore.value) {
    loadMore()
    console.log(el.scrollTop, 'sending...')
  }
}

async function sendMessage() {
  if (!messageInput.value.trim()) return

  const content = messageInput.value
  messageInput.value = ''
  resizeTextarea()

  const tempId = Date.now()

  // optimistic UI
  messages.value.push({
    temp_id: tempId,
    body: content,
    status: 'sending',
    user: {
      id: auth.id,
      first_name: 'You',
      avatar: auth.avatar,
    },
    created_at: new Date().toISOString(),
  })

  await scrollToBottom(true)

  const res = await $fetch(
    `/chats/${chat.value.id}/messages`,
    'post',
    {body: content}
  )

  if (!res.error) {
    // replace optimistic message
    const index = messages.value.findIndex(m => m.temp_id === tempId)

    if (index !== -1) {
      messages.value[index] = {
        ...res.data.message,
        status: 'sent',
      }
    }
  }

}

function connectWebSocket(chatId: number) {
  channel = echo.private(`chat.${chatId}`)

  channel.listen('MessageSent', (e: any) => {
    if (e?.message?.user?.id == auth.id) {
      return
    }
    const exists = messages.value.some(
      m => m.id == e.message.id
    )

    if (!exists) {
      messages.value.push(e.message)
      scrollToBottom(true)
    }
  })
}
async function loadMore() {
  if (loading.value || !hasMore.value) return

  loading.value = true

  const oldest = messages.value[0]
  const oldHeight = messagesContainer.value.scrollHeight

  const res = await $fetch(
    `/chats/${chat.value.id}/messages`,
    'get',
    {
      before_id: oldest?.id,
      limit: '30',
    }
  )

  const newMessages = res.data.messages.reverse()

  messages.value = [...newMessages, ...messages.value]

  await nextTick()
  requestAnimationFrame(() => {
    const newHeight = messagesContainer.value.scrollHeight

    messagesContainer.value.scrollTop =
      newHeight - oldHeight
  })

  hasMore.value = res.data.has_more
  console.log(res.data.has_more)
  loading.value = false
}

onMounted(async () => {
  if (route.params.user_id) {
    chat.value = (
      await $fetch(`/chats/private/${route.params.user_id}`, 'post')
    )?.data?.chat
  }

  if (route.params.workspace_id) {
    chat.value = (
      await $fetch(`/workspaces/${route.params.workspace_id}/chat`, 'get')
    )?.data?.chat
  }

  messages.value = (
    await $fetch(`/chats/${chat.value.id}/messages`, 'get')
  )?.data?.messages.reverse()

  messagesContainer.value?.addEventListener('scroll', onScroll)

  connectWebSocket(chat.value.id)

  await scrollToBottom()
})
onBeforeUnmount(() => {
  if (channel) {
    echo.leave(`private-chat.${chat.value.id}`)
  }
})
</script>

<template>
  <main class="chat-page">
    <div class="chat-card">

      <!-- HEADER -->
      <div class="chat-header">
        <button
          @click="back()"
          class="btn btn-ghost h-9 px-3 py-0 text-sm"
        >
          ← Back
        </button>

        <div class="flex-1">
          <p class="prompt"><b>chat</b> / messages</p>
        </div>

        <span class="kbd text-xs">
          {{ chat?.messages_count }} messages
        </span>
      </div>

      <!-- BODY -->
      <div class="chat-body">

        <!-- MESSAGES -->
        <div
          ref="messagesContainer"
          class="messages-container"
        >
          <div
            v-if="messages.length === 0"
            class="flex h-full flex-col items-center justify-center gap-2"
          >
            <p class="text-xs text-[color:var(--text-2)]">no messages yet</p>
            <p class="prompt">start the conversation ↓</p>
          </div>

          <div
            v-for="message in messages"
            :key="message.id"
            class="message-row"
            :class="message?.user?.id == auth?.id ? 'message-row--mine' : ''"
          >
            <!-- avatar -->
            <img
              :src="message?.user?.avatar"
              class="h-8 w-8 flex-none rounded-[10px] border border-[color:var(--border)] object-cover"
              :alt="message?.user?.first_name"
            />

            <!-- content -->
            <div class="message-content" :class="message?.user?.id == auth?.id ? 'items-end' : ''">
              <div class="flex items-baseline gap-2"
                   :class="message?.user?.id == auth?.id ? 'flex-row-reverse' : ''">
                <span class="text-xs font-medium text-[color:var(--text-0)]">
                  {{ message?.user?.id == auth?.id ? 'You' : message?.user?.first_name }}
                </span>
                <span class="timestamp">{{ message?.time }}</span>
              </div>

              <div
                class="message-bubble mt-1"
                :class="message?.user?.id == auth?.id ? 'message-bubble--me' : ''"
              >
                <p
                  class="text-sm text-[color:var(--text-0)] whitespace-pre-wrap break-words leading-[1.45]">
                  {{ message?.body }}
                </p>
              </div>

              <span
                v-if="message?.status === 'sending'"
                class="mt-1 text-xs text-[color:var(--text-2)]"
              >
                sending…
              </span>
            </div>
          </div>
        </div>

        <!-- INPUT -->
        <form
          class="chat-input-wrapper"
          @submit.prevent="sendMessage"
        >
          <textarea
            ref="textareaRef"
            v-model="messageInput"
            rows="1"
            placeholder="Write message… "
            class="chat-input"
            @keydown="handleInputKey"
            @input="resizeTextarea"
          />

          <button
            type="submit"
            :disabled="!messageInput.trim()"
            class="btn btn-primary h-11 px-4 py-0 flex-shrink-0 text-sm"
          >
            Send
          </button>
        </form>
      </div>

    </div>
  </main>
</template>

<style scoped>
.chat-page {
  height: calc(100vh - 80px);
  padding: 16px;
}

.chat-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.015),
    rgba(255, 255, 255, 0.01)
  );
  overflow: hidden;
}

/* HEADER */
.chat-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
}

/* BODY */
.chat-body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* MESSAGES */
.messages-container {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  scroll-behavior: auto;
}

.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
}

/* MESSAGE ROW */
.message-row {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.message-row--mine {
  flex-direction: row-reverse;
}

.message-content {
  display: flex;
  flex-direction: column;
  max-width: 72%;
}

/* INPUT */
.chat-input-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 14px 16px;
  border-top: 1px solid var(--border);
  background: rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(10px);
}

.chat-input {
  flex: 1;
  resize: none;
  min-height: 44px;
  max-height: 140px;
  overflow-y: auto;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-0);
  line-height: 1.45;
  font-size: 14px;
  font-family: var(--font-ui);
  box-sizing: border-box;
  transition: border-color var(--t) ease, box-shadow var(--t) ease;
}

.chat-input::placeholder {
  color: rgba(248, 250, 252, 0.38);
}

.chat-input:focus {
  outline: none;
  border-color: rgba(var(--accent-rgb), 0.35);
  box-shadow: 0 0 0 3px rgb(var(--accent-rgb) / 0.1);
}

.chat-input::-webkit-scrollbar {
  width: 4px;
}

.chat-input::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
}
</style>
