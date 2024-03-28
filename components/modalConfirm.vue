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
            <slot />

            <div class="modal-action">
                <label class="btn" @click="$emit('close')">Close!</label>
                <label class="btn btn-neutral" @click="isLoading = true; $emit('saved')">
                    {{ text_confirm || 'Update' }}
                    <span v-show="isLoading" class="loading loading-bars loading-md"></span>
                </label>
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
    show: Boolean,
    text_confirm: String
});

defineEmits(['close', 'saved']);

const isLoading = ref(false);
const show_modal = ref(true);

watchEffect(() => {
    show_modal.value = props.show;
    if (props.show) {
        isLoading.value = false;
    }
});
</script>
