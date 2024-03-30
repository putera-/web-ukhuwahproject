<template>
    <div v-if="Auth.user" class="border-b border-b-neutral/10 pb-2 mb-4 flex justify-between items-center">
        <div class="font-bold text-xl lg:text-3xl">Profile</div>
        <div class="text-lg font-medium">{{
        Auth.user.email }}</div>
    </div>

    <div role="tablist" class="tabs tabs-bordered">
        <input type="radio" name="my_tabs_2" role="tab" class="tab [--tab-bg:#f8fafc]" aria-label="Profile" checked />
        <div role="tabpanel" class="tab-content p-6">
            <AdminProfile v-if="!loading" />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" class="tab [--tab-bg:#f8fafc] text-nowrap"
            aria-label="Change Password" />
        <div role="tabpanel" class="tab-content p-6">
            <AdminProfileChangePassword v-if="!loading" />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: [
        'admin'
    ]
});
const loading = ref(false);

const Auth = useAuthStore();
onBeforeMount(async (): Promise<void> => {
    if (!Auth.user) await Auth.getUser();

    loading.value = false;
});
</script>

<style scoped></style>