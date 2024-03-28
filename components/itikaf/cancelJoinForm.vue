<template>
    <input type="checkbox" v-model="_show" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <h3 class="font-semibold text-lg">Kenapa Batal I'tikaf! </h3>
            <p class="py-4 text-sm">Masukkan alasan! Berikan alasan positif & membangun.<br />Syukron</p>

            <label class="form-control w-full max-w-xs">
                <textarea v-model="reason" class="bg-[#E8E5F8] textarea" rows="5" placeholder="Alasan"></textarea>
            </label>


            <div class="modal-action">
                <label @click="$emit('close')" class="btn">Cancel</label>
                <label @click="notJoinItikaf" class="btn bg-[#EE9A49]">
                    Batal Ikut
                    <IconsLoading v-show="isLoading" class="w-10" />
                </label>
            </div>
            <div class="text-error text-right ml-4">{{ fetchError }}</div>
        </div>
        <label class="modal-backdrop" @click="$emit('close')">Close</label>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    show: boolean
    scheduleId: string
}>();
const emits = defineEmits(['close', 'success']);

const _show = ref(false);
const isLoading = ref(false);
const fetchError = ref('');

const reason = ref('');

watchEffect(() => {
    _show.value = props.show;

    // reset
    isLoading.value = false;
    fetchError.value = '';

    reason.value = '';
});


const Itikaf = useItikafStore();
const notJoinItikaf = async () => {
    if (isLoading.value) return;

    // reset
    fetchError.value = '';

    try {
        isLoading.value = true;
        await Itikaf.cancelJoin(reason.value, props.scheduleId);
        isLoading.value = false;

        emits('success')
    } catch (error: any) {
        fetchError.value = error.message;
        isLoading.value = false;
    }
}
</script>
