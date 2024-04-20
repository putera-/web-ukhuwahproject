<template>
    <div class="card shadow-lg bg-white rounded-2xl overflow-hidden relative">
        <!-- <button class="absolute top-5 right-5 btn btn-sm rounded-full bg-[#EE9A49] z-10"
            v-if="route.path.includes('/admin') && article.status == 'DRAFT'">{{ article.status }}</button> -->
        <NuxtLink
            :to="route.path.includes('/admin') ? '/admin/campaigns/form?id=' + campaign.id : '/campaigns/' + campaign.id">
            <template v-if="campaign.photos">

                <div v-if="campaign.photos!.length"
                    class="h-[30vh] md:h-[50vh] lg:h-[70vh] rounded-t-xl overflow-hidden relative bg-cover bg-center"
                    :style="`background-image: url(${isURL(campaign.photos![0].path) ? campaign.photos![0].path : apiUri + campaign.photos![0].path});`">
                    <div class="w-full h-full  bg-gradient-to-t from-white via-white/0 to-white/0 absolute"></div>
                </div>
            </template>
            <div v-else class="w-full h-40 md:h-52 lg:h-60 rounded-t-xl overflow-hidden relative">
                <div class="w-full h-full bg-gradient-to-t from-white to-[#F8D7B6] absolute"></div>
            </div>
        </NuxtLink>
        <div class="card-body max-sm:p-5 -mt-10 z-20">
            <NuxtLink
                :to="route.path.includes('/admin') ? '/admin/campaigns/form?id=' + campaign.id : '/campaigns/' + campaign.id"
                class="text-xl lg:text-2xl font-medium">{{ campaign.title }}
            </NuxtLink>
            <div class="line-clamp-3 font-light">{{ campaign.description }}</div>

            <div class="flex justify-between items-center">
                <div class="flex flex-col">
                    <div class="text-slate-500">Dibutuhkan: {{ toRupiah(campaign.target_amount) }}</div>
                    <div class="">Terkumpul:
                        <span class="font-semibold"> {{ toRupiah(campaign.collected_amount) }}</span>
                    </div>
                </div>
                <NuxtLink :to="'/campaigns/' + campaign.id" class="btn btn-sm rounded-full btn-warning">
                    Ikut Donasi
                </NuxtLink>
            </div>

            <input type="range" min="0"
                :max="campaign.collected_amount > campaign.target_amount ? campaign.collected_amount : campaign.target_amount"
                :value="campaign.collected_amount" class="range range-xs range-warning" disabled />

            <div class="flex max-sm:flex-col justify-between gap-4">
                <div class="flex justify-between gap-2">
                    <div>
                        <div class="text-xs font-medium text-slate-500">Diterbitkan:</div>
                        <div class="text-xs text-slate-500">{{ getRelativeTime(campaign.publishedAt) }}</div>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex gap-4 justify-center sm:justify-end" v-if="campaign._count">
                    <div class="flex items-center gap-2">
                        <template v-if="campaign.likes">
                            <label class="swap swap-flip text-9xl">
                                <!-- this hidden checkbox controls the state -->
                                <input type="checkbox" :checked="campaign.likes.length > 0"
                                    @change="CampaignStore.swapLike(!campaign!.likes!.length, campaign!.id, route)" />
                                <IconsLoving class="w-4 swap-on" />
                                <IconsLove class="w-4 swap-off" />
                            </label>
                        </template>
                        <IconsLove v-else class="w-4 swap-off" />
                        {{ campaign._count.likes }}
                    </div>
                    <div class="flex items-center gap-2">
                        <IconsComment class="w-4" />
                        {{ campaign._count.comments }}
                    </div>
                </div>

                <!-- admin only -->
                <!-- <div class="flex gap-4 justify-center sm:justify-end" v-if="route.path.includes('/admin')"> -->
                <!-- <button @click="confirmPublish = true" class="btn btn-sm rounded-full bg-[#EE9A49]"
                        v-if="article.status == 'DRAFT'">Publish
                        Sekarang</button> -->
                <!-- <NuxtLink :to="'/admin/campaign/form?id=' + campaign.id" class="btn btn-sm rounded-full">Ubah
                    </NuxtLink> -->
                <!-- </div> -->
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

    <!-- <Confirmation action-text="Publish" :show="confirmPublish" @close="confirmPublish = false" @yes="publish">
        Publish sekarang?
    </Confirmation> -->
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
const props = defineProps<{
    campaign: Campaign
}>()
const { public: { apiUri } } = useRuntimeConfig();

const CampaignStore = useCampaignStore();
const route = useRoute();

const confirmPublish = ref(false);
// const publish = async () => {
//     await Article.publish(props.article.id);
//     Article.getAll();

//     confirmPublish.value = false;
// }
</script>