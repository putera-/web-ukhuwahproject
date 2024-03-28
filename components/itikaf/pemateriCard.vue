<template>
    <div class="card bg-[#F8D7B6] max-md:w-full max-lg:grow">
        <div class="card-body w-full p-2">
            <div class="flex items-center max-md:justify-center gap-3">
                <template v-if="pemateri.avatar_md">
                    <img v-if="isURL(pemateri.avatar_md)" :src="pemateri.avatar_md" alt=""
                        class="rounded-full w-12 h-12">
                </template>
                <div v-else class="rounded-full w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-white to-[#EE9A49]">
                </div>

                <div>
                    <div class="text-xs md:text-sm text-gray-600">{{ posisi }}</div>
                    <div class=" font-medium text-sm md:text-medium">
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

</script>