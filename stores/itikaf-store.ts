import { defineStore } from "pinia";
import type { RouteLocationNormalizedLoaded } from "vue-router";

interface ItikafState {
    itikaf?: Itikaf
    schedules: ItikafSchedule[]
    year: string
}

interface JoinItikafForm {
    "man": number
    "woman": number
    "vehicle_type"?: "Motor" | "Mobil" | ""
    "vehicle_no"?: string
}

export const useItikafStore = defineStore("itikaf", {
    state: (): ItikafState => ({
        itikaf: undefined,
        schedules: [],
        year: new Intl.DateTimeFormat('ar-TN-u-ca-islamic', { year: 'numeric' }).format(Date.now()).split(' ')[0]
    }),
    actions: {
        async get(): Promise<void> {
            const Api = useApiStore();
            const itikaf = await Api.get('/itikafs/' + this.year) as Itikaf;

            if (itikaf) this.itikaf = itikaf;
        },
        async create(data: FormData) {
            const Api = useApiStore();

            this.itikaf = await Api.post('/itikafs/' + this.year, data);
        },
        async update(data: FormData) {
            const Api = useApiStore();

            this.itikaf = await Api.patch('/itikafs/' + this.year, data);
        },
        async getSchedule(): Promise<void> {
            const Api = useApiStore();
            const Auth = useAuthStore();

            this.schedules = await Api.get('/itikaf-schedules/' + this.year) as ItikafSchedule[]
        },
        async getScheduleById(id: string): Promise<ItikafSchedule> {
            const Api = useApiStore();

            return await Api.get('/itikaf-schedules/detail/' + id) as ItikafSchedule
        },
        async join(data: JoinItikafForm, scheduleId: string): Promise<void> {
            const Api = useApiStore();

            data = Validate(isJoinItikaf, data);

            if (data.vehicle_type == '') {
                delete data.vehicle_type;
                delete data.vehicle_no;
            }

            await Api.post('/itikaf-schedules/participate/' + scheduleId, data);

        },
        async cancelJoin(unparticipate_reason: string, scheduleId: string): Promise<void> {
            const Api = useApiStore();

            await Api.patch('/itikaf-schedules/unparticipate/' + scheduleId, { unparticipate_reason });
        },
        async getMySchedule(scheduleId: string): Promise<ItikafParticipant> {
            const Api = useApiStore();

            return Api.get('/itikaf-participants/me/' + scheduleId) as ItikafParticipant;
        },
        async createSchedule(data: FormData) {
            const Api = useApiStore();
            if (!this.itikaf) throw new Error('Buat Data Itikaf terlebih dahulu')
            data.append('itikafId', this.itikaf.id);

            await Api.post('/itikaf-schedules', data);
        },
        async updateSchedule(id: string, data: FormData) {
            const Api = useApiStore();

            await Api.patch('/itikaf-schedules/' + id, data);
        },
        async setCouponTaken(id: string) {
            const Api = useApiStore();

            await Api.patch('/itikaf-participants/coupon_taken/' + id, {});
        },
        async swapLikeItikaf(like: boolean, route: RouteLocationNormalizedLoaded): Promise<void> {
            // check is already login
            await isToLoginPage(route);

            const Api = useApiStore();
            if (this.itikaf) {
                if (like) {
                    const dataLike = await Api.post('/likes/itikaf/' + this.itikaf.id, {});
                    this.itikaf.likes = [dataLike];
                    ++this.itikaf._count.likes;
                } else {
                    await Api.delete('/likes/itikaf/' + this.itikaf.id);
                    --this.itikaf._count.likes;
                    this.itikaf.likes = [];
                }
            }
        },
        async swapLikeSchedule(like: boolean, scheduleId: string, route: RouteLocationNormalizedLoaded): Promise<void> {
            // check is already login
            await isToLoginPage(route);

            const Api = useApiStore();
            const schedule: ItikafSchedule = this.schedules.find((s: ItikafSchedule) => s.id == scheduleId) as ItikafSchedule;
            if (schedule) {
                if (like) {
                    const dataLike = await Api.post('/likes/itikaf-schedule/' + scheduleId, {}) as Like;
                    schedule.likes = [dataLike];
                    ++schedule._count!.likes!;
                } else {
                    await Api.delete('/likes/itikaf-schedule/' + scheduleId);
                    schedule.likes = [];
                    --schedule._count!.likes!;
                }
            }
        },
        async swapLikeItikafComment(like: boolean, commentId: string) {
            const Api = useApiStore();
            if (this.itikaf) {
                const comment = this.itikaf.comments.find((c: Comment) => c.id == commentId) as Comment;

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
            }
        },
        async swapLikeItikafScheduleComment(like: boolean, scheduleId: string, commentId: string) {
            const Api = useApiStore();
            if (this.itikaf) {
                const schedule = this.schedules.find((s: ItikafSchedule) => s.id == scheduleId) as ItikafSchedule;
                if (!schedule) return;

                const comment = schedule.comments!.find((c: Comment) => c.id == commentId) as Comment;
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
            }
        },
        async swapLikeItikafCommentReply(like: boolean, commentId: string, replyId: string) {
            const Api = useApiStore();
            if (this.itikaf) {
                const comment = this.itikaf.comments.find((c: Comment) => c.id == commentId) as Comment;
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
            }
        },
        async swapLikeItikafScheduleCommentReply(like: boolean, scheduleId: string, commentId: string, replyId: string) {
            const Api = useApiStore();
            if (this.itikaf) {
                const schedule = this.schedules.find(s => s.id == scheduleId) as ItikafSchedule;
                if (!schedule) return;

                const comment = schedule.comments!.find((c: Comment) => c.id == commentId) as Comment;
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
            }
        },
        async loadMoreItikafComments(itikafId: string, page: number = 1): Promise<void> {
            if (!this.itikaf) return;

            try {
                const Api = useApiStore();
                const comments = await Api.get(`/comments/itikaf/${itikafId}/${page}`) as Comment[];


                // TODO merge non existing data, supaya reply yg ke load ga ketutup
                if (page == 1) {
                    this.itikaf.comments = comments
                } else {
                    this.itikaf.comments = [...this.itikaf.comments, ...comments]
                }
            } catch (error) {
                console.log(error)
            }
        },
        async loadMoreScheduleComments(scheduleId: string, page: number = 1): Promise<void> {
            const schedule = this.schedules.find(s => s.id == scheduleId);
            if (!schedule) return;

            try {
                const Api = useApiStore();
                const comments = await Api.get(`/comments/itikaf-schedule/${scheduleId}/${page}`) as Comment[];


                // TODO merge non existing data, supaya reply yg ke load ga ketutup
                if (page == 1) {
                    schedule.comments = comments
                } else {
                    schedule.comments = [...schedule.comments!, ...comments]
                }
            } catch (error) {
                console.log(error)
            }
        },
        async loadMoreItikafCommentReplies(commentId: string, page: number = 1): Promise<void> {
            const comment: Comment = this.itikaf.comments.find((s: Comment) => s.id == commentId) as Comment;
            if (!comment) return;

            try {
                const Api = useApiStore();
                const replies = await Api.get(`/comments/reply/${commentId}/${page}`) as CommentReply[];


                // TODO merge non existing data, supaya reply yg ke load ga ketutup
                if (page == 1) {
                    comment.replies = replies
                } else {
                    comment.replies = [...comment.replies!, ...replies]
                }
            } catch (error) {
                console.log(error)
            }
        },
        async loadMoreItikafScheduleCommentReplies(scheduleId: string, commentId: string, page: number = 1): Promise<void> {
            const schedule: ItikafSchedule = this.schedules.find(s => s.id == scheduleId) as ItikafSchedule;
            if (!schedule) return;

            const comment: Comment = schedule.comments!.find((s: Comment) => s.id == commentId) as Comment;
            if (!comment) return;

            try {
                const Api = useApiStore();
                const replies = await Api.get(`/comments/reply/${commentId}/${page}`) as CommentReply[];


                // TODO merge non existing data, supaya reply yg ke load ga ketutup
                if (page == 1) {
                    comment.replies = replies
                } else {
                    comment.replies = [...comment.replies!, ...replies]
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
});