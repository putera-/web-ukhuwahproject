interface Comment {
    id: string
    commenter?: User
    userId: string
    Article?: Article
    articleId?: string
    Itikaf?: Itikaf
    itikafId?: string
    ItikafSchedule?: ItikafSchedule
    itikafScheduleId?: string
    Campaign?: Campaign
    campaignId?: string
    comment: string
    replies?: CommentReply[]
    createdAt: string
    updatedAt: string
    likes?: Like[]
    _count?: {
        likes: number
        replies: number
    }
}

interface CommentReply {
    id: string
    commenter?: User
    userId: string
    comment: string
    createdAt: string
    updatedAt: string
    likes?: Like[]
    Comment?: Comment
    commentId: string
    _count?: {
        likes: number
    }
}