<template>
    <div class="container-fluid">
        <div class="row">
            <div class="row">
                <TheHeader></TheHeader>
            </div>
            <div class="row">
                <div class="col-2">
                    <Menu></Menu>
                </div>
                <div class="col-10 mt-3">
                    <RouterView></RouterView>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Menu from '@/components/main/to_do_list/MenuTask.vue'
import TheHeader from '@/components/main/TheHeader.vue'

</script>