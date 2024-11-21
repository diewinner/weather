import { Stores } from '@/types/stores'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIsLoadingStore = defineStore(Stores.IS_LOADING, () => {
    // state
    const isLoading = ref(false)

    // actions
    const setIsLoading = (value: boolean) => {
        isLoading.value = value
    }

    return { isLoading, setIsLoading }
})
