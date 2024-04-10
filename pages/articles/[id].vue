<template>
    <div class="w-full min-h-screen max-w-5xl mx-auto pt-20 pb-10 px-4 md:px-6 my-6 overflow-hidden">
        <nuxt-link to="/articles" class="btn btn-sm rounded-full bg-white/0 border-0">
            <IconsArrowLeft class="w-8" />
        </nuxt-link>
        <template v-if="article">
            <div class="text-center text-2xl md:text-3xl lg:text-4xl font-medium mb-4">{{ article.title }}</div>

            <div class="card shadow-lg rounded-t-none bg-white overflow-hidden">
                <NuxtLink :to="'/articles/' + article.id">
                    <template v-if="article.photos || article.youtubeId">
                        <iframe v-if="article.youtubeId" class="w-full aspect-video"
                            :src="'https://www.youtube.com/embed/' + article.youtubeId" title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <template v-else>
                            <div v-if="article.photos!.length">
                                <Carousel :autoplay="10000" :wrapAround="true" class="">
                                    <Slide v-for="(photo, i) in article.photos" :key="i" class="">
                                        <div class="aspect-video bg-accent/20 w-full bg-cover bg-center"
                                            :style="`background-image: url(${isURL(photo.path) ? photo.path : apiUri + photo.path});`">
                                        </div>
                                    </Slide>

                                    <template #addons>
                                        <Navigation />
                                        <Pagination />
                                    </template>
                                </Carousel>
                            </div>
                        </template>
                    </template>
                    <div v-else class="w-full h-40 md:h-52 lg:h-60 overflow-hidden relative">
                        <div class="w-full h-full bg-gradient-to-t from-white to-[#F8D7B6] absolute"></div>
                    </div>
                </NuxtLink>
                <div class="card-body max-sm:p-5 z-20">
                    <div class="font-light whitespace-pre-wrap">{{ article.content }}</div>

                    <div class="flex justify-between items-center border-b border-t-gray-300 py-5">
                        <div class="flex items-center gap-2" v-if="article.author">
                            <template v-if="article.author.avatar_md">
                                <img v-if="isURL(article.author.avatar_md)" :src="article.author.avatar_md" alt=""
                                    class="flex-none rounded-full w-10 md:w-14 h-10 md:h-14">
                                <img v-else :src="apiUri + article.author.avatar_md" alt=""
                                    class="flex-none rounded-full w-10 md:w-14 h-10 md:h-14">
                            </template>
                            <div>
                                <div class="text-xs text-slate-500">Ditulis oleh</div>
                                <div>{{ article.author.name }}</div>
                                <div class="text-xs text-slate-500">{{ getRelativeTime(article.publishedAt) }}</div>
                            </div>
                        </div>
                        <div class="flex gap-4" v-if="article.likes && article._count">
                            <div class="flex items-center gap-2">
                                <label class="swap swap-flip text-9xl">
                                    <!-- this hidden checkbox controls the state -->
                                    <input type="checkbox" :checked="article.likes.length > 0"
                                        @change="Article.swapLike(!article!.likes!.length, article!.id, route)" />
                                    <IconsLoving class="w-4 swap-on" />
                                    <IconsLove class="w-4 swap-off" />
                                </label>
                                {{ article._count.likes }}
                            </div>
                            <div class="flex items-center gap-2">
                                <IconsComment class="w-4" />
                                {{ article._count.comments }}
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

                    <!-- comment list -->
                    <div class="flex flex-col gap-1">
                        <template v-for="comment in article.comments" :key="comment.id">
                            <Comment :comment :articleId="article.id" @reply="(c: Comment) => reply_to = c" />
                        </template>
                    </div>
                    <template v-if="article.comments && article._count">
                        <button @click="Article.loadMoreComments(article!.id, getNextPage(article!.comments!.length))"
                            v-if="article.comments.length < article._count.comments"
                            class="underline font-light text-xs md:text-sm text-gray-500 w-min text-nowrap">
                            Lihat komentar lainnya
                        </button>
                    </template>
                    <CommentWrite :comment="reply_to" :articleId="article.id" :focus="focusOnWriteComment" />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

definePageMeta({
    middleware: ['onlyauth']
});

const Article = useArticleStore();
const route = useRoute();
const id: string = route.params.id as string;
const article = ref<Article | undefined>(undefined);

await Article.getPublishedById(id);

useSeoMeta({
    title: () => Article.article!.title,
    ogTitle: () => Article.article!.title,
    description: () => Article.article!.content,
    ogDescription: () => Article.article!.content,
    ogImage: () => Article.article!.photos!.length ? Article.article!.photos![0].path_md : '',
    twitterCard: 'summary_large_image'
});

watchEffect(() => {
    if (Article.article) article.value = Article.article
});


const reply_to = ref<Comment | undefined>(undefined);
const focusOnWriteComment = ref<boolean>(false);

onUnmounted(() => {
    Article.article = undefined;
});

watchEffect(() => {
    if (reply_to.value != undefined) {
        focusOnWriteComment.value = true;
    }
});
</script>