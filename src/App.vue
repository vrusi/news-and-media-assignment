<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
    <header>
        <h1>News and media assignment</h1>
    </header>

    <Suspense>
        <template #default>
            <RouterView />
        </template>

        <!-- Optionally, you can include a fallback template while the async operation is in progress -->
        <template #fallback>
            <div>Loading...</div>
        </template>
    </Suspense>
</template>
