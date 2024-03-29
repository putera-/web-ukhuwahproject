<template>
    <div class="card shadow-lg bg-white rounded-2xl overflow-hidden">
        <!-- schedule.photos -->
        <div v-if="schedule.photos" class="w-full h-40 md:h-52 lg:h-60 rounded-t-xl overflow-hidden relative">
            <div class="w-full h-full bg-gradient-to-t from-white via-white/0 to-white/0 absolute"></div>
            <img v-if="isURL(schedule.photos[0].path)" :src="schedule.photos[0].path" class="w-full z-10">
        </div>
        <div v-else class="w-full h-40 md:h-52 lg:h-60 rounded-t-xl overflow-hidden relative">
            <div class="w-full h-full bg-gradient-to-t from-white to-[#F8D7B6] absolute"></div>
            <!-- <img v-if="isURL(schedule.photos[0].path)" :src="schedule.photos[0].path" class="w-full z-10"> -->
        </div>
        <div class="card-body -mt-20 z-20">
            <div class="flex max-md:flex-col md:justify-between items-center gap-2">
                <div>
                    <div class="text-2xl font-medium">Itikaf Malam ke {{ schedule.day_index }}</div>
                    <div>{{ dayjs(schedule.date).format('DD MMM YYYY') }}</div>
                </div>
                <template v-if="route.path == '/itikaf'">
                    <button v-if="!schedule.auth_participant" @click="$emit('toJoin')"
                        class="btn bg-[#EE9A49] rounded-full px-6">Ikut
                        Itikaf</button>
                    <div v-else class="flex max-md:flex-col gap-2 md:items-end max-md:items-center">
                        <button class="btn btn-success rounded-full px-6">Anda Terdaftar</button>
                        <button class="btn btn-xs w-min text-nowrap" @click="$emit('toCancelJoin')">Batal
                            Hadir</button>
                    </div>
                </template>
            </div>

            <div>{{ schedule.description }}</div>

            <div class=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- KAJIAN -->
                <template v-if="schedule.ustadz_kajian">
                    <ItikafPemateriCard :pemateri="schedule.ustadz_kajian" posisi="Kajian: Tematik" />
                </template>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                <!-- IMAM TARAWIH -->
                <template v-if="schedule.imam_tarawih">
                    <ItikafPemateriCard :pemateri="schedule.imam_tarawih" posisi="Imam Tarawih" />
                </template>

                <!-- IMAM QIYAMUL LAIL -->
                <template v-if="schedule.imam_qiyamul_lail">
                    <ItikafPemateriCard :pemateri="schedule.imam_qiyamul_lail" posisi="Imam Qiyamul Lail" />
                </template>

            </div>

            <div class="flex justify-between items-center">
                <!-- PESERTA -->
                <div class="flex max-md:flex-col gap-3">
                    <button class="btn btn-sm font-normal">
                        <IconsIkhwan class="w-4" /> Peserta Ikhwan: {{ schedule.total_man }}
                    </button>
                    <button class="btn btn-sm font-normal">
                        <IconsAkhwat class="w-4" /> Peserta Akhwat: {{ schedule.total_woman }}
                    </button>
                </div>

                <button v-if="route.path == '/admin/itikaf'" class="btn rounded-full btn-sm bg-[#EE9A49]">
                    <LucideEye :size="16" />Detail
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
defineProps<{
    schedule: ItikafSchedule
}>();

defineEmits(['toJoin', 'toCancelJoin'])

const route = useRoute();
</script>
