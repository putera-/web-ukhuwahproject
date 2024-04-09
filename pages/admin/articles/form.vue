<template>
    <div>
        <nuxt-link to="/admin/articles" class="btn btn-sm rounded-full bg-white/0 border-0">
            <IconsArrowLeft class="w-8" />
        </nuxt-link>

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

            <iframe v-if="youtubeId" class="w-full aspect-video mt-3"
                :src="'https://www.youtube.com/embed/' + youtubeId" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <div class="label" v-else>
                <span class="label-text-alt text-error">Youtube URL is not valid</span>
            </div>
        </label>

        <!-- photo -->
        <template v-if="!youtubeId">
            <div class="label flex max-sm:flex-col sm:justify-between items-start sm:items-center">
                <span class="label-text text-lg">Foto</span>
                <div class="flex items-center gap-3">
                    <div v-if="photos.length >= 10" class="text-xs">Maks 10 foto</div>
                    <button :disabled="photos.length >= 10" class="btn btn-sm rounded-full bg-[#EE9A49]"
                        @click="fileHTML?.click()">
                        <LucidePlus :size="12" />Tambah Foto
                    </button>
                </div>
            </div>
            <draggable v-model="photos" group="photo" item-key="id"
                class="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4">
                <template #item="{ element, index }">
                    <div class="aspect-video bg-accent/20 w-full bg-cover bg-center rounded-lg cursor-grab relative"
                        :style="`background-image: url(${element.path});`">

                        <div class="dropdown dropdown-end absolute z-[1] right-2 top-2">
                            <LucideMoreVertical :size="16" tabindex="0" role="button" />
                            <ul tabindex="0"
                                class="dropdown-content z-[1] menu menu-xs p-2 shadow bg-base-100 rounded-box">
                                <li><button class="btn btn-error btn-xs h-min my-px flex flex-nowrap text-white"
                                        @click="removePhoto(index)">
                                        <LucideTrash2 :size="16" />Remove
                                    </button></li>
                            </ul>
                        </div>

                    </div>
                </template>
            </draggable>

            <input type="file" class="hidden" ref="fileHTML"
                accept="image/jpg, image/jpeg, image/png, image/webp, image/gif" multiple @change="handlePhotos">
        </template>


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
            <NuxtLink to="/admin/articles" class="btn rounded-full">Batal</NuxtLink>
            <button class="btn bg-[#EE9A49] rounded-full" @click="update">Simpan</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { toast } from 'vue3-toastify';

definePageMeta({
    layout: 'admin',
    middleware: [
        'admin'
    ]
});

const route = useRoute();
const id = route.query.id as string;

const Article = useArticleStore();

Article.getById(id);

const form = ref<Record<string, any>>({
    title: '',
    content: '',
    youtube: ''
});

const fileHTML = ref<HTMLInputElement | null>(null);

const photos = ref<{ file?: File, path: string, id?: string }[]>([]);

// const photos = ref<Photo[]>([]);
const isYoutube = ref<boolean>(false);

const errors = ref<Record<string, any>>({});
const responseError = ref<string>('');
const isLoading = ref<boolean>(false);

watchEffect(() => {
    if (Article.article) {
        form.value.title = Article.article.title;
        form.value.content = Article.article.content;

        if (Article.article.photos) photos.value = Article.article.photos.map(p => {
            return {
                id: p.id,
                path: isURL(p.path) ? p.path : apiUri + p.path,
            }
        });

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

const handlePhotos = (e: Event): void => {
    const fileInput = e.target as HTMLInputElement;
    const files = fileInput.files;

    if (files!.length) {
        for (let i = 0; i < files!.length; i++) {
            const photo = files![i];

            const reader = new FileReader();

            reader.readAsDataURL(photo);
            reader.onload = () => {
                // prevent more than 10 photo
                if (photos.value.length == 10) return;

                const index = photos.value.length;

                photos.value.push({
                    file: photo,
                    path: reader.result as string,
                });
            };

        }

        // reset
        fileInput.value = '';
    }
};

const removePhoto = (index: number) => {
    photos.value.splice(index, 1);
}

const update = async (): Promise<void> => {
    if (isLoading.value) return;

    isLoading.value = true;

    // reset
    responseError.value = '';
    errors.value = {};

    try {
        const data_photos = photos.value.map(p => {
            return { id: p.id, file: p.file }
        });

        await Article.update(form.value, data_photos);

        isLoading.value = false;
        toast.success('Success', {
            autoClose: 500
        });
    } catch (error: any) {
        console.log(error);
        isLoading.value = false;

        if (error.isJoi) {
            console.log(error.data)
            errors.value = error.data;
        } else {
            responseError.value = error.message;
        }

    }
}

</script>