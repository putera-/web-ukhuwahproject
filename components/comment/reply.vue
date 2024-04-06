<template>
    <div class="flex gap-2" v-if="reply.commenter">
        <template v-if="reply.commenter.avatar_md">
            <img v-if="isURL(reply.commenter.avatar_md)" :src="reply.commenter.avatar_md" alt=""
                class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10">
            <img v-else :src="apiUri + reply.commenter.avatar_md" alt=""
                class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10">
        </template>
        <div class="w-full">
            <div class="font-semibold text-sm">{{ reply.commenter.name }}</div>
            <div class="font-light text-xs md:text-sm whitespace-pre-wrap">{{ reply.comment }}</div>
            <div class="flex items-center gap-4">
                <div class="font-light text-xs md:text-sm text-gray-500 mr-10 text-nowrap">
                    {{ getRelativeTime(reply.createdAt) }}
                </div>
                <template v-if="Auth.user">
                    <template v-if="Auth.user.role != 'MEMBER' || Auth.user.id == reply.userId">
                        <button @click="$emit('remove')"
                            class="font-light text-xs md:text-sm text-gray-500 mr-10">Hapus</button>
                    </template>
                </template>
                <div class="flex items-center gap-2" v-if="reply.likes && reply._count">
                    <label class="swap swap-flip text-9xl">
                        <!-- this hidden checkbox controls the state -->
                        <input type="checkbox" :checked="reply.likes.length > 0"
                            @change="$emit('swapLike', !reply.likes.length)" />
                        <IconsLoving class="w-4 swap-on" />
                        <IconsLove class="w-4 swap-off" />
                    </label>
                    {{ reply._count.likes }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits(['remove', 'swapLike']);
defineProps<{
    reply: CommentReply
}>();

const Auth = useAuthStore();
</script>