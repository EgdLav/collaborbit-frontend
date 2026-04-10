<script setup lang="ts"></script>

<template>
  <main
    class="mx-auto flex min-h-[calc(100vh-60px)] max-w-6xl items-center justify-center px-4 py-12"
  >
    <section class="w-full max-w-md">
      <div class="card p-4 sm:p-6">
        <p class="prompt">
          <b>auth</b> / register <span class="text-[color:var(--text-2)]">—</span>
          <span class="kbd">POST /users</span>
        </p>
        <h1 class="text-lg font-semibold">Create account</h1>
        <p class="mt-1 text-sm text-[color:var(--text-1)]">
          Начните с базового профиля. Дальше можно донастроить.
        </p>

        <form class="mt-6 space-y-4" action="#" method="post">
          <div>
            <label class="mb-2 block text-sm text-[color:var(--text-1)]" for="name">Name</label>
            <input
              class="input"
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              placeholder="Egor"
            />
            <!-- Error UI -->
            <p class="error mt-2">Имя слишком короткое (минимум 2 символа).</p>
          </div>

          <div>
            <label class="mb-2 block text-sm text-[color:var(--text-1)]" for="email">Email</label>
            <input
              class="input"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="you@studio.dev"
            />
            <p class="help mt-2">Мы не показываем email публично.</p>
          </div>

          <div>
            <label class="mb-2 block text-sm text-[color:var(--text-1)]" for="password"
              >Password</label
            >
            <input
              class="input"
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              placeholder="минимум 8 символов"
            />
            <p class="help mt-2">Лучше: passphrase + менеджер паролей.</p>
          </div>

          <div class="flex items-start gap-2">
            <input
              class="mt-1 h-4 w-4 rounded border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)]"
              type="checkbox"
              name="terms"
            />
            <p class="text-sm text-[color:var(--text-1)]">
              Согласен с
              <a class="link" href="#">terms</a>
              и
              <a class="link" href="#">privacy</a>.
            </p>
          </div>

          <div class="pt-1">
            <button class="btn btn-primary w-full" type="submit">Register</button>
          </div>
        </form>
      </div>

      <p class="mt-4 text-center text-sm text-[color:var(--text-2)]">
        Уже есть аккаунт?
        <a class="link" href="./login.html">Войти</a>
      </p>
    </section>
  </main>
</template>

<style scoped></style>
