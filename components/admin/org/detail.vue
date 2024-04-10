<template>
    <div>
        <div class="w-full max-w-xs">
            <div class="w-48 lg:w-52 xl:w-60 aspect-square rounded-2xl overflow-hidden mx-auto">
                <img v-if="logo_preview" :src="logo_preview" class="min-w-full min-h-full">
                <div v-else class="bg-neutral/50 w-full h-full">
                </div>
            </div>
            <input type="file" class="file-input rounded-full file-input-sm w-full my-2" ref="fileInput"
                accept="image/jpg, image/jpeg, image/png, image/webp, image/gif" @change="handleLogo">
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
                <span class="label-text">Singkatan</span>
            </div>
            <input v-model="form.nick" type="text" placeholder="Singkatan"
                class="input md:input-lg border-0 input-bordered w-full max-w-xs rounded-full bg-[#E8E5F8]" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.nick">{{ errors.nick }}</span>
            </div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Slogan</span>
            </div>
            <input v-model="form.slogan" type="text" placeholder="Slogan"
                class="input md:input-lg border-0 input-bordered w-full max-w-xs rounded-full bg-[#E8E5F8]" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.slogan">{{ errors.slogan }}</span>
            </div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Phone</span>
            </div>
            <input v-model="form.phone" type="text" placeholder="No Telpon" v-maska data-maska="+62 ###-####-#####"
                class="input md:input-lg border-0 input-bordered w-full max-w-xs rounded-full bg-[#E8E5F8]" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.phone">{{ errors.phone }}</span>
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

const { public: { apiUri } } = useRuntimeConfig();
const Client = useClientStore();

const form = ref({
    name: Client.client ? Client.client.name : '',
    slogan: Client.client ? Client.client.slogan : '',
    nick: Client.client ? Client.client.nick : '',
    phone: Client.client ? Client.client.phone : ''
    // youtube: Client.client ? Client.client.youtube : '',
    // instagram: Client.client ? Client.client.instagram : '',
    // facebook: Client.client ? Client.client.facebook : '',
    // twitter: Client.client ? Client.client.twitter : '',
});

const logo_preview = ref(Client.client!.logo ? apiUri + Client.client!.logo_sm : undefined)

const fileInput = ref<HTMLInputElement | null>(null);
let logo: File | null;

const handleLogo = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (!files!.length) {
        logo = null;
    } else {
        logo = files![0];

        // reset image preview
        logo_preview.value = '';

        const reader = new FileReader();
        reader.onload = () => {
            logo_preview.value = reader.result as string;
        };
        reader.readAsDataURL(logo);
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
        const data = Validate(isUpdateclient, form.value)

        for (const [key, value] of Object.entries(form.value)) {
            if (value) {
                formData.append(key, value);
            } else {
                formData.append(key, '');
            }
        }

        if (logo) {
            formData.append('logo', logo);
        }

        await Client.update(formData);

        confirmUpdate.value = false;

        // reset file input logo
        if (fileInput.value) {
            fileInput.value.value = '';
            logo = null;
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