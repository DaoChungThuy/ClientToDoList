<template>
    <el-row class="tac">
        <el-col :span="12">
            <h5 class="mb-2">Add Task</h5>
            <el-form ref="taskForm" :model="task" label-width="120px">
                <el-form-item label="Category">
                    <el-select v-model="task.category_id" placeholder="Select category">
                        <el-option v-for="category in categories" :key="category.id" :label="category.name"
                            :value="category.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Title">
                    <el-input v-model="task.title" placeholder="Enter task title" />
                    <span class="text-danger" v-if="errorValues && errorValues.title">
                        {{ errorValues.title }}
                    </span>
                </el-form-item>
                <el-form-item label="Description">
                    <el-input v-model="task.description" type="textarea" placeholder="Enter task description" />
                </el-form-item>
                <el-form-item label="Start Date">
                    <el-date-picker v-model="task.start_time" type="datetime"
                        placeholder="Select start date and time" />
                    <span class="text-danger" v-if="errorValues && errorValues.start_time">
                        {{ errorValues.start_time }}
                    </span>
                </el-form-item>
                <el-form-item label="End Date">
                    <el-date-picker v-model="task.end_time" type="datetime" placeholder="Select end date and time" />
                    <span class="text-danger" v-if="errorValues && errorValues.end_time">
                        {{ errorValues.end_time }}
                    </span>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addTask">Add Task</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElDatePicker, ElRow, ElCol } from 'element-plus';
import type { Task, Category } from '@/types';
import { authStore } from '@/stores/auth-store';
import axios from '@/axiosInstance';
import dayjs from 'dayjs';
import { useRouter } from "vue-router";

const taskForm = ref<typeof ElForm | null>(null);
const store = authStore();

const router = useRouter();

interface ErrorObject {
    title?: string;
    start_time?: string;
    end_time?: string;
}

const errorValues = reactive<ErrorObject>({});
const task = ref<Task>({
    id: null,
    user_id: store.user?.id ?? 1,
    category_id: 1,
    title: '',
    description: '',
    start_time: new Date(),
    end_time: new Date(new Date().getTime() + 86400000),
    status: 1,
});

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


const addTask = async () => {
    try {
        const convertedTask = convertTask(task.value)
        await axios.post('/createToDo', convertedTask)
        router.push({ name: 'listTask' })
    } catch (error: any) {
        console.log(error)
        Object.assign(errorValues, { ...error?.response?.data?.errors })
    }

};

const convertTask = (task: Task): any => {
    const convertedTask: any = { ...task }

    convertedTask.start_time = dayjs(task.start_time).format('YYYY-MM-DD HH:mm:ss')
    convertedTask.end_time = dayjs(task.end_time).format('YYYY-MM-DD HH:mm:ss')

    return convertedTask;
};

</script>

<style scoped>
.tac {
    text-align: center;
}
</style>