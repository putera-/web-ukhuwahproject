<template>
    <div>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Nama Bank</span>
            </div>
            <input v-model="form.bank_name" type="text" placeholder="Nama Bank"
                class="input md:input-lg border-0 input-bordered w-full max-w-xs rounded-full bg-[#E8E5F8]" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.bank_name">{{ errors.bank_name }}</span>
            </div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Atas Nama</span>
            </div>
            <input v-model="form.bank_holder_name" type="text" placeholder="Atas Nama"
                class="input md:input-lg border-0 input-bordered w-full max-w-xs rounded-full bg-[#E8E5F8]" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.bank_holder_name">{{ errors.bank_holder_name
                    }}</span>
            </div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Nomor Rekening</span>
            </div>
            <input v-model="form.bank_account_no" type="text" placeholder="Nomor Rekening" v-maska
                data-maska="####-####-####-####"
                class="input md:input-lg border-0 input-bordered w-full max-w-xs rounded-full bg-[#E8E5F8]" />
            <div class="label">
                <span class="label-text-alt text-error" v-if="errors.bank_account_no">{{ errors.bank_account_no
                    }}</span>
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
    bank_name: Client.client ? Client.client.bank_name : '',
    bank_holder_name: Client.client ? Client.client.bank_holder_name : '',
    bank_account_no: Client.client ? Client.client.bank_account_no : ''
});

const confirmUpdate = ref<Boolean>(false);
const errors = ref<Record<string, string>>({});
const responseError = ref<string>('');

const doUpdate = async () => {
    responseError.value = '';
    errors.value = {};

    try {
        const data = Validate(isClientBankAccount, form.value)

        await Client.update(data);

        confirmUpdate.value = false;

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