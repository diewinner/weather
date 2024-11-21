<template>
  <div class="logo-container">
    <div class="image-container">
      <img src="../../static/weatherAppLogo.svg" alt="Логотип">
    </div>
    <span class="logo-container__title">
      Погода-онлайн
    </span>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.logo-container {
  @include row(10px);

  &__title {
    color: var(--primary-color-dark);
    font-size: var(--font-size-m);
  }
}

.image-container {
  @include square(50px);
}
</style>