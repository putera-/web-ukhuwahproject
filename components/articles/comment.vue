<template>
    <div class="flex gap-2">
        <template v-if="comment.commenter.avatar_md">
            <img v-if="isURL(comment.commenter.avatar_md)" :src="comment.commenter.avatar_md" alt=""
                class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10">
            <img v-else :src="apiUri + comment.commenter.avatar_md" alt=""
                class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10">
        </template>
        <div class="w-full">
            <div class="font-semibold">{{ comment.commenter.name }}</div>
            <div class="font-light text-xs md:text-sm">{{ comment.comment }}</div>
            <div class="flex gap-3 items-center">
                <div class="font-light text-xs md:text-sm text-gray-500">
                    {{ dayjs(comment.createdAt).format('D MMM YYYY HH:mm') }}
                </div>
                <div class="font-light text-xs md:text-sm text-gray-500">Balas</div>
                <div class="flex gap-4">
                    <div class="flex items-center gap-2">
                        <IconsLove class="w-4" />
                        {{ comment._count.likes }}
                    </div>
                    <div class="flex items-center gap-2">
                        <IconsComment class="w-4" />
                        {{ comment._count.replies }}
                    </div>
                </div>

            </div>
            <!-- REPLIES -->
            <div class="w-full pl-2 border-l border-l-gray-400">
                <template v-for="reply in comment.replies" :key="reply.id">
                    <ArticlesCommentReply :reply />
                </template>
                <div v-if="comment.replies.length < comment._count.replies"
                    class="underline font-light text-xs md:text-sm text-gray-500">Lihat semua balasan</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
defineProps<{
    comment: ArticleComment
}>()

</script>