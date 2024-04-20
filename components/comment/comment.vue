<template>
    <div class="flex gap-2" v-if="comment.commenter">
        <template v-if="comment.commenter.avatar_md">
            <img v-if="isURL(comment.commenter.avatar_md)" :src="comment.commenter.avatar_md" alt=""
                class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10">
            <img v-else :src="apiUri + comment.commenter.avatar_md" alt=""
                class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10">
        </template>
        <div v-else
            class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-white to-[#EE9A49] flex justify-center items-center overflow-hidden text-gray-500 text-xl font-light">
            {{ comment.commenter.name[0] }}
        </div>
        <div class="w-full">
            <div class="font-semibold text-sm">{{ comment.commenter.name }}</div>
            <div class="font-light text-xs md:text-sm whitespace-pre-wrap">{{ comment.comment }}</div>
            <div class="flex max-sm:flex-col gap-3 sm:items-center">
                <div class="flex gap-3">
                    <div class="font-light text-xs md:text-sm text-gray-500 text-nowrap">
                        {{ getRelativeTime(comment.createdAt) }}
                    </div>
                    <div class="mr-10 flex gap-4">
                        <button @click="$emit('reply', comment)"
                            class="font-light text-xs md:text-sm text-gray-500">Balas</button>
                        <template v-if="Auth.user">
                            <template v-if="Auth.user.role != 'MEMBER' || Auth.user.id == comment.userId">
                                <button @click="confirm_remove = true; removeId = comment.id"
                                    class="font-light text-xs md:text-sm text-gray-500">Hapus</button>
                            </template>
                        </template>
                    </div>
                </div>
                <div class="flex gap-4 max-sm:justify-end">
                    <div class="flex items-center gap-2" v-if="comment._count">
                        <IconsComment class="w-4" />
                        {{ comment._count.replies }}
                    </div>
                    <div class="flex items-center gap-2" v-if="comment.likes && comment._count">
                        <label class="swap swap-flip text-9xl">
                            <!-- this hidden checkbox controls the state -->
                            <input type="checkbox" :checked="comment.likes.length > 0"
                                @change="swapLike(!comment.likes!.length)" />
                            <IconsLoving class="w-4 swap-on" />
                            <IconsLove class="w-4 swap-off" />
                        </label>
                        {{ comment._count.likes }}
                    </div>
                </div>

            </div>
            <!-- REPLIES -->
            <div class="w-full pl-2 border-l border-l-gray-400">
                <template v-for="reply in comment.replies" :key="reply.id">
                    <CommentReply :reply @swapLike="(like: boolean) => swapLikeReply(like, reply.id)"
                        @remove="confirm_remove_reply = true; remove_comment_reply_id = comment.id; remove_reply_id = reply.id" />
                </template>
                <template v-if="comment.replies && comment._count">
                    <button @click="loadReplies" v-if="comment.replies.length < comment._count.replies"
                        class="underline font-light text-xs md:text-sm text-gray-500">
                        Lihat balasan lainnya
                    </button>
                </template>
            </div>
        </div>
    </div>
    <LazyConfirmation v-if="confirm_remove" :show="confirm_remove" actionText="Hapus" @close="confirm_remove = false"
        @yes="remove">
        Apakah Yakin untuk menghapus?
    </LazyConfirmation>
    <LazyConfirmation v-if="confirm_remove_reply" :show="confirm_remove_reply" actionText="Hapus"
        @close="confirm_remove_reply = false" @yes="remove_reply">
        Apakah Yakin untuk menghapus?
    </LazyConfirmation>
</template>

<script setup lang="ts">
defineEmits(['reply'])
const props = defineProps<{
    comment: Comment
    itikafId?: string
    scheduleId?: string
    articleId?: string
    campaignId?: string
}>();

const { public: { apiUri } } = useRuntimeConfig();
const route = useRoute();

const Itikaf = useItikafStore();
const Article = useArticleStore();
const Campaign = useCampaignStore();
const Auth = useAuthStore();

const loadReplies = async () => {
    if (!props.comment.replies) return;

    const nextPage = getNextPage(props.comment.replies.length);

    if (props.itikafId) {
        await Itikaf.loadMoreItikafCommentReplies(props.comment.id, nextPage)
    } else if (props.scheduleId) {
        await Itikaf.loadMoreItikafScheduleCommentReplies(props.scheduleId, props.comment.id, nextPage)
    } else if (props.articleId) {
        await Article.loadMoreCommentReplies(props.articleId, props.comment.id, nextPage)
    } else if (props.campaignId) {
        await Campaign.loadMoreCommentReplies(props.campaignId, props.comment.id, nextPage)
    }
}

const swapLike = async (like: boolean) => {
    await isToLoginPage(route);

    if (props.itikafId) {
        await Itikaf.swapLikeItikafComment(like, props.comment.id);
    } else if (props.scheduleId) {
        await Itikaf.swapLikeItikafScheduleComment(like, props.scheduleId, props.comment.id);
    } else if (props.articleId) {
        await Article.swapLikeComment(like, props.articleId, props.comment.id);
    } else if (props.campaignId) {
        await Campaign.swapLikeComment(like, props.campaignId, props.comment.id);
    }
}

const swapLikeReply = async (like: boolean, replyId: string) => {
    await isToLoginPage(route);

    if (props.itikafId) {
        await Itikaf.swapLikeItikafCommentReply(like, props.comment.id, replyId);
    } else if (props.scheduleId) {
        await Itikaf.swapLikeItikafScheduleCommentReply(like, props.scheduleId, props.comment.id, replyId);
    } else if (props.articleId) {
        await Article.swapLikeCommentReply(like, props.articleId, props.comment.id, replyId);
    } else if (props.campaignId) {
        await Campaign.swapLikeCommentReply(like, props.campaignId, props.comment.id, replyId);
    }
}

const UseComment = useCommentStore();
const confirm_remove = ref(false);
const removeId = ref<string | null>(null)
const remove = async (): Promise<void> => {
    if (!removeId.value) return;

    try {
        if (props.itikafId) {
            await UseComment.removeItikafComment(removeId.value);
        } else if (props.scheduleId) {
            await UseComment.removeItikafScheduleComment(removeId.value, props.scheduleId);
        } else if (props.articleId) {
            await UseComment.removeArticleComment(removeId.value, props.articleId);
        } else if (props.campaignId) {
            await UseComment.removeCampaignComment(removeId.value, props.campaignId);
        }

        confirm_remove.value = false;
    } catch (error) {
    }
}

// REMOVE REPLY
const confirm_remove_reply = ref(false);
const remove_comment_reply_id = ref<string | null>(null);
const remove_reply_id = ref<string | null>(null);
const remove_reply = async (): Promise<void> => {
    try {
        if (props.itikafId) {
            await UseComment.removeItikafCommentReply(remove_reply_id.value!, remove_comment_reply_id.value!);
        } else if (props.scheduleId) {
            await UseComment.removeItikafScheduleCommentReply(props.scheduleId, remove_reply_id.value!, remove_comment_reply_id.value!);
        } else if (props.articleId) {
            await UseComment.removeArticleCommentReply(props.articleId, remove_reply_id.value!, remove_comment_reply_id.value!);
        } else if (props.campaignId) {
            await UseComment.removeCampaignCommentReply(props.campaignId, remove_reply_id.value!, remove_comment_reply_id.value!);
        }

        confirm_remove_reply.value = false;
    } catch (error) {
    }
}
</script>