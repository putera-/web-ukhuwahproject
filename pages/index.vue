<template>
    <div>
        <div id="main" class="w-screen h-screen">
            <div class="w-full h-full bg-gradient-to-r from-[#FEF5ED] to-[#F8D7B6]">
                <div class="max-w-7xl h-full mx-auto relative">
                    <div
                        class="absolute w-full h-full flex justify-center items-center z-[9] text-center text-4xl md:text-6xl lg:text-8xl xl:text-9xl">
                        <div class="mb-60">RAMADHAN 1455 H</div>
                    </div>

                    <div class="w-full h-full flex justify-center items-end">
                        <img src="/Mosque1.png" alt="" class="absolute w-[60%] mb-20 z-10">

                        <!-- CARD WAKTU SHALAT -->
                        <WaktuShalat />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="max-w-7xl w-full mx-auto md:pt-40">

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
#main {
    background: url(Pattern.png);
    background-size: 800px;
}
</style>