<template>
    <div class="card shadow-lg bg-white rounded-2xl overflow-hidden">
        <!-- schedule.photo -->
        <div v-if="schedule.photo"
            class="h-[30vh] md:h-[50vh] lg:h-[70vh] rounded-t-xl overflow-hidden relative bg-cover bg-center"
            :style="`background-image: url(${isURL(schedule.photo) ? schedule.photo : apiUri + schedule.photo});`">
            <div class="w-full h-full  bg-gradient-to-t from-white via-white/0 to-white/0 absolute"></div>
            <!-- <img v-if="isURL(schedule.photo)" :src="schedule.photo" class="h-full mx-auto z-10">
            <img v-else :src="apiUri + schedule.photo" class="h-full mx-auto z-10"> -->
        </div>
        <div v-else class="w-full h-40 md:h-52 lg:h-60 rounded-t-xl overflow-hidden relative">
            <div class="w-full h-full bg-gradient-to-t from-white to-[#F8D7B6] absolute"></div>
        </div>
        <div class="card-body max-sm:p-5 -mt-10 z-20">
            <div class="flex max-md:flex-col md:justify-between items-center gap-2">
                <div>
                    <div class="text-xl lg:text-2xl font-medium max-md:text-center">Itikaf Malam ke {{
            schedule.day_index }}
                    </div>
                    <div class="max-md:text-center">{{ dayjs(schedule.date).format('DD MMM YYYY') }}</div>
                </div>
                <template v-if="route.path == '/itikaf' || route.path == '/itikaf/'">

                    <!-- BELUM DAFTAR -->
                    <button v-if="!schedule.auth_participant && isTheDay" @click="$emit('toJoin')"
                        class="btn bg-[#EE9A49] rounded-full px-6">
                        Ikut Itikaf
                    </button>

                    <!-- Belum tanggalnya -->
                    <button v-if="isNextDay" class="btn rounded-full px-6 text-nowrap">
                        Pendaftaran segera dibuka
                    </button>

                    <!-- SUDAH DAFTAR -->
                    <div v-if="schedule.auth_participant"
                        class="flex max-md:flex-col gap-2 md:items-end max-md:items-center">
                        <button @click="$emit('mySchedule')" class="btn btn-success rounded-full px-6">Anda
                            Terdaftar</button>
                        <button v-if="!isPrevDay" class="btn btn-xs w-min text-nowrap"
                            @click="$emit('toCancelJoin')">Batal
                            Hadir</button>
                    </div>
                </template>
            </div>

            <div class="whitespace-pre-wrap">{{ schedule.description }}</div>

            <div class=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- KAJIAN -->
                <template v-if="schedule.ustadz_kajian">
                    <ItikafPemateriCard :pemateri="schedule.ustadz_kajian" posisi="Konsultasi Syariah" />
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
                    <NuxtLink v-if="route.path == '/admin/itikaf' || route.path == '/admin/itikaf/'"
                        :to="'/admin/itikaf/' + schedule.id" class="btn rounded-full btn-sm bg-[#EE9A49]">
                        <LucideEye :size="16" />Detail
                    </NuxtLink>
                    <button v-if="route.path.includes('/admin/itikaf')" @click="$emit('update', schedule)"
                        class="btn rounded-full btn-sm bg-[#EE9A49]">
                        <LucidePencil :size="16" />Ubah
                    </button>
                </div>
            </div>

            <!-- LIKES COMMENT -->
            <template v-if="route.path == '/itikaf' || route.path == '/itikaf/'">
                <div class="flex justify-between items-center border-t border-t-gray-300">
                    <div class="flex gap-4 items-center" v-if="schedule._count">
                        <div class="font-semibold text-xl">Komentar</div>
                        <div class="flex items-center gap-2">
                            <IconsComment class="w-4" />
                            {{ schedule._count.comments }}
                        </div>
                    </div>
                    <div class="flex items-center gap-2" v-if="schedule.likes && schedule._count">
                        <label class="swap swap-flip text-9xl">
                            <!-- this hidden checkbox controls the state -->
                            <input type="checkbox" :checked="schedule.likes.length > 0"
                                @change="Itikaf.swapLikeSchedule(!schedule.likes.length, schedule.id, route)" />
                            <IconsLoving class="w-4 swap-on" />
                            <IconsLove class="w-4 swap-off" />
                        </label>
                        {{ schedule._count.likes }}
                    </div>
                </div>

                <!-- comment list -->
                <template v-for="comment in schedule.comments" :key="comment.id">
                    <Comment :comment :scheduleId="schedule.id" @reply="(c: Comment) => reply_to = c" />
                </template>
            </template>
            <template v-if="schedule.comments && schedule._count">
                <button @click="Itikaf.loadMoreScheduleComments(schedule.id, getNextPage(schedule.comments.length))"
                    v-if="schedule.comments.length < schedule._count.comments"
                    class="underline font-light text-xs md:text-sm text-gray-500 w-min text-nowrap">Lihat komentar
                    lainnya
                </button>
            </template>

            <CommentWrite :comment="reply_to" :itikafScheduleId="schedule.id" />
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

const props = defineProps<{
    schedule: ItikafSchedule
}>();

defineEmits(['toJoin', 'toCancelJoin', 'mySchedule', 'update'])

const Itikaf = useItikafStore();
const route = useRoute();

const today = dayjs().format('YYYY-MM-DD');
const isTheDay = today == props.schedule.date;
const isNextDay = new Date(today) < new Date(props.schedule.date);
const isPrevDay = new Date(today) > new Date(props.schedule.date);

const reply_to = ref<Comment | undefined>(undefined);
</script>
