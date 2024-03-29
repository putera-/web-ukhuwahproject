<template>
    <div>
        <AdminItikafForm @saved="saved" />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: [
        'admin'
    ]
});

const Itikaf = useItikafStore();

const saved = () => {
    navigateTo('/admin/itikaf')
}

</script>