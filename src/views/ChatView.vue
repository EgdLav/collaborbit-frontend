<script setup lang="ts"></script>

<template>
  <main class="mx-auto grid max-w-[1200px] grid-cols-1 lg:grid-cols-12">
    <!-- Sidebar -->
    <aside class="sidebar lg:col-span-4">
      <div class="px-4 py-4">
        <div class="flex items-center justify-between gap-3">
          <h1 class="text-sm font-semibold">Dialogs</h1>
          <button class="btn btn-ghost h-9 px-3 py-0 text-xs" type="button">New</button>
        </div>

        <div class="mt-3">
          <input
            class="input h-9 px-3 py-0 text-sm"
            type="search"
            placeholder="Search…"
            aria-label="Search dialogs"
          />
        </div>

        <div class="mt-4 space-y-2">
          <!-- Chat Item -->
          <a
            class="card block px-3 py-2 transition-colors duration-200 hover:bg-[rgba(255,255,255,0.04)]"
            href="#"
            aria-current="page"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-3">
                <span
                  class="inline-flex h-9 w-9 flex-none items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] text-xs text-[color:var(--text-1)]"
                >
                  AV
                </span>
                <div>
                  <p class="text-sm font-semibold leading-5">Alex V.</p>
                  <p class="mt-1 line-clamp-1 text-xs text-[color:var(--text-2)]">
                    Накинул правки по spacing токенам…
                  </p>
                </div>
              </div>
              <span class="timestamp">12:14</span>
            </div>
          </a>

          <!-- Chat Item -->
          <a
            class="card block px-3 py-2 transition-colors duration-200 hover:bg-[rgba(255,255,255,0.04)]"
            href="#"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-3">
                <span
                  class="inline-flex h-9 w-9 flex-none items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] text-xs text-[color:var(--text-1)]"
                >
                  IK
                </span>
                <div>
                  <p class="text-sm font-semibold leading-5">Indie Kitchen</p>
                  <p class="mt-1 line-clamp-1 text-xs text-[color:var(--text-2)]">
                    Соберем релиз в пятницу, ок?
                  </p>
                </div>
              </div>
              <span class="timestamp">09:02</span>
            </div>
          </a>

          <!-- Chat Item -->
          <a
            class="card block px-3 py-2 transition-colors duration-200 hover:bg-[rgba(255,255,255,0.04)]"
            href="#"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-3">
                <span
                  class="inline-flex h-9 w-9 flex-none items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] text-xs text-[color:var(--text-1)]"
                >
                  QA
                </span>
                <div>
                  <p class="text-sm font-semibold leading-5">QA Notes</p>
                  <p class="mt-1 line-clamp-1 text-xs text-[color:var(--text-2)]">
                    В login: ошибка под полем, ок.
                  </p>
                </div>
              </div>
              <span class="timestamp">Yesterday</span>
            </div>
          </a>
        </div>
      </div>
    </aside>

    <!-- Conversation -->
    <section class="lg:col-span-8">
      <div class="px-4 py-4">
        <header class="card px-3 py-3">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <span
                class="inline-flex h-9 w-9 flex-none items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] text-xs text-[color:var(--text-1)]"
              >
                AV
              </span>
              <div>
                <p class="prompt">
                  <b>chat</b> / dm <span class="text-[color:var(--text-2)]">—</span>
                  <span class="kbd">#orbit-dev</span>
                </p>
                <p class="text-sm font-semibold leading-5">Alex V.</p>
                <p class="text-xs text-[color:var(--text-2)]">Seen recently</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button class="btn btn-ghost h-9 px-3 py-0 text-sm" type="button">Search</button>
              <button class="btn h-9 px-3 py-0 text-sm" type="button">Details</button>
            </div>
          </div>
        </header>

        <div class="mt-4 space-y-3">
          <!-- Chat Message -->
          <article class="flex items-start gap-3">
            <span
              class="inline-flex h-8 w-8 flex-none items-center justify-center rounded-[10px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] text-[11px] text-[color:var(--text-1)]"
            >
              AV
            </span>
            <div class="space-y-1">
              <div class="flex items-baseline gap-2">
                <p class="text-sm font-semibold">Alex</p>
                <span class="timestamp">12:01</span>
              </div>
              <div class="message-bubble">
                <p class="text-sm leading-6 text-[color:var(--text-1)]">
                  По отступам: если держим 4/8/12/16/24/32, то в карточках лучше 12 внутри и 8 между
                  элементами.
                </p>
              </div>
            </div>
          </article>

          <!-- Chat Message -->
          <article class="flex items-start justify-end gap-3">
            <div class="space-y-1 text-right">
              <div class="flex items-baseline justify-end gap-2">
                <span class="timestamp">12:05</span>
                <p class="text-sm font-semibold">You</p>
              </div>
              <div class="message-bubble message-bubble--me ml-auto">
                <p class="text-sm leading-6 text-[color:var(--text-1)]">
                  Да, согласен. В “task-card” сделаю padding 12 и соберу унифицированные
                  кнопки/инпуты.
                </p>
              </div>
            </div>
            <span
              class="inline-flex h-8 w-8 flex-none items-center justify-center rounded-[10px] border border-[color:var(--border)] bg-[color:rgb(var(--accent-rgb)/0.10)] text-[11px] text-[color:var(--text-1)]"
            >
              ME
            </span>
          </article>

          <!-- Chat Message -->
          <article class="flex items-start gap-3">
            <span
              class="inline-flex h-8 w-8 flex-none items-center justify-center rounded-[10px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] text-[11px] text-[color:var(--text-1)]"
            >
              AV
            </span>
            <div class="space-y-1">
              <div class="flex items-baseline gap-2">
                <p class="text-sm font-semibold">Alex</p>
                <span class="timestamp">12:14</span>
              </div>
              <div class="message-bubble">
                <p class="text-sm leading-6 text-[color:var(--text-1)]">
                  Ок. И давай избегать чисто белого текста — лучше 0.88/0.72/0.56 opacity, как в
                  токенах.
                </p>
              </div>
            </div>
          </article>
        </div>

        <div class="mt-4 divider"></div>

        <!-- Composer -->
        <form class="mt-4 flex items-end gap-2" action="#" method="post">
          <div class="flex-1">
            <label class="mb-2 block text-xs text-[color:var(--text-2)]" for="message"
              >Message</label
            >
            <textarea
              class="input min-h-[44px] resize-none leading-6"
              id="message"
              name="message"
              rows="2"
              placeholder="Написать сообщение…"
            ></textarea>
            <p class="help mt-2">
              Enter — новая строка. <span class="kbd">Ctrl</span> + <span class="kbd">Enter</span> —
              отправить.
            </p>
          </div>
          <button class="btn btn-primary h-11 px-4" type="submit">Send</button>
        </form>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
