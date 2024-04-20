import Joi from "joi";

const isComment = Joi.string().min(1).trim().required().label('Comment');

export const useCommentStore = defineStore('use-comment', {
    actions: {
        async sendForArticle(articleId: string, comment: string): Promise<void> {
            const Api = useApiStore();
            const Article = useArticleStore();

            if (!Article.article) return;

            comment = Validate(isComment, comment);

            const new_comment: Comment = await Api.post('/comments/article/' + articleId, { comment }) as Comment;

            ++Article.article._count!.comments!;
            if (Article.article.comments) Article.article.comments.unshift(new_comment);
        },
        async sendForCampaign(campaignId: string, comment: string): Promise<void> {
            const Api = useApiStore();
            const Campaign = useCampaignStore();

            if (!Campaign.campaign) return;

            comment = Validate(isComment, comment);

            const new_comment: Comment = await Api.post('/comments/campaign/' + campaignId, { comment }) as Comment;

            ++Campaign.campaign._count!.comments!;
            if (Campaign.campaign.comments) Campaign.campaign.comments.unshift(new_comment);
        },
        async sendForItikaf(comment: string): Promise<void> {
            const Api = useApiStore();
            const Itikaf = useItikafStore();

            if (!Itikaf.itikaf) return;

            comment = Validate(isComment, comment);

            const new_comment: Comment = await Api.post('/comments/itikaf/' + Itikaf.itikaf.id, { comment }) as Comment;

            ++Itikaf.itikaf._count!.comments!;
            if (Itikaf.itikaf.comments) Itikaf.itikaf.comments.unshift(new_comment);
        },
        async sendForItikafSchedule(scheduleId: string, comment: string): Promise<void> {
            const Api = useApiStore();
            const Itikaf = useItikafStore();

            comment = Validate(isComment, comment);

            const new_comment: Comment = await Api.post('/comments/itikaf-schedule/' + scheduleId, { comment }) as Comment;

            const schedule = Itikaf.schedules.find(s => s.id == scheduleId);
            if (schedule) {
                ++schedule._count!.comments!;
                if (schedule.comments) schedule.comments.unshift(new_comment);
            }
        },
        async replyItikafComment(commentId: string, comment: string): Promise<void> {
            const Api = useApiStore();
            const Itikaf = useItikafStore();

            comment = Validate(isComment, comment);

            const new_comment_reply: CommentReply = await Api.post('/comments/reply/' + commentId, { comment }) as CommentReply;

            if (!Itikaf.itikaf) return;
            if (!Itikaf.itikaf.comments) return;

            const _comment = Itikaf.itikaf.comments.find((c: Comment) => c.id == commentId);
            if (!_comment) return;

            ++_comment._count!.replies!;
            if (_comment.replies) _comment.replies.unshift(new_comment_reply);
        },
        async replyItikafScheduleComment(scheduleId: string, commentId: string, comment: string): Promise<void> {
            const Api = useApiStore();
            const Itikaf = useItikafStore();

            comment = Validate(isComment, comment);

            const new_comment_reply: CommentReply = await Api.post('/comments/reply/' + commentId, { comment }) as CommentReply;

            const schedule = Itikaf.schedules.find(s => s.id == scheduleId);
            if (!schedule) return;
            if (!schedule.comments) return;
            const _comment = schedule.comments.find((c: Comment) => c.id == commentId);
            if (!_comment) return;

            ++_comment._count!.replies!;
            if (_comment?.replies) _comment.replies.unshift(new_comment_reply);
        },
        async replyArticleComment(articleId: string, commentId: string, comment: string): Promise<void> {
            const Api = useApiStore();
            const Article = useArticleStore();

            if (!Article.article) return;

            comment = Validate(isComment, comment);

            const new_comment_reply: CommentReply = await Api.post('/comments/reply/' + commentId, { comment }) as CommentReply;

            if (!Article.article.comments) return;
            const _comment = Article.article.comments.find((c: Comment) => c.id == commentId);
            if (!_comment) return;

            ++_comment._count!.replies!;
            if (_comment?.replies) _comment.replies.unshift(new_comment_reply);
        },
        async replyCampaignComment(campaignId: string, commentId: string, comment: string): Promise<void> {
            const Api = useApiStore();
            const Campaign = useCampaignStore();

            if (!Campaign.campaign) return;

            comment = Validate(isComment, comment);

            const new_comment_reply: CommentReply = await Api.post('/comments/reply/' + commentId, { comment }) as CommentReply;

            if (!Campaign.campaign.comments) return;
            const _comment = Campaign.campaign.comments.find((c: Comment) => c.id == commentId);
            if (!_comment) return;

            ++_comment._count!.replies!;
            if (_comment?.replies) _comment.replies.unshift(new_comment_reply);
        },
        async removeItikafComment(id: string): Promise<void> {
            const Api = useApiStore();
            const Itikaf = useItikafStore();

            await Api.delete('/comments/' + id);

            if (!Itikaf.itikaf) return;
            if (!Itikaf.itikaf.comments) return;

            --Itikaf.itikaf._count!.comments!;
            const index = Itikaf.itikaf.comments.findIndex((c: Comment) => c.id == id);
            if (index != -1) {
                Itikaf.itikaf.comments.splice(index, 1);
            }
        },
        async removeItikafCommentReply(id: string, commentId: string): Promise<void> {
            const Api = useApiStore();
            const Itikaf = useItikafStore();

            await Api.delete('/comments/reply/' + id);

            if (!Itikaf.itikaf) return;
            if (!Itikaf.itikaf.comments) return;

            const comment = Itikaf.itikaf.comments.find((c: Comment) => c.id == commentId);
            if (!comment) return;
            if (!comment.replies) return;

            --comment._count!.replies;
            const index = comment.replies.findIndex((r: CommentReply) => r.id == id);
            if (index != -1) {
                comment.replies.splice(index, 1);
            }
        },
        async removeItikafScheduleComment(id: string, scheduleId: string): Promise<void> {
            const Api = useApiStore();
            const Itikaf = useItikafStore();

            await Api.delete('/comments/' + id);

            const schedule = Itikaf.schedules.find(s => s.id == scheduleId);

            if (!schedule) return;
            if (!schedule.comments) return;

            --schedule._count!.comments!;
            const index = schedule.comments.findIndex(c => c.id == id);
            if (index != -1) {
                schedule.comments.splice(index, 1);
            }
        },
        async removeItikafScheduleCommentReply(scheduleId: string, id: string, commentId: string): Promise<void> {
            const Api = useApiStore();
            const Itikaf = useItikafStore();

            await Api.delete('/comments/reply/' + id);

            const schedule = Itikaf.schedules.find(s => s.id == scheduleId);

            if (!schedule) return;
            if (!schedule.comments) return;

            const comment = schedule.comments.find((c: Comment) => c.id == commentId);
            if (!comment) return;
            if (!comment.replies) return;

            --comment._count!.replies!;
            const index = comment.replies.findIndex((r: CommentReply) => r.id == id);
            if (index != -1) {
                comment.replies.splice(index, 1);
            }
        },
        async removeArticleComment(id: string, articleId: string): Promise<void> {
            const Api = useApiStore();
            const Article = useArticleStore();

            if (!Article.article) return;

            await Api.delete('/comments/' + id);

            if (!Article.article.comments) return;

            --Article.article._count!.comments!;
            const index = Article.article.comments.findIndex(c => c.id == id);
            if (index != -1) {
                Article.article.comments.splice(index, 1);
            }
        },
        async removeCampaignComment(id: string, campaignId: string): Promise<void> {
            const Api = useApiStore();
            const Campaign = useCampaignStore();

            if (!Campaign.campaign) return;

            await Api.delete('/comments/' + id);

            if (!Campaign.campaign.comments) return;

            --Campaign.campaign._count!.comments!;
            const index = Campaign.campaign.comments.findIndex(c => c.id == id);
            if (index != -1) {
                Campaign.campaign.comments.splice(index, 1);
            }
        },
        async removeArticleCommentReply(articleId: string, id: string, commentId: string): Promise<void> {
            const Api = useApiStore();
            const Article = useArticleStore();

            if (!Article.article) return;

            await Api.delete('/comments/reply/' + id);

            if (!Article.article.comments) return;

            const comment = Article.article.comments.find((c: Comment) => c.id == commentId);
            if (!comment) return;
            if (!comment.replies) return;

            --comment._count!.replies!;
            const index = comment.replies.findIndex((r: CommentReply) => r.id == id);
            if (index != -1) {
                comment.replies.splice(index, 1);
            }
        },
        async removeCampaignCommentReply(articleId: string, id: string, commentId: string): Promise<void> {
            const Api = useApiStore();
            const Campaign = useCampaignStore();

            if (!Campaign.campaign) return;

            await Api.delete('/comments/reply/' + id);

            if (!Campaign.campaign.comments) return;

            const comment = Campaign.campaign.comments.find((c: Comment) => c.id == commentId);
            if (!comment) return;
            if (!comment.replies) return;

            --comment._count!.replies!;
            const index = comment.replies.findIndex((r: CommentReply) => r.id == id);
            if (index != -1) {
                comment.replies.splice(index, 1);
            }
        },
    }
})