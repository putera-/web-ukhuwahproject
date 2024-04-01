<template>
    <!-- MODAL CONFIRM -->
    <!-- Put this part before </body> tag -->
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <!-- x Corner button -->
            <form method="dialog">
                <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</label>
            </form>
            <!-- Slot -->
            <div class="text-xl font-semibold my-3">
                Jadwal I'tikaf {{ Itikaf.year }}
            </div>

            <div class="w-full">
                <div class="h-48 lg:h-52 xl:h-60 max-w-full aspect-video rounded-2xl overflow-hidden">
                    <!-- <template v-if="form.photo">
                        <img v-if="isURL(form.photo)" :src="form.photo" class="min-w-full min-h-full">
                        <img v-else :src="form.photo" class="min-w-full min-h-full">
                    </template> -->
                    <img v-if="photo_preview" :src="photo_preview" class="min-w-full min-h-full">
                    <div v-else class="bg-neutral/50 w-full h-full">
                    </div>
                </div>
                <input type="file" class="file-input rounded-full file-input-sm w-full max-w-xs my-2" ref="fileInput"
                    accept="image/jpg, image/jpeg, image/png, image/webp, image/gif" @change="handlePhoto">
            </div>

            <div class="grid grid-cols-2 gap-2 w-full max-w-xs">
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Tanggal</span>
                    </div>
                    <!-- <input v-model="form.date" type="text"
                        class="input input-lg rounded-full bg-[#E8E5F8] input-bordered w-full" /> -->
                    <DatePicker v-model="form.date" color="orange">
                        <template #default="{ togglePopover }">
                            <button class="btn btn-outline border-neutral/25 rounded-full font-normal"
                                @click="togglePopover">
                                {{ !form.date ? '-' : dayjs(form.date).format('D MMM YYYY') }}
                            </button>
                        </template>
                    </DatePicker>
                    <div class="text-xs text-error my-1" v-if="errors.date">
                        {{ errors.date }}
                    </div>
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Hari Ke</span>
                    </div>
                    <input v-model="form.day_index" v-maska data-maska="#" type="text"
                        class="input rounded-full bg-[#E8E5F8] input-bordered w-full" />
                    <div class="text-xs text-error my-1" v-if="errors.day_index">
                        {{ errors.day_index }}
                    </div>
                </label>
            </div>

            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Deskripsi</span>
                </div>
                <textarea v-model="form.description" class="bg-[#E8E5F8] textarea rounded-3xl w-full" rows="5"
                    placeholder="Deskripsi"></textarea>
                <div class="label">
                    <span class="label-text-alt text-error" v-if="errors.description">
                        {{ errors.description }}
                    </span>
                </div>
            </label>

            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <button @click="showAstzSelector = true; forSelect = 'imam_tarawih'"
                        class="btn bg-[#E8E5F8] rounded-full w-60 justify-start">
                        <span v-if="!form.imam_tarawih" class="text-slate-500">
                            Imam Tarawih
                        </span>
                        <div v-else class="flex items-center gap-3">
                            <template v-if="form.imam_tarawih.avatar_md">
                                <img v-if="isURL(form.imam_tarawih.avatar_md)" :src="form.imam_tarawih.avatar_md" alt=""
                                    class="rounded-full w-8 h-8">
                                <img v-else :src="apiUri + form.imam_tarawih.avatar_md" alt=""
                                    class="rounded-full w-8 h-8">
                            </template>
                            <div v-else
                                class="rounded-full w-8 md:w-8 h-8 md:h-8 bg-gradient-to-br from-white to-[#EE9A49] flex justify-center items-end overflow-hidden">
                                <IconsIkhwan class="w-12" />
                            </div>

                            <div class="text-left">
                                <div class="font-normal text-slate-500 mb-1">Imam Tarawih</div>
                                <div class="font-medium line-clamp-1">
                                    {{ form.imam_tarawih.name }}
                                </div>
                            </div>
                        </div>
                    </button>
                    <button v-if="form.imam_tarawih" class="btn btn-circle" @click="form.imam_tarawih = undefined">
                        <LucideX />
                    </button>
                </div>

                <div class="flex items-center gap-2">
                    <button @click="showAstzSelector = true; forSelect = 'imam_qiyamul_lail'"
                        class="btn bg-[#E8E5F8] rounded-full w-60 justify-start">
                        <span v-if="!form.imam_qiyamul_lail" class="text-slate-500">
                            Imam Qiyamul Lail
                        </span>
                        <div v-else class="flex items-center gap-3">
                            <template v-if="form.imam_qiyamul_lail.avatar_md">
                                <img v-if="isURL(form.imam_qiyamul_lail.avatar_md)"
                                    :src="form.imam_qiyamul_lail.avatar_md" alt="" class="rounded-full w-8 h-8">
                                <img v-else :src="apiUri + form.imam_qiyamul_lail.avatar_md" alt=""
                                    class="rounded-full w-8 h-8">
                            </template>
                            <div v-else
                                class="rounded-full w-8 md:w-8 h-8 md:h-8 bg-gradient-to-br from-white to-[#EE9A49] flex justify-center items-end overflow-hidden">
                                <IconsIkhwan class="w-12" />
                            </div>

                            <div class="text-left">
                                <div class="font-normal text-slate-500 mb-1">Imam Qiyamul Lail</div>
                                <div class="font-medium line-clamp-1">
                                    {{ form.imam_qiyamul_lail.name }}
                                </div>
                            </div>
                        </div>
                    </button>
                    <button v-if="form.imam_qiyamul_lail" class="btn btn-circle"
                        @click="form.imam_qiyamul_lail = undefined">
                        <LucideX />
                    </button>
                </div>

                <div class="flex items-center gap-2">
                    <button @click="showAstzSelector = true; forSelect = 'ustadz_kajian'"
                        class="btn bg-[#E8E5F8] rounded-full w-60 justify-start">
                        <span v-if="!form.ustadz_kajian" class="text-slate-500">
                            Konsultasi Syariah
                        </span>
                        <div v-else class="flex items-center gap-3">
                            <template v-if="form.ustadz_kajian.avatar_md">
                                <img v-if="isURL(form.ustadz_kajian.avatar_md)" :src="form.ustadz_kajian.avatar_md"
                                    alt="" class="rounded-full w-8 h-8">
                                <img v-else :src="apiUri + form.ustadz_kajian.avatar_md" alt=""
                                    class="rounded-full w-8 h-8">
                            </template>
                            <div v-else
                                class="rounded-full w-8 md:w-8 h-8 md:h-8 bg-gradient-to-br from-white to-[#EE9A49] flex justify-center items-end overflow-hidden">
                                <IconsIkhwan class="w-12" />
                            </div>

                            <div class="text-left">
                                <div class="font-normal text-slate-500 mb-1">Konsultasi Syariah</div>
                                <div class="font-medium line-clamp-1">
                                    {{ form.ustadz_kajian.name }}
                                </div>
                            </div>
                        </div>
                    </button>
                    <button v-if="form.ustadz_kajian" class="btn btn-circle" @click="form.ustadz_kajian = undefined">
                        <LucideX />
                    </button>
                </div>
            </div>


            <div class="modal-action">
                <label class="btn rounded-full" @click="$emit('close')">Close!</label>
                <label class="btn rounded-full bg-[#EE9A49]" @click="confirmUpdate = true">
                    Simpan
                    <span v-show="isLoading" class="loading loading-bars loading-md"></span>
                </label>
            </div>
        </div>
        <!-- Click Outside -->
        <form method="dialog" class="modal-backdrop">
            <label @click="$emit('close')">close</label>
        </form>
        <Confirmation action-text="Update" :show="confirmUpdate" @close="confirmUpdate = false" @yes="doUpdate">
            Apakah anda yakin?
        </Confirmation>

        <LazyAdminAsaatidzSelect v-if="showAstzSelector" :show="showAstzSelector" @close="showAstzSelector = false"
            @select="selectAsaatidz" />
    </div>

</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css'
import dayjs from 'dayjs';

const props = defineProps<{
    show: boolean
    data: ItikafSchedule | null
}>();

const emits = defineEmits(['close', 'saved']);

const Itikaf = useItikafStore();

const isLoading = ref(false);
const show_modal = ref(true);

const photo_preview = ref(props.data ? (isURL(props.data.photo) ? props.data.photo : apiUri + props.data.photo) : undefined)

const form = ref<Record<string, any>>({
    date: undefined,
    day_index: undefined,
    description: '',
    imam_tarawih: undefined,
    imam_qiyamul_lail: undefined,
    ustadz_kajian: undefined
});

watchEffect(() => {
    show_modal.value = props.show;

    if (props.data) {
        form.value.date = props.data.date;
        form.value.day_index = props.data.day_index;
        form.value.description = props.data.description;
        form.value.imam_tarawih = props.data.imam_tarawih;
        form.value.imam_qiyamul_lail = props.data.imam_qiyamul_lail;
        form.value.ustadz_kajian = props.data.ustadz_kajian;
    }
});


const showAstzSelector = ref(false);

const fileInput = ref<HTMLInputElement | null>(null);
let photo: File | null;

const handlePhoto = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (!files!.length) {
        photo = null;
    } else {
        photo = files![0];

        // reset image preview
        photo_preview.value = '';

        const reader = new FileReader();
        reader.onload = () => {
            photo_preview.value = reader.result as string;
        };
        reader.readAsDataURL(photo);
    }
}

// ASAATIDZ
const forSelect = ref('');
const selectAsaatidz = (astz: Asaatidz) => {
    showAstzSelector.value = false;
    form.value[forSelect.value] = astz;
}


const confirmUpdate = ref<Boolean>(false);
const errors = ref<Record<string, string>>({});
const responseError = ref<string>('');

const doUpdate = async () => {
    const formData: FormData = new FormData();
    responseError.value = '';
    errors.value = {};

    try {

        if (photo) {
            formData.append('photo', photo);
        }

        if (form.value.imam_tarawih) formData.append('imam_tarawih_id', form.value.imam_tarawih.id);
        if (form.value.imam_qiyamul_lail) formData.append('imam_qiyamul_lail_id', form.value.imam_qiyamul_lail.id);
        if (form.value.ustadz_kajian) formData.append('ustadz_kajian_id', form.value.ustadz_kajian.id);

        let data = {
            date: form.value.date,
            day_index: form.value.day_index,
            description: form.value.description
        }

        // validate
        data = Validate(isScheduleItikaf, data);

        // append
        formData.append('date', dayjs(data.date).format('YYYY-MM-DD'));
        formData.append('day_index', data.day_index);
        formData.append('description', data.description);

        if (props.data) {
            await Itikaf.updateSchedule(props.data.id, formData);
        } else {
            await Itikaf.createSchedule(formData);
        }

        confirmUpdate.value = false;
        emits('saved');

        // reset file input avatar
        if (fileInput.value) {
            fileInput.value.value = '';
            photo = null;
        }

        toast.success("Success", {
            autoClose: 3000
        });
    } catch (error: any) {
        if (error instanceof JoiError) {
            errors.value = error.data
        } else {
            responseError.value = error.message;
        }

        confirmUpdate.value = false;
    }
}
</script>
