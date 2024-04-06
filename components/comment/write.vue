<template>
    <!-- bg-[#F8D7B6] -->
    <div>
        <div class="flex items-center gap-2 text-gray-500" v-show="reply_to != ''">
            <div class="font-normal text-xs">Membalas <span class="font-medium">{{ reply_to }}</span></div>
            <button @click="reply_to = ''; commentId = undefined;">
                <IconsCross class="w-6" />
            </button>
        </div>
        <div class="px-2 flex items-center gap-2">
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
    itikafScheduleId?: string
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

    // for itikaf schedule
    if (props.itikafScheduleId) {
        try {
            await useComment.sendForItikafSchedule(props.itikafScheduleId, comment.value);

            // reset
            comment.value = '';
            reply_to.value = '';
            commentId.value = undefined;
        } catch (error) {
            console.log(error)
        }
    }
}
</script>