<template>
    <!-- bg-[#F8D7B6] -->
    <div class="">
        <div class="flex items-center gap-2 text-gray-500" v-show="reply_to != ''">
            <div class="font-normal text-xs">Membalas <span class="font-medium">{{ reply_to }}</span></div>
            <button @click="reply_to = ''; commentId = undefined;">
                <IconsCross class="w-6" />
            </button>
        </div>
        <div class="flex items-center gap-2">
            <textarea v-model="comment" rows="1" class="textarea textarea-warning rounded-full w-full max-w-xs"
                placeholder="Tulis Komentar"></textarea>
            <button @click="send">
                <IconsSend class="w-10" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    comment?: Comment
    itikafId?: string
    itikafScheduleId?: string
    articleId?: string
}>();

const reply_to = ref('');
const commentId = ref<string | undefined>(undefined);

watchEffect(() => {
    if (props.comment) {
        if (props.comment.commenter) {
            reply_to.value = props.comment.commenter.name;
            commentId.value = props.comment.id;
        }
    } else {
        reply_to.value = '';
    }
});

const useComment = useCommentStore();
const comment = ref('');
const route = useRoute();

const send = async () => {
    await isToLoginPage(route);

    // for itikaf
    if (props.itikafId) {
        if (!commentId.value) {
            // for itikaf
            try {
                await useComment.sendForItikaf(comment.value);
                reset();
            } catch (error) {
            }
        } else {
            // for reply comment
            try {
                await useComment.replyItikafComment(commentId.value, comment.value);
                reset();
            } catch (error) {
            }
        }
    }

    // for itikaf schedule
    if (props.itikafScheduleId) {
        if (!commentId.value) {
            // for itikaf schedule
            try {
                await useComment.sendForItikafSchedule(props.itikafScheduleId, comment.value);
                reset();
            } catch (error) {
            }
        } else {
            // for reply comment
            try {
                await useComment.replyItikafScheduleComment(props.itikafScheduleId, commentId.value, comment.value);
                reset();
            } catch (error) {

            }
        }
    }

    // for article
    if (props.articleId) {
        if (!commentId.value) {
            // for itikaf schedule
            try {
                await useComment.sendForArticle(props.articleId, comment.value);
                reset();
            } catch (error) {
            }
        } else {
            // for reply comment
            try {
                await useComment.replyArticleComment(props.articleId, commentId.value, comment.value);
                reset();
            } catch (error) {

            }
        }
    }
}

const reset = () => {
    comment.value = '';
    reply_to.value = '';
    commentId.value = undefined;
}
</script>