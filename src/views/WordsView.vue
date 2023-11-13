<script setup lang="ts">
import NewWordButton from '@/components/NewWordButton.vue';
import NewWordModal from '@/components/NewWordModal.vue';
import WordComponent from '@/components/WordComponent.vue';
import ApiService, { type TWord } from '@/lib/ApiService';
import { onMounted, ref } from 'vue';

const apiService = new ApiService();
const words = ref<Array<TWord>>([]);
const isModalOpen = ref(false);

onMounted(async () => {
    words.value = await apiService.getWords();
});

const onAddNewWordClick = () => {
    isModalOpen.value = true;
};

const onAddNewWord = async (newWord: string) => {
    const word = await apiService.addWord(newWord);

    if (!word) {
        // TODO: handle errors
        return;
    }

    isModalOpen.value = false;
    words.value.push(word);
};
</script>

<template>
    <main class="container">
        <h1>Words</h1>

        <new-word-modal
            v-model:isModalOpen="isModalOpen"
            @close="isModalOpen = false"
            @addNewWord="onAddNewWord"
        />

        <new-word-button @click="onAddNewWordClick" />

        <word-component v-for="word in words" :key="word.id" :word="word.value" />
    </main>
</template>

<style>
.container {
    margin: 0 auto;
    max-width: 40vw;
}
</style>
