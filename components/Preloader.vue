<template>
  <div class="preloader">
    <img src="../static/loader.svg" alt="Загрузка..." />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.preloader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 250px;
}
</style>
