<script setup lang="ts">
import { ref } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import { useRouter } from 'vue-router'
import { notify } from '@/services/notify.ts'
import BaseModal from '@/components/BaseModal.vue'

const router = useRouter()

const showDeleteModal = ref(false)

const user = ref({
  first_name: '',
  last_name: '',
  email: '',
  department: '',
  bio: '',
})

const stats = ref({
  workspaces: 0,
  tasks: 0,
  completed_tasks: 0,
})
const departments = [
  'Backend Development',
  'Frontend Development',
  'Engineering',
  'Mobile Development',
  'DevOps',
  'Quality Assurance',
  'Data Engineering',
  'Data Science',
  'Product Management',
  'UI/UX Design',
  'Graphic Design',
  'Research & Analytics',
  'Marketing',
  'Sales',
  'Business Development',
  'Human Resources',
  'Finance',
  'Legal',
  'Operations',
  'Public Relations',
  'Copywriting',
]
const preview = ref<string | null>(null)

async function getProfile() {
  const res = await $fetch('/profile', 'get')
  user.value = res.data.user
  stats.value = res.data.user.statistics
  preview.value = res.data.user.avatar
}

async function save(e: Event) {
  const form = e.target as HTMLFormElement
  const res = await $fetch('/profile', 'post', new FormData(form))

  if (!res.error) notify(res.message, 'success')
}

async function back() {
  if (document.referrer) {
    router.back()
  } else {
    await router.push('/workspaces')
  }
}

async function deleteProfile() {
  const res = await $fetch('/profile', 'delete')

  if (!res.error) {
    notify('Account deleted. Bye', 'success')
    await router.push('/register')
  }
}
function onAvatarChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return
  preview.value = URL.createObjectURL(file)
}

getProfile()
</script>

<template>
  <main class="mx-auto max-w-5xl px-4 py-6">

    <!-- HEADER -->
    <section class="card p-4">
      <p class="prompt">
        <b>user</b> / settings
      </p>

      <h1 class="mt-1 text-lg font-semibold">
        Identity Control Panel
      </h1>

      <p class="mt-1 text-sm text-[color:var(--text-1)]">
        Manage your digital existence before it manages you.
      </p>
    </section>

    <form @submit.prevent="save">
      <input type="hidden" name="_method" value="patch">
      <section class="mt-4 space-y-4">

        <!-- PROFILE -->
        <article class="card p-4">
          <h2 class="text-sm font-semibold">Profile</h2>

          <div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label>
              <span class="text-sm text-[color:var(--text-1)]">First name</span>
              <input class="input mt-1"
                     name="first_name"
                     v-model="user.first_name"
                     placeholder="John" />
            </label>

            <label>
              <span class="text-sm text-[color:var(--text-1)]">Last name</span>
              <input class="input mt-1"
                     name="last_name"
                     v-model="user.last_name"
                     placeholder="Kirov" />
            </label>
          </div>

          <label class="mt-3 block">
            <span class="text-sm text-[color:var(--text-1)]">Email</span>
            <input class="input mt-1"
                   name="email"
                   v-model="user.email"
                   placeholder="collab@orbit.com" />
          </label>

          <label class="mt-3 block">
            <span class="text-sm text-[color:var(--text-1)]">Department</span>
            <select
              class="input mt-1"
              name="department"
              v-model="user.department"
            >
              <option
                v-for="dep in departments"
                :key="dep"
                :value="dep"
              >
                {{ dep }}
              </option>
            </select>
          </label>

          <label class="mt-3 block">
            <span class="text-sm text-[color:var(--text-1)]">Bio</span>
            <textarea class="input mt-1 min-h-[100px]"
                      name="bio"
                      v-model="user.bio"
                      placeholder="Write something impressive"></textarea>
          </label>
          <div>
            <label class="mb-2 block text-sm text-[color:var(--text-1)]" for="avatar">Avatar</label>
            <div class="flex flex-col gap-3">
              <input
                class="input"
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                @change="onAvatarChange"
              />
              <div v-if="preview" class="flex justify-center">
                <img
                  :src="preview"
                  alt="Avatar preview"
                  class="h-24 w-24 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </article>

        <!-- STATS -->
        <article class="card p-4">
          <h2 class="text-sm font-semibold">Life statistics</h2>

          <div class="mt-3 grid grid-cols-3 gap-3">
            <div class="card p-3">
              <p class="text-xs text-[color:var(--text-2)]">Workspaces</p>
              <p class="text-lg font-semibold">{{ stats.workspaces ?? 0 }}</p>
            </div>

            <div class="card p-3">
              <p class="text-xs text-[color:var(--text-2)]">Tasks executed</p>
              <p class="text-lg font-semibold">{{ stats.tasks_executed ?? 0 }}</p>
            </div>
            <div class="card p-3">
              <p class="text-xs text-[color:var(--text-2)]">Chats</p>
              <p class="text-lg font-semibold">{{ stats.chats ?? 0 }}</p>
            </div>
          </div>
        </article>

        <!-- ACTIONS (ONE LINE) -->
        <article class="card p-4">
          <div class="flex flex-wrap items-center gap-2">

            <button class="btn btn-primary h-9 px-3 text-sm" type="submit">
              Save changes
            </button>

            <button class="btn h-9 px-3 text-sm" type="button" @click="back">
              Exit without changes
            </button>

            <!-- subtle danger button -->
            <button
              class="ml-auto h-9 px-3 text-sm text-red-400 hover:text-red-300 opacity-60 hover:opacity-100 transition"
              type="button"
              @click="showDeleteModal = true"
            >
              Delete account
            </button>

          </div>
        </article>

      </section>
    </form>

    <!-- DELETE MODAL -->
    <BaseModal v-model="showDeleteModal">
      <h2 class="text-sm font-semibold text-red-500">
        Final decision
      </h2>

      <p class="mt-2 text-sm text-[color:var(--text-1)]">
        You are about to delete your account.
        This removes everything: workspaces, tasks, memories, hopes.
      </p>

      <p class="mt-1 text-xs text-[color:var(--text-2)]">
        After this, even database will pretend you never existed.
      </p>

      <div class="mt-4 flex justify-end gap-2">
        <button class="btn h-9 px-3 text-sm" @click="showDeleteModal = false">
          I changed my mind
        </button>

        <button class="btn btn-danger h-9 px-3 text-sm" @click="deleteProfile">
          Yes, delete me
        </button>
      </div>
    </BaseModal>

  </main>
</template>

<style scoped></style>
