<script setup>
defineProps(['modelValue', 'placeholder']);
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="w-full">
    <input
      class="h-10 rounded-lg w-full bg-blue-light/35 outline-none p-4 shadow-lg"
      @input="($event) => emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
    />
  </div>
</template>
