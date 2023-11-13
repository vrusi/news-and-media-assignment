<template>
    <main class="container">
        <h1>Wordslist</h1>
        <div v-for="word in words" :key="word.id">
            <word-component :word="word.value" />
        </div>
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ApiService, { type TWord } from '@/lib/ApiService';
import WordComponent from '@/components/WordComponent.vue';

const apiService = new ApiService();
const words = ref<Array<TWord>>([]);

onMounted(async () => {
    words.value = await apiService.getWords();
});
</script>

<style>
.container {
    margin: 0 auto;
    max-width: 40vw;
}
</style>
