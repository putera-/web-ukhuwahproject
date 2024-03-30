<template>
    <div>
        <div class="mt-2 text-xl font-semibold">I'tikaf {{ Itikaf.year }}</div>
        <div class="w-full">
            <div class="h-48 lg:h-52 xl:h-60 max-w-full aspect-video rounded-2xl overflow-hidden">
                <img v-if="photo_preview" :src="photo_preview" class="min-w-full min-h-full">
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
                    class="input md:input-lg rounded-full bg-[#E8E5F8] input-bordered w-full" />
            </label>
            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Tahun Hijriah</span>
                </div>
                <input :value="Itikaf.year" disabled type="text"
                    class="input md:input-lg rounded-full bg-[#E8E5F8] input-bordered w-full" />
            </label>
        </div>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Nama Masjid</span>
            </div>
            <input v-model="form.masjid" type="text" placeholder="Nama Masjid"
                class="input md:input-lg rounded-full bg-[#E8E5F8] input-bordered w-full max-w-xs" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.masjid">{{ errors.masjid
                    }}</span>
            </div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Lokasi Masjid</span>
            </div>
            <input v-model="form.address" type="text" placeholder="Lokasi Masjid"
                class="input md:input-lg rounded-full bg-[#E8E5F8] input-bordered w-full max-w-xs" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.address">{{ errors.address
                    }}</span>
            </div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Kontak Person</span>
            </div>
            <input v-model="form.contact_person_name" type="text" placeholder="Kontak Person"
                class="input md:input-lg rounded-full bg-[#E8E5F8] input-bordered w-full max-w-xs" />
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
                class="input md:input-lg rounded-full bg-[#E8E5F8] input-bordered w-full max-w-xs" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.contact_person_phone">{{
            errors.contact_person_phone
        }}</span>
            </div>
        </label>
        <label class="form-control w-full max-w-lg">
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
            <NuxtLink to="/admin/itikaf" class="btn btn-neutral rounded-full"
                v-if="route.path.includes('/admin/itikaf/update')">Batal
            </NuxtLink>
            <button @click="confirmUpdate = true" class="btn bg-[#EE9A49] float-right rounded-full">Simpan</button>
            <div class="text-error font-sm" v-if="responseError">{{ responseError }}</div>
        </div>


        <Confirmation action-text="Update" :show="confirmUpdate" @close="confirmUpdate = false" @yes="doUpdate">
            Apakah anda yakin?
        </Confirmation>
    </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
const route = useRoute();
const Itikaf = useItikafStore();

const emits = defineEmits(['saved', 'cancel']);

const photo_preview = ref(Itikaf.itikaf ? apiUri + Itikaf.itikaf.photo : undefined)

const form = ref({
    masjid: '',
    address: '',
    contact_person_name: '',
    contact_person_phone: '',
    description: ''
});
onBeforeMount(async () => {
    await Itikaf.get();

    if (Itikaf.itikaf) {
        form.value = {
            masjid: Itikaf.itikaf.masjid,
            address: Itikaf.itikaf.address,
            contact_person_name: Itikaf.itikaf.contact_person_name,
            contact_person_phone: Itikaf.itikaf.contact_person_phone,
            description: Itikaf.itikaf.description
        }
    }
})

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
        photo_preview.value = '';

        const reader = new FileReader();
        reader.onload = () => {
            photo_preview.value = reader.result as string;
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
        // validate
        const data = Validate(isItikaf, form.value);

        // add to FormData
        if (data.masjid) formData.append('masjid', data.masjid);
        if (data.address) formData.append('address', data.address);
        if (data.contact_person_name) formData.append('contact_person_name', data.contact_person_name);
        if (data.contact_person_phone) formData.append('contact_person_phone', data.contact_person_phone);
        formData.append('description', data.description);

        if (Itikaf.itikaf) {
            await Itikaf.update(formData);
        } else {
            await Itikaf.create(formData);
        }

        emits('saved')
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