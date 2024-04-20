<template>
    <div class="w-full min-h-screen max-w-5xl mx-auto pt-20 pb-10 px-4 md:px-6 my-6 overflow-hidden">
        <nuxt-link to="/campaigns" class="btn btn-sm rounded-full bg-white/0 border-0">
            <IconsArrowLeft class="w-8" />
        </nuxt-link>
        <ClientOnly>
            <template v-if="campaign">
                <div class="card shadow-lg rounded-t-none bg-white overflow-hidden">
                    <template v-if="campaign.photos">
                        <div v-if="campaign.photos!.length">
                            <Carousel :autoplay="10000" :wrapAround="true" class="">
                                <Slide v-for="(photo, i) in campaign.photos" :key="i" class="">
                                    <div class="aspect-video bg-white/20 w-full bg-cover bg-center"
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
                    <div v-else class="w-full h-40 md:h-52 lg:h-60 overflow-hidden relative">
                        <div class="w-full h-full bg-gradient-to-t from-white to-[#F8D7B6] absolute"></div>
                    </div>

                    <div class="card-body max-sm:p-5 z-20">
                        <div class="flex justify-between items-center border-b border-t-gray-300 py-5">
                            <div class="flex items-center gap-2">
                                <div>
                                    <div class="text-xs font-medium text-slate-500">Diterbitkan:</div>
                                    <div class="text-xs text-slate-500">{{ getRelativeTime(campaign.publishedAt) }}
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-4" v-if="campaign.likes && campaign._count">
                                <div class="flex items-center gap-2">
                                    <label class="swap swap-flip text-9xl">
                                        <!-- this hidden checkbox controls the state -->
                                        <input type="checkbox" :checked="campaign.likes.length > 0"
                                            @change="CampaignStore.swapLike(!campaign!.likes!.length, campaign!.id, route)" />
                                        <IconsLoving class="w-4 swap-on" />
                                        <IconsLove class="w-4 swap-off" />
                                    </label>
                                    {{ campaign._count.likes }}
                                </div>
                                <div class="flex items-center gap-2">
                                    <IconsComment class="w-4" />
                                    {{ campaign._count.comments }}
                                </div>
                            </div>
                        </div>

                        <div class="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">{{ campaign.title }}
                        </div>
                        <div class="font-light whitespace-pre-wrap">{{ campaign.description }}</div>

                        <div class="flex flex-col">
                            <div class="flex justify-between items-center">
                                <div>
                                    <div class="text-slate-500">Dibutuhkan: {{ toRupiah(campaign.target_amount) }}</div>
                                    <div class="">Terkumpul:
                                        <span class="font-semibold"> {{ toRupiah(campaign.collected_amount) }}</span>
                                    </div>
                                </div>
                                <button class="btn btn-sm rounded-full btn-warning">
                                    Ikut Donasi
                                </button>
                            </div>
                            <input type="range" min="0"
                                :max="campaign.collected_amount > campaign.target_amount ? campaign.collected_amount : campaign.target_amount"
                                :value="campaign.collected_amount" class="range range-xs range-warning" disabled />
                        </div>


                        <div class="flex justify-between gap-4 text-xs font-medium text-slate-500">
                            <div>{{ campaign._count?.donations }} donatur</div>
                            <div>Sisa {{ dayjs(campaign.due_date).diff(dayjs(), 'days') }} hari lagi</div>
                        </div>

                        <div class="font-medium">Donasi:</div>
                        <div v-if="campaign.donations" class="flex flex-col divide-y-2">
                            <template v-for="donation in campaign.donations">
                                <div class="flex items-center gap-2 py-2">
                                    <div
                                        class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-white to-[#EE9A49] flex justify-center items-center overflow-hidden text-gray-500 text-xl font-light">
                                        {{ donation.User!.name[0] }}
                                    </div>
                                    <div>
                                        <div class="font-semibold text-sm">{{ donation.User!.name }}</div>
                                        <div class="text-sm">{{ toRupiah(donation.gross_amount) }}</div>
                                        <div class="font-light text-xs md:text-sm text-gray-500 text-nowrap">{{
                                            getRelativeTime(donation.paidAt!) }}</div>
                                    </div>
                                </div>
                            </template>
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
                        <div class="font-medium">Do'a Orang-orang Baik</div>
                        <div class="divider mt-0"></div>
                        <div class="flex flex-col gap-1">
                            <template v-for="comment in campaign.comments" :key="comment.id">
                                <Comment :comment :campaignId="campaign.id" @reply="(c: Comment) => reply_to = c" />
                            </template>
                        </div>
                        <template v-if="campaign.comments && campaign._count">
                            <button
                                @click="CampaignStore.loadMoreComments(campaign!.id, getNextPage(campaign!.comments!.length))"
                                v-if="campaign.comments.length < campaign._count.comments"
                                class="underline font-light text-xs md:text-sm text-gray-500 w-min text-nowrap">
                                Lihat komentar lainnya
                            </button>
                        </template>
                        <CommentWrite :comment="reply_to" :campaignId="campaign.id" :focus="focusOnWriteComment" />
                    </div>
                </div>
            </template>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import dayjs from 'dayjs';
definePageMeta({
    middleware: ['onlyauth']
});

const { public: { apiUri } } = useRuntimeConfig();

const route = useRoute();
const id: string = route.params.id as string;

const Client = useClientStore();
const CampaignStore = useCampaignStore();
await CampaignStore.getPublishedById(id);

// seo
const title = (CampaignStore.campaign ? CampaignStore.campaign.title : '') + ' - ' + Client.client?.name;
const description = CampaignStore.campaign ? CampaignStore.campaign.description : '';
useSeoMeta({
    title: () => title,
    ogTitle: () => title,
    description: () => description,
    ogDescription: () => description,
    ogImage: () => CampaignStore.campaign ? CampaignStore.campaign.photos!.length ? apiUri + CampaignStore.campaign.photos![0].path_md : '' : '',
    twitterCard: 'summary_large_image'
});

const campaign = ref<Campaign | undefined>(undefined);


watchEffect(() => {
    if (CampaignStore.campaign) campaign.value = CampaignStore.campaign;
});

const reply_to = ref<Comment | undefined>(undefined);
const focusOnWriteComment = ref<boolean>(false);

onUnmounted(() => {
    CampaignStore.campaign = undefined;
});

watchEffect(() => {
    if (reply_to.value != undefined) {
        focusOnWriteComment.value = true;
    }
});
</script>