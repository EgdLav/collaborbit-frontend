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
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="close"
    >
      <div class="card w-full max-w-md p-5 modal">
        <slot />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal {
  max-width: 320px;
  background: rgb(10 10 10);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.18s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.modal-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
