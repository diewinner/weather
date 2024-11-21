# Погода онлайн

## Описание

Погода онлайн — это приложение для прогноза погоды, которое позволяет пользователям получать актуальную информацию о погоде для различных городов. Приложение использует API Open-Meteo для получения данных о погоде и отображает их в удобном формате.

## Установка

1. **Клонирование репозитория**:
   ```bash
   git clone https://github.com/diewinner/weather.git

2. **Установка зависимостей**:
   cd weather
   npm install

## Использование
1. **Запуск приложения**:
   ```npm run dev
   localhost:3000

## Функциональность
Прогноз погоды: Получение прогноза погоды на неделю вперед.
Поддержка различных городов: Возможность выбора города для получения прогноза погоды.
Отображение данных: Отображение температуры, влажности, скорости ветра и других погодных параметров.

## Структура проекта
weather/
├── assets/
│   ├── content/
│       ├── navMenuContent.ts
│   ├── fonts/
│       ├── Abel-Regular.ttf
│   ├── js/
│       ├── helpers.ts
│   └── style/
│       ├── vars/
│           ├── colors.css
│           ├── index.css
│           ├── other.css
│       ├── _animations.scss
│       ├── fonts.scss
│       ├── other.scss
│       ├── reset.css
│       └── mixins.scss
├── components/
│       ├── header/
│           ├── Logo.vue
│           ├── NavMenu.vue
│   ├── Prelaoder.vue
│   ├── CustomSelect.vue
│   └── Card.vue
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue
│   └── weather-of-week.vue
├── static/
│   ├── citySvg.svg
│   ├── dateSvg.svg
│   ├── loader.svg
│   ├── precipitationProbabilityMeanSvg.svg
│   ├── precipitationSumSvg.svg
│   ├── precipitationSvg.svg
│   ├── temperatureSvg.svg
│   ├── temperatureMax.svg
│   ├── weatherAppLogo.svg
│   ├── windSpeedSvg.svg
│   └── temperatureMin.svg
├── store/
│   └── modules/
│       ├── API.ts
│       ├── index.ts
│       ├── IS_LOADING.ts
├── app.vue
├── nuxt.config.ts
├── package.json
└── README.md
