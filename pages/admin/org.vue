<template>
    <div class="w-full max-w-xs text-center my-4 font-semibold text-xl">Detail Organisasi</div>

    <div role="tablist" class="tabs tabs-bordered">
        <input type="radio" name="my_tabs_2" role="tab" class="tab [--tab-bg:#f8fafc]" aria-label="Detail" checked />
        <div role="tabpanel" class="tab-content p-6">
            <AdminOrgDetail v-if="!loading" />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" class="tab [--tab-bg:#f8fafc] text-nowrap"
            aria-label="Sosial Media" />
        <div role="tabpanel" class="tab-content p-6">
            <AdminOrgSocial v-if="!loading" />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" class="tab [--tab-bg:#f8fafc] text-nowrap"
            aria-label="No Rekening" />
        <div role="tabpanel" class="tab-content p-6">
            <AdminOrgBankAccount v-if="!loading" />
        </div>
    </div>
    <div>


    </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
});
const Client = useClientStore();
const loading = ref(true);

onBeforeMount(async () => {
    if (!Client.client) await Client.get();
    loading.value = false;
});

</script>