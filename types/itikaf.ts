interface Itikaf {
    id: string
    year: string
    hijri_year: string
    description: string
    photo: string
    masjid?: string
    address?: string
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
    photo: string
    deleted: boolean
    createdAt: Date
    updatedAt: Date
    participants?: ItikafParticipant[]
    imam_tarawih?: Asaatidz
    imam_tarawih_id?: String
    imam_qiyamul_lail?: Asaatidz
    imam_qiyamul_lail_id?: String
    ustadz_kajian?: Asaatidz
    ustadz_kajian_id?: String
    total_member?: number
    total_man?: number
    total_woman?: number
    auth_participant?: boolean
}

export interface ItikafParticipant {
    id: string
    user?: User
    userId: string
    schedule?: ItikafSchedule
    scheduleId: string
    total_member: number
    man: number
    woman: number
    vehicle?: Vehicle
    vehicleId?: string
    participate: boolean
    unparticipate_reason?: string
    coupon_taken: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface Vehicle {
    id: string
    user?: User
    userId: string
    vehicle_type?: 'Motor' | 'Mobil'
    vehicle_no?: string
    createdAt?: Date
    updatedAt?: Date
    ItikafParticipant?: ItikafParticipant[]
}