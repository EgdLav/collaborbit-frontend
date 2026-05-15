<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <transition name="modal">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center px-4"
      style="background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);"
      @click.self="close"
    >
      <div class="modal w-full p-6">
        <slot />
      </div>
    </div>
  </transition>
</template>
