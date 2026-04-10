<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <RouterView v-slot="{Component}">
    <HeaderComponent></HeaderComponent>
    <Transition mode="out-in" name="page">
      <component :is="Component"></component>
    </Transition>
  </RouterView>
</template>

<style scoped>

</style>
