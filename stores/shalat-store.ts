import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';

interface ShalatState {
    data?: PrayerTimes
}
export const useShalatStore = defineStore('shalat', {
    state: (): ShalatState => ({
        data: undefined
    }),
    getters: {
        fajr: (state) => state.data ? state.data.fajr : '-',
        sunrise: (state) => state.data ? state.data.sunrise : '-',
        dhuhr: (state) => state.data ? state.data.dhuhr : '-',
        asr: (state) => state.data ? state.data.asr : '-',
        maghrib: (state) => state.data ? state.data.maghrib : '-',
        isha: (state) => state.data ? state.data.isha : '-',
    },
    actions: {
        async get(): Promise<void> {
            const coordinates = new Coordinates(-6.330386, 106.8060391);
            const params = CalculationMethod.Singapore();
            const date = new Date();
            this.data = new PrayerTimes(coordinates, date, params);
        },
    }
});
