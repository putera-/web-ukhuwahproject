<template>
    <div class="card shadow-lg bg-white rounded-2xl overflow-hidden relative">
        <button class="absolute top-5 right-5 btn btn-sm rounded-full bg-[#EE9A49] z-10"
            v-if="route.path.includes('/admin') && article.status == 'DRAFT'">{{ article.status }}</button>
        <NuxtLink
            :to="route.path.includes('/admin') ? '/admin/articles/form?id=' + article.id : '/articles/' + article.id">
            <template v-if="article.photos || article.youtubeId">
                <div v-if="article.youtubeId"
                    class="h-[30vh] md:h-[50vh] lg:h-[70vh] rounded-t-xl overflow-hidden relative bg-cover bg-center"
                    :style="`background-image: url(https://img.youtube.com/vi/${article.youtubeId}/maxresdefault.jpg);`">
                    <div class="w-full h-full  bg-gradient-to-t from-white via-white/0 to-white/0 absolute"></div>
                </div>
                <template v-else>
                    <div v-if="article.photos!.length"
                        class="h-[30vh] md:h-[50vh] lg:h-[70vh] rounded-t-xl overflow-hidden relative bg-cover bg-center"
                        :style="`background-image: url(${isURL(article.photos![0].path) ? article.photos![0].path : apiUri + article.photos![0].path});`">
                        <div class="w-full h-full  bg-gradient-to-t from-white via-white/0 to-white/0 absolute"></div>
                    </div>
                </template>
            </template>
            <div v-else class="w-full h-40 md:h-52 lg:h-60 rounded-t-xl overflow-hidden relative">
                <div class="w-full h-full bg-gradient-to-t from-white to-[#F8D7B6] absolute"></div>
            </div>
        </NuxtLink>
        <div class="card-body max-sm:p-5 -mt-10 z-20">
            <NuxtLink
                :to="route.path.includes('/admin') ? '/admin/articles/form?id=' + article.id : '/articles/' + article.id"
                class="text-xl lg:text-2xl font-medium">{{ article.title }}
            </NuxtLink>
            <div class="line-clamp-2 font-light">{{ article.content }}</div>

            <div class="flex max-sm:flex-col justify-between gap-4">
                <div class="flex items-center gap-2" v-if="article.author">
                    <template v-if="article.author.avatar_md">
                        <img v-if="isURL(article.author.avatar_md)" :src="article.author.avatar_md" alt=""
                            class="flex-none rounded-full w-10 md:w-14 h-10 md:h-14">
                        <img v-else :src="apiUri + article.author.avatar_md" alt=""
                            class="flex-none rounded-full w-10 md:w-14 h-10 md:h-14">
                    </template>
                    <div>
                        <div>{{ article.author.name }}</div>
                        <div class="text-xs text-slate-500">{{ getRelativeTime(article.publishedAt) }}</div>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex gap-4 justify-center sm:justify-end" v-if="article._count">
                        <div class="flex items-center gap-2">
                            <template v-if="article.likes">
                                <label class="swap swap-flip text-9xl">
                                    <!-- this hidden checkbox controls the state -->
                                    <input type="checkbox" :checked="article.likes.length > 0"
                                        @change="Article.swapLike(!article!.likes!.length, article!.id, route)" />
                                    <IconsLoving class="w-4 swap-on" />
                                    <IconsLove class="w-4 swap-off" />
                                </label>
                            </template>
                            <IconsLove v-else class="w-4 swap-off" />
                            {{ article._count.likes }}
                        </div>
                        <div class="flex items-center gap-2">
                            <IconsComment class="w-4" />
                            {{ article._count.comments }}
                        </div>
                    </div>

                    <!-- admin only -->
                    <div class="flex gap-4 justify-center sm:justify-end" v-if="route.path.includes('/admin')">
                        <button @click="confirmPublish = true" class="btn btn-sm rounded-full bg-[#EE9A49]"
                            v-if="article.status == 'DRAFT'">Publish
                            Sekarang</button>
                        <NuxtLink :to="'/admin/articles/form?id=' + article.id" class="btn btn-sm rounded-full">Ubah
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- comments -->
            <!-- <div class="flex flex-col gap-2" v-if="article.comments && article._count">
                <div class="flex gap-4 items-center border-t border-t-gray-300">
                    <div class="font-semibold text-xl">Komentar</div>
                    <div v-if="article.comments.length < article._count.comments"
                        class="underline font-light text-xs md:text-sm text-gray-500">Lihat semua komentar
                    </div>
                </div>
                <template v-for="comment in article.comments" :key="comment.id">
                    <Comment :comment />
                </template>

            </div> -->
        </div>
    </div>

    <Confirmation action-text="Publish" :show="confirmPublish" @close="confirmPublish = false" @yes="publish">
        Publish sekarang?
    </Confirmation>
</template>

<script setup lang="ts">
const props = defineProps<{
    article: Article
}>()
const { public: { apiUri } } = useRuntimeConfig();

const Article = useArticleStore();
const route = useRoute();

const confirmPublish = ref(false);
const publish = async () => {
    await Article.publish(props.article.id);
    Article.getAll();

    confirmPublish.value = false;
}
</script>