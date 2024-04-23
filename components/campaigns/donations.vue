<template>
    <input type="checkbox" v-model="_show" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box rounded-2xl overflow-y-scroll max-w-xs">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="close">✕</button>
            <template v-for="donation in useDonation.donations">
                <div class="flex items-center gap-2 py-2">
                    <div
                        class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-white to-[#EE9A49] flex justify-center items-center overflow-hidden text-gray-500 text-xl font-light">
                        {{ donation.User!.name[0] }}
                    </div>
                    <div>
                        <div class="font-semibold text-sm">{{ donation.User!.name }}</div>
                        <div class="text-sm">{{ toRupiah(donation.gross_amount) }}</div>
                        <div class="font-light text-xs md:text-sm text-gray-500 text-nowrap">{{
                            getRelativeTime(donation.paidAt!) }}</div>
                    </div>
                </div>
            </template>
            <div class="modal-action">
                <label class="btn btn-xs rounded-full w-full btn-warning" @click="nextPage"
                    v-if="useDonation.page < useDonation.maxPage">
                    Load more
                    <IconsLoading v-show="isLoading" class="w-8" />
                </label>
                <label class="btn btn-xs rounded-full w-full btn-warning" @click="close" v-else>
                    Tutup
                </label>
            </div>
        </div>
        <label class="modal-backdrop" @click="close">Close</label>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    show: Boolean
    campaignId: string
}>();

const emit = defineEmits(['close']);
const isLoading = ref<boolean>(false);

const _show = ref<Boolean>(props.show);
const page = ref<number>(1);

const useDonation = useDonationStore();
const getDonation = async (): Promise<void> => {
    isLoading.value = true;
    await useDonation.get(props.campaignId, page.value);
    isLoading.value = false
}

const nextPage = () => {
    if (useDonation.page < useDonation.maxPage) ++page.value;
}

const close = () => {
    page.value = 1;
    useDonation.donations = [];
    emit('close')
}

watchEffect(() => {
    _show.value = props.show;
    isLoading.value = false;

    getDonation();
});
</script>
