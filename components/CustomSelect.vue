<template>
  <div v-on-click-outside="closeOptions" class="select">
    <div class="select__field" >
      <input
          v-model="searchQuery"
          class="select__placeholder"
          type="text"
          placeholder="Введите город.."
          @focus="toggleSelect(true)"
      />
    </div>
    <transition name="fade" mode="in-out">
      <div v-if="isOpen" class="select__options" @click.stop>
        <div class="select__options-content">
          <div v-if="api.cityList.length > 0"
               v-for="option in api.cityList"
               :key="option.id"
               class="select__item"
               @click="onSelect(option)"
          >
            {{ option.text }}
          </div>
          <div v-else>Нет данных</div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script setup lang="ts">
import {vOnClickOutside} from '@vueuse/components';
import {useApiStore} from "~/store/modules";

// types
export type Option = {
  id: string | number;
  text: string;
};

type SelectEmit = {
  (emit: 'update:modelValue', value: Option['id'] | null): void;
};

type SelectProps = {
  modelValue: string | object
  placeholder: string
}

// props, emits
defineProps<SelectProps>();
const emit = defineEmits<SelectEmit>();

// values
const isOpen = ref(false);
const searchQuery = ref('');
const selectedOption = ref<Option | null>(null);
let searchTimeout: NodeJS.Timeout | null = null;
const { notify } = useNotification()

// store
const api = useApiStore()

// watch, hooks
watch(searchQuery, (newQuery) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    if (newQuery.trim()) {
      await api.onSearch(newQuery.trim());
    }
  }, 300);
});

// methods
const onSelect = (option: Option) => {
  searchQuery.value = option.text;
  selectedOption.value = option;
  emit('update:modelValue', option);
  toggleSelect(false);
};

const toggleSelect = (value: boolean) => {
  isOpen.value = value;
};

const closeOptions = (): void => {
  toggleSelect(false);
};

</script>

<style scoped lang="scss">
.select {
  position: relative;
  background: var(--white-color);
  width: fit-content;
  min-width: 400px;

  &__placeholder {
    color: var(--placeholder-color);
    width: 100%;
  }

  &__field {
    @include row;

    border: 1px solid var(--border-color);
    height: 38px;
    padding: 8px;
    border-radius: var(--border-radius-s);
  }

  &__options {
    z-index: 200;
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    width: 100%;
    border-radius: var(--border-radius-s);
    box-shadow: var(--gray-box-shadow);
    background-color: var(--white-color);
    padding: 8px;
  }

  &__options-content {
    @include column(4px);

    max-height: 240px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--primary-color);
      border-radius: var(--border-radius-s);

    }

    &::-webkit-scrollbar-track {
      background-color: var(--primary-color-light);
      border-radius: var(--border-radius-s);
    }

    scrollbar-width: thin;
    scrollbar-color: var(--primary-color) var(--primary-color-light);
  }

  &__item {
    height: 30px;
    cursor: pointer;
    padding: 8px 16px;
    font-size: var(font-size-s);
    color: var(--body-text);
    border-radius: var(--border-radius-s);
    transition: var(--transition-base);

    &--active {
      color: var(--white-color);
      background-color: var(--primary-color);
    }

    &:not(&--active):hover {
      color: var(--primary-color);
      background-color: var(--primary-color-light);
    }
  }

  &__value {
    &--multi {
      @include row(6px);

      flex-wrap: wrap;
    }
  }

  &__badge {
    @include row(6px);

    border-radius: var(--border-radius-xs);
    padding: 0 10px;
    font-weight: 700;
    height: 24px;
    font-size: var(--font-size-s);
    background-color: var(--primary-color-light);
    color: var(--primary-color);

    i {
      font-size: var(--font-size-s);
      cursor: pointer;
    }
  }

  &__search {
    padding: 8px;
    border-bottom: 1px solid var(--border-color);

    &-input {
      width: 100%;
      padding: 4px 8px;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-xs);
      font-size: var(--font-size-s);
      color: var(--body-text);
    }
  }
}
</style>
