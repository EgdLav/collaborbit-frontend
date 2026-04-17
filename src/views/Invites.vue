<script setup lang="ts"></script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-4">
    <section class="card p-4">
      <p class="prompt"><b>workspace</b> / invites <span class="kbd">incoming</span></p>
      <h1 class="mt-1 text-lg font-semibold">Your Invites</h1>
      <p class="mt-1 text-sm text-[color:var(--text-1)]">
        Принять или отклонить приглашения в рабочие пространства.
      </p>
    </section>

    <section class="mt-4 space-y-3">
      <article class="card p-4">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-base font-semibold">Growth Experiments</p>
            <p class="mt-1 text-sm text-[color:var(--text-2)]">
              Приглашение от Anna · роль Member · отправлено 2ч назад
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn btn-primary h-9 px-3 py-0 text-sm" type="button">Accept</button>
            <button class="btn btn-danger h-9 px-3 py-0 text-sm" type="button">Decline</button>
          </div>
        </div>
      </article>

      <article class="card p-4">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-base font-semibold">Customer Success Board</p>
            <p class="mt-1 text-sm text-[color:var(--text-2)]">
              Приглашение от Mark · роль Viewer · отправлено вчера
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn btn-primary h-9 px-3 py-0 text-sm" type="button">Accept</button>
            <button class="btn btn-danger h-9 px-3 py-0 text-sm" type="button">Decline</button>
          </div>
        </div>
      </article>

      <article class="card p-4">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-base font-semibold">Engineering Platform</p>
            <p class="mt-1 text-sm text-[color:var(--text-2)]">
              Приглашение от Egor · роль Admin · отправлено 3 дня назад
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn btn-primary h-9 px-3 py-0 text-sm" type="button">Accept</button>
            <button class="btn btn-danger h-9 px-3 py-0 text-sm" type="button">Decline</button>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped></style>
