<template>
    <div class="w-full min-h-screen max-w-7xl mx-auto pt-20 px-4 md:px-6">
        <div class="">
            <div class="text-lg font-semibold my-4"> {{ Auth.user.email }} </div>

            <div role="tablist" class="tabs tabs-bordered">
                <input type="radio" name="my_tabs_2" role="tab" class="tab [--tab-bg:#f8fafc]" aria-label="Profile"
                    checked />
                <div role="tabpanel" class="tab-content p-6">
                    <AdminProfile v-if="!loading" />
                </div>

                <input type="radio" name="my_tabs_2" role="tab" class="tab [--tab-bg:#f8fafc]"
                    aria-label="Change Password" />
                <div role="tabpanel" class="tab-content p-6">
                    <AdminProfileChangePassword v-if="!loading" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: [
        'auth'
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