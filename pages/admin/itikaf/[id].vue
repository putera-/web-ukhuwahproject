<template>
    <div v-if="data">
        <ItikafCard :schedule="data" @update="update">
            <div class="flex max-sm:flex-col justify-between gap-4 items-center mt-10">
                <div class="font-medium text-2xl text-nowrap">List Peserta</div>
                <input v-model="search" type="text" placeholder="Cari"
                    class="input input-bordered rounded-full w-full max-w-xs" />
            </div>
            <div class="overflow-x-auto min-h-60 max-lg:hidden">
                <table class="table">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th class="text-center">Ikhwan</th>
                            <th class="text-center">Akhwat</th>
                            <th class="text-center">Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in dataPeserta" class="hover">
                            <td>
                                <div class="w-10 h-10 rounded-full overflow-hidden">
                                    <template v-if="user.user.avatar">
                                        <img v-if="isURL(user.user.avatar_md)" :src="user.user.avatar_md" class="w-10">
                                        <img v-else :src="apiUri + user.user.avatar_md" class="w-10">
                                    </template>
                                    <div v-else
                                        class="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center text-xl">
                                        {{ user.user.name[0] }}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="font-medium text-base text-nowrap">{{ user.user.name }}</div>
                                <a :href="`https://wa.me/${user.user.phone.replaceAll('-', '').replace(' ', '').replace('+', '')}`"
                                    target="_blank" class="flex gap-2 items-center">
                                    <IconsWhatsapp class="w-3" />
                                    <div class="text-nowrap">{{ user.user.phone }}</div>
                                </a>
                                <div v-if="user.vehicle" class="text-xs text-nowrap">
                                    {{ user.vehicle.vehicle_type }} : {{ user.vehicle.vehicle_no }}
                                </div>
                            </td>
                            <td class="text-center">{{ user.man }}</td>
                            <td class="text-center">{{ user.woman }}</td>
                            <td class="text-center">{{ user.man + user.woman }}</td>
                            <td>
                                <div v-if="!user.coupon_taken" class="flex gap-2">
                                    <div class="dropdown dropdown-end">
                                        <div tabindex="0" role="button" class="btn btn-ghost rounded-btn">
                                            <LucideEllipsisVertical :size="16" />
                                        </div>
                                        <ul tabindex="0"
                                            class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-32 mt-4">
                                            <li><button class="btn btn-sm rounded-full">Batal Hadir</button></li>
                                            <!-- <li><a>Item 2</a></li> -->
                                        </ul>
                                    </div>
                                    <button @click="confirmCoupon = true; couponParticipant = user"
                                        class="btn bg-[#EE9A49] rounded-full">Ambil
                                        Kupon</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="lg:hidden mb-20">
                <div v-for="user in dataPeserta" class="card shadow-lg rounded-2xl">
                    <div class="card-body max-sm:p-5">
                        <div class="flex max-sm:flex-col justify-between">
                            <div class="flex gap-4 items-center">
                                <div class="w-8 h-8 rounded-full overflow-hidden">
                                    <template v-if="user.user.avatar">
                                        <img v-if="isURL(user.user.avatar_md)" :src="user.user.avatar_md" class="w-8">
                                        <img v-else :src="apiUri + user.user.avatar_md" class="w-8">
                                    </template>
                                    <div v-else
                                        class="w-8 h-8 rounded-full bg-gray-300 flex justify-center items-center text-lg">
                                        {{ user.user.name[0] }}
                                    </div>
                                </div>
                                <div>
                                    <div class="font-medium text-base text-nowrap">{{ user.user.name }}</div>
                                    <a :href="`https://wa.me/${user.user.phone.replaceAll('-', '').replace(' ', '').replace('+', '')}`"
                                        target="_blank" class="flex gap-2 items-center">
                                        <IconsWhatsapp class="w-3" />
                                        <div class="text-nowrap">{{ user.user.phone }}</div>
                                    </a>
                                    <div v-if="user.vehicle" class="text-xs text-nowrap">
                                        {{ user.vehicle.vehicle_type }} : {{ user.vehicle.vehicle_no }}
                                    </div>
                                </div>
                            </div>
                            <div v-if="!user.coupon_taken" class="max-sm:hidden flex items-center justify-center mt-3">
                                <button @click="confirmCoupon = true; couponParticipant = user"
                                    class=" btn btn-sm bg-[#EE9A49] rounded-full">Ambil Kupon</button>
                                <div class="dropdown dropdown-end">
                                    <div tabindex="0" role="button" class="btn btn-sm btn-ghost rounded-btn">
                                        <LucideEllipsisVertical :size="16" />
                                    </div>
                                    <ul tabindex="0"
                                        class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-32 mt-4">
                                        <li><button class="btn btn-sm rounded-full">Batal Hadir</button></li>
                                        <!-- <li><a>Item 2</a></li> -->
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">Anggota</div>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div class="btn btn-sm font-normal rounded-xl">
                                <IconsIkhwan class="w-4" />{{ user.man }}
                            </div>
                            <div class="btn btn-sm font-normal rounded-xl">
                                <IconsAkhwat class="w-4" />{{ user.woman }}
                            </div>
                            <div class="max-sm:col-span-2 btn btn-sm rounded-xl flex flex-nowrap">
                                <IconsIkhwan class="w-4" />+
                                <IconsAkhwat class="w-4" /><span class="font-semibold text-lg">{{ user.man + user.woman
                                    }}</span>
                            </div>
                        </div>
                        <div v-if="!user.coupon_taken" class="sm:hidden flex items-center justify-center mt-3">
                            <button @click="confirmCoupon = true; couponParticipant = user"
                                class=" btn btn-sm bg-[#EE9A49] rounded-full">Ambil Kupon</button>
                            <div class="dropdown dropdown-end">
                                <div tabindex="0" role="button" class="btn btn-sm btn-ghost rounded-btn">
                                    <LucideEllipsisVertical :size="16" />
                                </div>
                                <ul tabindex="0"
                                    class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-32 mt-4">
                                    <li><button class="btn btn-sm rounded-full">Batal Hadir</button></li>
                                    <!-- <li><a>Item 2</a></li> -->
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </ItikafCard>
    </div>

    <LazyAdminItikafScheduleForm :show="showShceduleForm" :data="dataUpdate" @close="showShceduleForm = false"
        @saved="showShceduleForm = false; getData();" />

    <Confirmation action-text="Ya, Serahkan Kupon" :show="confirmCoupon" @close="confirmCoupon = false"
        @yes="setCouponTaken">
        <div v-if="couponParticipant" class="text-xl">Kupon untuk <span class="font-semibold">{{
        couponParticipant.user.name
                }}</span>
        </div>

        <div class="mt-4">Apakah anda yakin?</div>
    </Confirmation>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: [
        'admin'
    ]
});

const route = useRoute();
const id = route.params.id;
const Itikaf = useItikafStore();

const data = ref<ItikafSchedule | null>(null);

const getData = async () => {
    data.value = await Itikaf.getScheduleById(id);
}

getData();


const showShceduleForm = ref(false);
const dataUpdate = ref<ItikafSchedule | null>(null)
const update = (schedule: ItikafSchedule) => {
    dataUpdate.value = schedule;
    showShceduleForm.value = true;
};

const confirmCoupon = ref<boolean>(false);
const couponParticipant = ref<ItikafParticipant | null>(null);
const setCouponTaken = async () => {
    if (couponParticipant.value) {
        await Itikaf.setCouponTaken(couponParticipant.value.id);
        confirmCoupon.value = false;
        getData();
    }
};

const search = ref('');

const dataPeserta = computed((): ItikafParticipant[] => {
    const filter = search.value.toLowerCase().trim();

    if (filter == '') {
        return data.value.participants;
    } else {
        return data.value.participants.filter((user: ItikafParticipant) => {
            return user.user.name.toLowerCase().includes(filter);
        })
    }
});
</script>