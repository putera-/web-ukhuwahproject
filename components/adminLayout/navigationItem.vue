<template>
    <!--Tidak punya children-->
    <li v-if="!menu.children">
        <NuxtLink :to="menu.to">
            <component :is="menu.icon" :size="20" class="w-6" /> {{ menu.title }}
        </NuxtLink>
    </li>

    <!--Punya Children-->
    <li v-if="menu.children">
        <details open>
            <summary>
                <component :is="menu.icon" :size="20" /> {{ menu.title }}
            </summary>

            <!-- UL untuk children -->
            <ul>
                <template v-for="(subMenu, i) in menu.children" :key="i">
                    <!-- Metode Recursive / Memanggil diri sendiri-->
                    <AdminLayoutNavigationItem :menu="subMenu" />
                </template>
            </ul>

        </details>
    </li>
</template>

<script setup>
defineProps({
    menu: Object
});
</script>