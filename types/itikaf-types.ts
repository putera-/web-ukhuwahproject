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
    likes?: Like[]
    comments?: Comment[]
    _count?: {
        likes: number
        comments: number
    }
}

interface ItikafParticipant {
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


interface JoinItikafForm {
    "man": number
    "woman": number
    "vehicle_type"?: "Motor" | "Mobil" | ""
    "vehicle_no"?: string
}

interface Vehicle {
    id: string
    user?: User
    userId: string
    vehicle_type?: 'Motor' | 'Mobil'
    vehicle_no?: string
    createdAt?: Date
    updatedAt?: Date
    ItikafParticipant?: ItikafParticipant[]
}