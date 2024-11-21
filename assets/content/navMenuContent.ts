import type {NavMenu} from "~/nuxtApp.d.ts/content";

export const navMenuContent: NavMenu = [
    {
        name:'Главная',
        link:'/',
    },
    {
        name:'За неделю',
        link:'/weather-of-week',
    }
]