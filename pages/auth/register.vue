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

                <img src="/uplogo.png" class="md:hidden w-40">

                <div class="text-2xl lg:text-4xl">Register</div>
                <div class="grow w-full flex flex-col justify-center gap-8 md:gap-20">
                    <!-- form login -->
                    <div class="w-full flex flex-col gap-4">
                        <!-- name -->
                        <div>
                            <label class="input input-lg border-0 rounded-full bg-[#E8E5F8] flex items-center gap-2">
                                <input v-model="formData.name" type="text" class="grow" placeholder="Nama" />
                            </label>
                            <div class="text-xs text-error my-1" v-if="errors.name">{{ errors.name }}</div>
                        </div>
                        <!-- email -->
                        <div>

                            <label class="input input-lg border-0 rounded-full bg-[#E8E5F8] flex items-center gap-2">
                                <input v-model="formData.email" type="text" class="grow" placeholder="Email"
                                    autocomplete="email" />
                            </label>
                            <div class="text-xs text-error my-1" v-if="errors.email">{{ errors.email }}</div>
                        </div>
                        <!-- phone -->
                        <div>
                            <input v-model="formData.phone"
                                class="input input-lg input-bordered border-0 rounded-full w-full bg-[#E8E5F8]" v-maska
                                data-maska="+62 ###-####-#####" placeholder="Nomor Telepon" />
                            <div class="text-xs text-error my-1" v-if="errors.phone">{{ errors.phone }}</div>
                        </div>
                        <!-- password -->
                        <div>
                            <label
                                class="input input-lg border-0 flex items-center gap-2 rounded-full w-full bg-[#E8E5F8]">
                                <input v-model="formData.password" :type="showPassword ? 'text' : 'password'"
                                    class="grow bg-[#E8E5F8]" placeholder="Password" autocomplete="new-password" />
                                <div @click="showPassword = !showPassword" class="cursor-pointer">
                                    <IconsEye class="w-4" v-if="!showPassword" />
                                    <IconsEyeSlash class="w-4" v-else />
                                </div>
                            </label>
                            <div class="text-xs text-error my-1" v-if="errors.password">{{ errors.password }}</div>
                        </div>
                        <!-- confirm password -->
                        <div>
                            <label
                                class="input input-lg border-0 flex items-center gap-2 rounded-full w-full bg-[#E8E5F8]">
                                <input v-model="formData.confirm_password"
                                    :type="showConfirmPassword ? 'text' : 'password'" class="grow bg-[#E8E5F8]"
                                    placeholder="Ulangi Password" autocomplete="new-password" />
                                <div @click="showConfirmPassword = !showConfirmPassword" class="cursor-pointer">
                                    <IconsEye class="w-4" v-if="!showConfirmPassword" />
                                    <IconsEyeSlash class="w-4" v-else />
                                </div>
                            </label>
                            <div class="text-xs text-error my-1" v-if="errors.confirm_password">{{
                                    errors.confirm_password
                                }}</div>
                        </div>

                        <!-- login button -->
                        <div class="w-full">
                            <button @click="handleRegister"
                                class="btn btn-lg rounded-full w-40 flex justify-between pull-left bg-[#EE9A49] text-white border-0">
                                Register
                                <IconsPencilDot class="w-4" />
                            </button>
                            <div class="text-error ml-4">{{ fetchError }}</div>
                        </div>
                    </div>

                    <div class="divider">
                        <NuxtLink to="/auth/login">Login</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'auth',
    middleware: 'auth'
});

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const isLoading = ref(false);
const errors = ref({});
const fetchError = ref('')

const formData = ref({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
})

const AuthStore = useAuthStore();
const handleRegister = async () => {
    if (isLoading.value) return;

    isLoading.value = true;
    errors.value = {};
    fetchError.value = '';
    try {
        await AuthStore.register(formData.value);
    } catch (error: any) {
        if (error instanceof JoiError) {
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