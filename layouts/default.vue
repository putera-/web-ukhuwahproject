<template>
    <div class="drawer font-poppins">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col relative bg-gradient-to-bl from-[#FEF5ED] to-[#F8D7B6]">
            <!-- Navbar -->
            <div class="w-full max-w-7xl h-0 relative mx-auto z-10">
                <div class="absolute w-full navbar">
                    <div class="flex-none lg:hidden">
                        <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                class="inline-block w-6 h-6 stroke-current">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div class="lg:absolute px-2 mx-2 gap-3 text-xl font-semibold">
                        <!-- <IconsMosque class="w-10" /> -->
                        <img src="/uplogo.png" alt="Ukhuwah Project Logo" class="w-10">
                        <div class="leading-4">UKHUWAH<br />PROJECT</div>
                    </div>
                    <div class="flex-1 hidden lg:flex lg:justify-center">
                        <!-- Navbar menu content here -->
                        <ul class="menu menu-horizontal text-lg font-medium gap-2">
                            <li>
                                <NuxtLink to="/">Beranda</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/itikaf">Itikaf Ramadhan</NuxtLink>
                            </li>
                            <li v-if="!Auth.user">
                                <NuxtLink to="/auth/login">Login</NuxtLink>
                            </li>
                            <li v-if="Auth.user">
                                <details>
                                    <summary>
                                        {{ Auth.user.name }}
                                    </summary>
                                    <ul class="p-2 bg-gradient-to-bl from-[#FEF5ED] to-[#F8D7B6] rounded-lg z-[100]">
                                        <li><button class="bg-[#EE9A49] btn btn-sm" @click="Auth.logout">Logout</button>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Page content here -->
            <slot />

            <DefaultFooter />
        </div>
        <div class="drawer-side z-50">
            <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
            <!-- Sidebar content here -->
            <div class="p-4 w-80 min-h-full bg-base-200">
                <div class="flex justify-center items-center gap-4 text-xl font-semibold">
                    <IconsMosque class="w-24" />
                    <div class="leading-4">MASJID<br />AL-ADHIM</div>
                </div>
                <div v-if="Auth.user" class="text-center mt-10">
                    <div class="text-sm font-semibold">{{ Auth.user.name }}</div>
                    <div class="text-xs">{{ Auth.user.email }}</div>
                </div>
                <div class="divider mt-0"></div>
                <ul class="menu">
                    <li>
                        <NuxtLink to="/" class="flex items-center">
                            <IconsHome class="w-5" /> Beranda
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/itikaf" class="flex items-center">
                            <IconsPray class="w-5" /> Itikaf Ramadhan
                        </NuxtLink>
                    </li>
                    <li v-if="!Auth.user">
                        <NuxtLink to="/auth/login" class="flex items-center">
                            <IconsEnter class="w-5" /> Login
                        </NuxtLink>
                    </li>
                    <li v-if="Auth.user" class="mt-2">
                        <button class="bg-[#EE9A49] btn btn-sm" @click="Auth.logout">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const Auth = useAuthStore();
</script>

<style scoped></style>