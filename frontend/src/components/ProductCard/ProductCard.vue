<script setup lang="ts">
import { PropType } from 'vue';

interface Product {
  title: string;
  src: string;
  price: number;
}

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});
</script>

<template>
  <div class="flex w-48 h-52 bg-blue-medium">
    <picture>
      <source :srcset="product.src" type="image/webp" />
      <img :src="product.src" />
    </picture>
    {{ product.title }}
  </div>
</template>
