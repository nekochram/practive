<template>
  <div class="red-border-container">
    <div class="dot-item" v-for="i in 5000" :key="i"></div>
  </div>
</template>

<script setup></script>

<style scoped>
.red-border-container {
  width: 100%;
  height: 100%;
  border: 1px solid red;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.dot-item {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: grey;
}
</style>
