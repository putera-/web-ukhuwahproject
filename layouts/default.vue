<template>
    <div class="drawer font-poppins">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col relative">
            <!-- Navbar -->
            <div class="w-full navbar absolute z-10">
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
                    <IconsMosque class="w-10" />
                    <div class="leading-4">MASJID<br />AL-ADHIM</div>
                </div>
                <div class="flex-1 hidden lg:flex lg:justify-center">
                    <ul class="menu menu-horizontal text-lg font-medium">
                        <!-- Navbar menu content here -->
                        <li><a>Beranda</a></li>
                        <li><a>Itikaf Ramadhan</a></li>
                    </ul>
                </div>
            </div>
            <!-- Page content here -->
            <slot />
        </div>
        <div class="drawer-side z-20">
            <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 min-h-full bg-base-200">
                <!-- Sidebar content here -->
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
            </ul>
        </div>
    </div>
    <div class="w-screen min-h-screen">

    </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>