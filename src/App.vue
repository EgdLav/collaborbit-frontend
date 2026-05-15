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


