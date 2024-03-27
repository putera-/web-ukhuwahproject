import { defineStore } from "pinia";

interface Itikaf {
    id: string
    year: string
    hijri_year: string
    description: string
    photos?: Photo[]
    contact_person_name?: string
    contact_person_phone?: string
    // createdBy?: User
    userId: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    schedules?: ItikafSchedule[]
}

interface Photo {
    id: string
    path: string
    path_md: string
    index: number
    // article?: Article
    articleId: string
}

interface Asaatidz {
    id?: string
    name: string
    profile: string
    deleted: boolean
    avatar?: string
    avatar_md?: string
    createdAt?: Date
    updatedAt?: Date
}

interface ItikafSchedule {
    id: string
    itikaf?: Itikaf
    itikafId: string
    date: string
    day_index: number
    description: string
    photos?: Photo[]
    deleted: boolean
    createdAt: Date
    updatedAt: Date
    // participants?: ItikafParticipant[]
    imam_tarawih?: Asaatidz
    imam_tarawih_id?: String
    imam_qiyamul_lail?: Asaatidz
    imam_qiyamul_lail_id?: String
    ustadz_kajian?: Asaatidz
    ustadz_kajian_id?: String
}

interface ItikafState {
    itikaf?: Itikaf
    schedules: ItikafSchedule[]
}

export const useItikafStore = defineStore("itikaf", {
    state: (): ItikafState => ({
        itikaf: undefined,
        schedules: []
    }),
    actions: {
        async getSchedule(): Promise<void> {
            const Api = useApiStore();
            this.schedules = await Api.get('/itikaf-schedules') as ItikafSchedule[]
        }
    }
});