<script setup lang="ts"></script>

<template>
  <main class="mx-auto max-w-[1400px] px-4 py-4">
    <section class="card p-4">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p class="prompt"><b>workspace</b> / orbit-product <span class="kbd">active</span></p>
          <h1 class="mt-1 text-lg font-semibold">Orbit Product Team</h1>
          <p class="mt-1 text-sm text-[color:var(--text-1)]">
            Roadmap, release management and weekly execution.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs text-[color:var(--text-2)] sm:grid-cols-4">
          <span class="kbd justify-center">12 coworkers</span>
          <span class="kbd justify-center">34 tasks</span>
          <span class="kbd justify-center">8 in progress</span>
          <span class="kbd justify-center">5 done this week</span>
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
          >
            <p class="text-sm font-medium">Egor</p>
            <p class="text-xs text-[color:var(--text-2)]">Owner · Product</p>
          </article>
          <article
            class="rounded-[10px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.02)] px-3 py-2"
          >
            <p class="text-sm font-medium">Anna</p>
            <p class="text-xs text-[color:var(--text-2)]">Designer</p>
          </article>
          <article
            class="rounded-[10px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.02)] px-3 py-2"
          >
            <p class="text-sm font-medium">Mark</p>
            <p class="text-xs text-[color:var(--text-2)]">Frontend</p>
          </article>
          <article
            class="rounded-[10px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.02)] px-3 py-2"
          >
            <p class="text-sm font-medium">Ira</p>
            <p class="text-xs text-[color:var(--text-2)]">QA</p>
          </article>
        </div>
      </aside>

      <section class="xl:col-span-3">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <section
            class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(255,255,255,0.02)]"
          >
            <header class="border-b border-dashed border-[color:var(--border)] px-3 py-3">
              <p class="text-sm font-semibold">
                To Do <span class="text-xs text-[color:var(--text-2)]">6</span>
              </p>
            </header>
            <div class="space-y-2 p-3">
              <article
                class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(0,0,0,0.18)] px-3 py-2"
              >
                <p class="text-sm font-semibold">Onboarding checklist</p>
                <p class="mt-2 text-xs text-[color:var(--text-2)]">#product · Anna · 2d</p>
              </article>
              <article
                class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(0,0,0,0.18)] px-3 py-2"
              >
                <p class="text-sm font-semibold">Workspace analytics card</p>
                <p class="mt-2 text-xs text-[color:var(--text-2)]">#ui · Mark · 1d</p>
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
