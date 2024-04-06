<template>
    <div class="flex gap-2">
        <template v-if="comment.commenter.avatar_md">
            <img v-if="isURL(comment.commenter.avatar_md)" :src="comment.commenter.avatar_md" alt=""
                class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10">
            <img v-else :src="apiUri + comment.commenter.avatar_md" alt=""
                class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10">
        </template>
        <div class="w-full">
            <div class="font-semibold text-sm">{{ comment.commenter.name }}</div>
            <div class="font-light text-xs md:text-sm whitespace-pre-wrap">{{ comment.comment }}</div>
            <div class="flex gap-3 items-center">
                <div class="font-light text-xs md:text-sm text-gray-500 text-nowrap">
                    {{ getRelativeTime(comment.createdAt) }}
                </div>
                <button @click="$emit('reply', comment)"
                    class="font-light text-xs md:text-sm text-gray-500 mr-10">Balas</button>
                <div class="flex gap-4">
                    <div class="flex items-center gap-2">
                        <IconsComment class="w-4" />
                        {{ comment._count.replies }}
                    </div>
                    <div class="flex items-center gap-2">
                        <label class="swap swap-flip text-9xl">
                            <!-- this hidden checkbox controls the state -->
                            <input type="checkbox" :checked="comment.likes.length"
                                @change="swapLike(!comment.likes.length)" />
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
                    <CommentReply :reply @swapLike="(like: boolean) => swapLikeReply(like, reply.id)" />
                </template>
                <button @click="loadReplies" v-if="comment.replies.length < comment._count.replies"
                    class="underline font-light text-xs md:text-sm text-gray-500">
                    Lihat balasan lainnya
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    comment: Comment
    itikafId?: string
    scheduleId?: string
}>();

const route = useRoute();

const Itikaf = useItikafStore();

const loadReplies = async () => {
    const nextPage = getNextPage(props.comment.replies.length);

    if (props.itikafId) {
        await Itikaf.loadMoreItikafCommentReplies(props.comment.id, nextPage)
    } else if (props.scheduleId) {
        await Itikaf.loadMoreItikafScheduleCommentReplies(props.scheduleId, props.comment.id, nextPage)
    }
}

const swapLike = async (like: boolean) => {
    await isToLoginPage(route);

    if (props.itikafId) {
        await Itikaf.swapLikeItikafComment(like, props.comment.id);
    } else if (props.scheduleId) {
        await Itikaf.swapLikeItikafScheduleComment(like, props.scheduleId, props.comment.id);
    }
}

const swapLikeReply = async (like: boolean, replyId: string) => {
    await isToLoginPage(route);

    if (props.itikafId) {
        await Itikaf.swapLikeItikafCommentReply(like, props.comment.id, replyId);
    } else if (props.scheduleId) {
        await Itikaf.swapLikeItikafScheduleCommentReply(like, props.scheduleId, props.comment.id, replyId);
    }
}

</script>