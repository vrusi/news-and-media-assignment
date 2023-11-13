<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppToolbar from '@/components/AppToolbar.vue';
</script>

<template>
    <AppToolbar />

    <Suspense>
        <template #default>
            <RouterView />
        </template>

        <template #fallback>
            <ProgressSpinner />
            <div>Loading...</div>
        </template>
    </Suspense>
</template>