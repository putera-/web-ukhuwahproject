interface User {
    id: string
    name: string
    email: string
    phone: string
    password?: string
    auth?: Auth[]
    // articles?: Article[]
    role: 'SUPERUSER' | 'ADMIN' | 'STAFF' | 'MEMBER'
    avatar?: string
    avatar_md?: string
    active?: boolean
    createdAt?: Date
    updatedAt?: Date
}

interface Auth {
    id: string
    user: User
    userId: string
    token: string
    expiredAt: Date
    path: string
    method: string
    createdAt: Date
}