<template>
    <!-- MODAL CONFIRM -->
    <!-- Put this part before </body> tag -->
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <!-- x Corner button -->
            <form method="dialog">
                <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</label>
            </form>
            <!-- Slot -->
            <div class="text-xl font-semibold my-3">
                Asaatidz
            </div>

            <!-- AVATAR -->
            <div class="w-full max-w-xs">
                <div class="w-48 lg:w-52 xl:w-60 aspect-square rounded-2xl overflow-hidden mx-auto">
                    <img v-if="photo_preview" :src="photo_preview" class="min-w-full min-h-full">
                    <div v-else class="bg-neutral/50 w-full h-full">
                    </div>
                </div>
                <input type="file" class="file-input rounded-full file-input-sm w-full my-2" ref="fileInput"
                    accept="image/jpg, image/jpeg, image/png, image/webp, image/gif" @change="handleAvatar">
            </div>

            <!-- NAMA -->
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">Nama Asaatidz</span>
                </div>
                <input v-model="form.name" type="text" placeholder="Nama"
                    class="input md:input-lg rounded-full bg-[#E8E5F8] input-bordered w-full max-w-xs" />
                <div class="label">
                    <span class="label-text-alt text-error" v-if="errors.name">
                        {{ errors.name }}</span>
                </div>
            </label>

            <!-- PROFILE -->
            <label class="form-control w-full max-w-lg">
                <div class="label">
                    <span class="label-text">Profile</span>
                </div>
                <textarea v-model="form.profile" class="bg-[#E8E5F8] textarea rounded-3xl" rows="5"
                    placeholder="Deskripsi"></textarea>
                <div class="label">
                    <span class="label-text-alt text-error" v-if="errors.profile">{{ errors.profile }}</span>
                </div>
            </label>

            <div class="modal-action">
                <label class="btn rounded-full" @click="$emit('close')">Close!</label>
                <label class="btn rounded-full bg-[#EE9A49]" @click="confirmUpdate = true">
                    Simpan
                    <span v-show="isLoading" class="loading loading-bars loading-md"></span>
                </label>
            </div>
        </div>
        <!-- Click Outside -->
        <form method="dialog" class="modal-backdrop">
            <label @click="$emit('close')">close</label>
        </form>
        <Confirmation action-text="Update" :show="confirmUpdate" @close="confirmUpdate = false" @yes="doUpdate">
            Apakah anda yakin?
        </Confirmation>
    </div>

</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';

const props = defineProps<{
    show: boolean
    data: Asaatidz | null
}>();

const emits = defineEmits(['close', 'saved']);

const Astz = useAsaatidzStore();

const isLoading = ref(false);
const show_modal = ref<Boolean>(true);

const photo_preview = ref<string | null>(null)
const form = ref({
    name: '',
    profile: '',
});

watchEffect(() => {
    show_modal.value = props.show;

    if (props.data) {
        if (props.data.avatar_md) {
            photo_preview.value = isURL(props.data.avatar_md) ? props.data.avatar_md : (apiUri + props.data.avatar_md);
        } else {
            photo_preview.value = null;
        }

        form.value.name = props.data.name;
        form.value.profile = props.data.profile;
    } else {
        form.value.name = '';
        form.value.profile = '';
        photo_preview.value = null;
    }
});

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
        photo_preview.value = '';

        const reader = new FileReader();
        reader.onload = () => {
            photo_preview.value = reader.result as string;
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

        if (avatar) {
            formData.append('avatar', avatar);
        }

        // validate
        const data = Validate(isAsaatidz, form.value);

        // append
        formData.append('name', data.name);
        formData.append('profile', data.profile);

        if (props.data) {
            await Astz.update(props.data.id, formData);
        } else {
            await Astz.create(formData);
        }

        confirmUpdate.value = false;
        emits('saved');

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
