<script setup lang="ts">
import ThemeToggle from '../components/ThemeToggle/ThemeToggle.vue';
import SearchBox from '../components/SearchBox/SearchBox.vue';
import ProductCard from '../components/ProductCard/ProductCard.vue';
import { useMotion } from '@vueuse/motion';

import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
const hasResults = ref(false);
const searchBox = ref();
const productsRefs = ref([]);
const searchTerm = ref('');
const animation = useMotion(searchBox, { initial: { y: 0, opacity: 1 } });

const getSearchResults = async (searchTerm: string) => {
  const response = await fetch(
    'http://localhost:3000/products?search=' + searchTerm,
  );
  return response.json();
};

const { isLoading, data, refetch, isFetching } = useQuery({
  queryKey: ['products'],
  queryFn: () => getSearchResults(searchTerm.value),
  enabled: false,
});

async function search() {
  animation.apply({
    opacity: 0,
    y: -30,
    transition: { duration: 300 },
  });
  hasResults.value = true;
  refetch();
}
</script>
<template>
  <header class="flex justify-end items-end content-end">
    <ThemeToggle />
  </header>
  jk
  <div v-if="!hasResults" class="container h-full flex mx-auto flex-col">
    <div class="flex justify-center w-full pt-72 max-w-xl self-center">
      <form class="w-full" @submit.prevent="search">
        <SearchBox v-model="searchTerm" ref="searchBox" />
      </form>
    </div>
  </div>
  <div class="container mx-auto pt-32" v-if="hasResults && !isFetching">
    <h1
      v-motion
      :initial="{ x: -20, opacity: 0 }"
      :enter="{ x: 0, opacity: 1 }"
      class="text-3xl font-bold mb-16"
    >
      Search results for: {{ searchTerm }}
    </h1>
    <div class="flex flex-wrap w-full gap-4">
      <ProductCard
        ref="productsRefs"
        v-for="(product, index) in data"
        :product="product"
        v-motion
        :initial="{ opacity: 0, x: -50 }"
        :visible-once="{ opacity: 1, x: 0 }"
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
