<template>
    <div class="w-full min-h-screen max-w-5xl mx-auto pt-20 pb-10 px-4 md:px-6 my-6 overflow-hidden">
        <div class="text-center text-2xl md:text-3xl lg:text-4xl font-medium mb-4">Artikel Ukhuwah Project</div>

        <div class="flex flex-col gap-6">
            <template v-for="article in Article.articles" :key="article.id">
                <ArticlesCard :article />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['onlyauth']
});

const Article = useArticleStore();
onBeforeMount(async () => {
    await Article.getPublisheds()
})

</script>