<template>
    <Login />
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import Login from '@/components/user/Login.vue';

defineComponent({
    components: {
        Login
    },
});
</script>