<script setup lang="ts">
import { computed, ref } from 'vue'
import { $fetch } from '@/fetch/fetch.ts'

const coworkers = ref(null)
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
async function getCoworkers() {
  const response = await $fetch('/users', 'get', filters.value)
  coworkers.value = response.data
}

async function changePage(page: number) {
  if (page < 1 || page > coworkers?.value?.pagination?.last_page) {
    return
  }
  filters.value.page = String(page)
  await getCoworkers()
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
              />
              <span class="text-sm">Data Engineering</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Data Science"
                v-model="filters.department"
              />
              <span class="text-sm">Data Science</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Product Management"
                v-model="filters.department"
              />
              <span class="text-sm">Product Management</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="UI/UX Design"
                v-model="filters.department"
              />
              <span class="text-sm">UI/UX Design</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Graphic Design"
                v-model="filters.department"
              />
              <span class="text-sm">Graphic Design</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Research & Analytics"
                v-model="filters.department"
              />
              <span class="text-sm">Research & Analytics</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Marketing"
                v-model="filters.department"
              />
              <span class="text-sm">Marketing</span>
            </label>

            <label class="flex items-center gap-2">
              <input type="radio" name="department" value="Sales" v-model="filters.department" />
              <span class="text-sm">Sales</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Business Development"
                v-model="filters.department"
              />
              <span class="text-sm">Business Development</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Human Resources"
                v-model="filters.department"
              />
              <span class="text-sm">Human Resources</span>
            </label>

            <label class="flex items-center gap-2">
              <input type="radio" name="department" value="Finance" v-model="filters.department" />
              <span class="text-sm">Finance</span>
            </label>

            <label class="flex items-center gap-2">
              <input type="radio" name="department" value="Legal" v-model="filters.department" />
              <span class="text-sm">Legal</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Operations"
                v-model="filters.department"
              />
              <span class="text-sm">Operations</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Public Relations"
                v-model="filters.department"
              />
              <span class="text-sm">Public Relations</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                name="department"
                value="Copywriting"
                v-model="filters.department"
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
            <button class="btn btn-primary w-full h-8 px-3 py-0 text-xs" type="button">
              Message
            </button>
            <button class="btn btn-ghost w-full h-8 px-3 py-0 text-xs" type="button">
              Profile
            </button>
          </div>
        </div>

        <!-- Coworker Card -->
        <div
          class="card p-4 transition-all duration-200 hover:border-[rgb(var(--accent-rgb)_/_0.33)]"
        >
          <div class="flex items-start justify-between gap-2 mb-3">
            <span
              class="inline-flex h-12 w-12 flex-none items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] font-semibold text-sm text-[color:var(--text-1)]"
            >
              IK
            </span>
            <span class="badge badge-progress h-fit">
              <span class="badge-dot"></span>
              Away
            </span>
          </div>
          <h3 class="font-semibold text-sm">Indie Kitchen</h3>
          <p class="mt-1 text-xs text-[color:var(--text-2)]">Product Manager</p>
          <p class="mt-2 text-xs text-[color:var(--text-2)]">Strategy • Analytics • UX</p>
          <div class="mt-4 flex gap-2">
            <button class="btn btn-primary w-full h-8 px-3 py-0 text-xs" type="button">
              Message
            </button>
            <button class="btn btn-ghost w-full h-8 px-3 py-0 text-xs" type="button">
              Profile
            </button>
          </div>
        </div>

        <!-- Coworker Card -->
        <div
          class="card p-4 transition-all duration-200 hover:border-[rgb(var(--accent-rgb)_/_0.33)]"
        >
          <div class="flex items-start justify-between gap-2 mb-3">
            <span
              class="inline-flex h-12 w-12 flex-none items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] font-semibold text-sm text-[color:var(--text-1)]"
            >
              SN
            </span>
            <span class="badge badge-done h-fit">
              <span class="badge-dot"></span>
              Online
            </span>
          </div>
          <h3 class="font-semibold text-sm">Sarah Ng</h3>
          <p class="mt-1 text-xs text-[color:var(--text-2)]">UX Designer</p>
          <p class="mt-2 text-xs text-[color:var(--text-2)]">Figma • Accessibility • Prototyping</p>
          <div class="mt-4 flex gap-2">
            <button class="btn btn-primary w-full h-8 px-3 py-0 text-xs" type="button">
              Message
            </button>
            <button class="btn btn-ghost w-full h-8 px-3 py-0 text-xs" type="button">
              Profile
            </button>
          </div>
        </div>

        <!-- Coworker Card -->
        <div
          class="card p-4 transition-all duration-200 hover:border-[rgb(var(--accent-rgb)_/_0.33)]"
        >
          <div class="flex items-start justify-between gap-2 mb-3">
            <span
              class="inline-flex h-12 w-12 flex-none items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] font-semibold text-sm text-[color:var(--text-1)]"
            >
              JM
            </span>
            <span class="badge h-fit">
              <span class="badge-dot"></span>
              Offline
            </span>
          </div>
          <h3 class="font-semibold text-sm">James Miller</h3>
          <p class="mt-1 text-xs text-[color:var(--text-2)]">DevOps Engineer</p>
          <p class="mt-2 text-xs text-[color:var(--text-2)]">Kubernetes • AWS • CI/CD</p>
          <div class="mt-4 flex gap-2">
            <button class="btn btn-primary w-full h-8 px-3 py-0 text-xs" type="button">
              Message
            </button>
            <button class="btn btn-ghost w-full h-8 px-3 py-0 text-xs" type="button">
              Profile
            </button>
          </div>
        </div>

        <!-- Coworker Card -->
        <div
          class="card p-4 transition-all duration-200 hover:border-[rgb(var(--accent-rgb)_/_0.33)]"
        >
          <div class="flex items-start justify-between gap-2 mb-3">
            <span
              class="inline-flex h-12 w-12 flex-none items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] font-semibold text-sm text-[color:var(--text-1)]"
            >
              EM
            </span>
            <span class="badge badge-todo h-fit">
              <span class="badge-dot"></span>
              Online
            </span>
          </div>
          <h3 class="font-semibold text-sm">Emma Chen</h3>
          <p class="mt-1 text-xs text-[color:var(--text-2)]">QA Specialist</p>
          <p class="mt-2 text-xs text-[color:var(--text-2)]">
            Testing • Automation • Documentation
          </p>
          <div class="mt-4 flex gap-2">
            <button class="btn btn-primary w-full h-8 px-3 py-0 text-xs" type="button">
              Message
            </button>
            <button class="btn btn-ghost w-full h-8 px-3 py-0 text-xs" type="button">
              Profile
            </button>
          </div>
        </div>

        <!-- Coworker Card -->
        <div
          class="card p-4 transition-all duration-200 hover:border-[rgb(var(--accent-rgb)_/_0.33)]"
        >
          <div class="flex items-start justify-between gap-2 mb-3">
            <span
              class="inline-flex h-12 w-12 flex-none items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] font-semibold text-sm text-[color:var(--text-1)]"
            >
              DL
            </span>
            <span class="badge badge-progress h-fit">
              <span class="badge-dot"></span>
              Away
            </span>
          </div>
          <h3 class="font-semibold text-sm">David Lee</h3>
          <p class="mt-1 text-xs text-[color:var(--text-2)]">Backend Engineer</p>
          <p class="mt-2 text-xs text-[color:var(--text-2)]">Node.js • Databases • APIs</p>
          <div class="mt-4 flex gap-2">
            <button class="btn btn-primary w-full h-8 px-3 py-0 text-xs" type="button">
              Message
            </button>
            <button class="btn btn-ghost w-full h-8 px-3 py-0 text-xs" type="button">
              Profile
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
  </main>
</template>

<style scoped>
.coworkers-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  margin-bottom: 30px;
}

.header h1 {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.header p {
  color: #666;
  margin: 0;
}

.search-section {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
}

.search-input,
.filter-select {
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.filter-select {
  min-width: 150px;
}

.coworkers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.coworker-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: box-shadow 0.3s;
}

.coworker-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 20px;
  margin: 0 auto 16px;
}

.coworker-card h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
}

.role {
  margin: 4px 0;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.department {
  margin: 4px 0 16px 0;
  font-size: 12px;
  color: #999;
  text-transform: capitalize;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-primary,
.btn-secondary {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 500;
}

.no-results {
  text-align: center;
  color: #999;
  padding: 40px 20px;
}
</style>
