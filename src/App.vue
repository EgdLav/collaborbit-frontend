<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <Suspense
    ><RouterView v-slot="{ Component }">
      <HeaderComponent></HeaderComponent>
      <Transition mode="out-in" name="page">
        <component :is="Component"></component>
      </Transition>
    </RouterView>
  </Suspense>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.20s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
  filter: blur(4px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
  filter: blur(4px);
}
</style>
