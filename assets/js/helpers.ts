import type { Options} from "~/types/helpers";

export const getFormattedDate = (date:string): string => {
    const options:Options = { day: 'numeric', month: 'long', year: 'numeric' };
    const newDate = new Date(date);
    return newDate.toLocaleDateString('ru-RU', options);
}

export const getAverage = (value: number[]): number => {
    const sum = value.reduce((acc, number) => acc + number, 0);
    const length = value.length;
    return (sum / length).toFixed(1);
}