<template>
    <input type="checkbox" v-model="_show" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <h3 class="font-semibold text-lg">Ikut I'tikaf! </h3>
            <p class="py-4 text-sm">Masukkan jumlah anggota untuk disiapkan makan sahur!</p>

            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text font-semibold">Ikhwan</span>
                </div>
                <label class="input border-0 flex items-center gap-2 w-full bg-[#E8E5F8]">
                    <input v-model="formData.man" :disabled="isPrevDay" type="number" class="grow bg-[#E8E5F8]"
                        placeholder="Jumlah Ikhwan" />
                </label>
                <div class="label">
                    <span class="label-text text-error" v-if="errors.man">{{ errors.man }}</span>
                </div>
            </label>

            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text font-semibold">Akhwat</span>
                </div>
                <label class="input border-0 flex items-center gap-2 w-full bg-[#E8E5F8]">
                    <input v-model="formData.woman" :disabled="isPrevDay" type="number" class="grow bg-[#E8E5F8]"
                        placeholder="Jumlah Ikhwan" />
                </label>
                <div class="label">
                    <span class="label-text text-error" v-if="errors.woman">{{ errors.woman }}</span>
                </div>
            </label>

            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text font-semibold">Kendaraan</span>
                    <span class="text-xs">Untuk pengaturan parkir</span>
                </div>
                <select v-model="formData.vehicle_type" :disabled="isPrevDay"
                    class="select w-full max-w-xs bg-[#E8E5F8]">
                    <option selected value="">Tidak Bawa Kendaraan</option>
                    <option value="Mobil">Mobil</option>
                    <option value="Motor">Motor</option>
                </select>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text font-semibold">No Kendaraan</span>
                    <span class="text-xs">Untuk pengaturan parkir</span>
                </div>
                <label class="input border-0 flex items-center gap-2 w-full bg-[#E8E5F8]">
                    <input v-model="formData.vehicle_no" :disabled="isPrevDay" type="text" class="grow bg-[#E8E5F8]"
                        placeholder="No Kendaraan" />
                </label>
                <div class="label">
                    <span class="label-text text-error" v-if="errors.vehicle_no">{{ errors.vehicle_no }}</span>
                </div>
            </label>

            <!-- CEK TANGGAL -->
            <div class="modal-action">
                <label @click="$emit('close')" class="btn">Tutup</label>
                <label v-if="!isPrevDay" @click="joinItikaf" class="btn bg-[#EE9A49]">
                    {{ terdaftar ? 'Ubah Data' : 'Ikut' }}
                    <IconsLoading v-show="isLoading" class="w-10" />
                </label>
            </div>
            <div class="text-error text-right ml-4">{{ fetchError }}</div>
        </div>
        <label class="modal-backdrop" @click="$emit('close')">Close</label>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
const props = defineProps<{
    show: boolean
    scheduleId: string
}>();
const emits = defineEmits(['close', 'success']);

const _show = ref(false);
const isLoading = ref(false);
const errors = ref<Record<string, any>>({});
const fetchError = ref('');

watchEffect(() => {
    _show.value = props.show;

    // reset
    isLoading.value = false;
    fetchError.value = '';
    errors.value = {};

});

const formData = ref<JoinItikafForm>({
    man: 0,
    woman: 0,
    vehicle_type: '',
    vehicle_no: ''
});

const terdaftar = ref(false);
const isPrevDay = ref(false);
onBeforeMount(async (): Promise<void> => {
    const scheduleData: ItikafSchedule = Itikaf.schedules.find(s => s.id == props.scheduleId);

    const today = dayjs().format('YYYY-MM-DD');
    isPrevDay.value = new Date(today) > new Date(scheduleData.date);

    const mySchedule = await Itikaf.getMySchedule(props.scheduleId) as ItikafParticipant;

    if (mySchedule) {
        terdaftar.value = true;

        formData.value = {
            man: mySchedule.man,
            woman: mySchedule.woman,
            vehicle_type: mySchedule.vehicle ? mySchedule.vehicle.vehicle_type : '',
            vehicle_no: mySchedule.vehicle ? mySchedule.vehicle.vehicle_no : ''
        }
    }
});

const Itikaf = useItikafStore();
const joinItikaf = async () => {
    if (isLoading.value) return;

    // reset
    fetchError.value = '';
    errors.value = {};

    try {
        isLoading.value = true;
        await Itikaf.join(formData.value, props.scheduleId);
        isLoading.value = false;

        emits('success')
    } catch (error: any) {
        if (error instanceof JoiError) {
            errors.value = error.data
        } else {
            fetchError.value = error.message;
        }

        isLoading.value = false;
    }
}
</script>
