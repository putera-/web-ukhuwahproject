<template>
    <div class="flex flex-col gap-4">
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Old Confirm</span>
            </div>
            <input v-model="formData.old_password" type="password" placeholder="Password"
                class="input input-lg rounded-full bg-[#E8E5F8] input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm pr-2" v-if="errors.old_password">{{ errors.old_password }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Password</span>
            </div>
            <input v-model="formData.password" type="password" placeholder="Password"
                class="input input-lg rounded-full bg-[#E8E5F8] input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm pr-2" v-if="errors.password">{{ errors.password }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Password Confirm</span>
            </div>
            <input v-model="formData.confirm_password" type="password" placeholder="Confirm Password"
                class="input input-lg rounded-full bg-[#E8E5F8] input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm pr-2" v-if="errors.confirm_password">{{
                errors.confirm_password }}
            </div>
        </label>
    </div>

    <div class="flex gap-2 items-center">
        <label class="btn btn-neutral rounded-full my-5" @click="confirmUpdate = true">Update</label>
        <div class="text-error font-sm" v-if="responseError">{{ responseError }}</div>
    </div>

    <!-- CREATE CONFIRMATION -->
    <Confirmation action-text="Update Password" :show="confirmUpdate" @close="confirmUpdate = false"
        @yes="handleUpdate">
        Are you sure?
    </Confirmation>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';

const errors = ref<Record<string, string>>({});
const responseError = ref<string>('');
const Auth = useAuthStore();
const confirmUpdate = ref<boolean>(false);

const formData = ref({
    old_password: '',
    password: '',
    confirm_password: ''
});

const handleUpdate = async () => {
    errors.value = {};
    responseError.value = '';
    try {
        await Auth.changePassword(formData.value);
        confirmUpdate.value = false;
        toast.success('Success', {
            autoClose: 500
        });
    } catch (error: any) {
        confirmUpdate.value = false;
        if (error.isJoi) {
            errors.value = error.data;
        } else {
            responseError.value = error.message;
        }
    }
}
</script>
