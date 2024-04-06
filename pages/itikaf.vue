<template>
    <div class="w-full min-h-screen max-w-5xl mx-auto pt-20 px-4 md:px-6 my-6 overflow-hidden">

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
            <div class="mt-3 whitespace-pre-wrap">{{ Itikaf.itikaf.description }}</div>
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
            <div class="flex justify-between items-center border-t border-t-gray-300 mb-2">
                <div class="flex gap-4" v-if="Itikaf.itikaf._count">
                    <div class="font-semibold text-xl">Komentar</div>
                    <div class="flex items-center gap-2">
                        <IconsComment class="w-4" />
                        {{ Itikaf.itikaf._count.comments }}
                    </div>
                </div>
                <div class="flex items-center gap-2" v-if="Itikaf.itikaf._count">
                    <label class="swap swap-flip text-9xl" v-if="Itikaf.itikaf.likes">
                        <!-- this hidden checkbox controls the state -->
                        <input type="checkbox" :checked="Itikaf.itikaf.likes.length > 0"
                            @change="Itikaf.swapLikeItikaf(!Itikaf.itikaf.likes.length, route)" />
                        <IconsLoving class="w-4 swap-on" />
                        <IconsLove class="w-4 swap-off" />
                    </label>
                    {{ Itikaf.itikaf._count.likes }}
                </div>
            </div>

            <!-- comment list -->
            <div class="flex flex-col gap-1">
                <template v-for="comment in Itikaf.itikaf.comments" :key="comment.id">
                    <Comment :comment :itikafId="Itikaf.itikaf.id" @reply="(c: Comment) => reply_to = c" />
                </template>
            </div>

            <template v-if="Itikaf.itikaf.comments && Itikaf.itikaf._count">
                <button
                    @click="Itikaf.loadMoreItikafComments(Itikaf.itikaf.id, getNextPage(Itikaf.itikaf.comments.length))"
                    v-if="Itikaf.itikaf.comments.length < Itikaf.itikaf._count.comments"
                    class="underline font-light text-xs md:text-sm text-gray-500">Lihat komentar lainnya
                </button>
            </template>

            <CommentWrite :comment="reply_to" :itikafId="Itikaf.itikaf.id" />

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

const route = useRoute();
const toJoin = async (scheduleId: string): Promise<void> => {
    await isToLoginPage(route);

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

const reply_to = ref<Comment | undefined>(undefined);
</script>