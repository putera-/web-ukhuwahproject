<template>
    <div data-theme="light" class="drawer font-poppins">
        <input v-model="showdrawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col relative bg-gradient-to-r from-[#FEF5ED] to-[#F8D7B6]">
            <!-- Navbar -->
            <div class="w-full max-w-7xl h-0 relative mx-auto z-10">
                <div class="absolute w-full navbar">
                    <div class="flex-none lg:hidden">
                        <label @click="showdrawer = true" aria-label="open sidebar" class="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                class="inline-block w-6 h-6 stroke-current">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <ClientOnly>
                        <NuxtLink to="/" class="xl:absolute px-2 mx-2 gap-3 text-xl font-semibold !bg-white/0"
                            v-if="Client.client">
                            <!-- LOGO -->
                            <template v-if="Client.client.logo">
                                <img v-if="isURL(Client.client.logo)" :src="Client.client.logo"
                                    :alt="Client.client.name + 'Logo'" class="w-10">
                                <img v-else :src="apiUri + Client.client.logo" :alt="Client.client.name + 'Logo'"
                                    class="w-10">
                            </template>
                            <IconsMosque v-else class="w-10" />

                            <div class="flex flex-col">
                                <div class="uppercase">{{ Client.client.name }}</div>
                                <div class="text-xs font-normal text-slate-500">{{ Client.client.slogan }}</div>
                            </div>
                        </NuxtLink>
                    </ClientOnly>
                    <div class="flex-1 hidden lg:flex lg:justify-center">
                        <!-- Navbar menu content here -->
                        <ul class="menu menu-horizontal text-md lg:text-lg font-medium gap-2 flex items-center">
                            <li>
                                <NuxtLink to="/" class="rounded-full max-xl:text-base">Beranda</NuxtLink>
                            </li>

                            <li>
                                <NuxtLink to="/articles" class="rounded-full max-xl:text-base">Artikel</NuxtLink>
                            </li>

                            <ClientOnly>
                                <li v-if="Itikaf.itikaf">
                                    <NuxtLink to="/itikaf" class="rounded-full max-xl:text-base">Itikaf Ramadhan
                                    </NuxtLink>
                                </li>
                                <li v-if="!Auth.user">
                                    <NuxtLink to="/auth/login" class="rounded-full max-xl:text-base">Login</NuxtLink>
                                </li>
                                <template v-if="Auth.user">
                                    <li>
                                        <details>
                                            <summary class="rounded-full max-xl:text-base">
                                                <div
                                                    class="btn w-8 h-8 min-h-8 xl:w-8 xl:h-8 xl:min-h-8 btn-circle overflow-hidden">
                                                    <img v-if="Auth.user.avatar_md"
                                                        :src="isURL(Auth.user.avatar_md) ? Auth.user.avatar_md : apiUri + Auth.user.avatar_md"
                                                        class="min-w-full min-h-full">
                                                    <div v-else class="text-gray-500 text-xl font-light">{{
                                                        Auth.user.name[0] }}</div>
                                                </div>
                                                <div>{{ Auth.user.name }}</div>
                                            </summary>
                                            <ul
                                                class="p-2 bg-gradient-to-bl from-[#FEF5ED] to-[#F8D7B6] rounded-lg z-[100] flex flex-col gap-2">
                                                <li>
                                                    <NuxtLink to="/profile" class="font-normal text-sm">Profile
                                                    </NuxtLink>
                                                </li>
                                                <li>
                                                    <button class="bg-[#EE9A49] btn btn-sm font-normal text-sm"
                                                        @click="Auth.logout">Logout</button>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li v-if="Auth.user.role != 'MEMBER'">
                                        <NuxtLink to="/admin" class="rounded-full max-xl:text-base">Admin Portal
                                        </NuxtLink>
                                    </li>
                                </template>
                            </ClientOnly>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Page content here -->
            <slot />

            <DefaultFooter />
        </div>
        <ClientOnly>
            <div class="drawer-side z-50" v-if="Client.client">
                <label @click="showdrawer = false" aria-label="close sidebar" class="drawer-overlay"></label>
                <!-- Sidebar content here -->
                <div class="p-4 w-80 min-h-full bg-base-200">

                    <NuxtLink to="/" @click="showdrawer = false"
                        class="flex flex-col justify-center items-center gap-4 text-xl font-semibold !bg-white/0">
                        <!-- LOGO -->
                        <template v-if="Client.client.logo">
                            <img v-if="isURL(Client.client.logo)" :src="Client.client.logo"
                                :alt="Client.client.name + 'Logo'" class="w-24">
                            <img v-else :src="apiUri + Client.client.logo" :alt="Client.client.name + 'Logo'"
                                class="w-24">
                        </template>
                        <IconsMosque v-else class="w-24" />

                        <div class="flex flex-col gap-1 text-center">
                            <div class="leading-4 uppercase">{{ Client.client.name }}</div>
                            <div class="text-xs font-normal text-slate-500">{{ Client.client.slogan }}</div>
                        </div>
                    </NuxtLink>

                    <div v-if="Auth.user" class="flex items-center gap-2 mt-10 mx-4">
                        <div class="btn w-8 h-8 min-h-8 btn-circle overflow-hidden">
                            <img v-if="Auth.user.avatar" :src="apiUri + Auth.user.avatar_md"
                                class="min-w-full min-h-full">
                            <LucideUser v-else :size="24" class="text-primary" />
                        </div>
                        <div class="">
                            <div class="text-sm font-semibold">{{ Auth.user.name }}</div>
                            <div class="text-xs">{{ Auth.user.email }}</div>
                        </div>
                        <div class="grow flex justify-end">
                            <NuxtLink to="/profile" @click="showdrawer = false"
                                class="btn btn-circle btn-sm bg-[#EE9A49]">
                                <LucidePencil :size="16" />
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="divider mt-0"></div>
                    <ul class="menu">
                        <li>
                            <NuxtLink to="/" @click="showdrawer = false"
                                class="flex items-center bg-white/5 py-3 my-1 rounded-xl">
                                <IconsHome class="w-5" /> Beranda
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/articles" @click="showdrawer = false"
                                class="flex items-center bg-white/5 py-3 my-1 rounded-xl">
                                <IconsKitab class="w-5" /> Artikel
                            </NuxtLink>
                        </li>
                        <li v-if="Itikaf.itikaf">
                            <NuxtLink to="/itikaf" @click="showdrawer = false"
                                class="flex items-center bg-white/5 py-3 my-1 rounded-xl">
                                <IconsPray class="w-5" /> Itikaf Ramadhan
                            </NuxtLink>
                        </li>
                        <li v-if="!Auth.user">
                            <NuxtLink to="/auth/login" @click="showdrawer = false"
                                class="flex items-center bg-white/5 py-3 my-1 rounded-xl">
                                <IconsEnter class="w-5" /> Login
                            </NuxtLink>
                        </li>
                        <template v-if="Auth.user">
                            <li>
                                <NuxtLink v-if="Auth.user.role != 'MEMBER'" to="/admin" @click="showdrawer = false"
                                    class="flex items-center py-3 my-1">
                                    <IconsEnter class="w-5" /> Admin Portal
                                </NuxtLink>
                            </li>
                            <li class="mt-2">
                                <button class="bg-[#EE9A49] btn btn-sm my-1" @click="Auth.logout">Logout</button>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import 'vue3-toastify/dist/index.css';

const { public: { apiUri } } = useRuntimeConfig();
const showdrawer = ref(false);

const Auth = useAuthStore();

const Client = useClientStore();
const Itikaf = useItikafStore();
const promises = []
if (!Itikaf.itikaf) promises.push(Itikaf.get());
if (!Client.client) promises.push(Client.get());

await Promise.all(promises)
</script>

<style scoped>
.router-link-active.router-link-exact-active {
    background-color: #fff;
}
</style>