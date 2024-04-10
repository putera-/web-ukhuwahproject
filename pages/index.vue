<template>
    <div>
        <div id="main" class="w-screen h-screen">
            <div class="max-w-7xl h-full mx-auto relative">
                <div
                    class="absolute w-full h-[60vh] flex justify-center items-center text-center text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl z-[1]">
                    <div class="mb-40 lg:mb-32 xl:mb-20">IED MUBARAK 1445 H</div>
                </div>

                <div class="w-full h-full flex justify-center items-end">
                    <img src="/Mosque1.png" alt=""
                        class="absolute md:w-[80vw] lg:w-[60vw] xl:w-[50vw] mb-64 lg:mb-40 xl:mb-28 z-[1]">

                    <!-- CARD WAKTU SHALAT -->
                    <WaktuShalat />
                </div>
            </div>
        </div>
    </div>
    <div class="max-w-7xl w-full mx-auto md:pt-40 p-3 md:p-10 overflow-hidden">

        <!-- ITIKAF -->
        <div v-if="Itikaf.itikaf">
            <div class="text-xl md:text-2xl font-semibold my-3">
                I'tikaf Ramadhan {{ Itikaf.itikaf.year }} / {{ Itikaf.itikaf.hijri_year }} H
            </div>
            <!-- schedule.photos -->
            <div v-if="Itikaf.itikaf.photo"
                class="w-full h-[30vh] md:h-[50vh] lg:h-[70vh] rounded-2xl overflow-hidden relative bg-cover bg-center shadow-xl"
                :style="`background-image: url(${isURL(Itikaf.itikaf.photo) ? Itikaf.itikaf.photo : apiUri + Itikaf.itikaf.photo});`">
                <!-- <div class="w-full h-full bg-gradient-to-t from-white via-white/0 to-white/0 absolute"></div> -->
                <!-- <img v-if="isURL(Itikaf.itikaf.photo)" :src="Itikaf.itikaf.photo" class="w-full z-10">
                <img v-else :src="apiUri + Itikaf.itikaf.photo" class="w-full z-10"> -->
            </div>
            <div v-else class="w-full h-40 md:h-52 lg:h-60 rounded-t-xl overflow-hidden relative">
                <div class="w-full h-full bg-gradient-to-t from-white to-[#F8D7B6] absolute"></div>
            </div>

            <div class="mt-2">{{ Itikaf.itikaf.description }}</div>
            <div class="my-3">
                <div v-if="Itikaf.itikaf.masjid" class="font-semibold">Lokasi: {{ Itikaf.itikaf.masjid }}</div>
                <div v-if="Itikaf.itikaf.address">Alamat: {{ Itikaf.itikaf.address }}</div>
            </div>
            <NuxtLink to="/itikaf" class="btn bg-[#EE9A49] mt-2 rounded-full">Lihat Jadwal I'tikaf</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['onlyauth']
});
const { public: { apiUri } } = useRuntimeConfig();

const Client = useClientStore();
const Itikaf = useItikafStore();
const Shalat = useShalatStore()
// if (!Shalat.data) Shalat.get();
await Itikaf.get();


// SEO and META
// const title = `${Client.client?.name} - ${Client.client?.slogan}`;
// const description = "Ied Mubarak, Semalat Hari Raya Idul Fitri 1445H / 2024 M. Taqobbalallahu minna wa minkum. Taqobbal yaa Kariim";

// useSeoMeta({
//     title: () => title,
//     ogTitle: () => title,
//     description: () => description,
//     ogDescription: () => description,
//     ogImage: () => apiUri! + Client.client?.logo_sm,
//     twitterCard: 'summary_large_image'
// });
// END: SEO and META

</script>

<style scoped>
#main {
    background: url('/Pattern.png');
    background-size: 700px;
}
</style>