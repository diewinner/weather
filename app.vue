<template>
  <div class="app">
    <nuxt-layout>
      <nuxt-page/>
    </nuxt-layout>
    <nuxt-notifications position="top right" :speed="500"/>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.app {
  @include square(100%);
  min-height: 100vh;
}
</style>
