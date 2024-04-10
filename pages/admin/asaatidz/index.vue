<template>
    <div class="flex justify-between items-center gap-2">
        <div class="text-3xl font-semibold my-3">
            Asaatidz
        </div>

        <button @click="dataEdit = null; showForm = true;" class="btn rounded-full bg-[#EE9A49]">
            <LucidePencil :size="16" /> Tambah Asaatidz
        </button>
    </div>

    <div v-if="Astz.data != undefined">
        <template v-for="astz in Astz.data" :key="astz.id">
            <div class="card bg-white shadow-lg rounded-xl mt-5">
                <div class="card-body">
                    <div class="flex justify-between items-center gap-2">
                        <div class="flex items-center gap-3">
                            <template v-if="astz.avatar_md">
                                <img v-if="isURL(astz.avatar_md)" :src="astz.avatar_md" alt=""
                                    class="rounded-full w-16 h-16">
                                <img v-else :src="apiUri + astz.avatar_md" alt="" class="rounded-full w-16 h-16">
                            </template>
                            <div v-else
                                class="rounded-full w-16 md:w-16 h-16 md:h-16 bg-gradient-to-br from-white to-[#EE9A49] flex justify-center items-end overflow-hidden">
                                <IconsIkhwan class="w-12" />
                            </div>

                            <div>
                                <div class=" font-medium">
                                    {{ astz.name }}
                                </div>
                                <div class="font-light text-sm">
                                    {{ astz.profile }}
                                </div>
                            </div>
                        </div>
                        <button @click="dataEdit = astz; showForm = true" class="btn btn-circle btn-sm bg-[#EE9A49]">
                            <LucidePencil :size="16" />
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </div>
    <div v-else class="w-full flex justify-center mt-5">
        <div>
            <IconsEmpty class="w-40" />
            <div class="mt-3 font-semibold text-center text-xl">No Data</div>
        </div>
    </div>

    <LazyAdminAsaatidzForm v-if="showForm" :data="dataEdit" :show="showForm" @close="showForm = false"
        @saved="showForm = false; Astz.get()" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: [
        'admin'
    ]
});

const { public: { apiUri } } = useRuntimeConfig();
const Astz = useAsaatidzStore();
Astz.get();

const showForm = ref<boolean>(false);
const dataEdit = ref<Asaatidz | null>(null)

</script>