<template>
    <ul class="side-menu">
        <li class="my-2 font-semibold">M A I N _ M E N U</li>
        <template v-for="(menu, i) in menus" :key="i">
            <AdminLayoutNavigationItem :menu="menu" />
        </template>
    </ul>
</template>

<script setup lang="ts">

interface Menu {
    title: string
    icon: any
    to?: string
    children?: Menu[]
}

const menus: Menu[] = [
    {
        title: "Home Page",
        to: "/",
        icon: resolveComponent("IconsMosque")
    },
    {
        title: "Dashbord",
        to: "/admin",
        icon: resolveComponent("LucideLayoutDashboard")
    },
    // {
    //     title: "Profile",
    //     to: "/admin/profile",
    //     icon: resolveComponent("LucideUserRound")
    // },
    {
        title: "Itikaf",
        to: "/admin/itikaf",
        icon: resolveComponent("LucideBriefcase")
    },
    {
        title: "Asaatidz",
        to: "/admin/asaatidz",
        icon: resolveComponent("LucideGraduationCap"),
    },
    // {
    //     title: "Experience",
    //     to: "/admin/experience",
    //     icon: resolveComponent("LucideAward"),
    // },
    // {
    //     title: "Skill",
    //     to: "/admin/skill",
    //     icon: resolveComponent("LucideWrench"),
    // },
    // {
    //     title: "Blogs",
    //     to: "/admin/blogs",
    //     icon: resolveComponent("LucideNewspaper"),
    // }
];

</script>

<style>
.side-menu.menu a,
.side-menu.menu summary {
    position: relative;
    margin-bottom: 0.25rem;
    display: flex;
    height: 50px;
    align-items: center;
    border-radius: 0.5rem;
    padding-left: 1.25rem;
    /* --tw-text-opacity: 1;
        background-color: rgb(255 255 255 / 0.02); */
}

.side-menu.menu a:focus {
    color: #fff;
}

.side-menu.menu a.router-link-exact-active::before,
.side-menu.menu details[open]>summary::before {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    display: block;
    border-radius: 0.5rem;
    border-bottom-width: 3px;
    border-style: solid;
    border-color: rgb(0 0 0 / 0.1);
    background-color: rgb(255 255 255 / 0.08);
}

@media (min-width: 1024px) {
    .side-menu.menu a.router-link-exact-active::after {
        content: "";
        width: 20px;
        height: 80px;
        margin-right: -47px;
        -webkit-animation: 0.3s active-side-menu-chevron-animation ease-in-out 0.33333s;
        animation: 0.3s active-side-menu-chevron-animation ease-in-out 0.33333s;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-animation-delay: 1s;
        animation-delay: 1s;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='80' viewBox='0 0 20 122.1'%3E%3Cpath data-name='Union 1' d='M16.038 122H16v-2.213a95.805 95.805 0 00-2.886-20.735 94.894 94.894 0 00-7.783-20.434A39.039 39.039 0 010 61.051a39.035 39.035 0 015.331-17.567 94.9 94.9 0 007.783-20.435A95.746 95.746 0 0016 2.314V0h4v122h-3.961v.1l-.001-.1z' fill='%23F8D7B6'/%3E%3C/svg%3E");
        position: absolute;
        top: 0px;
        bottom: 0px;
        right: 0px;
        margin-top: auto;
        margin-bottom: auto;
        background-size: cover;
        background-repeat: no-repeat;
        opacity: 0;
    }

    @keyframes active-side-menu-chevron-animation {
        100% {
            margin-right: -22px;
            opacity: 1;
        }
    }
}
</style>