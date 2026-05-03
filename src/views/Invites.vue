<script setup lang="ts">
import {$fetch} from "@/fetch/fetch";
import {ref} from "vue";
import {notify} from "@/services/notify";

const invitations = ref(null)
async function getInvitations() {
  invitations.value = (await $fetch('/invitations'))?.data?.invitations
}
async function answer(invite, status) {
  const res = await $fetch(`/workspaces/${invite?.workspace?.id}/invitations/${invite.id}`, 'PATCH', {
    status,
  })

  if (!res.error) {
    notify(res.message, 'success')
    await getInvitations()
  }
}

await getInvitations()
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-4">
    <section class="card p-4">
      <p class="prompt"><b>workspace</b> / invites</p>
      <h1 class="mt-1 text-lg font-semibold">Your Invites</h1>
    </section>

    <section class="mt-4 space-y-3">
      <article class="card p-4" v-for="invite in invitations">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-base font-semibold">{{invite?.workspace?.name}}</p>
            <p class="mt-1 text-sm text-[color:var(--text-2)]">
              {{invite?.workspace?.description}}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn btn-primary h-9 px-3 py-0 text-sm" type="button" @click="answer(invite, 'accepted')">Accept</button>
            <button class="btn btn-danger h-9 px-3 py-0 text-sm" type="button" @click="answer(invite, 'declined')">Decline</button>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped></style>
