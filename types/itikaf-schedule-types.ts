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
    likes?: Like[]
    comments?: Comment[]
    _count?: {
        likes: number
        comments: number
    }
}