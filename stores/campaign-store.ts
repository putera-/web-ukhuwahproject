import type { RouteLocationNormalizedLoaded } from "vue-router";

interface CampaignState {
    data?: Pagination<Campaign[]>
    campaign?: Campaign
}

export const useCampaignStore = defineStore('campaign-store', {
    state: (): CampaignState => ({
        data: undefined,
        campaign: undefined
    }),
    getters: {
        campaigns: (state) => state.data ? state.data.data : [],
        total: (state) => state.data ? state.data.total : 0,
        page: (state) => state.data ? state.data.page : 0,
        limit: (state) => state.data ? state.data.limit : 0,
        maxPage: (state) => state.data ? state.data.maxPage : 0
    },
    actions: {
        async getPublisheds(search = '') {
            const Api = useApiStore();

            this.data = await Api.get(`/campaigns/published?search=${search}`) as Pagination<Campaign[]>
        },
        async getPublishedById(id: string): Promise<void> {
            const Api = useApiStore();
            const campaign = await Api.get('/campaigns/published/' + id) as Campaign;

            this.campaign = campaign;
        },
        async findByTransaction(id: string): Promise<Transaction> {
            const Api = useApiStore();
            return await Api.get('/campaigns/transaction/' + id) as Transaction;
        },
        async loadMoreComments(campaignId: string, page: number = 1): Promise<void> {
            if (!this.campaign) return;

            try {
                const Api = useApiStore();
                const comments = await Api.get(`/comments/campaign/${campaignId}/${page}`) as Comment[];


                // TODO merge non existing data, supaya reply yg ke load ga ketutup
                if (page == 1) {
                    this.campaign.comments = comments
                } else {
                    this.campaign.comments = [...this.campaign.comments!, ...comments]
                }
            } catch (error) {
                console.log(error)
            }
        },
        async loadMoreCommentReplies(articleId: string, commentId: string, page: number = 1): Promise<void> {
            if (!this.campaign) return;

            const comment: Comment = this.campaign.comments!.find((s: Comment) => s.id == commentId) as Comment;
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
        async swapLike(like: boolean, campaignId: string, route: RouteLocationNormalizedLoaded): Promise<void> {
            // check is already login
            await isToLoginPage(route);

            const Api = useApiStore();
            let campaign;

            if (this.campaign) {
                campaign = this.campaign;
            } else {
                campaign = this.campaigns.find(a => a.id == campaignId);
            }

            if (campaign) {
                if (like) {
                    const dataLike = await Api.post('/likes/campaign/' + campaignId, {}) as Like;
                    campaign.likes = [dataLike];
                    ++campaign._count!.likes!;
                } else {
                    await Api.delete('/likes/campaign/' + campaignId);
                    campaign.likes = [];
                    --campaign._count!.likes!;
                }
            }
        },
        // swapLikeComment
        async swapLikeComment(like: boolean, scheduleId: string, commentId: string) {
            const Api = useApiStore();
            if (!this.campaign) return;

            const comment = this.campaign.comments!.find((c: Comment) => c.id == commentId) as Comment;
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
            if (!this.campaign) return;

            const comment = this.campaign.comments!.find((c: Comment) => c.id == commentId) as Comment;
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
    }
})