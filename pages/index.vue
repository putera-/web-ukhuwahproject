<template>
    <div>
        <div id="main" class="w-screen h-screen">
            <div class="w-full h-full bg-gradient-to-r from-[#FEF5ED] to-[#F8D7B6]">
                <div class="max-w-7xl h-full mx-auto relative">
                    <div
                        class="absolute w-full h-[60vh] flex justify-center items-center text-center text-4xl md:text-6xl lg:text-8xl xl:text-9xl z-[1]">
                        <div class="mb-40 lg:mb-32 xl:mb-20">RAMADHAN 1445 H</div>
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
    </div>
    <div class="max-w-7xl w-full mx-auto md:pt-40 p-3 md:p-10">

        <!-- ITIKAF -->
        <div v-if="Itikaf.itikaf">
            <div class="text-3xl font-semibold my-3">
                I'tikaf Ramadhan {{ Itikaf.itikaf.year }} / {{ Itikaf.itikaf.hijri_year }} H
            </div>
            <!-- schedule.photos -->
            <div v-if="Itikaf.itikaf.photos" class="w-full h-40 md:h-52 lg:h-60 rounded-t-xl overflow-hidden relative">
                <div class="w-full h-full bg-gradient-to-t from-white via-white/0 to-white/0 absolute"></div>
                <img v-if="isURL(Itikaf.itikaf.photos[0].path)" :src="Itikaf.itikaf.photos[0].path" class="w-full z-10">
            </div>
            <div v-else class="w-full h-40 md:h-52 lg:h-60 rounded-t-xl overflow-hidden relative">
                <div class="w-full h-full bg-gradient-to-t from-white to-[#F8D7B6] absolute"></div>
            </div>


            <div class="mt-2">{{ Itikaf.itikaf.description }}</div>
            <NuxtLink to="/itikaf" class="btn bg-[#EE9A49] mt-2">Lihat Jadwal I'tikaf</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const Client = useClientStore();
const Itikaf = useItikafStore();
await Itikaf.get()
</script>

<style scoped>
#main {
    background: url(Pattern.png);
    background-size: 800px;
}
</style>