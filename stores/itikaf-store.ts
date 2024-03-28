import { defineStore } from "pinia";

interface ItikafState {
    itikaf?: Itikaf
    schedules: ItikafSchedule[]
}

interface JoinItikafForm {
    "man": number
    "woman": number
    "vehicle_type"?: "Motor" | "Mobil" | ""
    "vehicle_no"?: string
}

export const useItikafStore = defineStore("itikaf", {
    state: (): ItikafState => ({
        itikaf: undefined,
        schedules: []
    }),
    actions: {
        async get(): Promise<void> {
            const Api = useApiStore();
            this.itikaf = await Api.get('/itikafs/1445') as Itikaf
        },
        async getSchedule(): Promise<void> {
            const Api = useApiStore();
            this.schedules = await Api.get('/itikaf-schedules') as ItikafSchedule[]
        },
        async join(data: JoinItikafForm, scheduleId): Promise<void> {
            const Api = useApiStore();

            data = Validate(isJoinItikaf, data);

            if (data.vehicle_type == '') {
                delete data.vehicle_type;
                delete data.vehicle_no;
            }

            Api.post('/itikaf-schedules/participate/' + scheduleId, data);

        }
    }
});