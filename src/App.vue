<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <div class="app-shell">
    <HeaderComponent />
    <Suspense>
      <RouterView v-slot="{ Component }">
        <Transition mode="out-in" name="page">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </Suspense>
  </div>
</template>
