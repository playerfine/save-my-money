<script setup lang="ts">
import { PropType } from 'vue';

interface Product {
  title: string;
  src: string;
  price: number;
  store: string;
}

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});
</script>

<template>
  <div class="flex w-52 h-64 bg-blue-medium flex-col">
    <div class="flex h-2/4">
      <div class="bg-white w-full h-full">
        <img class="w-full object-contain h-full" :src="product.src" />
      </div>
    </div>
    <div class="h-2/4 p-3 flex flex-col">
      <p
        class="font-semibold text-primary text-xxs uppercase tracking-widest mb-1"
      >
        {{ product.store }}
      </p>
      <p class="font-semibold text-secondary text-xs text-gray-400">
        {{ product.title }}
      </p>
      <p class="font-bold text-base mt-auto">€ {{ product.price }}</p>
    </div>
  </div>
</template>
