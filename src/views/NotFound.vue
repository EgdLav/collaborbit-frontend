<script setup lang="ts"></script>

<template>
  <main class="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center px-4 py-12">
    <div class="card p-8 text-center sm:p-10">
      <p class="prompt mb-2"><b>error</b> / not_found</p>
      <h1 class="mt-2 text-4xl font-bold tracking-tight">Page missing</h1>
      <p class="mt-3 text-sm text-[color:var(--text-1)]">
        The workspace, task, or route you're looking for doesn't exist or has been moved.
      </p>
      <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
        <router-link class="btn btn-primary h-10 px-5 py-0 text-sm" to="/workspaces"
          >← Back to workspaces</router-link
        >
      </div>
      <div
        class="mt-6 border-t border-[color:var(--border)] pt-4 text-xs text-[color:var(--text-2)]"
      >
      </div>
    </div>
  </main>
</template>

<style scoped></style>
