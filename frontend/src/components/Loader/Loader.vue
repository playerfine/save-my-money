<script setup lang="ts">
import { onMounted, ref } from 'vue';
import lottie, { animationitem } from 'lottie-web';
const loader = ref<htmlinputelement>();
import animationData from './loader.json';

onMounted(() => {
  let animation = lottie.loadAnimation({
    container: loader.value as element,
    loop: true,
    autoplay: true,
    renderer: 'svg',
    animationData,
    renderersettings: {
      viewboxonly: true,
    },
  });
});
</script>

<template>
  <div style="width: 200px" ref="loader" />
</template>
