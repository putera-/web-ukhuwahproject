<template>
    <div class="w-full min-h-screen max-w-5xl mx-auto pt-20 pb-10 px-4 md:px-6 my-6 overflow-hidden">
        <div class="flex flex-col items-center gap-10">
            <div>
                Pembayaran Gagal
            </div>
            <nuxt-link to="/" class="btn rounded-full bg-[#EE9A49]">Kembali ke home</nuxt-link>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['onlyauth']
});

</script>