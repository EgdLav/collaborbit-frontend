<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { $fetch } from '@/fetch/fetch.ts'
import BaseModal from '@/components/BaseModal.vue'
import { notify } from '@/services/notify.ts'

const route = useRoute()

const user = ref<any>(null)
const stats = ref<any>({})

const showInviteModal = ref(false)
const workspaces = (await $fetch('/workspaces/owner', 'get'))?.data?.workspaces || []
const selectedWorkspace = ref<number | null>(null)

async function getUser() {
  const res = await $fetch(`/users/${route.params.id}`, 'get')
  user.value = res.data.user
  stats.value = res.data.user.statistics || {}
}

async function openInvite() {
  showInviteModal.value = true
}

async function sendInvite() {
  if (!selectedWorkspace.value) return

  const res = await $fetch(`/workspaces/${selectedWorkspace.value}/invitations`, 'post', {
    invitee_id: (route.params.id).toString(),
  })

  if (!res.error) {
    notify(res.message, 'success')
    showInviteModal.value = false
    selectedWorkspace.value = null
  }
}

getUser()
</script>

<template>
  <main class="mx-auto max-w-4xl px-4 py-6">

    <section class="card p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">

      <img
        :src="user?.avatar"
        alt=""
        class="h-24 w-24 rounded-full object-cover"
      />

      <div class="flex-1 text-center sm:text-left">
        <h1 class="text-xl font-semibold">
          {{ user?.first_name }} {{ user?.last_name }}
        </h1>

        <p class="text-sm text-[color:var(--text-2)] mt-1">
          {{ user?.department }}
        </p>

        <p class="mt-3 text-sm text-[color:var(--text-1)]">
          {{ user?.bio || 'No thoughts. Just existence.' }}
        </p>

        <div class="mt-4 flex gap-2 justify-center sm:justify-start">
          <button class="btn btn-primary h-9 px-3 text-sm">
            Message
          </button>

          <button
            class="btn btn-ghost h-9 px-3 text-sm"
            @click="openInvite"
          >
            Invite
          </button>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="mt-4 grid grid-cols-3 gap-3">
      <div class="card p-4 text-center">
        <p class="text-xs text-[color:var(--text-2)]">Workspaces</p>
        <p class="text-lg font-semibold">{{ stats.workspaces ?? 0 }}</p>
      </div>

      <div class="card p-4 text-center">
        <p class="text-xs text-[color:var(--text-2)]">Tasks executed</p>
        <p class="text-lg font-semibold">{{ stats.tasks_executed ?? 0 }}</p>
      </div>

      <div class="card p-4 text-center">
        <p class="text-xs text-[color:var(--text-2)]">Tasks created</p>
        <p class="text-lg font-semibold">{{ stats.tasks_created ?? 0 }}</p>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="card p-4 mt-4">
      <h2 class="text-sm font-semibold">About</h2>

      <p class="mt-2 text-sm text-[color:var(--text-1)]">
        {{ user?.bio || 'Nothing to say. Silence is also a statement.' }}
      </p>
    </section>

    <BaseModal v-model="showInviteModal">
      <h2 class="text-sm font-semibold">
        Invite to workspace
      </h2>

      <p class="mt-2 text-sm text-[color:var(--text-1)]">
        Choose where this person should exist next.
      </p>

      <div class="mt-4">
        <select class="input w-full" v-model="selectedWorkspace">
          <option
            v-for="ws in workspaces"
            :key="ws.id"
            :value="ws.id"
          >
            {{ ws.name }}
          </option>
        </select>
      </div>

      <div class="mt-4 flex justify-end gap-2">
        <button class="btn h-9 px-3 text-sm" @click="showInviteModal = false">
          Cancel
        </button>

        <button class="btn btn-primary h-9 px-3 text-sm" @click="sendInvite">
          Send invite
        </button>
      </div>
    </BaseModal>

  </main>
</template>

<style scoped></style>
