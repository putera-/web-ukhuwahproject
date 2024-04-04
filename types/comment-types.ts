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
    like: Like[]
}

interface CommentReply {
    id: string
    commenter?: User
    userId: string
    comment: string
    createdAt: Date
    updatedAt: Date
    like: Like[]
    Comment?: Comment
    commentId: string
}