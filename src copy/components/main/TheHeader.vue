<template>
    <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" class="d-flex">
        <el-menu-item index="0">
            <h2>To do List</h2>
        </el-menu-item>
        <div class="col-5">
            <el-input v-model="search" style="width: 240px" placeholder="Enter keywords" class="ml-2 mt-2"></el-input>
            <el-button type="primary" :icon="Search" @click="searchTask()" class="ml-2 mt-2">Search</el-button>
        </div>
        <el-sub-menu index="2" class="ml-auto">
            <template #title>
                <el-icon>
                    <user />
                </el-icon>
            </template>
            <router-link :to="{ name: 'login' }" class="nav-link">
                <el-menu-item index="2-1">Login</el-menu-item>
            </router-link>
            <el-menu-item index="2-2" @click="Logout()">Logout</el-menu-item>
            <el-menu-item index="2-3">Register</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { authStore } from '@/stores/auth-store';
import { Search } from '@element-plus/icons-vue'

const store = authStore();
const router = useRouter();

const search = ref<number>();

const Logout = async () => {
    try {
        await store.logout();

        router.push('/login');
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

const searchTask = async () => {
    try {
        router.push({ name: 'listTask', query: { search: search.value } });
    } catch (error) {
        console.error('Error :', error);
    }
}

const activeIndex = ref('1')
</script>
<style></style>