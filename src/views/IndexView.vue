<script setup lang="ts"></script>

<template>
  <main class="mx-auto max-w-6xl px-4">
    <!-- Hero -->
    <section class="py-12 sm:py-16">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <p
            class="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] px-3 py-1 text-xs text-[color:var(--text-2)]"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-[color:rgb(var(--accent-rgb)/0.75)]"></span>
            One workspace instead of many tools
          </p>

          <p class="prompt mb-2">
            <b>collaborbit</b> / landing
          </p>

          <h1 class="text-balance text-3xl font-semibold leading-tight sm:text-4xl">
            One workspace for chat, tasks and files — updated in real time.
          </h1>

          <p class="mt-3 max-w-2xl text-pretty text-[15px] leading-6 text-[color:var(--text-1)]">
            Teams lose time switching between Discord, Trello, Google Drive and Notion. Collaborbit
            brings everything into one workspace where work actually happens.
          </p>

          <div class="mt-6 flex flex-wrap items-center gap-2">
            <RouterLink to="/register" class="btn btn-primary"> Create workspace </RouterLink>

            <RouterLink to="/login" class="btn"> Sign in </RouterLink>

            <a class="btn btn-ghost" href="https://github.com/EgdLav/collaborbit-frontend" target="_blank" rel="noopener">
              GitHub
            </a>
          </div>

          <div class="mt-6 flex flex-wrap gap-3 text-xs text-[color:var(--text-2)]">
            <span class="inline-flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-[rgba(138,180,255,0.65)]"></span>
              no switching between apps
            </span>

            <span class="inline-flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-[rgba(251,191,36,0.6)]"></span>
              everything updates instantly
            </span>

            <span class="inline-flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-[rgba(110,231,183,0.55)]"></span>
              work stays in one place
            </span>
          </div>
        </div>

        <!-- Workspace preview -->
        <div class="lg:col-span-5">
          <div class="card p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold">Backend Team</p>
                <p class="text-xs text-[color:var(--text-2)]">8 members online</p>
              </div>

              <span class="text-xs text-green-400"> ● Live </span>
            </div>

            <div class="mt-5 space-y-3">
              <div class="task-card">
                <p class="font-medium">#general</p>
                <p class="text-xs text-[color:var(--text-2)]">Alex: Deployment finished.</p>
              </div>

              <div class="task-card">
                <p class="font-medium">Projects</p>
                <div class="mt-2 space-y-1 text-xs text-[color:var(--text-2)]">
                  <p>Todo — Deploy API</p>
                  <p>Doing — Landing page</p>
                  <p>Done — Authentication</p>
                </div>
              </div>
            </div>
          </div>

          <p class="mt-3 text-xs text-[color:var(--text-2)]">Not a dashboard. A live workspace.</p>
        </div>
      </div>
    </section>

    <!-- Problem -->
    <section class="pb-12">
      <div class="card p-5">
        <h2 class="text-lg font-semibold">Work is scattered across tools</h2>

        <div class="mt-4 grid gap-3 md:grid-cols-2">
          <div class="task-card">Discord / Slack → Communication</div>

          <div class="task-card">Trello / Jira → Tasks</div>

          <div class="task-card">Google Drive → Files</div>

          <div class="task-card">Notion → Documentation</div>
        </div>

        <p class="mt-5 text-sm font-medium">
          Nothing is connected. Context gets lost between tools.
        </p>
      </div>
    </section>

    <!-- Solution -->
    <section class="pb-12">
      <div class="card p-5">
        <h2 class="text-lg font-semibold">Everything happens inside one workspace</h2>

        <div class="mt-5 space-y-2 text-sm text-[color:var(--text-2)]">
          <p>01 — Discuss an idea</p>
          <p>02 — Create a task</p>
          <p>03 — Attach files</p>
          <p>04 — Everyone sees updates instantly</p>
        </div>
      </div>
    </section>

    <!-- Realtime -->
    <section class="pb-12">
      <div class="card p-5">
        <h2 class="text-lg font-semibold">Why real-time matters</h2>

        <div class="mt-5 grid gap-3 md:grid-cols-4">
          <div class="task-card">Instant messages</div>

          <div class="task-card">Task updates</div>

          <div class="task-card">Shared files</div>

          <div class="task-card">Online presence</div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="pb-12">
      <div class="card p-6 text-center">
        <h2 class="text-lg font-semibold">Create a workspace in under a minute</h2>

        <p class="mt-2 text-sm text-[color:var(--text-1)]">
          Invite your team and start collaborating today.
        </p>

        <div class="mt-5">
          <RouterLink to="/register" class="btn btn-primary"> Create workspace </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
