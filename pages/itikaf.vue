<template>
    <div class="w-full min-h-screen max-w-7xl mx-auto pt-20 px-4 md:px-6 my-6">

        <div v-if="Itikaf.itikaf">
            <div class="text-center text-4xl font-medium mb-4">
                Itikaf Ramadhan {{ Itikaf.itikaf.hijri_year }} / {{ Itikaf.itikaf.year }}
            </div>

            <div class="w-full aspect-video overflow-hidden">
                <img v-if="isURL(Itikaf.itikaf.photo)" :src="Itikaf.itikaf.photo" class="min-w-full min-h-full">
                <img v-else :src="apiUri + Itikaf.itikaf.photo" class="min-w-full min-h-full">
            </div>

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