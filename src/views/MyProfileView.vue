<script setup lang="ts"></script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-8">
    <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <p class="prompt">
          <b>config</b> / user <span class="text-[color:var(--text-2)]">—</span>
          <span class="kbd">apply()</span>
        </p>
        <h1 class="text-lg font-semibold">Settings</h1>
        <p class="mt-1 text-sm text-[color:var(--text-1)]">
          Строгие, плотные настройки. Без декоративных анимаций.
        </p>
      </div>
      <button class="btn btn-primary h-9 px-4 py-0 text-sm" type="button">Save</button>
    </div>

    <div class="my-4 divider"></div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <aside class="lg:col-span-4">
        <nav class="card p-3">
          <a
            class="block rounded-[10px] px-3 py-2 text-sm text-[color:var(--text-1)] transition-colors duration-200 hover:bg-[rgba(255,255,255,0.04)]"
            href="#notifications"
            >Notifications</a
          >
          <a
            class="block rounded-[10px] px-3 py-2 text-sm text-[color:var(--text-1)] transition-colors duration-200 hover:bg-[rgba(255,255,255,0.04)]"
            href="#appearance"
            >Appearance</a
          >
          <a
            class="block rounded-[10px] px-3 py-2 text-sm text-[color:var(--text-1)] transition-colors duration-200 hover:bg-[rgba(255,255,255,0.04)]"
            href="#privacy"
            >Privacy</a
          >
        </nav>
        <p class="mt-3 text-xs text-[color:var(--text-2)]">
          Подсказка: изменения применяются после Save.
        </p>
      </aside>

      <section class="lg:col-span-8 space-y-4">
        <section id="notifications" class="card p-4">
          <header>
            <h2 class="text-sm font-semibold">Notifications</h2>
            <p class="mt-1 text-sm text-[color:var(--text-1)]">
              Минимум шума. Только важное по задачам и упоминаниям.
            </p>
          </header>

          <div class="mt-4 space-y-3">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-sm font-medium">Mentions</p>
                <p class="mt-1 text-xs text-[color:var(--text-2)]">
                  Когда вас @упоминают в чате или в задаче.
                </p>
              </div>
              <label class="relative inline-flex items-center">
                <input class="switch-input" type="checkbox" checked />
                <span class="switch" aria-hidden="true"></span>
              </label>
            </div>

            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-sm font-medium">Task assigned</p>
                <p class="mt-1 text-xs text-[color:var(--text-2)]">Когда вам назначают задачу.</p>
              </div>
              <label class="relative inline-flex items-center">
                <input class="switch-input" type="checkbox" checked />
                <span class="switch" aria-hidden="true"></span>
              </label>
            </div>

            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-sm font-medium">Daily digest</p>
                <p class="mt-1 text-xs text-[color:var(--text-2)]">Короткое письмо раз в день.</p>
              </div>
              <label class="relative inline-flex items-center">
                <input class="switch-input" type="checkbox" />
                <span class="switch" aria-hidden="true"></span>
              </label>
            </div>
          </div>
        </section>

        <section id="appearance" class="card p-4">
          <header>
            <h2 class="text-sm font-semibold">Appearance</h2>
            <p class="mt-1 text-sm text-[color:var(--text-1)]">
              Dark-first. Акцент мягкий, без резких контрастов.
            </p>
          </header>

          <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label class="task-card">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-medium">Compact density</p>
                  <p class="mt-1 text-xs text-[color:var(--text-2)]">
                    Более плотные списки и карточки.
                  </p>
                </div>
                <input
                  class="mt-1 h-4 w-4 rounded border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)]"
                  type="checkbox"
                  checked
                />
              </div>
            </label>

            <label class="task-card">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-medium">Show timestamps</p>
                  <p class="mt-1 text-xs text-[color:var(--text-2)]">В чате и активности.</p>
                </div>
                <input
                  class="mt-1 h-4 w-4 rounded border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)]"
                  type="checkbox"
                  checked
                />
              </div>
            </label>
          </div>
        </section>

        <section id="privacy" class="card p-4">
          <header>
            <h2 class="text-sm font-semibold">Privacy</h2>
            <p class="mt-1 text-sm text-[color:var(--text-1)]">
              Простой контроль над видимостью и сбором данных.
            </p>
          </header>

          <div class="mt-4 space-y-3">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-sm font-medium">Public profile</p>
                <p class="mt-1 text-xs text-[color:var(--text-2)]">
                  Показывать имя и аватар внутри workspace.
                </p>
              </div>
              <label class="relative inline-flex items-center">
                <input class="switch-input" type="checkbox" checked />
                <span class="switch" aria-hidden="true"></span>
              </label>
            </div>

            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-sm font-medium">Telemetry</p>
                <p class="mt-1 text-xs text-[color:var(--text-2)]">
                  Анонимные метрики для улучшения UX.
                </p>
              </div>
              <label class="relative inline-flex items-center">
                <input class="switch-input" type="checkbox" />
                <span class="switch" aria-hidden="true"></span>
              </label>
            </div>

            <div
              class="flex items-center justify-between gap-4 rounded-[14px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.02)] px-3 py-2"
            >
              <div>
                <p class="text-sm font-medium">Danger zone</p>
                <p class="mt-1 text-xs text-[color:var(--text-2)]">Удаление аккаунта необратимо.</p>
              </div>
              <button class="btn btn-danger h-9 px-3 py-0 text-sm" type="button">Delete</button>
            </div>
          </div>
        </section>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
