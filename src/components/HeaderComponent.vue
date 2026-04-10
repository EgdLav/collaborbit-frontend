<script setup lang="ts"></script>

<template>
  <header class="navbar">
    <div class="mx-auto max-w-6xl px-4 py-3">
      <div class="flex items-center justify-between gap-4">
        <a class="flex items-center gap-2" href="./index.html" aria-label="CollabOrbit Home">
          <span
            class="inline-flex h-8 w-8 items-center justify-center rounded-[10px] border border-[color:var(--border)] bg-[color:var(--panel)] font-mono text-xs text-[color:var(--text-1)]"
          >
            CO
          </span>
          <span class="text-sm font-semibold tracking-wide">CollabOrbit</span>
          <span
            class="ml-2 hidden rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] px-2 py-1 text-xs text-[color:var(--text-2)] sm:inline"
          >
            tasks + chat
          </span>
        </a>

        <nav class="hidden items-center gap-3 text-sm sm:flex">
          <router-link class="link" to="/tasks">Tasks</router-link>
          <a class="link" href="./chat">Chat</a>
          <a class="link" href="./my_profile">Settings</a>
        </nav>

        <div class="flex items-center gap-2">
          <a class="btn btn-ghost" href="./login">Login</a>
          <a class="btn btn-primary" href="./register">Register</a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
