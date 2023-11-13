<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import AppToolbar from '@/components/AppToolbar.vue';

const wordCount = ref(0);

const onWordCount = (newWordCount: number) => {
    wordCount.value = newWordCount;
};
</script>

<template>
    <AppToolbar :wordCount="wordCount" />

    <Suspense>
        <template #default>
            <RouterView @wordCount="onWordCount" />
        </template>

        <template #fallback>
            <div>
                <ProgressSpinner />
                <div>Loading...</div>
            </div>
        </template>
    </Suspense>
</template>
