<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu default-active="2">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <list />
                        </el-icon>
                        <span>My taks</span>
                    </template>
                    <router-link :to="{ name: 'listTask' }" class="nav-link">
                        <el-menu-item index="1-1">
                            List task
                        </el-menu-item>
                    </router-link>
                    <el-menu-item index="1-2">Today task</el-menu-item>
                </el-sub-menu>
                <router-link :to="{ name: 'addTask' }" class="nav-link">
                    <el-menu-item index="2">
                        <el-icon>
                            <plus />
                        </el-icon>
                        <span>Add task</span>
                    </el-menu-item>
                </router-link>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <Grid />
                        </el-icon>
                        <span>Group</span>
                    </template>
                    <el-menu-item v-for="item in categories" :key="item.id">
                        <p>{{ item.name }}</p>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import {
    Plus,
    List,
    Grid,
} from '@element-plus/icons-vue'
import type { Category } from '@/types';
import axios from '@/axiosInstance';
import { ref } from 'vue';

const categories = ref<Category[]>([]);

const getCategory = async () => {
    try {
        const response = await axios.get('/get_category');
        categories.value = response.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            created_at: item.created_at,
            updated_at: item.updated_at
        }));
    } catch (error) {
        console.log(error);
    }
}

getCategory();
</script>

<style scoped></style>