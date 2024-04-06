<template>
    <!-- MODAL CONFIRM -->
    <!-- Put this part before </body> tag -->
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box max-w-sm">
            <!-- x Corner button -->
            <form method="dialog">
                <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</label>
            </form>
            <!-- Slot -->
            <div class="text-xl font-semibold my-3">
                Pilih Asaatidz
            </div>

            <div class="flex flex-col gap-4">
                <template v-if="Astz.data" v-for="astz in Astz.data" :key="astz.id">
                    <button @click="$emit('select', astz)"
                        class="btn h-min shadow p-4 rounded-2xl text-left bg-gradient-to-bl from-[#FEF5ED] to-[#F8D7B6] justify-start">
                        <div class="flex items-center gap-3">
                            <template v-if="astz.avatar_md">
                                <img v-if="isURL(astz.avatar_md)" :src="astz.avatar_md" alt=""
                                    class="rounded-full w-14 h-14">
                                <img v-else :src="apiUri + astz.avatar_md" alt="" class="rounded-full w-14 h-14">
                            </template>
                            <div v-else
                                class="rounded-full w-14 md:w-14 h-14 md:h-14 bg-gradient-to-br from-white to-[#EE9A49]">
                            </div>

                            <div>
                                <div class="font-medium line-clamp-1">
                                    {{ astz.name }}
                                </div>
                                <div class="font-light text-sm line-clamp-1">
                                    {{ astz.profile }}
                                </div>
                            </div>
                        </div>
                    </button>
                </template>
            </div>
        </div>
        <!-- Click Outside -->
        <form method="dialog" class="modal-backdrop">
            <label @click="$emit('close')">close</label>
        </form>
    </div>

</template>

<script setup lang="ts">
const props = defineProps<{
    show: boolean
    // data: Asaatidz | null
}>();

const emits = defineEmits(['close', 'select']);

const Astz = useAsaatidzStore();
if (!Astz.data) Astz.get();

const show_modal = ref<boolean>(false);
watchEffect(() => {
    show_modal.value = props.show;
});

</script>
