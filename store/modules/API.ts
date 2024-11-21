import {defineStore} from 'pinia';
import {Stores} from '~/types/stores';
import {ref} from 'vue';
import {useFetch} from "@vueuse/core";
import {notify} from "@kyvg/vue3-notification";
import {useIsLoadingStore} from "~/store/modules/IS_LOADING";

export const useApiStore = defineStore(Stores.API, () => {
    const {public: {baseUrl, geoCodingUrl}} = useRuntimeConfig();
    const loader = useIsLoadingStore()
    const cityList = ref<Maybe<object>>([]);
    const actualWeatherCity = ref<Maybe<object>>(null);
    const { notify } = useNotification()

    const setWeather = async (query: any, days: number, hourlyParams: string = '', dailyParams: string = '') => {
        loader.setIsLoading(true)
        try {
            const {data, error} = await useFetch(
                `${baseUrl}v1/forecast?latitude=${query.latitude}&longitude=${query.longitude}&hourly=${hourlyParams}${dailyParams}&forecast_days=${days}`
            );
            actualWeatherCity.value = JSON.parse(data.value)
            if(actualWeatherCity.value) {
                if(days === 1) {
                    notify({
                        type: 'success',
                        text:`Погода по городу на сегодняшний день!`
                    })
                } else if(days === 7) {
                    notify({
                        type: 'success',
                        text:`Погода по городу на неделю!`
                    })
                }

            }
        } catch (e) {
            console.error('Error fetching weather data:', e);
        } finally {
            setTimeout(() => {
                loader.setIsLoading(false)
            }, 1500) // имитация загрузки, т.к. слишком быстро загружает данные, для наглядности лоадера
        }
    };

    const onSearch = async (query: string) => {
        try {
            const {data} = await useFetch(
                `${geoCodingUrl}v1/search?name=${encodeURIComponent(query)}&count=100&language=ru`
            );
            const newData = JSON.parse(data.value).results;
            if (newData) {
                cityList.value = newData.map((city: any) => ({
                    id: city.id,
                    text: `${city.name}, ${city.country}`,
                    ...city,
                }));
            }
            console.log(cityList)
        } catch (error) {
            console.error('Ошибка при получении городов:', error);
        }
    };

    return {
        setWeather,
        onSearch,
        cityList,
        actualWeatherCity
    };
});
