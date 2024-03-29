<template>
    <footer class="bg-gray-800 text-white">
        <div class="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 p-5 md:p-10">
            <div v-if="Client.client" class="flex flex-col gap-2 items-center">

                <!-- LOGO -->
                <template v-if="Client.client.logo">
                    <img v-if="isURL(Client.client.logo)" :src="Client.client.logo" :alt="Client.client.name + 'Logo'"
                        class="w-40">
                    <img v-else :src="apiUri + Client.client.logo" :alt="Client.client.name + 'Logo'" class="w-40">
                </template>
                <IconsMosque v-else class="w-40" />

                <div class="flex flex-col gap-1 text-center">
                    <div class="leading-4 uppercase text-2xl">{{ Client.client.name }}</div>
                    <div class="text-sm font-normal text-slate-500">{{ Client.client.slogan }}</div>
                </div>

                <div class="font-thin text-center">{{ Client.client.address }}</div>

            </div>
            <div class="col-span-2 max-md:text-center">
                <div class="text-lg my-4">Salurkan Donasi Terbaik Anda</div>
                <div class="font-semibold">Yayasan Ukhuwah Project</div>
                <div>Bank Syariah Indonesia (BSI)</div>
                <div>8888-888-888</div>
            </div>
        </div>
    </footer>
</template>
<script setup lang="ts">
const Client = useClientStore();
</script>