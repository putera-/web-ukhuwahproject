<template>
    <div v-if="Auth.user" class="max-lg:flex max-lg:flex-col-reverse lg:grid lg:grid-cols-2 gap-6 xl:gap-16">
        <div>
            <div class="w-full max-w-xs">
                <div class="w-48 lg:w-52 xl:w-60 aspect-square rounded-2xl overflow-hidden mx-auto">
                    <img v-if="avatar_preview" :src="avatar_preview" class="min-w-full min-h-full">
                    <div v-else class="bg-neutral/50 w-full h-full">
                    </div>
                </div>
                <input type="file" class="file-input rounded-full file-input-sm w-full my-2" ref="fileInput"
                    accept="image/jpg, image/jpeg, image/png, image/webp, image/gif" @change="handleAvatar">
            </div>

            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">Nama</span>
                </div>
                <input v-model="form.name" type="text" placeholder="Nama"
                    class="input md:input-lg border-0 input-bordered w-full max-w-xs rounded-full bg-[#E8E5F8]" />
                <div class="label">
                    <span class="label-text-alt text-error" v-if="errors.name">{{ errors.name }}</span>
                </div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">No Telpon</span>
                </div>
                <input v-model="form.phone" type="text" placeholder="No Telpon" v-maska data-maska="+62 ###-####-#####"
                    class="input md:input-lg border-0 input-bordered w-full max-w-xs rounded-full bg-[#E8E5F8]" />
                <div class="label">
                    <span class="label-text-alt text-error" v-if="errors.phone">{{ errors.phone }}</span>
                </div>
            </label>
        </div>
    </div>
    <div class="border-b border-b-neutral/10 my-4"></div>

    <div class="flex gap-2 items-center">
        <button @click="confirmUpdate = true" class="btn btn-neutral float-right rounded-full">Ubah</button>
        <div class="text-error font-sm" v-if="responseError">{{ responseError }}</div>
    </div>


    <Confirmation action-text="Update" :show="confirmUpdate" @close="confirmUpdate = false" @yes="doUpdate">
        Are you sure to update
        <span class="font-bold text-lg">Profile?</span>
    </Confirmation>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';

const { public: { apiUri } } = useRuntimeConfig();
const Auth = useAuthStore();

const form = ref({
    name: Auth.user!.name,
    phone: Auth.user!.phone,
});

const avatar_preview = ref(Auth.user!.avatar ? apiUri + Auth.user!.avatar_md : undefined)

const fileInput = ref<HTMLInputElement | null>(null);
let avatar: File | null;

const handleAvatar = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (!files!.length) {
        avatar = null;
    } else {
        avatar = files![0];

        // reset image preview
        avatar_preview.value = '';

        const reader = new FileReader();
        reader.onload = () => {
            avatar_preview.value = reader.result as string;
        };
        reader.readAsDataURL(avatar);
    }
}

const confirmUpdate = ref<Boolean>(false);
const errors = ref<Record<string, string>>({});
const responseError = ref<string>('');

const doUpdate = async () => {
    const formData: FormData = new FormData();
    responseError.value = '';
    errors.value = {};

    try {
        const { name, phone } = Validate(changeProfile, form.value);
        formData.append('name', name)
        formData.append('phone', phone)

        if (avatar) {
            // format dob because FormData only accept string
            formData.append('avatar', avatar);
        }

        await Auth.updateUser(formData);

        confirmUpdate.value = false;

        // reset file input avatar
        if (fileInput.value) {
            fileInput.value.value = '';
            avatar = null;
        }

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