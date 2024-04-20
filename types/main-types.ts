interface Pagination<T> {
    data: T
    total: number
    page: number
    limit: number
    maxPage: number
}

interface Like {
    user?: User
    userId: string
    Article?: Article
    articleId?: string
    Comment?: Comment
    commentId?: string
    CommentReply?: CommentReply
    commentReplyId?: string
    Itikaf?: Itikaf
    itikafId?: string
    ItikafSchedule?: ItikafSchedule
    itikafScheduleId?: string
    Campaign?: Campaign
    campaignId?: string
    createdAt: Date
}

interface Photo {
    id: string
    path: string
    path_md: string
    index: number
    article?: Article
    articleId?: string
}