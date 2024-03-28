<template>
    <div>
        <!-- ITIKAF -->
        <div v-if="Itikaf.itikaf">
            <div class="flex justify-between items-center gap-2">
                <div class="text-3xl font-semibold my-3">
                    I'tikaf Ramadhan {{ Itikaf.itikaf.year }} / {{ Itikaf.itikaf.hijri_year }} H
                </div>

                <button class="btn btn-circle bg-[#EE9A49] btn-sm">
                    <LucidePencil :size="16" />
                </button>
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
        </div>
        <div>
            <div class="mt-2 text-xl font-semibold">Jadwal I'tikaf</div>
            <div class="flex flex-col gap-6 mt-6">
                <template v-for="schedule in Itikaf.schedules" :key="schedule.id">

                    <ItikafCard :schedule="schedule" />

                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { useRoute } from 'vue-router';

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
