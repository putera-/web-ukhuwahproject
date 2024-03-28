<template>
    <!-- MODAL SECCESS -->
    <!-- Put this part before </body> tag -->
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <!-- x Corner button -->
            <form method="dialog">
                <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</label>
            </form>

            <h3 class="font-bold text-lg">BERHASIL!</h3>
            <div class="modal-action">
                <label class="btn" @click="$emit('close')">Tutup!</label>
            </div>
        </div>
        <!-- Click Outside -->
        <form method="dialog" class="modal-backdrop">
            <label @click="$emit('close')">close</label>
        </form>
    </div>
</template>

<script setup>
const props = defineProps({
    show: Boolean
});

defineEmits(['close'])

const show_modal = ref(false);

watchEffect(() => {
    show_modal.value = props.show;
})

</script>