<template>
    <div>

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: [
        'admin'
    ]
});

import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route.params.id);

</script>