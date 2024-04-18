<template>
    <div class="text-3xl font-semibold my-3 max-sm:text-center">User</div>
    <div class="card bg-base-100 rounded-2xl shadow-xl">
        <div class="card-body max-sm:p-5">
            <input v-model="search" type="text" placeholder="Cari"
                class="input input-bordered rounded-full w-full max-w-xs" />
            <div class="overflow-x-auto overflow-y-hidden max-md:hidden">
                <table class="table">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th class="text-base font-medium" colspan="2">Name</th>
                            <th class="text-center text-base font-medium">Role</th>
                            <th class="text-center text-base font-medium">Active</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <template v-for="user in data">
                            <tr class="hover">
                                <th>
                                    <template v-if="user.avatar_md">
                                        <img v-if="isURL(user.avatar_md)" :src="user.avatar_md" alt=""
                                            class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10">
                                        <img v-else :src="apiUri + user.avatar_md" alt=""
                                            class="flex-none rounded-full w-8 md:w-10 h-8 md:h-10">
                                    </template>
                                    <div v-else
                                        class="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center text-xl font-normal">
                                        {{ user.name[0] }}
                                    </div>
                                </th>
                                <td>
                                    <div>{{ user.name }}</div>
                                    <a :href="`https://wa.me/${user.phone.replaceAll('-', '').replace(' ', '').replace('+', '')}`"
                                        target="_blank" class="flex gap-2 items-center">
                                        <IconsWhatsapp class="w-3" />
                                        <div class="text-nowrap">{{ user.phone }}</div>
                                    </a>
                                </td>
                                <td class="text-center">{{ user.role }}</td>
                                <td class="text-center">
                                    <input type="checkbox" class="toggle toggle-warning rounded-full"
                                        :checked="user.active" :disabled="Auth.user!.id == user.id"
                                        @change="(e: any) => switchActive(user.id, e.target.checked)" />
                                </td>
                                <td>
                                    <div class="dropdown dropdown-end">
                                        <div tabindex="0" role="button" class="">
                                            <LucideEllipsisVertical :size="16" />
                                        </div>
                                        <ul tabindex="0"
                                            class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                                            <li><button class="btn btn-xs rounded-full"
                                                    @click="userUpdate = user; selectRole = user.role; showUpdateRole = true;">
                                                    Ubah Role
                                                </button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <div class="md:hidden mb-20 flex flex-col gap-3 md:gap-5">
                <div v-for="user in data" class="card shadow-lg bg-slate-200 rounded-2xl">
                    <div class="card-body max-sm:p-5">
                        <div class="flex justify-between items-center">
                            <div class="badge badge-warning">{{ user.role }}</div>
                            <div class="dropdown dropdown-end">
                                <div tabindex="0" role="button" class="">
                                    <LucideEllipsisVertical :size="16" />
                                </div>
                                <ul tabindex="0"
                                    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                                    <li><button class="btn btn-xs rounded-full"
                                            @click="userUpdate = user; selectRole = user.role; showUpdateRole = true;">
                                            Ubah Role
                                        </button></li>
                                </ul>
                            </div>
                        </div>
                        <div class="flex gap-4 items-center">
                            <div class="w-8 h-8 rounded-full overflow-hidden">
                                <template v-if="user.avatar_md">
                                    <img v-if="isURL(user.avatar_md)" :src="user.avatar_md" class="w-8">
                                    <img v-else :src="apiUri + user.avatar_md" class="w-8">
                                </template>
                                <div v-else
                                    class="w-8 h-8 rounded-full bg-gray-300 flex justify-center items-center text-lg">
                                    {{ user.name[0] }}
                                </div>
                            </div>
                            <div>
                                <div class="font-medium text-base text-nowrap">{{ user.name }}</div>
                                <a :href="`https://wa.me/${user.phone.replaceAll('-', '').replace(' ', '').replace('+', '')}`"
                                    target="_blank" class="flex gap-2 items-center">
                                    <IconsWhatsapp class="w-3" />
                                    <div class="text-nowrap text-sm">{{ user.phone }}</div>
                                </a>
                            </div>
                        </div>
                        <div class="divider my-1"></div>
                        <label class="flex items-center max-sm:justify-center gap-4 cursor-pointer">
                            <span class="label-text">Not Active</span>
                            <input type="checkbox" class="toggle toggle-warning rounded-full" :checked="user.active"
                                :disabled="Auth.user!.id == user.id"
                                @change="(e: any) => switchActive(user.id, e.target.checked)" />
                            <span class="label-text">Active</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <LazyConfirmation v-if="userUpdate" action-text="Update Role" :show="showUpdateRole" @close="showUpdateRole = false"
        @yes="setRole">
        <div>Ubah role untuk <span class="font-semibold">{{ userUpdate.name }}</span></div>

        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Pilih role</span>
            </div>
            <select v-model="selectRole" class="select select-bordered rounded-full">
                <option value="ADMIN">Admin</option>
                <option value="STAFF">Staff</option>
                <option value="MEMBER">Member</option>
            </select>
        </label>
    </LazyConfirmation>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: [
        'admin',
        () => {
            // Only SUPERADMIN / ADMIN CAN ACCESS
            const Auth = useAuthStore();
            if (!Auth.user) return navigateTo('/admin');
            if (!(Auth.user.role == 'SUPERUSER' || Auth.user.role == 'ADMIN')) return navigateTo('/admin');
        }
    ]
});

const { public: { apiUri } } = useRuntimeConfig();
const Auth = useAuthStore();
const UserStore = useUserStore();
UserStore.get();

const search = ref<string>('');

const data = computed(() => {
    const filter = search.value.toLowerCase().trim();

    if (filter == '') return UserStore.users;

    return UserStore.users.filter(u => u.name.toLowerCase().includes(filter))
});

const switchActive = (id: string, checked: boolean) => {
    if (Auth.user!.id == id) return;

    if (checked) {
        UserStore.activate(id)
    } else {
        UserStore.deactivate(id)
    }
}

const userUpdate = ref<User | undefined>(undefined);
const showUpdateRole = ref<boolean>(false);
const selectRole = ref<string>('ADMIN');

const setRole = async (): Promise<void> => {
    if (!userUpdate.value) return;
    const currentRole = userUpdate.value.role;
    if (currentRole == selectRole.value) return;

    await UserStore.setRole(userUpdate.value.id, selectRole.value);

    userUpdate.value.role = selectRole.value as 'SUPERUSER' | 'ADMIN' | 'STAFF' | 'MEMBER';

    showUpdateRole.value = false
}
</script>