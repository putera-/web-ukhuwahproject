<template>
    <div class="w-full min-h-screen max-w-5xl mx-auto pt-50 pb-10 px-4 md:px-6 my-6 overflow-hidden">
        <div class="flex max-sm:flex-col sm:justify-between items-center gap-3">
            <div class="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">Artikel Ukhuwah Project</div>

            <details class="dropdown dropdown-end">
                <summary class="m-1 btn btn-sm rounded-full bg-[#EE9A49]">
                    <LucidePlus :size="12" /> Buat Artikel
                </summary>
                <ul class="p-2 shadow menu dropdown-content z-[100] bg-base-100 rounded-box">
                    <li class="mb-2">
                        <NuxtLink to="/admin/articles/form"
                            class="btn btn-sm btn-neutral text-nowrap text-sm font-normal rounded-full">
                            <div class="flex items-center gap-2 w-full">
                                <LucidePlus :size="12" /> <span>Foto Artikel</span>
                            </div>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/admin/articles/form?youtube=true"
                            class="btn btn-sm btn-error text-white text-nowrap text-sm font-normal rounded-full">
                            <div class="flex items-center gap-2 w-full">
                                <LucidePlus :size="12" /> <span>Youtube Artikel</span>
                            </div>
                        </NuxtLink>
                    </li>
                </ul>
            </details>
        </div>

        <div class="flex flex-col gap-6">
            <template v-for="article in Article.articles" :key="article.id">
                <ArticlesCard :article />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: [
        'admin'
    ]
});

const Article = useArticleStore();
onBeforeMount(async () => {
    await Article.getAll()
});

</script>