<template>
    <div class="w-full min-h-screen max-w-5xl mx-auto pt-20 px-4 md:px-6 my-6">

        <div v-if="Itikaf.itikaf">
            <div class="text-center text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                Itikaf Ramadhan {{ Itikaf.itikaf.hijri_year }} / {{ Itikaf.itikaf.year }}
            </div>

            <div class="w-full h-[30vh] md:h-[50vh] lg:h-[70vh] overflow-hidden rounded-2xl bg-cover bg-center shadow-xl"
                :style="`background-image: url(${isURL(Itikaf.itikaf.photo) ? Itikaf.itikaf.photo : apiUri + Itikaf.itikaf.photo});`">
                <!-- <img v-if="isURL(Itikaf.itikaf.photo)" :src="Itikaf.itikaf.photo" class="h-full mx-auto rounded-2xl">
                <img v-else :src="apiUri + Itikaf.itikaf.photo" class="h-full mx-auto rounded-2xl"> -->
            </div>

            <!-- DESKRIPSI -->
            <div class="mt-3">{{ Itikaf.itikaf.description }}</div>
            <div class="my-3">
                <div v-if="Itikaf.itikaf.masjid" class="font-semibold">Lokasi: {{ Itikaf.itikaf.masjid }}</div>
                <div v-if="Itikaf.itikaf.address">Alamat: {{ Itikaf.itikaf.address }}</div>
            </div>
            <!-- KONTAK PERSON -->
            <div v-if="Itikaf.itikaf.contact_person_name">
                <div class="font-semibold">Informasi:</div>
                <div>{{ Itikaf.itikaf.contact_person_name }}</div>
                <a :href="`https://wa.me/${Itikaf.itikaf.contact_person_phone.replaceAll('-', '').replace(' ', '').replace('+', '')}`"
                    target="_blank" class="flex gap-2 items-center btn bm-sm w-min text-nowrap flex-nowrap font-normal">
                    <IconsWhatsapp class="w-3" />
                    <div>{{ Itikaf.itikaf.contact_person_phone }}</div>
                </a>
            </div>

            <!-- LIKES COMMENT -->
            <div class="flex justify-between items-center border-t border-t-gray-300">
                <div class="flex gap-4 items-center">
                    <template v-if="false">
                        <div class="font-semibold text-xl">Komentar</div>
                        <div v-if="Itikaf.itikaf.comments.length < Itikaf.itikaf._count.comments"
                            class="underline font-light text-xs md:text-sm text-gray-500">Lihat semua komentar
                        </div>
                    </template>
                </div>
                <div class="flex gap-4">
                    <div class="flex items-center gap-2">
                        <label class="swap swap-flip text-9xl">
                            <!-- this hidden checkbox controls the state -->
                            <input type="checkbox" :checked="Itikaf.itikaf.likes.length"
                                @change="Itikaf.swapLikeItikaf(!Itikaf.itikaf.likes.length)" />
                            <IconsLoving class="w-4 swap-on" />
                            <IconsLove class="w-4 swap-off" />
                        </label>
                        {{ Itikaf.itikaf._count.likes }}
                    </div>
                    <div v-show="false" class="flex items-center gap-2">
                        <IconsComment class="w-4" />
                        {{ Itikaf.itikaf._count.comments }}
                    </div>
                </div>
            </div>

            <!-- comment list -->
            <template v-if="false" v-for="comment in Itikaf.itikaf.comments" :key="comment.id">
                <Comment :comment />
            </template>
        </div>

        <!-- JADWAL -->

        <div class="text-xl font-semibold mt-10">JADWAL I'TIKAF</div>
        <div class="flex flex-col gap-6 mt-6">
            <template v-for="schedule in Itikaf.schedules" :key="schedule.id">
                <ItikafCard :schedule="schedule" @toJoin="toJoin(schedule.id)" @toCancelJoin="toCancelJoin(schedule.id)"
                    @mySchedule="mySchedule(schedule.id)" />
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
});

// import dayjs from 'dayjs';

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
    // CEK TANGGAL
    selected_scheduleId.value = scheduleId;
    showCancelJoinForm.value = true;
}
const successCancelJoin = () => {
    showCancelJoinForm.value = false;
    selected_scheduleId.value = null;
    showSuccess.value = true;

    Itikaf.getSchedule();
}

const mySchedule = (scheduleId: string) => {
    selected_scheduleId.value = scheduleId;
    showJoinForm.value = true;
}
</script>