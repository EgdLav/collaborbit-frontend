<script setup lang="ts">
import { computed, ref } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'
import BaseModal from '@/components/BaseModal.vue'
import { notify } from '@/services/notify.ts'
import {useAuthStore} from "@/stores/authStore";

const coworkers = ref(null)
const auth = useAuthStore()

const filters = ref({
  department: '',
  name: '',
  page: '1',
})

const pages = computed(() =>
  Array.from({ length: 5 }, (_, i) => Number(filters.value.page) - 2 + i).filter(
    (p) => p > 0 && p <= coworkers?.value?.pagination?.last_page,
  ),
)

const showInviteModal = ref(false)
const selectedUserId = ref<number | null>(null)
const workspaces = (await $fetch('/workspaces/owner', 'get'))?.data?.workspaces || []
const selectedWorkspace = ref<number | null>(null)

async function getCoworkers() {
  const response = await $fetch('/users', 'get', filters.value)
  coworkers.value = {
    ...response.data,
    users: response.data.users.filter((c: any) => c.id != auth.id),
  }
}

async function changePage(page: number) {
  if (page < 1 || page > coworkers?.value?.pagination?.last_page) return

  filters.value.page = String(page)
  await getCoworkers()
}

async function openInvite(userId: number) {
  selectedUserId.value = userId
  showInviteModal.value = true
}

async function sendInvite() {
  if (!selectedWorkspace.value || !selectedUserId.value) return

  const res = await $fetch(`/workspaces/${selectedWorkspace.value}/invitations`, 'post', {
    invitee_id: selectedUserId.value,
  })

  if (!res.error) {
    notify(res.message, 'success')
    showInviteModal.value = false
    selectedWorkspace.value = null
  }
}

getCoworkers()
</script>
<template>
  <main class="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-12">
    <!-- Sidebar / Filters -->
    <aside class="sidebar lg:col-span-3">
      <div class="px-4 py-4">
        <h2 class="text-sm font-semibold">Filters</h2>

        <!-- Search -->
        <div class="mt-4">
          <input
            class="input h-9 px-3 py-0 text-sm"
            type="search"
            placeholder="Search coworkers…"
            aria-label="Search coworkers"
            v-model="filters.name"
            @change="getCoworkers()"
          />
        </div>

        <!-- Department Filter -->
        <div class="mt-6">
          <h3 class="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-2)]">
            Department
          </h3>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value=""
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">All</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Backend Development"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Backend Development</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Frontend Development"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Frontend Development</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Engineering"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Engineering</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Mobile Development"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Mobile Development</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="DevOps"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">DevOps</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Quality Assurance"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Quality Assurance</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Data Engineering"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Data Engineering</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Data Science"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Data Science</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Product Management"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Product Management</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="UI/UX Design"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">UI/UX Design</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Graphic Design"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Graphic Design</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Research & Analytics"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Research & Analytics</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Marketing"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Marketing</span>
            </label>

            <label class="flex items-center gap-2">
              <input type="radio" name="department" value="Sales" v-model="filters.department" @change="getCoworkers()"/>
              <span class="text-sm">Sales</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Business Development"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Business Development</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Human Resources"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Human Resources</span>
            </label>

            <label class="flex items-center gap-2">
              <input type="radio" name="department" value="Finance" v-model="filters.department" @change="getCoworkers()"/>
              <span class="text-sm">Finance</span>
            </label>

            <label class="flex items-center gap-2">
              <input type="radio" name="department" value="Legal" v-model="filters.department" @change="getCoworkers()"/>
              <span class="text-sm">Legal</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Operations"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Operations</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Public Relations"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Public Relations</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Copywriting"
                v-model="filters.department"
                @change="getCoworkers()"
              />
              <span class="text-sm">Copywriting</span>
            </label>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="lg:col-span-9">
      <div class="mb-6">
        <h1 class="text-2xl font-semibold">Find Coworkers</h1>
        <p class="mt-1 text-sm text-[color:var(--text-2)]">
          Discover your team and start collaborating
        </p>
      </div>

      <!-- Sort / View Options -->
      <div class="mb-6 flex items-center justify-between gap-3">
        <div class="flex gap-2">
          <button class="btn btn-ghost h-9 px-3 py-0 text-xs" type="button">A–Z</button>
          <button class="btn btn-ghost h-9 px-3 py-0 text-xs" type="button">
            In your workspaces
          </button>
        </div>
      </div>

      <!-- Coworker Grid -->
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Coworker Card -->
        <div
          class="card p-4 transition-all duration-200 hover:border-[rgb(var(--accent-rgb)_/_0.33)]"
          v-for="coworker in coworkers?.users"
          :key="coworker?.id"
        >
          <div class="flex items-start justify-between gap-2 mb-3">
            <span
              class="inline-flex h-12 w-12 flex-none items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] font-semibold text-sm text-[color:var(--text-1)]"
            >
              <img
                :src="coworker?.avatar"
                alt=""
                class="inline-flex h-12 w-12 flex-none items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] font-semibold text-sm text-[color:var(--text-1)]"
              />
            </span>
            <span class="badge badge-todo h-fit">
              <span class="badge-dot"></span>
              Online
            </span>
          </div>
          <h3 class="font-semibold text-sm">
            {{ coworker?.first_name }} {{ coworker?.last_name }}
          </h3>
          <p class="mt-1 text-xs text-[color:var(--text-2)]">{{ coworker?.department }}</p>
          <p class="mt-2 text-xs text-[color:var(--text-2)]">{{ coworker?.bio }}</p>
          <div class="mt-4 flex gap-2">
            <button
              class="btn btn-primary w-full h-8 px-3 py-0 text-xs"
              type="button"
            >
              Message
            </button>

            <button
              class="btn btn-ghost w-full h-8 px-3 py-0 text-xs"
              type="button"
            >
              Profile
            </button>

            <!-- 🔥 NEW -->
            <button
              class="btn btn-ghost w-full h-8 px-3 py-0 text-xs"
              type="button"
              @click="openInvite(coworker.id)"
            >
              Invite
            </button>
          </div>
        </div>
      </div>

      <!-- Replace the "Load More" section with: -->
      <div class="mt-8 flex items-center justify-center gap-2">
        <button
          class="btn btn-ghost h-9 px-3 py-0 text-xs"
          type="button"
          @click="changePage((Number(filters.page) || 1) - 1)"
        >
          ← Previous
        </button>
        <div class="flex gap-1">
          <button
            v-for="i in pages"
            :key="i"
            class="btn h-9 px-3 py-0 text-xs"
            :class="coworkers?.pagination?.current_page === i ? 'btn-primary' : 'btn-ghost'"
            @click="changePage(Number(i) || 1)"
            type="button"
          >
            {{ i }}
          </button>
        </div>
        <button
          class="btn btn-ghost h-9 px-3 py-0 text-xs"
          type="button"
          @click="changePage((Number(filters.page) || 1) + 1)"
        >
          Next →
        </button>
      </div>
    </div>
    <BaseModal v-model="showInviteModal">
      <h2 class="text-sm font-semibold">
        Invite user
      </h2>

      <p class="mt-2 text-sm text-[color:var(--text-1)]">
        Choose workspace to invite this person into your controlled chaos.
      </p>

      <div class="mt-4">
        <select
          class="input w-full"
          v-model="selectedWorkspace"
        >
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
        <button
          class="btn h-9 px-3 text-sm"
          @click="showInviteModal = false"
        >
          Cancel
        </button>

        <button
          class="btn btn-primary h-9 px-3 text-sm"
          @click="sendInvite"
        >
          Send invite
        </button>
      </div>
    </BaseModal>
  </main>
</template>

<style scoped>
</style>
