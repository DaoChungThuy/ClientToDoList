<template>
    <div class="row">
        <el-card style="max-width: 480px">
            <template #header>
                <div class="card-header d-flex justify-content-center">
                    <span class="text-center">Details task</span>
                </div>
            </template>
            <div class="row">
                <h6>{{ props.item?.title }}</h6>
                <p>
                    <span
                        v-if="props.item?.status == 1 && new Date(props.item.end_time).getTime() > new Date().getTime()">
                        Unfinished
                        <el-icon><warn-triangle-filled /> </el-icon>
                    </span>
                    <span v-if="props.item?.status == 2">
                        Finished
                        <el-icon><success-filled /> </el-icon>
                    </span>
                    <span v-if="props.item?.status == 3 ||
                        (props.item?.status == 1 && new Date(props.item.end_time).getTime() < new Date().getTime())">
                        Late
                        <el-icon>
                            <failed />
                        </el-icon>
                    </span>
                </p>
                <el-text class="mx-1" type="primary">
                    Execution time {{ dayjs(props.item?.end_time).diff(dayjs(props.item?.start_time), 'day') }}
                    day
                </el-text>
                <br />
                <el-text class="mx-1" type="success">
                    Time remaining {{ dayjs(props.item?.end_time).diff(dayjs(new Date), 'day') }}
                    day
                </el-text>
            </div>
            <div class="row mt-4">
                <el-timeline>
                    <el-timeline-item>
                        <p>Time start</p>
                        <span class="small">{{ props.item?.start_time }}</span>
                    </el-timeline-item>
                    <el-timeline-item>
                        <p>Time end</p>
                        <span class="small">{{ props.item?.end_time }}</span>
                    </el-timeline-item>
                </el-timeline>
            </div>

        </el-card>
    </div>
</template>

<script setup lang="ts">
import { SuccessFilled, Failed, WarnTriangleFilled } from '@element-plus/icons-vue'
import dayjs from 'dayjs';
import { defineProps } from 'vue';
import type { Task } from '@/types';

const props = defineProps<{
    item: Task | null;
}>();
</script>

<style scoped></style>