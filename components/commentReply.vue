<template>
    <div class="flex gap-2">
        <template v-if="reply.commenter.avatar_md">
            <img v-if="isURL(reply.commenter.avatar_md)" :src="reply.commenter.avatar_md" alt=""
                class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10">
            <img v-else :src="apiUri + reply.commenter.avatar_md" alt=""
                class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10">
        </template>
        <div class="w-full">
            <div class="font-semibold text-sm">{{ reply.commenter.name }}</div>
            <div class="font-light text-xs md:text-sm">{{ reply.comment }}</div>
            <div class="flex items-center gap-4">
                <div class="font-light text-xs md:text-sm text-gray-500 mr-10">
                    {{ getRelativeTime(reply.createdAt) }}
                </div>
                <div class="flex items-center gap-2">
                    <IconsLove class="w-4" />
                    {{ reply._count.likes }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
defineProps<{
    reply: CommentReply
}>()

</script>