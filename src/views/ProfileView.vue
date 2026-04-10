<script setup lang="ts"></script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-8">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <section class="lg:col-span-4">
        <div class="card p-4">
          <div class="flex items-start gap-3">
            <div
              class="inline-flex h-14 w-14 flex-none items-center justify-center rounded-[16px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] font-mono text-sm text-[color:var(--text-1)]"
            >
              EG
            </div>
            <div class="min-w-0">
              <p class="prompt">
                <b>user</b> / profile <span class="text-[color:var(--text-2)]">—</span>
                <span class="kbd">whoami</span>
              </p>
              <h1 class="truncate text-base font-semibold leading-6">Egor</h1>
              <p class="mt-1 truncate text-sm text-[color:var(--text-1)]">you@studio.dev</p>
              <p class="mt-2 text-xs text-[color:var(--text-2)]">
                Role: Owner · Workspace: Orbit Dev
              </p>
            </div>
          </div>

          <div class="my-4 divider"></div>

          <div class="grid grid-cols-2 gap-2">
            <button class="btn btn-primary" type="button">Edit profile</button>
            <button class="btn" type="button">Change password</button>
          </div>
        </div>
      </section>

      <section class="lg:col-span-8">
        <div class="card p-4">
          <header class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 class="text-sm font-semibold">Work snapshot</h2>
              <p class="mt-1 text-sm text-[color:var(--text-1)]">
                Компактная “рабочая” версия профиля: что у вас на руках.
              </p>
            </div>
            <a class="btn btn-ghost h-9 px-3 py-0 text-sm" href="./tasks-v4.html">Go to board</a>
          </header>

          <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div class="task-card">
              <p class="text-xs text-[color:var(--text-2)]">Assigned</p>
              <p class="mt-1 text-lg font-semibold">6</p>
              <p class="mt-1 text-xs text-[color:var(--text-2)]">open tasks</p>
            </div>
            <div class="task-card">
              <p class="text-xs text-[color:var(--text-2)]">In progress</p>
              <p class="mt-1 text-lg font-semibold">2</p>
              <p class="mt-1 text-xs text-[color:var(--text-2)]">WIP</p>
            </div>
            <div class="task-card">
              <p class="text-xs text-[color:var(--text-2)]">This week</p>
              <p class="mt-1 text-lg font-semibold">14</p>
              <p class="mt-1 text-xs text-[color:var(--text-2)]">messages</p>
            </div>
          </div>

          <div class="my-4 divider"></div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <article class="task-card">
              <h3 class="text-sm font-semibold">Recent activity</h3>
              <ul class="mt-3 space-y-2 text-sm text-[color:var(--text-1)]">
                <li class="flex items-start justify-between gap-3">
                  <span class="min-w-0 truncate">Updated: “Compact task editor”</span>
                  <span class="timestamp">Today</span>
                </li>
                <li class="flex items-start justify-between gap-3">
                  <span class="min-w-0 truncate">Replied in chat with Alex</span>
                  <span class="timestamp">12:05</span>
                </li>
                <li class="flex items-start justify-between gap-3">
                  <span class="min-w-0 truncate">Changed settings: notifications</span>
                  <span class="timestamp">Yesterday</span>
                </li>
              </ul>
            </article>

            <article class="task-card">
              <h3 class="text-sm font-semibold">Developer notes</h3>
              <p class="mt-3 text-sm leading-6 text-[color:var(--text-1)]">
                CollabOrbit держит UI “строгим”: тонкие границы, мягкий текст, минимум теней. Если
                нужно больше контраста — добавляем его через
                <span class="font-mono text-xs text-[color:var(--text-2)]">border</span>, не через
                белый фон.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
