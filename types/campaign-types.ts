interface MidtransCallback {
    id: string
    Transaction?: Transaction
    transactionId: string
    callback_data: string
    createdAt: string
}

interface Transaction {
    id: string
    Donation?: Donation
    donationId: string
    gross_amount: number
    midtransToken: string
    status: string
    paidAt?: string
    createdAt: string
    updatedAt: string
    MidtransCallback?: MidtransCallback
}
interface Donation {
    id: string
    Campaign?: Campaign
    campaignId: string
    User?: User
    userId: string
    gross_amount: number
    status: string
    paidAt?: string
    createdAt: string
    updatedAt: string
    Transaction?: Transaction
}

interface Campaign {
    id: string
    title: string
    description: string
    target_amount: number
    collected_amount: number
    due_date: string
    photos?: Photo[]
    author?: User
    userId: string
    publishedAt: string
    active: boolean
    createdAt: string
    updatedAt: string
    donations?: Donation[]
    likes?: Like[]
    comments?: Comment[]
    _count?: {
        likes: number
        comments: number
        donations: number
    }
}