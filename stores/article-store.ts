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
    ArticleComment?: ArticleComment
    articleCommentId?: string
    ArticleCommentReply?: ArticleCommentReply
    articleCommentReplyId?: string
    ItikafSchedule?: ItikafSchedule
    itikafScheduleId?: string
    createdAt: Date
}
interface Photo {
    id: string
    path: string
    path_md: string
    index: number
    article?: Article
    articleId: string
}

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
    likes: Like[]
    comments: ArticleComment[]
}

interface ArticleComment {
    id: string
    commenter?: User
    userId: string
    Article?: Article
    articleId: string
    comment: string
    createdAt: Date
    updatedAt: Date
    like: Like[]
}

interface ArticleCommentReply {
    id: string
    commenter?: User
    userId: string
    comment: string
    createdAt: Date
    updatedAt: Date
    like: Like[]
    ArticleComment?: ArticleComment
    articleCommentId: string
}

interface ArticleState {
    data?: Pagination<Article>
}
export const useArticleStore = defineStore('article', {
    state: (): ArticleState => ({
        data: undefined
    }),
    getters: {
        articles: (state) => state.data ? state.data.data : [],
        total: (state) => state.data ? state.data.total : 0,
        page: (state) => state.data ? state.data.page : 0,
        limit: (state) => state.data ? state.data.limit : 0,
        maxPage: (state) => state.data ? state.data.maxPage : 0
    },
    actions: {
        async getPublisheds(search = '') {
            const Api = useApiStore();

            this.data = await Api.get(`/articles/published?search=${search}`) as Pagination<Article>
        }
    }
})