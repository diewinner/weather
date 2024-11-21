<template>
  <div class="main-container">
    <custom-select
        v-model="currentCity"
        placeholder="Введите название..."/>
    <div v-if="currentWeatherOnDay">
      Погода в городе {{ currentCity.name }} сегодня
    </div>
    <card :global="currentWeatherOnDay"/>
  </div>
</template>

<script setup lang="ts">
import CustomSelect from "~/components/CustomSelect.vue";
import {useApiStore} from "~/store/modules";
import {getAverage} from "assets/js/helpers";

// values
const currentCity = ref<Maybe<string | object>>('')
const currentWeatherOnDay = ref<Maybe<Global>>(null)
const hourlyParams = [
  'temperature_2m',
  'wind_speed_10m',
  'precipitation',
  'wind_gusts_10m'
].join(',');

// store
const api = useApiStore()

// watch, hooks
watch(currentCity, async newCurrentCity => {
  await api.setWeather(newCurrentCity, 1, hourlyParams)
  currentWeatherOnDay.value = {
    currentDate: api.actualWeatherCity.hourly.time[0],
    avgPrecipitation: getAverage(api.actualWeatherCity.hourly.precipitation),
    avgTemperature: getAverage(api.actualWeatherCity.hourly.temperature_2m),
    avgWindSpeed: getAverage(api.actualWeatherCity.hourly.wind_speed_10m),
    city: newCurrentCity.name,
    state: newCurrentCity.admin1,
    country: newCurrentCity.country,
  }
})
</script>

<style lang="scss" scoped>
.main-container {
  @include column(25px);
  margin: 25px;
}
</style>