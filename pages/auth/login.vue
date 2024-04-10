<template>
    <div class="h-full flex flex-col">
        <div class="flex-none m-4">
            <NuxtLink to="/" class="btn bg-white/0 border-0 shadow-none">
                <IconsHome class="w-5" />Home
            </NuxtLink>
        </div>
        <div class="grow flex flex-col justify-center px-6 lg:px-10">
            <div class="flex flex-col gap-10 items-center">
                <div class="mt-2 md:mt-5 md:hidden">
                    <div class="font-semibold text-3xl">UKHUWAH PROJECT</div>
                    <div class="text-center text-sm md:text-md">Bersama Dijalan Dakwah</div>
                </div>

                <img src="/uplogo.png" class="md:hidden w-32 md:w-40">

                <div class="text-2xl lg:text-4xl">Login</div>
                <div class="grow w-full flex flex-col justify-center gap-8 md:gap-20">
                    <!-- form login -->
                    <div class="w-full flex flex-col gap-4">
                        <!-- email -->
                        <div>
                            <label class="input md:input-lg border-0 rounded-full bg-[#E8E5F8] flex items-center gap-2">
                                <input v-model="loginForm.email" type="text" class="grow" placeholder="Email"
                                    autocomplete="email" />
                            </label>
                            <div class="text-xs text-error my-1" v-if="errors.email">{{ errors.email }}</div>
                        </div>
                        <!-- password -->
                        <div>
                            <label
                                class="input md:input-lg border-0 flex items-center gap-2 rounded-full w-full bg-[#E8E5F8] overflow-hidden">
                                <input v-model="loginForm.password" :type="showPassword ? 'text' : 'password'"
                                    class="grow bg-[#E8E5F8]" placeholder="Password" autocomplete="current-password" />
                                <div @click="showPassword = !showPassword" class="cursor-pointer">
                                    <IconsEye class="w-4" v-if="!showPassword" />
                                    <IconsEyeSlash class="w-4" v-else />
                                </div>
                            </label>
                            <div class="text-xs text-error my-1" v-if="errors.password">{{ errors.password }}</div>
                        </div>

                        <!-- remeber & forget password -->
                        <div v-show="false" class="w-full flex justify-end items-center">
                            <!-- <div class="form-control">
                                <label class="label cursor-pointer">
                                    <input type="checkbox" class="checkbox checkbox-sm" />
                                    <span class="label-text ml-2 font-semibold text-xs text-[#575F6A]">
                                        Remember me
                                    </span>
                                </label>
                            </div> -->
                            <div class="font-semibold text-xs">Forget your password?</div>
                        </div>

                        <!-- login button -->
                        <div class="w-full flex flex-col">
                            <button @click="doLogin"
                                class="btn btn-lg rounded-full w-52 flex justify-between pull-left bg-[#EE9A49] text-white border-0">
                                Login
                                <IconsEnter v-show="!isLoading" class="w-4" />
                                <IconsLoading v-show="isLoading" class="w-10" />
                            </button>
                            <div class="text-error ml-4">{{ fetchError }}</div>
                        </div>
                    </div>

                    <div class="divider">
                        <NuxtLink to="/auth/register" class="btn btn-sm rounded-full px-6">Register</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { useAuthStore } from '~/stores/auth-store';

definePageMeta({
    layout: 'auth',
    middleware: ['auth']
});

const showPassword = ref(false);
const isLoading = ref(false);
const errors = ref<Record<string, any>>({});
const fetchError = ref('');

const loginForm = ref({
    email: '',
    password: ''
});

const AuthStore = useAuthStore();
const doLogin = async (): Promise<void> => {
    if (isLoading.value) return;

    isLoading.value = true;
    errors.value = {};
    fetchError.value = '';
    try {
        await AuthStore.login(loginForm.value);
    } catch (error: any) {
        if (error.isJoi) {
            errors.value = error.data
        } else {
            fetchError.value = error.message;
        }

        isLoading.value = false;
    }
}


</script>

<style scoped>
/*Change text in autofill textbox*/
/* Change the white to any color */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #E8E5F8 inset !important;
}

input:-webkit-autofill {
    -webkit-text-fill-color: #575F6A !important;
}
</style>