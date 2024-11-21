<template>
  <transition name="fade" mode="out-in">
    <div class="main-container">
      <custom-select
          v-model="currentCity"
          placeholder="Введите название..."/>
      <div class="content">
        <div v-if="weatherData.length" class="content__header">
          <span class="content__header-title">
            Общие значения за неделю:
          </span>
          <div v-for="(value, key) in globalData" :key="key" class="content__header--card">
            <div class="image-container">
              <img :src="value.srcImg" :alt="key">
              <sub class="sub-text">{{ value.sub }}</sub>
            </div>
            <p>{{ value.value }}</p>
          </div>
        </div>
        <div class="content__main">
          <card v-for="item in weatherData" :key="item.date" :data="item" :global="globalWeatherValue"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import CustomSelect from "~/components/CustomSelect.vue";
import {useApiStore} from "~/store/modules";
import {ref, watch} from 'vue';
import {getAverage} from "assets/js/helpers";
import type {CardProps} from "~/components/Card.vue";
import TemperatureSvg from '../static/temperatureSvg.svg'
import PrecipitationSvg from '../static/precipitationSvg.svg'
import WindSpeedSvg from '../static/windSpeedSvg.svg'

// values

const currentCity = ref<Maybe<any>>('');
const globalData = ref<Maybe<Global>>(null);
const globalWeatherValue = {}
const weatherData = ref<Maybe<CardProps[]>>([]);
const hourlyParams = [
  'temperature_2m',
  'wind_speed_10m',
  'precipitation',
  'wind_gusts_10m'
].join(',');
const dailyParams = [
  'temperature_2m_max',
  'temperature_2m_min',
  'precipitation_sum',
  'precipitation_probability_mean',
  'wind_speed_10m_max',
].join(',');

// store
const api = useApiStore();

// watch, hooks
watch(currentCity, async newCurrentCity => {
  await api.setWeather(newCurrentCity, 7, hourlyParams, `&daily=${dailyParams}`);

  weatherData.value = api.actualWeatherCity.daily.time.map((_, idx) => ({
    date: api.actualWeatherCity.daily.time[idx],
    temperatureMax: api.actualWeatherCity.daily.temperature_2m_max[idx],
    temperatureMin: api.actualWeatherCity.daily.temperature_2m_min[idx],
    precipitationSum: api.actualWeatherCity.daily.precipitation_sum[idx],
    precipitationProbabilityMean: api.actualWeatherCity.daily.precipitation_probability_mean[idx],
    windSpeedMax: api.actualWeatherCity.daily.wind_speed_10m_max[idx],
  }));
  globalData.value = {
    avgPrecipitation:
        {
          srcImg: PrecipitationSvg,
          text: 'Осадки',
          sub: 'avg',
          value: `${getAverage(api.actualWeatherCity.hourly.precipitation)} мм`,
        },
    avgTemperature:
        {
          srcImg: TemperatureSvg,
          text: 'Температура',
          sub: 'avg',
          value: `${getAverage(api.actualWeatherCity.hourly.temperature_2m)} °C`,
        },
    avgWindSpeed:
        {
          srcImg: WindSpeedSvg,
          sub: 'avg',
          value: `${getAverage(api.actualWeatherCity.hourly.wind_speed_10m)} м/c`,
        },
  };
});
</script>

<style lang="scss" scoped>
.main-container {
  @include column(25px);
  margin: 25px;
}

.content {
  @include column(25px);
  align-items: flex-start;

  &__main {
    @include row(30px);
    flex-wrap: wrap;
  }

  &__header {
    @include column(5px);

    @include card();

    &--card {
      @include row(30px);
    }
  }

  &__header-title {
    font-size: var(--font-size-m);
    color: var(--primary-color-dark)
  }
}

.image-container {
  @include square(25px);
  @include row(2px);
}

.sub-text {
  color: var(--primary-color-dark);
}
</style>
