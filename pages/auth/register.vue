<template>
    <div class="h-full flex flex-col justify-center px-6 lg:px-10">
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
                    <label class="input input-lg border-0 rounded-full bg-[#E8E5F8] flex items-center gap-2">
                        <input type="text" class="grow" placeholder="Name" />
                    </label>
                    <!-- email -->
                    <label class="input input-lg border-0 rounded-full bg-[#E8E5F8] flex items-center gap-2">
                        <input type="text" class="grow" placeholder="Email" autocomplete="email" />
                    </label>
                    <!-- phone -->
                    <label class="input input-lg border-0 flex items-center gap-2 rounded-full w-full bg-[#E8E5F8]">
                        <div>+62</div>
                        <input type="text'" class="grow bg-[#E8E5F8]" placeholder="xxxx xxxx xxxx" autocomplete="tel" />
                    </label>
                    <!-- password -->
                    <label class="input input-lg border-0 flex items-center gap-2 rounded-full w-full bg-[#E8E5F8]">
                        <input :type="showPassword ? 'text' : 'password'" class="grow bg-[#E8E5F8]"
                            placeholder="Password" autocomplete="new-password" />
                        <div @click="showPassword = !showPassword" class="cursor-pointer">
                            <IconsEye class="w-4" v-if="!showPassword" />
                            <IconsEyeSlash class="w-4" v-else />
                        </div>
                    </label>

                    <!-- login button -->
                    <div class="w-full">
                        <button @click="showActivationModal = true"
                            class="btn btn-lg rounded-full w-40 flex justify-between pull-left bg-gradient-to-r from-[#00AB4E] to-[#128145] text-white border-0">
                            Register
                            <IconsPencilDot class="w-4" />
                        </button>
                    </div>
                </div>

                <div class="divider">
                    <NuxtLink to="/auth/login">Login</NuxtLink>
                </div>
            </div>
        </div>


        <!-- Open the modal using ID.showModal() method -->
        <input type="checkbox" :checked="showActivationModal" class="modal-toggle" />
        <div class="modal" role="dialog">
            <div class="modal-box flex flex-col items-center w-96 aspect-square text-[#004E44]">
                <div class="bg-[#059E4B] rounded-full p-6 my-5">
                    <IconsCheck class="w-10 stroke-white" />
                </div>
                <h3 class="font-medium text-3xl">Good job!</h3>
                <p class="py-4">Please check your email and<br />click link activation account</p>
                <div class="modal-action">
                    <div class="w-full flex justify-between items-center">
                        <NuxtLink to="/auth/login"
                            class="btn btn-lg rounded-full w-52 flex justify-between pull-left bg-gradient-to-r from-[#00AB4E] to-[#128145] text-white border-0">
                            Login
                            <IconsEnter class="w-4" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'auth'
});

const showPassword = ref(false)
const showActivationModal = ref(false);
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