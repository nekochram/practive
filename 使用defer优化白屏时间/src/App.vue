<template>
  <div class="grid-container">
    <div v-for="n in 100" :key="n">
      <HeavyCom v-if="defer(n)" />
    </div>
  </div>
</template>

<script setup>
import HeavyCom from "./components/HeavyCom.vue";
import { useDefer } from "./utils/useDefer";

const defer = useDefer(100);
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
</style>
