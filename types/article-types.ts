interface Article {
    id: string
    title: string
    content: string
    author?: User
    authorId: string
    photos?: Photo[]
    status: 'DRAFT' | 'PUBLISH'
    deleted: boolean
    publishedAt: Date
    createdAt: Date
    updatedAt: Date
    likes?: Like[]
    comments?: Comment[]
    _count?: {
        likes: number
        comments: number
    }
}