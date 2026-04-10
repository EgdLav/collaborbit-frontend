<script setup lang="ts"></script>

<template>
  <main class="mx-auto max-w-[1400px] px-4 py-4">
    <div
      class="card p-3"
      style="
        background-image:
          radial-gradient(900px 520px at 20% 0%, rgb(var(--accent-rgb) / 0.12), transparent 60%),
          repeating-radial-gradient(
            circle at 0 0,
            rgb(255 255 255 / 0.03) 0,
            rgb(255 255 255 / 0.03) 1px,
            transparent 1px,
            transparent 18px
          );
      "
    >
      <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p class="prompt"><b>board</b> / v4-10 — <span class="kbd">matrix</span></p>
          <h1 class="mt-1 text-base font-semibold">Kanban</h1>
          <p class="mt-1 text-sm text-[color:var(--text-1)]">
            Сетка “точками”, более агрессивный terminal feel (но без кричащих градиентов).
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <input
            class="input h-9 w-[260px] px-3 py-0 text-sm"
            type="search"
            placeholder="search…"
            aria-label="Search tasks"
          />
          <button class="btn btn-primary h-9 px-3 py-0 text-sm" type="button">New</button>
        </div>
      </div>
    </div>

    <section class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
      <section
        class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(255,255,255,0.02)]"
      >
        <header class="border-b border-dashed border-[color:var(--border)] px-3 py-3">
          <p class="text-sm font-semibold">
            To Do <span class="text-xs text-[color:var(--text-2)]">5</span>
          </p>
        </header>
        <div class="p-3 space-y-2">
          <article
            class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(0,0,0,0.18)] px-3 py-2"
          >
            <p class="text-sm font-semibold">Email verification screen</p>
            <p class="mt-2 text-xs text-[color:var(--text-2)]">#auth · P1 · 1d</p>
          </article>
          <article
            class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(0,0,0,0.18)] px-3 py-2"
          >
            <p class="text-sm font-semibold">Invite members modal</p>
            <p class="mt-2 text-xs text-[color:var(--text-2)]">#workspace · P2 · 2d</p>
          </article>
        </div>
      </section>

      <section
        class="rounded-[10px] border border-dashed border-[color:rgb(var(--accent-rgb)/0.28)] bg-[color:rgb(var(--accent-rgb)/0.06)]"
      >
        <header class="border-b border-dashed border-[color:rgb(var(--accent-rgb)/0.28)] px-3 py-3">
          <p class="text-sm font-semibold">
            In Progress <span class="text-xs text-[color:var(--text-2)]">3</span>
          </p>
        </header>
        <div class="p-3 space-y-2">
          <article
            class="rounded-[10px] border border-dashed border-[color:rgb(var(--accent-rgb)/0.28)] bg-[rgba(0,0,0,0.16)] px-3 py-2"
          >
            <p class="text-sm font-semibold">Compact task editor</p>
            <p class="mt-2 text-xs text-[color:var(--text-2)]">#tasks · owner egor</p>
          </article>
          <article
            class="rounded-[10px] border border-dashed border-[color:rgb(var(--accent-rgb)/0.28)] bg-[rgba(0,0,0,0.16)] px-3 py-2"
          >
            <p class="text-sm font-semibold">Board column headers</p>
            <p class="mt-2 text-xs text-[color:var(--text-2)]">#ui · 0.5d</p>
          </article>
        </div>
      </section>

      <section
        class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(255,255,255,0.02)]"
      >
        <header class="border-b border-dashed border-[color:var(--border)] px-3 py-3">
          <div class="flex items-center justify-between gap-3">
            <p class="text-sm font-semibold">
              Done <span class="text-xs text-[color:var(--text-2)]">4</span>
            </p>
            <button class="btn btn-ghost h-8 px-2 py-0 text-xs" type="button">Archive</button>
          </div>
        </header>
        <div class="p-3 space-y-2">
          <article
            class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(0,0,0,0.18)] px-3 py-2"
          >
            <p class="text-sm font-semibold">Login error states</p>
            <p class="mt-2 text-xs text-[color:var(--text-2)]">#auth · merged</p>
          </article>
          <article
            class="rounded-[10px] border border-dashed border-[color:var(--border)] bg-[rgba(0,0,0,0.18)] px-3 py-2"
          >
            <p class="text-sm font-semibold">Sidebar navigation</p>
            <p class="mt-2 text-xs text-[color:var(--text-2)]">#layout · ok</p>
          </article>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped></style>
