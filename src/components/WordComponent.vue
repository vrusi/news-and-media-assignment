<script setup lang="ts">
defineProps({
    word: String,
});
</script>

<template>
    <div class="word">{{ word }}</div>
</template>

<style scoped>
.word {
    margin: 1rem auto;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    padding: 1rem;
    width: 100%;
    text-align: center;
}

.word:hover {
    cursor: pointer;
}
</style>
