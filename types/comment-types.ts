interface Comment {
    id: string
    commenter?: User
    userId: string
    Article?: Article
    articleId: string
    comment: string
    replies?: CommentReply[]
    createdAt: Date
    updatedAt: Date
    likes?: Like[]
    _count?: {
        likes?: number
        comments?: number
    }
}

interface CommentReply {
    id: string
    commenter?: User
    userId: string
    comment: string
    createdAt: Date
    updatedAt: Date
    likes?: Like[]
    Comment?: Comment
    commentId: string
    _count?: {
        likes?: number
        comments?: number
    }
}