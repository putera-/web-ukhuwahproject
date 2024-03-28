<template>
    <input type="checkbox" v-model="_show" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box rounded-2xl">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</button>
            <p class="py-4">
                <slot />
            </p>
            <div class="modal-action">
                <label class="btn" @click="$emit('close')">Close</label>
                <label class="btn btn-neutral" @click="isLoading = true; $emit('yes')">
                    {{ actionText }}
                    <IconsLoading v-show="isLoading" class="w-8" />
                </label>
            </div>
        </div>
        <label class="modal-backdrop" @click="$emit('close')">Close</label>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    show: Boolean
    actionText: string
}>();

const emit = defineEmits(['close', 'yes']);
const isLoading = ref<boolean>(false);

const _show = ref<Boolean>(props.show);
watchEffect(() => {
    _show.value = props.show;
    isLoading.value = false;
})

</script>
