<template>
    <div
        class="bg-gradient-to-l from-[#F2F3F6] to-[#C0C0C0] w-screen h-full min-h-screen py-6 md:p-8 font-poppins grid grid-cols-12 text-[#575F6A]">
        <div
            class="max-md:hidden md:col-span-6 lg:col-span-7 h-full bg-gradient-to-bl from-[#FEF5ED] to-[#F8D7B6] rounded-2xl">
            <div class="flex flex-col h-full w-full relative">
                <!-- <div class="flex-none my-10">
                        <div class="flex flex-col items-center">
                            <div class="font-semibold text-3xl">UKHUWAH PROJECT</div>

                            <div class="text-center text-sm md:text-md">Bersama Dijalan Dakwah</div>
                        </div>
                    </div> -->
                <div class="grow flex flex-col gap-10 justify-center items-center">
                    <div>
                        <div class="font-semibold text-3xl">UKHUWAH PROJECT</div>
                        <div class="text-center text-sm md:text-md">Bersama Dijalan Dakwah</div>
                    </div>
                    <img src="/uplogo.png" class="w-40">
                </div>
            </div>
        </div>
        <div class="col-span-12 md:col-span-6 lg:col-span-5 h-full">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>