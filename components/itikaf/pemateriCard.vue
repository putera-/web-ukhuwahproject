<template>
    <div class="card max-md:w-full max-lg:grow ">
        <div class="card-body w-full p-2 bg-[#F8D7B6] rounded-full">
            <div class="flex items-center gap-3 w-full">
                <template v-if="pemateri.avatar_md">
                    <img v-if="isURL(pemateri.avatar_md)" :src="pemateri.avatar_md" alt=""
                        class="flex-none rounded-full w-12 md:w-16 h-12 md:h-16">
                    <img v-else :src="apiUri + pemateri.avatar_md" alt=""
                        class="flex-none rounded-full w-12 md:w-16 h-12 md:h-16">
                </template>
                <div v-else
                    class="flex-none rounded-full w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-white to-[#EE9A49] flex justify-center items-end overflow-hidden">
                    <IconsIkhwan class="w-12" />
                </div>

                <div class="grow overflow-hidden">
                    <div class="text-xs md:text-sm text-gray-600 truncate">{{ posisi }}</div>
                    <div class=" font-medium text-sm md:text-medium truncate">
                        {{ pemateri.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    pemateri: Asaatidz
    posisi: string
}>()
const { public: { apiUri } } = useRuntimeConfig();

</script>