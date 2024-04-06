import Joi from "joi";

const isComment = Joi.string().min(1).trim().required().label('Comment');

export const useCommentStore = defineStore('use-comment', {
    actions: {
        async sendForArticle(articleId: string, comment: string) {
            const Api = useApiStore();

            comment = Validate(isComment, comment);

            return Api.post('/comments/article/' + articleId, { comment });
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
        reply() {

        }
    }
})