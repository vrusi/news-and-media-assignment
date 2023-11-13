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
            <div>
                <ProgressSpinner />
                <div>Loading...</div>
            </div>
        </template>
    </Suspense>
</template>
