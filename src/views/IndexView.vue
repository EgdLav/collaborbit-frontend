<script setup lang="ts"></script>

<template>
  <main class="mx-auto max-w-6xl px-4">
    <!-- Hero -->
    <section class="py-12 sm:py-16">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <p
            class="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] px-3 py-1 text-xs text-[color:var(--text-2)]"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-[color:rgb(var(--accent-rgb)/0.75)]"></span>
            Dark-first UI для команд, которые ценят фокус
          </p>
          <p class="prompt mb-2">
            <b>collaborbit</b> / landing <span class="text-[color:var(--text-2)]">—</span>
            <span class="kbd">/start</span>
          </p>
          <h1 class="text-balance text-3xl font-semibold leading-tight sm:text-4xl">
            Простой рабочий орбит для задач и разговоров — без лишнего.
          </h1>
          <p class="mt-3 max-w-2xl text-pretty text-[15px] leading-6 text-[color:var(--text-1)]">
            CollabOrbit — компактный SaaS: канбан для текущей работы и чат рядом. Строгая
            типографика, аккуратные статусы, мягкие акценты и плотный интерфейс.
          </p>

          <div class="mt-6 flex flex-wrap items-center gap-2">
            <a class="btn btn-primary" href="./register.html">Create workspace</a>
            <a class="btn" href="./login.html">Sign in</a>
            <a class="btn btn-ghost" href="./tasks-v4.html">View demo board</a>
          </div>

          <div class="mt-6 flex flex-wrap gap-3 text-xs text-[color:var(--text-2)]">
            <span class="inline-flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-[rgba(138,180,255,0.65)]"></span>
              быстрые статусы
            </span>
            <span class="inline-flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-[rgba(251,191,36,0.6)]"></span>
              без шума и “дриббла”
            </span>
            <span class="inline-flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-[rgba(110,231,183,0.55)]"></span>
              плотная верстка
            </span>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="card p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold">Today</p>
                <p class="text-xs text-[color:var(--text-2)]">Workspace snapshot</p>
              </div>
              <span class="badge badge-progress"><span class="badge-dot"></span>In Progress</span>
            </div>
            <div class="mt-4 space-y-2">
              <div class="task-card">
                <div class="flex items-start justify-between gap-3">
                  <p class="text-sm font-medium">Ship auth flow</p>
                  <span class="badge badge-todo"><span class="badge-dot"></span>To Do</span>
                </div>
                <p class="mt-1 text-xs text-[color:var(--text-2)]">
                  Email + password, errors, focus states.
                </p>
              </div>
              <div class="task-card">
                <div class="flex items-start justify-between gap-3">
                  <p class="text-sm font-medium">Kanban density pass</p>
                  <span class="badge badge-progress"
                    ><span class="badge-dot"></span>In Progress</span
                  >
                </div>
                <p class="mt-1 text-xs text-[color:var(--text-2)]">
                  Compact cards, consistent spacing tokens.
                </p>
              </div>
              <div class="task-card">
                <div class="flex items-start justify-between gap-3">
                  <p class="text-sm font-medium">Chat timestamps</p>
                  <span class="badge badge-done"><span class="badge-dot"></span>Done</span>
                </div>
                <p class="mt-1 text-xs text-[color:var(--text-2)]">
                  Avatar, time, subtle bubble styling.
                </p>
              </div>
            </div>
          </div>
          <p class="mt-3 text-xs text-[color:var(--text-2)]">
            Минимум иллюстраций. Максимум читаемости.
          </p>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="pb-12">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article class="card p-4">
          <h2 class="text-sm font-semibold">Tasks that stay readable</h2>
          <p class="mt-2 text-sm leading-6 text-[color:var(--text-1)]">
            Канбан без лишнего: статусы, компактные карточки, предсказуемые отступы.
          </p>
          <div class="mt-3 text-xs text-[color:var(--text-2)]">
            Spacing: 4 / 8 / 12 / 16 / 24 / 32
          </div>
        </article>

        <article class="card p-4">
          <h2 class="text-sm font-semibold">Chat next to the work</h2>
          <p class="mt-2 text-sm leading-6 text-[color:var(--text-1)]">
            Сообщения рядом с задачами. Bubble без мультяшности, аккуратные timestamp.
          </p>
          <div class="mt-3 text-xs text-[color:var(--text-2)]">Subtle transitions: 150–200ms</div>
        </article>

        <article class="card p-4">
          <h2 class="text-sm font-semibold">Engineer-friendly dark UI</h2>
          <p class="mt-2 text-sm leading-6 text-[color:var(--text-1)]">
            Глубокий фон, мягкий текст через opacity, тонкие границы. Никаких резких контрастов.
          </p>
          <div class="mt-3 text-xs text-[color:var(--text-2)]">
            Theme: <span class="font-mono text-[color:rgb(var(--accent-rgb)/0.9)]">landing</span>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
