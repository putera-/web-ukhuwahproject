<template>
    <div class="card shadow-xl rounded-3xl">
        <div class="card-body">
            <div v-if="article.photos.length"
                class="h-[30vh] md:h-[50vh] lg:h-[70vh] rounded-xl overflow-hidden relative bg-cover bg-center"
                :style="`background-image: url(${isURL(article.photos[0].path) ? article.photos[0].path : apiUri + article.photos[0].path});`">
            </div>
            <div class="text-nowrap truncate font-semibold">{{ article.title }}</div>
            <div class="line-clamp-3 font-light">{{ article.content }}</div>

            <div class="flex justify-between">
                <div class="flex items-center gap-2">
                    <template v-if="article.author.avatar_md">
                        <img v-if="isURL(article.author.avatar_md)" :src="article.author.avatar_md" alt=""
                            class="flex-none rounded-full w-12 md:w-16 h-12 md:h-16">
                        <img v-else :src="apiUri + article.author.avatar_md" alt=""
                            class="flex-none rounded-full w-12 md:w-16 h-12 md:h-16">
                    </template>
                    <div>
                        <div>{{ article.author.name }}</div>
                        <div class="text-xs text-slate-500">{{ dayjs(article.createdAt).format('D MMM YYYY HH:mm')
                            }}</div>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="flex items-center gap-2">
                        <IconsLove class="w-4" />
                        {{ article._count.likes }}
                    </div>
                    <div class="flex items-center gap-2">
                        <IconsComment class="w-4" />
                        {{ article._count.comments }}
                    </div>
                </div>
            </div>

            <!-- comments -->
            <div class="flex flex-col gap-2">
                <div class="flex gap-4 items-center border-t border-t-gray-300">
                    <div class="font-semibold text-xl">Komentar</div>
                    <div v-if="article.comments.length < article._count.comments"
                        class="underline font-light text-xs md:text-sm text-gray-500">Lihat semua komentar
                    </div>
                </div>
                <template v-for="comment in article.comments" :key="comment.id">
                    <Comment :comment />
                </template>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
defineProps<{
    article: Article
}>()

</script>