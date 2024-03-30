<template>
    <div class="card shadow-lg bg-white rounded-2xl overflow-hidden">
        <!-- schedule.photo -->
        <div v-if="schedule.photo" class="w-full h-40 md:h-52 lg:h-60 rounded-t-xl overflow-hidden relative">
            <div class="w-full h-full bg-gradient-to-t from-white via-white/0 to-white/0 absolute"></div>
            <img v-if="isURL(schedule.photo)" :src="schedule.photo" class="w-full z-10">
            <img v-else :src="apiUri + schedule.photo" class="w-full z-10">
        </div>
        <div v-else class="w-full h-40 md:h-52 lg:h-60 rounded-t-xl overflow-hidden relative">
            <div class="w-full h-full bg-gradient-to-t from-white to-[#F8D7B6] absolute"></div>
        </div>
        <div class="card-body max-sm:p-5 -mt-20 z-20">
            <div class="flex max-md:flex-col md:justify-between items-center gap-2">
                <div>
                    <div class="text-xl lg:text-2xl font-medium max-md:text-center">Itikaf Malam ke {{
            schedule.day_index }}
                    </div>
                    <div class="max-md:text-center">{{ dayjs(schedule.date).format('DD MMM YYYY') }}</div>
                </div>
                <template v-if="route.path == '/itikaf' || route.path == '/itikaf/'">
                    <button v-if="!schedule.auth_participant" @click="$emit('toJoin')"
                        class="btn bg-[#EE9A49] rounded-full px-6">Ikut
                        Itikaf</button>
                    <div v-else class="flex max-md:flex-col gap-2 md:items-end max-md:items-center">
                        <button @click="$emit('mySchedule')" class="btn btn-success rounded-full px-6">Anda
                            Terdaftar</button>
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

            <div class="flex max-md:flex-col gap-4 justify-between items-center">
                <!-- PESERTA -->
                <div class="flex max-md:flex-col gap-3">
                    <button class="btn btn-sm font-normal rounded-xl">
                        <IconsIkhwan class="w-4" /> Peserta Ikhwan: {{ schedule.total_man }}
                    </button>
                    <button class="btn btn-sm font-normal rounded-xl">
                        <IconsAkhwat class="w-4" /> Peserta Akhwat: {{ schedule.total_woman }}
                    </button>
                </div>

                <div class="flex gap-2">
                    <NuxtLink v-if="route.path.includes('/admin/itikaf')" :to="'/admin/itikaf/' + schedule.id"
                        class="btn rounded-full btn-sm bg-[#EE9A49]">
                        <LucideEye :size="16" />Detail
                    </NuxtLink>
                    <button v-if="route.path.includes('/admin/itikaf')" @click="$emit('update', schedule)"
                        class="btn rounded-full btn-sm bg-[#EE9A49]">
                        <LucidePencil :size="16" />Ubah
                    </button>
                </div>
            </div>

            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
defineProps<{
    schedule: ItikafSchedule
}>();

defineEmits(['toJoin', 'toCancelJoin', 'mySchedule', 'update'])

const route = useRoute();
</script>
