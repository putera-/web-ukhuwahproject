import { defineStore } from "pinia";

interface ItikafState {
    itikaf?: Itikaf
    schedules: ItikafSchedule[]
    year: string
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
        schedules: [],
        year: new Intl.DateTimeFormat('ar-TN-u-ca-islamic', { year: 'numeric' }).format(Date.now()).split(' ')[0]
    }),
    actions: {
        async get(): Promise<void> {
            const Api = useApiStore();
            const itikaf = await Api.get('/itikafs/' + this.year) as Itikaf;

            if (itikaf) this.itikaf = itikaf;
        },
        async create(data: FormData) {
            const Api = useApiStore();

            this.itikaf = await Api.post('/itikafs/' + this.year, data);
        },
        async update(data: FormData) {
            const Api = useApiStore();

            this.itikaf = await Api.patch('/itikafs/' + this.year, data);
        },
        async getSchedule(): Promise<void> {
            const Api = useApiStore();
            const Auth = useAuthStore();
            if (Auth.user) {
                this.schedules = await Api.get('/itikaf-schedules/me/' + this.year) as ItikafSchedule[]
            } else {
                this.schedules = await Api.get('/itikaf-schedules/' + this.year) as ItikafSchedule[]
            }
        },
        async getScheduleById(id: string): Promise<ItikafSchedule> {
            const Api = useApiStore();

            return await Api.get('/itikaf-schedules/detail/' + id) as ItikafSchedule
        },
        async join(data: JoinItikafForm, scheduleId: string): Promise<void> {
            const Api = useApiStore();

            data = Validate(isJoinItikaf, data);

            if (data.vehicle_type == '') {
                delete data.vehicle_type;
                delete data.vehicle_no;
            }

            await Api.post('/itikaf-schedules/participate/' + scheduleId, data);

        },
        async cancelJoin(unparticipate_reason: string, scheduleId: string): Promise<void> {
            const Api = useApiStore();

            await Api.patch('/itikaf-schedules/unparticipate/' + scheduleId, { unparticipate_reason });
        },
        async getMySchedule(scheduleId: string): Promise<ItikafParticipant> {
            const Api = useApiStore();

            return Api.get('/itikaf-participants/me/' + scheduleId) as ItikafParticipant;
        },
        async createSchedule(data: FormData) {
            const Api = useApiStore();
            if (!this.itikaf) throw new Error('Buat Data Itikaf terlebih dahulu')
            data.append('itikafId', this.itikaf.id);

            await Api.post('/itikaf-schedules', data);
        },
        async updateSchedule(id: string, data: FormData) {
            const Api = useApiStore();

            await Api.patch('/itikaf-schedules/' + id, data);
        }
    }
});