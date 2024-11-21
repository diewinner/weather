<template>
  <div class="nav-menu">
    <logo/>
    <div class="nav-menu__content">
      <div v-for="item of navMenuContent" class="nav-menu__item">
        <nuxt-link :to="item.link" class="nav-menu__item--link">
          {{ item.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {navMenuContent} from "assets/content/navMenuContent.ts";
import Logo from "~/components/header/Logo.vue";
</script>

<style lang="scss" scoped>
.nav-menu {
  @include row(150px);

  align-items: center;
  padding: 15px;
  border-bottom: 2px solid var(--border-color);

  &__content {
    @include row(50px);
    justify-content: space-between;
  }

  &__item {

    &--link {
      text-decoration: none;
      color: var(--text-primary-color);
      transition: var(--transition-base);

      &:hover {
        color: var(--text-secondary-color);
      }
    }

  }
}

</style>