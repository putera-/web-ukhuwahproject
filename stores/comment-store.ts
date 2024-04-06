import Joi from "joi";

const isComment = Joi.string().min(1).trim().required().label('Comment');

export const useCommentStore = defineStore('use-comment', {
    actions: {
        async sendForArticle(articleId: string, comment: string) {
            const Api = useApiStore();

            comment = Validate(isComment, comment);

            return Api.post('/comments/article/' + articleId, { comment });
        },
        async sendForItikaf(comment: string): Promise<void> {
            const Api = useApiStore();
            const Itikaf = useItikafStore();

            comment = Validate(isComment, comment);

            const new_comment: Comment = await Api.post('/comments/itikaf/' + Itikaf.itikaf.id, { comment }) as Comment;

            if (Itikaf.itikaf) {
                if (Itikaf.itikaf.comments) Itikaf.itikaf.comments.unshift(new_comment);
            }
        },
        async sendForItikafSchedule(scheduleId: string, comment: string): Promise<void> {
            const Api = useApiStore();
            const Itikaf = useItikafStore();

            comment = Validate(isComment, comment);

            const new_comment: Comment = await Api.post('/comments/itikaf-schedule/' + scheduleId, { comment }) as Comment;

            const schedule = Itikaf.schedules.find(s => s.id == scheduleId);
            if (schedule) {
                if (schedule.comments) schedule.comments.unshift(new_comment);
            }
        },
        async replyItikafComment(commentId: string, comment: string): Promise<void> {
            const Api = useApiStore();
            const Itikaf = useItikafStore();

            comment = Validate(isComment, comment);

            const new_comment_reply: CommentReply = await Api.post('/comments/reply/' + commentId, { comment }) as CommentReply;

            if (Itikaf.itikaf) {
                if (Itikaf.itikaf.comments) {
                    const _comment = Itikaf.itikaf.comments.find(c => c.id == commentId);

                    if (_comment.replies) _comment.replies.unshift(new_comment_reply);
                }
            }
        },
        async replyItikafScheduleComment(scheduleId: string, commentId: string, comment: string): Promise<void> {
            const Api = useApiStore();
            const Itikaf = useItikafStore();

            comment = Validate(isComment, comment);

            const new_comment_reply: CommentReply = await Api.post('/comments/reply/' + commentId, { comment }) as CommentReply;

            const schedule = Itikaf.schedules.find(s => s.id == scheduleId);
            if (schedule) {
                if (schedule.comments) {
                    const _comment = schedule.comments.find(c => c.id == commentId);

                    if (_comment?.replies) _comment.replies.unshift(new_comment_reply);
                }
            }
        },
        async removeItikafComment(id: string): Promise<void> {
            const Api = useApiStore();
            const Itikaf = useItikafStore();

            await Api.delete('/comments/' + id);

            if (!Itikaf.itikaf) return;
            if (!Itikaf.itikaf.comments) return;

            const index = Itikaf.itikaf.comments.findIndex(c => c.id == id);
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
            console.log(schedule);

            if (!schedule) return;
            console.log(schedule.comments);
            if (!schedule.comments) return;

            const index = schedule.comments.findIndex(c => c.id == id);
            console.log(index);
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

            const index = comment.replies.findIndex((r: CommentReply) => r.id == id);
            if (index != -1) {
                comment.replies.splice(index, 1);
            }
        },
    }
})