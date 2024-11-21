<template>
  <div class="layout">
    <header-nav-menu/>
    <slot/>
    <preloader v-if="loader.isLoading" />
    <transition name="fade">
      <div v-if="loader.isLoading" class="overlay" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import Preloader from "~/components/Preloader.vue";
import {useIsLoadingStore} from "~/store/modules/IS_LOADING";

const loader = useIsLoadingStore()

</script>

<style lang="scss" scoped>
.layout {
  background: var(--background-color);
  min-height: 100vh;
  overflow: hidden;
}
</style>