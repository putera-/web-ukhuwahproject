<template>
    <div class="w-full min-h-screen max-w-7xl mx-auto pt-20 px-4 md:px-6">

        <div v-if="Itikaf.itikaf">
            <div class="text-center text-4xl font-medium mb-4">
                Itikaf Ramadhan {{ Itikaf.itikaf.hijri_year }} / {{ Itikaf.itikaf.year }}
            </div>

            <Carousel>
                <Slide v-for="photo in Itikaf.itikaf.photos" :key="photo.id">
                    <div class="carousel__item w-full">
                        <div class="w-full aspect-video overflow-hidden">
                            <img v-if="isURL(photo.path)" :src="photo.path" class="min-w-full min-h-full">
                        </div>
                    </div>
                </Slide>

                <template #addons>
                    <Navigation />
                    <Pagination />
                </template>
            </Carousel>

            <!-- SLIDER -->

            <!-- DESKRIPSI -->
            <div>{{ Itikaf.itikaf.description }}</div>
            <!-- KONTAK PERSON -->
            <div v-if="Itikaf.itikaf.contact_person_name">
                <div>Informasi:</div>
                <div>{{ Itikaf.itikaf.contact_person_name }}: {{ Itikaf.itikaf.contact_person_phone }}</div>
            </div>
        </div>

        <!-- JADWAL -->

        <div class="text-xl font-semibold mt-10">JADWAL I'TIKAF</div>
        <div class="flex flex-col gap-6 mt-6">
            <template v-for="schedule in Itikaf.schedules" :key="schedule.id">
                <div class="card shadow-lg bg-white">
                    <!-- schedule.photos -->
                    <div v-if="schedule.photos"
                        class="w-full h-40 md:h-52 lg:h-60 rounded-t-xl overflow-hidden relative">
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
                            <button v-if="!schedule.auth_participant" @click="toJoin(schedule.id)"
                                class="btn bg-[#EE9A49] rounded-full px-6">Ikut
                                Itikaf</button>
                            <div v-else class="flex max-md:flex-col gap-2 md:items-end max-md:items-center">
                                <button class="btn btn-success rounded-full px-6">Anda Terdaftar</button>
                                <button class="btn btn-xs w-min text-nowrap" @click="toCancelJoin(schedule.id)">Batal
                                    Hadir</button>
                            </div>
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

                        <!-- PESERTA -->
                        <div class="flex max-md:flex-col gap-3">
                            <button class="btn btn-sm font-normal">
                                <IconsIkhwan class="w-4" /> Peserta Ikhwan: {{ schedule.total_man }}
                            </button>
                            <button class="btn btn-sm font-normal">
                                <IconsAkhwat class="w-4" /> Peserta Akhwat: {{ schedule.total_woman }}
                            </button>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>

    <LazyItikafJoinForm v-if="showJoinForm && selected_scheduleId" :scheduleId="selected_scheduleId"
        :show="showJoinForm" @close="showJoinForm = false; selected_scheduleId = null" @success="successJoin" />

    <LazyItikafCancelJoinForm v-if="showCancelJoinForm && selected_scheduleId" :scheduleId="selected_scheduleId"
        :show="showCancelJoinForm" @close="showCancelJoinForm = false; selected_scheduleId = null"
        @success="successCancelJoin" />

    <ModalSuccess v-if="showSuccess" :show="showSuccess" @close="showSuccess = false" />
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['onlyauth']
})
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

import dayjs from 'dayjs';

const Itikaf = useItikafStore();

onBeforeMount(async () => {
    await Promise.all([
        Itikaf.get(),
        Itikaf.getSchedule()
    ]);
});

const showJoinForm = ref(false);
const showCancelJoinForm = ref(false);
const selected_scheduleId = ref<null | string>(null);

const Api = useApiStore();
const Auth = useAuthStore();
const toJoin = async (scheduleId: string): Promise<void> => {
    checkToken();

    if (!Api.access_token) {
        toLoginPage();
        return;
    }

    if (!Auth.user) {
        await Auth.getUser();
        if (!Auth.user) {
            toLoginPage();
            return;
        }
    }

    selected_scheduleId.value = scheduleId;
    showJoinForm.value = true;
}

const showSuccess = ref(false);
const successJoin = () => {
    showJoinForm.value = false;
    selected_scheduleId.value = null;
    showSuccess.value = true;

    Itikaf.getSchedule();
}

const route = useRoute();
const toLoginPage = () => {
    window.localStorage.setItem('redirect_path', route.path)
    navigateTo('/auth/login');
}

const toCancelJoin = (scheduleId: string) => {
    selected_scheduleId.value = scheduleId;
    showCancelJoinForm.value = true;
}
const successCancelJoin = () => {
    showCancelJoinForm.value = false;
    selected_scheduleId.value = null;
    showSuccess.value = true;

    Itikaf.getSchedule();
}
</script>