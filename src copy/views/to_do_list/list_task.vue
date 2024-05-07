    <template>
        <div class="row">
            <div class="col-4 ps-5">
                <h1>List Task</h1>
            </div>
            <div class="col-5 d-flex justify-content-end">
                <el-select v-model="selectedFilter" placeholder="Filter" style="width: 240px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-select v-model="selectedSort" placeholder="Sort" style="width: 240px" class="ms-4">
                    <el-option v-for="item in optionSort" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>

            </div>
            <div class="col-3"></div>
        </div>
        <div class="row">
            <div :class="isItemSelected ? 'col-9' : 'col-12'">
                <ListTask :selectedFilter="selectedFilter" :selectedSort="selectedSort" :search="search"
                    @submit="handleRowClick" />
            </div>
            <div v-if="isItemSelected" class="col-3">
                <DetailTask :item="selectedItem" />
            </div>
        </div>
    </template>

<script setup lang="ts">
import ListTask from '@/components/main/to_do_list/ListTask.vue';
import { ref, watch } from 'vue';
import DetailTask from '@/components/main/to_do_list/DetailTask.vue';
import type { Task } from '@/types';
import { useRoute } from 'vue-router';

const isItemSelected = ref<boolean>(false);
const selectedItem = ref<Task | null>(null);
const selectedFilter = ref<string | null>(null);
const selectedSort = ref<string | null>(null);
const route = useRoute();
const search = ref(route.query.search || null);

const handleRowClick = ({ itemId, isSelected }: { itemId: Task, isSelected: any }) => {
    isItemSelected.value = isSelected;
    selectedItem.value = itemId;
};

const options = [
    {
        value: '4',
        label: 'All',
    },
    {
        value: '1',
        label: 'Unfinished',
    },
    {
        value: '2',
        label: 'Finished',
    },
    {
        value: '3',
        label: 'Late',
    },

]
const optionSort = [
    {
        value: 'asc',
        label: 'Recent times',
    },
    {
        value: 'desc',
        label: 'Furthest time',
    },
]

watch(
    () => route.query.search,
    (newSearch, oldSearch) => {
        console.log('Search value changed from', oldSearch, 'to', newSearch);
        search.value = newSearch;
    }
);
</script>