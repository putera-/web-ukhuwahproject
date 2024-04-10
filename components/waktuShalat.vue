<template>
    <div class="card w-screen max-xl:pb-10 px-4 md:px-20 lg:translate-y-1/2 z-30">
        <div class="card-body shadow-xl rounded-3xl bg-white max-md:p-5">
            <div class="grid grid-cols-10 md:gap-2">
                <div class="col-span-10 lg:col-span-4 flex max-md:flex-col lg:flex-col max-lg:items-center gap-4">
                    <div class="flex flex-col max-md:text-center">
                        <div class="text-lg md:text-xl lg:text-2xl">Andara, Jakarta Selatan</div>
                        <div class="max-lg:text-sm">{{ dayjs().format('dddd, D MMM YYYY') }}</div>
                    </div>
                    <div class="card bg-[#F8D7B6] max-md:w-full max-lg:grow">
                        <div class="card-body w-full p-2 md:p-4">
                            <div class="flex items-center max-md:justify-center gap-3">
                                <!-- <div
                                                class="bg-rose-400 rounded-full w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20">
                                            </div> -->
                                <img src="/ustadz.jpeg" alt=""
                                    class="rounded-full w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20">
                                <div>
                                    <div class=" font-medium text-sm md:text-medium">Ustadz Rizki Nasution,
                                        Lc MA
                                    </div>
                                    <div class="text-xs md:text-sm text-gray-600">Pembina</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-10 lg:col-span-6 md:px-4 max-md:text-sm">
                    <div class="my-2 lg:my-6">
                        <div class="text-center text-gray-600 font-semibold">Jagakarsa, Jakarta Selatan</div>
                        <div class="text-center text-gray-600 text-sm">
                            {{ dayjs().format('dddd, D MMM YYYY') }}
                        </div>
                    </div>
                    <div class="w-full grid grid-cols-5 md:my-2">
                        <div class="text-center">FAJR</div>
                        <div class="text-center">DZHUHR</div>
                        <div class="text-center">ASHAR</div>
                        <div class="text-center">MAGHRIB</div>
                        <div class="text-center">ISYA</div>
                    </div>
                    <div class="w-full grid grid-cols-5 bg-[#FEF5ED] rounded-xl py-3">
                        <!-- <div class="text-center">{{ dayjs(Shalat.fajr).format('HH:mm') }}</div>
                        <div class="text-center">{{ dayjs(Shalat.dhuhr).format('HH:mm') }}</div>
                        <div class="text-center">{{ dayjs(Shalat.asr).format('HH:mm') }}</div>
                        <div class="text-center">{{ dayjs(Shalat.maghrib).format('HH:mm') }}</div>
                        <div class="text-center">{{ dayjs(Shalat.isha).format('HH:mm') }}</div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id')
const Shalat = useShalatStore();
</script>