import type { RouteLocationNormalizedLoaded } from "vue-router";

interface ArticleState {
    data?: Pagination<Article[]>
    article?: Article
}
export const useArticleStore = defineStore('article', {
    state: (): ArticleState => ({
        data: undefined,
        article: undefined
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

            this.data = await Api.get(`/articles/published?search=${search}`) as Pagination<Article[]>
        },
        async getAll(search = '') {
            const Api = useApiStore();

            this.data = await Api.get(`/articles?search=${search}`) as Pagination<Article[]>
        },
        async getPublishedById(id: string): Promise<void> {
            const Api = useApiStore();
            const article = await Api.get('/articles/published/' + id) as Article;

            this.article = article;
        },
        async getById(id: string): Promise<void> {
            const Api = useApiStore();
            const article = await Api.get('/articles/' + id) as Article;

            this.article = article;
        },
        async loadMoreComments(articleId: string, page: number = 1): Promise<void> {
            if (!this.article) return;

            try {
                const Api = useApiStore();
                const comments = await Api.get(`/comments/article/${articleId}/${page}`) as Comment[];


                // TODO merge non existing data, supaya reply yg ke load ga ketutup
                if (page == 1) {
                    this.article.comments = comments
                } else {
                    this.article.comments = [...this.article.comments!, ...comments]
                }
            } catch (error) {
                console.log(error)
            }
        },
        async loadMoreCommentReplies(articleId: string, commentId: string, page: number = 1): Promise<void> {
            if (!this.article) return;

            const comment: Comment = this.article.comments!.find((s: Comment) => s.id == commentId) as Comment;
            if (!comment) return;

            try {
                const Api = useApiStore();
                const replies = await Api.get(`/comments/reply/${commentId}/${page}`) as CommentReply[];


                // TODO merge non existing data, supaya reply yg ke load ga ketutup
                if (page == 1) {
                    comment.replies = replies
                } else {
                    if (!comment.replies) return;
                    comment.replies = [...comment.replies, ...replies]
                }
            } catch (error) {
                console.log(error)
            }
        },
        async swapLike(like: boolean, articleId: string, route: RouteLocationNormalizedLoaded): Promise<void> {
            // check is already login
            await isToLoginPage(route);

            const Api = useApiStore();
            let article;

            if (this.article) {
                article = this.article;
            } else {
                article = this.articles.find(a => a.id == articleId);
            }

            if (article) {
                if (like) {
                    const dataLike = await Api.post('/likes/article/' + articleId, {}) as Like;
                    article.likes = [dataLike];
                    ++article._count!.likes!;
                } else {
                    await Api.delete('/likes/article/' + articleId);
                    article.likes = [];
                    --article._count!.likes!;
                }
            }
        },
        // swapLikeComment
        async swapLikeComment(like: boolean, scheduleId: string, commentId: string) {
            const Api = useApiStore();
            if (!this.article) return;

            const comment = this.article.comments!.find((c: Comment) => c.id == commentId) as Comment;
            if (!comment) return;

            if (like) {
                const dataLike = await Api.post('/likes/comment/' + commentId, {}) as Like;
                comment.likes = [dataLike];
                ++comment._count!.likes!;
            } else {
                await Api.delete('/likes/comment/' + commentId);
                --comment._count!.likes!;
                comment.likes = [];
            }
        },
        // swapLikeCommentReply
        async swapLikeCommentReply(like: boolean, scheduleId: string, commentId: string, replyId: string) {
            const Api = useApiStore();
            if (!this.article) return;

            const comment = this.article.comments!.find((c: Comment) => c.id == commentId) as Comment;
            if (!comment) return;

            const reply = comment.replies!.find((r: CommentReply) => r.id == replyId) as CommentReply;
            if (!reply) return;

            if (like) {
                const dataLike = await Api.post('/likes/comment-reply/' + replyId, {}) as Like;
                reply.likes = [dataLike];
                ++reply._count!.likes!;
            } else {
                await Api.delete('/likes/comment-reply/' + replyId);
                --reply._count!.likes!;
                reply.likes = [];
            }
        },
        async update(data: Record<string, any>, photos: Record<string, any>[]): Promise<void> {
            const Api = useApiStore();
            if (!this.article) return;

            data = Validate(isArticle, data);

            // data.photos = photos;

            if (data.youtube) {
                const youtubeUrlRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

                data.youtubeId = data.youtube.match(youtubeUrlRegex)[1]
            }
            delete data.youtube;

            const formData = new FormData();

            formData.append('title', data.title);
            formData.append('content', data.content || '');

            for (let i = 0; i < photos.length; i++) {
                const photo = photos[i];

                if (photo.id) {
                    formData.append(`photos[${i}][id]`, photo.id);
                    formData.append(`photos[${i}][index]`, String(i));
                }

                if (photo.file) {
                    formData.append('new_photos', photo.file)
                }
            }

            this.article = await Api.patch('/articles/' + this.article.id, formData) as Article;
        }
    }
})