<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
    wordCount: number;
}>();
</script>

<template>
    <header>
        <Toolbar>
            <template #start>
                <RouterLink to="/" active-class="router-link-button-active-active">
                    <i class="pi pi-align-justify router-button-icon" />
                </RouterLink>
                <RouterLink to="/about" active-class="router-link-button-active-active">
                    <i class="pi pi-info-circle router-button-icon" />
                </RouterLink>
            </template>

            <template #end> {{ wordCount }} words </template>
        </Toolbar>
    </header>
</template>

<style scoped>
.router-button-icon {
    padding: 0 1rem;
    font-size: 1.5rem;
}

.router-link-button-active-active {
    color: var(--primary-color);
}
</style>
