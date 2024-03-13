<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Lottie, { AnimationItem } from 'lottie-web';
const checkbox = ref<HTMLInputElement>();
import animationData from './animation.json';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleTheme = useToggle(isDark);
let animation: AnimationItem;

onMounted(() => {
  animation = Lottie.loadAnimation({
    container: checkbox.value as Element,
    loop: false,
    autoplay: false,
    renderer: 'svg',
    animationData,
    rendererSettings: {
      viewBoxOnly: true,
    },
  });

  if (isDark.value) {
    animation.goToAndStop(80, true);
  }

  animation.setSpeed(3);
});

const toggle = () => {
  toggleTheme();
  if (isDark.value) {
    animation.playSegments([0, 80], true);
  } else {
    animation.playSegments([80, 0], true);
  }
};
</script>

<template>
  <div
    style="width: 30px"
    class="cursor-pointer"
    ref="checkbox"
    role="checkbox"
    @click="toggle()"
  ></div>
</template>
