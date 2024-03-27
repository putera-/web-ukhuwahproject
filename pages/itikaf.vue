<template>
    <div class="w-full min-h-screen max-w-7xl mx-auto pt-20 px-4 md:px-6">

        <div class="flex flex-col gap-6">
            <template v-for="schedule in Itikaf.schedules" :key="schedule.id">
                <div class="card shadow-lg">
                    <!-- schedule.photos -->
                    <div v-if="schedule.photos" class="w-full h-60 rounded-t-xl overflow-hidden relative">
                        <div class="w-full h-full bg-gradient-to-t from-white via-white/0 to-white/0 absolute"></div>
                        <img v-if="isURL(schedule.photos[0].path)" :src="schedule.photos[0].path" class="w-full z-10">
                    </div>
                    <div v-else class="w-full h-60 rounded-t-xl overflow-hidden relative">
                        <div class="w-full h-full bg-gradient-to-t from-white to-[#F8D7B6] absolute"></div>
                        <!-- <img v-if="isURL(schedule.photos[0].path)" :src="schedule.photos[0].path" class="w-full z-10"> -->
                    </div>
                    <div class="card-body -mt-20 z-20">
                        <div class="flex justify-between items-center">
                            <div>
                                <div class="text-2xl font-medium">Itikaf Malam ke {{ schedule.day_index }}</div>
                                <div>{{ dayjs(schedule.date).format('DD MMM YYYY') }}</div>
                            </div>
                            <button class="btn bg-[#EE9A49] rounded-full px-6">Ikut
                                Itikaf</button>
                        </div>

                        <div>{{ schedule.description }}</div>

                        <div class=" grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- KAJIAN -->
                            <div v-if="schedule.ustadz_kajian" class="card bg-[#F8D7B6] max-md:w-full max-lg:grow">
                                <div class="card-body w-full p-2">
                                    <div class="flex items-center max-md:justify-center gap-3">
                                        <!-- schedule.ustadz_kajian!.avatar_md -->
                                        <template v-if="schedule.ustadz_kajian!.avatar_md">
                                            <img v-if="isURL(schedule.ustadz_kajian.avatar_md)"
                                                :src="schedule.ustadz_kajian.avatar_md" alt=""
                                                class="rounded-full w-12 md:w-16 h-12 md:h-16">
                                        </template>
                                        <div v-else
                                            class="rounded-full w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-white to-[#EE9A49]">
                                        </div>

                                        <div>
                                            <div class="text-xs md:text-sm text-gray-600">Kajian: Tematik</div>
                                            <div class=" font-medium text-sm md:text-medium">
                                                {{ schedule.ustadz_kajian.name }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <!-- IMAM TARAWIH -->
                            <div v-if="schedule.imam_tarawih" class="card bg-[#F8D7B6] max-md:w-full max-lg:grow">
                                <div class="card-body w-full p-2">
                                    <div class="flex items-center max-md:justify-center gap-3">
                                        <template v-if="schedule.imam_tarawih.avatar_md">
                                            <img v-if="isURL(schedule.imam_tarawih.avatar_md)"
                                                :src="schedule.imam_tarawih.avatar_md" alt=""
                                                class="rounded-full w-12 md:w-16 h-12 md:h-16">
                                        </template>
                                        <div v-else
                                            class="rounded-full w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-white to-[#EE9A49]">
                                        </div>

                                        <div>
                                            <div class="text-xs md:text-sm text-gray-600">Imam Tarawih</div>
                                            <div class=" font-medium text-sm md:text-medium">
                                                {{ schedule.imam_tarawih.name }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- IMAM QIYAMUL LAIL -->
                            <div v-if="schedule.imam_qiyamul_lail" class="card bg-[#F8D7B6] max-md:w-full max-lg:grow">
                                <div class="card-body w-full p-2">
                                    <div class="flex items-center max-md:justify-center gap-3">
                                        <template v-if="schedule.imam_qiyamul_lail.avatar_md">
                                            <img v-if="isURL(schedule.imam_qiyamul_lail.avatar_md)"
                                                :src="schedule.imam_qiyamul_lail.avatar_md" alt=""
                                                class="rounded-full w-12 md:w-16 h-12 md:h-16">
                                        </template>
                                        <div v-else
                                            class="rounded-full w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-white to-[#EE9A49]">
                                        </div>

                                        <div>
                                            <div class="text-xs md:text-sm text-gray-600">Imam Qiyamul Lail</div>
                                            <div class=" font-medium text-sm md:text-medium">
                                                {{ schedule.imam_qiyamul_lail.name }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

const Itikaf = useItikafStore();

onBeforeMount(async () => {
    await Itikaf.getSchedule();
})
</script>