<template>
    <footer class="bg-gray-800 text-white">
        <div v-if="Client.client" class="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 p-5 md:p-10">
            <!-- SLOT 1 -->
            <div class="flex flex-col gap-2 items-center">

                <!-- LOGO -->
                <template v-if="Client.client.logo">
                    <img v-if="isURL(Client.client.logo)" :src="Client.client.logo" :alt="Client.client.name + 'Logo'"
                        class="w-40">
                    <img v-else :src="apiUri + Client.client.logo" :alt="Client.client.name + 'Logo'" class="w-40">
                </template>
                <IconsMosque v-else class="w-40" />

                <div class="flex flex-col gap-1 text-center">
                    <div class="uppercase text-2xl">{{ Client.client.name }}</div>
                    <div class="text-sm font-normal text-slate-500">{{ Client.client.slogan }}</div>
                </div>

                <div class="font-thin text-center">{{ Client.client.address }}</div>

            </div>

            <!-- SLOT 2 -->
            <div v-if="Client.client.bank_name" class="max-md:text-center flex flex-col justify-center">
                <div class="text-lg my-4">Salurkan Donasi Terbaik Anda</div>
                <div class="font-medium text-nowrap">{{ Client.client.bank_holder_name }}</div>
                <div class="text-sm text-nowrap">{{ Client.client.bank_name }}</div>
                <div class="text-sm text-nowrap">{{ Client.client.bank_account_no }}</div>
            </div>

            <!-- SLOT 3 -->
            <div class="max-md:text-center flex justify-center text-sm font-light">
                <div class="flex flex-col gap-3 justify-center">
                    <NuxtLink :to="Client.client.youtube" target="_blank" v-if="Client.client.youtube"
                        class="flex items-center gap-2">
                        <LucideYoutube :size="24" /> {{ Client.client.youtube }}
                    </NuxtLink>
                    <NuxtLink :to="Client.client.instagram" target="_blank" v-if="Client.client.instagram"
                        class="flex items-center gap-2">
                        <LucideInstagram :size="24" /> {{ Client.client.instagram }}
                    </NuxtLink>
                    <NuxtLink :to="Client.client.facebook" target="_blank" v-if="Client.client.facebook"
                        class="flex items-center gap-2">
                        <LucideFacebook :size="24" /> {{ Client.client.facebook }}
                    </NuxtLink>
                    <NuxtLink :to="Client.client.twitter" target="_blank" v-if="Client.client.twitter"
                        class="flex items-center gap-2">
                        <LucideTwitter :size="24" /> {{ Client.client.twitter }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>
<script setup lang="ts">
const Client = useClientStore();
</script>