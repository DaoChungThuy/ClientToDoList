<template>
    <el-table :data="tableData" highlight-current-row style="width: 100%" @row-click="handleRowClick">
        <el-table-column prop="title" label="Title" width="180" />
        <el-table-column prop="description" label="Description" width="180" />
        <el-table-column prop="start_time" label="Start time" />
        <el-table-column prop="end_time" label="End time" />
        <el-table-column label="Status">
            <template #default="scope">
                <el-checkbox
                    v-if="scope.row.status == 1 && new Date(scope.row.end_time).getTime() > new Date().getTime()"
                    @click="handleCheckboxChange(scope.row.id, scope.row, 2)">
                    Unfinished
                </el-checkbox>
                <el-checkbox v-if="scope.row.status == 2" @change="changeStatus(scope.row.id, scope.row)"
                    @click="handleCheckboxChange(scope.row.id, scope.row, 1)" :checked="true">
                    Finished
                </el-checkbox>
                <el-checkbox
                    v-if="scope.row.status == 3 || (scope.row.status == 1 && new Date(scope.row.end_time).getTime() < new Date().getTime())"
                    v-model="scope.row.checked" disabled>
                    <span class="text-danger">Late</span>
                </el-checkbox>
            </template>
        </el-table-column>
        <el-table-column label="Operations">
            <template #default="scope">
                <router-link :to="{ name: 'edit', params: { id: scope.row.id } }">
                    <el-button size="small">
                        <el-icon>
                            <edit />
                        </el-icon>
                    </el-button>
                </router-link>
                <el-button size="small" type="danger" @click="deleteTask(scope.row.id)">
                    <el-icon>
                        <delete />
                    </el-icon>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import axios from '@/axiosInstance';
import { ref } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineProps } from 'vue';
import { watch } from 'vue';
import type { Task } from '@/types';

const props = defineProps<{
    search: any | null;
    selectedFilter: string | null;
    selectedSort: string | null;
}>();

let tableData = ref<Task[]>([]);

const getTask = async () => {
    try {
        const response = await axios.get('/list_task', {
            params: {
                where: props.selectedFilter !== null && props.selectedFilter !== '4'
                    ? ['status', '=', props.selectedFilter]
                    : null,
                search: props.search,
                oderBy: props.selectedSort ? ['end_time', props.selectedSort] : null
            }
        });
        const tasks = response.data.data.map((task: Task) => ({
            id: task.id,
            user_id: task.user_id,
            category_id: task.category_id,
            title: task.title,
            description: task.description,
            start_time: task.start_time,
            end_time: task.end_time,
            status: task.status
        }));

        tableData.value = tasks;

    } catch (error) {
        console.log(error);
    }
}

const deleteTask = async (id: number) => {
    ElMessageBox.confirm(
        'do you want to delete. Continue?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            try {
                await axios.delete(`/delete_to_do/${id}`)
                ElMessage({
                    message: 'You have successfully deleted it',
                    type: 'success',
                })
                getTask();

            } catch (error) {
                console.log(error);
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })



}

const changeStatus = async (id: number, task: Task) => {
    try {
        await axios.put(`/update_to_do/${id}`, task);
        ElMessage({
            message: 'Status updated successfully',
            type: 'success',
        });
        getTask();
    } catch (error) {
        console.log(error);
    }
}

const handleCheckboxChange = async (id: number, task: Task, startus: number) => {
    task.status = startus;
    await changeStatus(id, task);
}

const emit = defineEmits(['inFocus', 'submit'])

let lastSelectedId: number | null = null;

function handleRowClick(row: Task) {
    const isSelected = lastSelectedId !== row.id;

    if (isSelected) {
        lastSelectedId = row.id;
    } else {
        lastSelectedId = null;
    }

    emit('submit', { itemId: row, isSelected });
}


watch([() => props.search, () => props.selectedFilter, () => props.selectedSort], () => {
    getTask();
});
getTask();

</script>

<style scoped>
.el-table__row--highlight-current-row {
    background-color: #0099FF;
}
</style>