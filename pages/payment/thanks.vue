<template>
    <div class="w-full min-h-screen max-w-5xl mx-auto pt-20 pb-10 px-4 md:px-6 my-6 overflow-hidden">
        <div class="flex flex-col items-center gap-10">
            <div class="font" v-if="status == 'settlement'">
                Terima kasih sudah melakukan pembayaran
            </div>
            <div class="font" v-if="status == 'pending'">
                Silahkan melakukan pembayaran
            </div>


            <ClientOnly>
                <div class="card shadow-lg rounded-t-none bg-white overflow-hidden" v-if="campaign">
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
                        <div class="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">{{ campaign.title }}
                        </div>
                        <div class="font-light whitespace-pre-wrap">{{ campaign.description }}</div>

                        <div class="divider my-0"></div>

                        <div class="flex flex-col">
                            <div class="flex justify-between items-center">
                                <div>
                                    <div class="text-slate-500">Dibutuhkan: {{ toRupiah(campaign.target_amount) }}</div>
                                    <div class="">Terkumpul:
                                        <span class="font-semibold"> {{ toRupiah(campaign.collected_amount) }}</span>
                                    </div>
                                </div>
                            </div>
                            <input type="range" min="0"
                                :max="campaign.collected_amount > campaign.target_amount ? campaign.collected_amount : campaign.target_amount"
                                :value="campaign.collected_amount" class="range range-xs range-warning" disabled />
                        </div>

                        <div class="divider my-0"></div>

                        <div class="flex justify-between gap-4 text-xs font-medium text-slate-500">
                            <div>{{ campaign._count?.donations }} donatur</div>
                            <div>Sisa {{ dayjs(campaign.due_date).diff(dayjs(), 'days') }} hari lagi</div>
                        </div>

                        <div class="font-medium">Donatur:</div>
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
                    </div>
                </div>
            </ClientOnly>

            <nuxt-link to="/campaigns" class="btn rounded-full bg-[#EE9A49]">Kembali ke home</nuxt-link>
        </div>
        <div v-if="status == 'pending'"></div>
    </div>
</template>

<script setup lang="ts">
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'
import dayjs from 'dayjs';
definePageMeta({
    middleware: ['onlyauth']
});
// https://stag.ukhuwahproject.com/payment/thanks?order_id=5b00ab6b-48e1-4931-ba63-b28d5e330de9&status_code=201&transaction_status=settlement

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const midtransClientKey = config.public.midtransClientKey;
const midtransUri = config.public.production ? "https://app.midtrans.com" : "https://app.sandbox.midtrans.com";


const route = useRoute();
const transactionId = route.query.order_id;
const status = route.query.transaction_status;

const Campaign = useCampaignStore();
const transaction = ref<Transaction | undefined>(undefined)
const campaign = ref<Campaign | undefined>(undefined)
const getTransaction = async () => {
    transaction.value = await Campaign.findByTransaction(transactionId as string);
    if (transaction.value.Donation?.Campaign) {
        campaign.value = transaction.value.Donation?.Campaign
    }

    if (status == 'pending') {
        useHead({
            script: [
                {
                    src: midtransUri + '/snap/snap.js',
                    async: true,
                    'data-client-key': midtransClientKey
                }
            ]
        });

        setTimeout(() => {
            // @ts-ignore
            window.snap.pay(transaction.value.midtransToken)
        }, 1000);
    }
};
getTransaction();

onBeforeUnmount(() => {
    // remove midtrans payment iframe
    const scriptTag = document.getElementById('snap-midtrans') as HTMLElement;

    if (scriptTag) document.body.removeChild(scriptTag);
});

</script>