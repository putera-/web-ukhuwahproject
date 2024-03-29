<template>
    <div>
        <div class="mt-2 text-xl font-semibold">Buat Jadwal I'tikaf {{ Itikaf.year }}</div>
        <div class="w-full">
            <div class="h-48 lg:h-52 xl:h-60 max-w-full aspect-video rounded-2xl overflow-hidden">
                <img v-if="form.photo" :src="form.photo" class="min-w-full min-h-full">
                <div v-else class="bg-neutral/50 w-full h-full">
                </div>
            </div>
            <input type="file" class="file-input rounded-full file-input-sm w-full max-w-xs my-2" ref="fileInput"
                accept="image/jpg, image/jpeg, image/png, image/webp, image/gif" @change="handlePhoto">
        </div>

        <div class="grid grid-cols-2 gap-2 w-full max-w-xs">
            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Tahun</span>
                </div>
                <input :value="new Date().getFullYear()" disabled type="text"
                    class="input input-lg rounded-full bg-[#E8E5F8] input-bordered w-full" />
            </label>
            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Tahun Hijriah</span>
                </div>
                <input :value="Itikaf.year" disabled type="text"
                    class="input input-lg rounded-full bg-[#E8E5F8] input-bordered w-full" />
            </label>
        </div>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Kontak Person</span>
            </div>
            <input v-model="form.contact_person_name" type="text" placeholder="Kontak Person"
                class="input input-lg rounded-full bg-[#E8E5F8] input-bordered w-full max-w-xs" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.contact_person_name">{{ errors.contact_person_name
                    }}</span>
            </div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Nomor Person Telepon</span>
            </div>
            <input v-model="form.contact_person_phone" type="text" v-maska data-maska="+62 ###-####-#####"
                placeholder="No Telepon"
                class="input input-lg rounded-full bg-[#E8E5F8] input-bordered w-full max-w-xs" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.contact_person_phone">{{
            errors.contact_person_phone
        }}</span>
            </div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Deskripsi</span>
            </div>
            <textarea v-model="form.description" class="bg-[#E8E5F8] textarea rounded-3xl" rows="5"
                placeholder="Deskripsi"></textarea>
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.description">{{ errors.description }}</span>
            </div>
        </label>

        <div class="flex gap-2 items-center">
            <button @click="confirmUpdate = true" class="btn btn-neutral float-right rounded-full">Simpan</button>
            <div class="text-error font-sm" v-if="responseError">{{ responseError }}</div>
        </div>


        <Confirmation action-text="Update" :show="confirmUpdate" @close="confirmUpdate = false" @yes="doUpdate">
            Apakah anda yakin?
        </Confirmation>
    </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
const Itikaf = useItikafStore();


const form = ref({
    photo: undefined,
    contact_person_name: '',
    contact_person_phone: '',
    description: ''
});


const confirmUpdate = ref<Boolean>(false);
const errors = ref<Record<string, string>>({});
const responseError = ref<string>('');

const fileInput = ref<HTMLInputElement | null>(null);
let photo: File | null;

const handlePhoto = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (!files!.length) {
        photo = null;
    } else {
        photo = files![0];

        // reset image preview
        form.value.photo = '';

        const reader = new FileReader();
        reader.onload = () => {
            form.value.photo = reader.result as string;
        };
        reader.readAsDataURL(photo);
    }
}

const doUpdate = async () => {
    const formData: FormData = new FormData();
    responseError.value = '';
    errors.value = {};

    try {
        if (photo) {
            formData.append('photo', photo);
        }
        delete form.value.photo;

        // validate
        const data = Validate(isItikaf, form.value);

        // add to FormData
        if (data.contact_person_name) formData.append('contact_person_name', data.contact_person_name);
        if (data.contact_person_phone) formData.append('contact_person_phone', data.contact_person_phone);
        formData.append('description', data.description);

        await Itikaf.create(formData);

        confirmUpdate.value = false;

        // reset file input avatar
        if (fileInput.value) {
            fileInput.value.value = '';
            photo = null;
        }

        toast.success("Success", {
            autoClose: 3000
        });
    } catch (error: any) {
        if (error instanceof JoiError) {
            errors.value = error.data
        } else {
            responseError.value = error.message;
        }

        confirmUpdate.value = false;
    }
}

</script>