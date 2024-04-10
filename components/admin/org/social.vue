<template>
    <div>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Youtube</span>
            </div>
            <input v-model="form.youtube" type="text" placeholder="Youtube"
                class="input md:input-lg border-0 input-bordered w-full max-w-xs rounded-full bg-[#E8E5F8]" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.youtube">{{ errors.youtube }}</span>
            </div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Instagram</span>
            </div>
            <input v-model="form.instagram" type="text" placeholder="Instagram"
                class="input md:input-lg border-0 input-bordered w-full max-w-xs rounded-full bg-[#E8E5F8]" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.instagram">{{ errors.instagram }}</span>
            </div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Facebook</span>
            </div>
            <input v-model="form.facebook" type="text" placeholder="Facebook"
                class="input md:input-lg border-0 input-bordered w-full max-w-xs rounded-full bg-[#E8E5F8]" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.facebook">{{ errors.facebook }}</span>
            </div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Twitter</span>
            </div>
            <input v-model="form.twitter" type="text" placeholder="Twitter"
                class="input md:input-lg border-0 input-bordered w-full max-w-xs rounded-full bg-[#E8E5F8]" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.twitter">{{ errors.twitter }}</span>
            </div>
        </label>

        <div class="border-b border-b-neutral/10 my-4"></div>

        <div class="flex gap-2 items-center">
            <button @click="confirmUpdate = true" class="btn btn-neutral float-right rounded-full">Update</button>
            <div class="text-error font-sm" v-if="responseError">{{ responseError }}</div>
        </div>


        <Confirmation action-text="Update" :show="confirmUpdate" @close="confirmUpdate = false" @yes="doUpdate">
            Are you sure to update?
        </Confirmation>
    </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
const Client = useClientStore();

const form = ref({
    youtube: Client.client ? Client.client.youtube : '',
    instagram: Client.client ? Client.client.instagram : '',
    facebook: Client.client ? Client.client.facebook : '',
    twitter: Client.client ? Client.client.twitter : ''
});

const confirmUpdate = ref<Boolean>(false);
const errors = ref<Record<string, string>>({});
const responseError = ref<string>('');

const doUpdate = async () => {
    responseError.value = '';
    errors.value = {};

    try {
        const data = Validate(isClientSocialMedia, form.value)

        await Client.update(data);

        confirmUpdate.value = false;

        toast.success("Success", {
            autoClose: 3000
        });
    } catch (error: any) {
        if (error.isJoi) {
            errors.value = error.data
        } else {
            responseError.value = error.message;
        }

        confirmUpdate.value = false;
    }
}
</script>