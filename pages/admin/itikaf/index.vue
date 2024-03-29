<template>
    <div v-if="Itikaf.itikaf">
        <!-- ITIKAF -->
        <div v-if="Itikaf.itikaf">
            <div class="flex justify-between items-center gap-2">
                <div class="text-3xl font-semibold my-3">
                    I'tikaf Ramadhan {{ Itikaf.itikaf.year }} / {{ Itikaf.itikaf.hijri_year }} H
                </div>

                <NuxtLink to="/admin/itikaf/update" class="btn btn-circle bg-[#EE9A49] btn-sm">
                    <LucidePencil :size="16" />
                </NuxtLink>
            </div>
            <!-- schedule.photos -->
            <div v-if="Itikaf.itikaf.photo" class="w-full h-40 md:h-52 lg:h-60 rounded-t-xl overflow-hidden relative">
                <div class="w-full h-full bg-gradient-to-t from-white via-white/0 to-white/0 absolute"></div>
                <img v-if="isURL(Itikaf.itikaf.photo)" :src="Itikaf.itikaf.photo" class="w-full z-10">
                <img v-else :src="apiUri + Itikaf.itikaf.photo" class="w-full z-10">
            </div>
            <div v-else class="w-full h-40 md:h-52 lg:h-60 rounded-t-xl overflow-hidden relative">
                <div class="w-full h-full bg-gradient-to-t from-white to-[#F8D7B6] absolute"></div>
            </div>


            <div class="mt-2 whitespace-pre-wrap">{{ Itikaf.itikaf.description }}</div>
            <div class="my-3">
                <div v-if="Itikaf.itikaf.masjid" class="font-semibold">Lokasi: {{ Itikaf.itikaf.masjid }}</div>
                <div v-if="Itikaf.itikaf.address">Alamat: {{ Itikaf.itikaf.address }}</div>
            </div>
        </div>
        <div>
            <div class="flex justify-between items-center">
                <div class="mt-2 text-xl font-semibold">Jadwal I'tikaf</div>
                <button class="btn  bg-[#EE9A49] btn-sm rounded-full">
                    <LucidePlus :size="12" /> Tambah Jadwal
                </button>
            </div>
            <div class="flex flex-col gap-6 mt-6">
                <template v-for="schedule in Itikaf.schedules" :key="schedule.id">

                    <ItikafCard :schedule="schedule" />

                </template>
            </div>
        </div>
    </div>

    <!-- CREATE ITIKAF -->
    <AdminItikafForm v-else />
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: [
        'admin'
    ]
});

const Itikaf = useItikafStore();
onBeforeMount(async () => {
    await Promise.all([
        Itikaf.get(),
        Itikaf.getSchedule()
    ]);
});
</script>
