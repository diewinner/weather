<template>
  <transition name="fade" mode="out-in">
    <div class="card">
      <transition name="fade" mode="out-in">
        <div v-if="data || global" class="card__main-content">
          <div v-if="global?.currentDate || data?.date" class="card__main-content__item">
              <div class="image-container">
                <img src="../static/dateSvg.svg" alt="Дата"/>
              </div>
              <span>
                {{
                  global.currentDate
                      ?
                      getFormattedDate(global.currentDate)
                      :
                      getFormattedDate(data.date)
                }}
              </span>
          </div>
          <div class="card__content">
            <div v-if="Object.keys(global).length" class="card__content-item">
              <div class="image-container">
                <img src="../static/precipitationSvg.svg" alt="Осадки"/>
                <sub class="sub-text">avg</sub>
              </div>
              <span>
              {{ global.avgPrecipitation }} мм
            </span>
            </div>
            <div v-if="Object.keys(global).length" class="card__content-item">
              <div class="image-container">
                <img src="../static/temperatureSvg.svg" alt="Температура"/>
                <sub class="sub-text">avg</sub>
              </div>
              <span>
              {{ global.avgTemperature > 0 ? `+${global.avgTemperature}` : global.avgTemperature }} °C
            </span>
            </div>
            <div v-if="Object.keys(global).length" class="card__content-item">
              <div class="image-container">
                <img src="../static/windSpeedSvg.svg" alt="Скорость ветра"/>
                <sub class="sub-text">avg</sub>
              </div>
              <span>
              {{ global.avgWindSpeed }} м/c
            </span>
            </div>
            <div v-if="data" class="card__content-item">
              <div class="image-container">
                <img src="../static/temperatureMax.svg" alt="Максимальная температура"/>
                <sub class="sub-text">max</sub>
              </div>
              <span>
              {{ data.temperatureMax > 0 ? `+${data.temperatureMax}` : data.temperatureMax }} °C
            </span>
            </div>
            <div v-if="data" class="card__content-item">
              <div class="image-container">
                <img src="../static/temperatureMin.svg" alt="Минимальная температура"/>
                <sub class="sub-text">min</sub>
              </div>
              <span>
              {{ data.temperatureMin > 0 ? `${data.temperatureMin}` : data.temperatureMin }} °C
            </span>
            </div>
            <div v-if="data" class="card__content-item">
              <div class="image-container">
                <img src="../static/precipitationSumSvg.svg" alt="Сумма осадков"/>
                <sub class="sub-text">sum</sub>
              </div>
              <span>
              {{ data.precipitationSum }} мм
            </span>
            </div>
            <div v-if="data" class="card__content-item">
              <div class="image-container">
                <img src="../static/windSpeedSvg.svg" alt="Шанс осадков"/>
              </div>
              <span>
              {{ data.precipitationProbabilityMean }} %
            </span>
            </div>
            <div v-if="data" class="card__content-item">
              <div class="image-container">
                <img src="../static/windSpeedSvg.svg" alt="Скорость ветра"/>
                <sub class="sub-text">max</sub>
              </div>
              <span>
              {{ data.windSpeedMax }} м/c
            </span>
            </div>
          </div>
        </div>
        <div v-else class="card__empty">
          Нужно для начала выбрать город...👉👈
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {getFormattedDate} from '~/assets/js/helpers';

// types
export type Global = {
  city?: string
  country?: string
  state?: string
  avgTemperature?: number
  avgWindSpeed?: number
  avgPrecipitation?: number
  currentDate?: string
}

export type Data = {
  temperatureMax?: number
  temperatureMin?: number
  precipitationSum?: number
  precipitationProbabilityMean?: number
  windSpeedMax?: number
  date: string
}

export type CardProps = {
  data?: Data
  global?: Global
}

// props
defineProps<CardProps>()
</script>

<style lang="scss" scoped>
.card {
  @include card();
  width: fit-content;
  max-width: 450px;

  &__main-content {
    @include column(10px);

    align-items: center;

    &__item {
        @include row(5px);
        color:var(--primary-color-dark);
        font-size: var(--font-size-m);
    }
  }

  &__content {
    @include row(15px);

    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__content-item {
    @include row(30px);

    width: 40%;
  }

  &__content-title {
    font-size: var(--font-size-s);
    color: var(--primary-color);
  }
}

.image-container {
  @include square(25px);

  @include row(2px);
}

.sub-text {
  color:var(--primary-color-dark);
}
</style>