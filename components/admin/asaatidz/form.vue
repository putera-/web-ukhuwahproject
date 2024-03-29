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
                    <img v-if="form.avatar" :src="form.avatar" class="min-w-full min-h-full">
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
                    class="input input-lg rounded-full bg-[#E8E5F8] input-bordered w-full max-w-xs" />
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
    </div>

    <Confirmation action-text="Update" :show="confirmUpdate" @close="confirmUpdate = false" @yes="doUpdate">
        Apakah anda yakin?
    </Confirmation>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';

const props = defineProps<{
    show: Boolean
    data: Asaatidz | null
}>();

const emits = defineEmits(['close', 'saved']);

const Astz = useAsaatidzStore();

const isLoading = ref(false);
const show_modal = ref(true);

const form = ref({
    name: '',
    profile: '',
    avatar: undefined
});

watchEffect(() => {
    show_modal.value = props.show;

    if (props.data) {
        form.value.avatar = apiUri + props.data.avatar;
        form.value.name = props.data.name;
        form.value.profile = props.data.profile;
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
        form.value.avatar = '';

        const reader = new FileReader();
        reader.onload = () => {
            form.value.avatar = reader.result as string;
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
        delete form.value.avatar;

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
        if (error instanceof JoiError) {
            errors.value = error.data
        } else {
            responseError.value = error.message;
        }

        confirmUpdate.value = false;
    }
}
</script>
