<template>
    <div>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text text-lg">Judul</span>
            </div>
            <input v-model="form.title" type="text" placeholder="Title"
                class="input md:input-lg input-bordered w-full rounded-2xl" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.title">{{ errors.title }}</span>
            </div>
        </label>
        <label v-if="isYoutube" class="form-control w-full">
            <div class="label">
                <span class="label-text text-lg">Youtube Url {{ youtubeId }}</span>
            </div>
            <input v-model="form.youtube" type="text" placeholder="Youtube URL"
                class="input md:input-lg input-bordered w-full rounded-2xl" />

            <iframe v-if="youtubeId" class="w-full aspect-video" :src="'https://www.youtube.com/embed/' + youtubeId"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <div class="label" v-else>
                <span class="label-text-alt text-error">Youtube URL is not valid</span>
            </div>
        </label>
        <div v-if="!youtubeId" class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="photo in photos" class="aspect-video bg-accent/20 w-full bg-cover bg-center rounded-lg"
                :style="`background-image: url(${isURL(photo.path) ? photo.path : apiUri + photo.path});`">
            </div>
        </div>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text text-lg">Konten</span>
            </div>
            <textarea v-model="form.content" class="textarea rounded-2xl textarea-bordered" placeholder="Content.."
                rows="10"></textarea>
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.content">{{ errors.content }}</span>
            </div>
        </label>

        <div class="flex justify-end items-center gap-4">
            <NuxtLink to="/admin/articles" class="btn sm:btn-lg rounded-full">Batal</NuxtLink>
            <button class="btn sm:btn-lg bg-[#EE9A49] rounded-full" @click="update">Simpan</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
definePageMeta({
    layout: 'admin',
    middleware: [
        'admin'
    ]
});

const route = useRoute();
const id = route.params.id as string;

const Article = useArticleStore();

Article.getById(id);

const form = ref<Record<string, any>>({
    title: '',
    content: '',
    youtube: ''
});
const photos = ref<Photo[]>([]);
const isYoutube = ref<boolean>(false);

const errors = ref<Record<string, any>>({});
const responseError = ref<string>('');
const isLoading = ref<boolean>(false);

watchEffect(() => {
    if (Article.article) {
        form.value.title = Article.article.title;
        form.value.content = Article.article.content;

        if (Article.article.photos) photos.value = Article.article.photos;

        if (Article.article.youtubeId) {
            isYoutube.value = true;
            form.value.youtube = 'https://youtu.be/' + Article.article.youtubeId;
        }
    }
});

const youtubeUrlRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
const youtubeId = computed(() => {
    if (!form.value.youtube) return undefined;

    const match = form.value.youtube.match(youtubeUrlRegex);

    if (!match) return undefined;

    if (match.length > 1) {
        return match[1];
    } else {
        return undefined;
    }
});


onUnmounted(() => {
    Article.article = undefined;
});

const update = async (): Promise<void> => {
    if (isLoading.value) return;

    isLoading.value = true;

    // reset
    responseError.value = '';
    errors.value = {};

    try {
        const data_photos = photos.value.map(p => {
            return { id: p.id, index: p.index }
        });

        await Article.update(form.value, data_photos);

        isLoading.value = false;
        toast.success('Success', {
            autoClose: 500
        });
    } catch (error: any) {
        isLoading.value = false;

        if (error.isJoi) {
            errors.value = error.data;
        } else {
            responseError.value = error.message;
        }

    }
}

</script>