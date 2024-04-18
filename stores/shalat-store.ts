import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';

interface ShalatState {
    fajr: string | Date
    sunrise: string | Date
    dhuhr: string | Date
    asr: string | Date
    maghrib: string | Date
    isha: string | Date
}
export const useShalatStore = defineStore('shalat', {
    state: (): ShalatState => ({
        fajr: new Date().toISOString(),
        sunrise: new Date().toISOString(),
        dhuhr: new Date().toISOString(),
        asr: new Date().toISOString(),
        maghrib: new Date().toISOString(),
        isha: new Date().toISOString(),
    }),
    actions: {
        async get(): Promise<void> {
            const coordinates = new Coordinates(-6.330386, 106.8060391);
            const params = CalculationMethod.Singapore();
            const date = new Date();
            const data = new PrayerTimes(coordinates, date, params);

            this.fajr = data.fajr;
            this.sunrise = data.sunrise;
            this.dhuhr = data.dhuhr;
            this.asr = data.asr;
            this.maghrib = data.maghrib;
            this.isha = data.isha;
        },
    }
});
