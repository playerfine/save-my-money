<script setup lang="ts">
import ThemeToggle from '../components/ThemeToggle/ThemeToggle.vue';
import SearchBox from '../components/SearchBox/SearchBox.vue';
import ProductCard from '../components/ProductCard/ProductCard.vue';
import { useMotion } from '@vueuse/motion';

import { ref } from 'vue';
const hasResults = ref(false);
const searchBox = ref();
const productsRefs = ref([]);
const searchTerm = ref('');
const animation = useMotion(searchBox, { initial: { y: 0, opacity: 1 } });

function animateProducts() {
  console.log(hasResults.value);
  for (let i = 0; i < productsRefs.value.length; i++) {
    let animation = useMotion(productsRefs.value[i], {
      initial: { x: -50, opacity: 0 },
    });

    animation.apply({
      x: 0,
      opacity: 1,
      transition: { delay: 100 * i, bounce: 1 },
    });
  }
}

const products = Array.from({ length: 10 });

async function search() {
  await animation.apply({
    opacity: 0,
    y: -30,
    transition: { duration: 300 },
  });
  hasResults.value = true;
  animateProducts();
}
</script>
<template>
  <header class="flex justify-end items-end content-end">
    <ThemeToggle />
  </header>
  <div v-if="!hasResults" class="container h-full flex mx-auto flex-col">
    <div class="flex justify-center w-full pt-72 max-w-xl self-center">
      <form class="w-full" @submit.prevent="search">
        <SearchBox v-model="searchTerm" ref="searchBox" />
      </form>
    </div>
  </div>
  <div class="container mx-auto pt-32" v-if="hasResults">
    <h1
      v-motion
      :initial="{ x: -20, opacity: 0 }"
      :visible="{ x: 0, opacity: 1 }"
      class="text-3xl font-bold mb-16"
    >
      Search results for: {{ searchTerm }}
    </h1>
    <div class="flex flex-wrap w-full gap-4">
      <ProductCard
        ref="productsRefs"
        v-for="(_, index) in products"
        v-motion
        :initial="{ opacity: 0, x: -50 }"
        :visible="{ opacity: 1, x: 0 }"
        :delay="100 * index"
        :key="index"
      />
    </div>
  </div>
</template>

<style scoped lang="css">
header {
  line-height: 1.5;
  max-width: 100vw;
}

nav > a {
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 768px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    margin-left: auto;
    margin-right: auto;
    max-width: 768px;
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
