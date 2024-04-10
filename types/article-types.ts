interface Article {
    id: string
    title: string
    content?: string
    author?: User
    authorId: string
    youtubeId?: string
    photos?: Photo[]
    status: 'DRAFT' | 'PUBLISH'
    deleted: boolean
    publishedAt: string
    createdAt: string
    updatedAt: string
    likes?: Like[]
    comments?: Comment[]
    _count?: {
        likes: number
        comments: number
    }
}