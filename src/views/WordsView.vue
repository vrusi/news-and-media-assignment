<script setup lang="ts">
import NewWordButton from '@/components/NewWordButton.vue';
import NewWordModal from '@/components/NewWordModal.vue';
import RemoveWordsButton from '@/components/RemoveWordsButton.vue';
import RemoveWordModal from '@/components/RemoveWordModal.vue';
import WordComponent from '@/components/WordComponent.vue';
import ApiService, { type TWord, type TWordId } from '@/lib/ApiService';
import { onMounted, ref } from 'vue';

const apiService = new ApiService();
const words = ref<Array<TWord>>([]);
const isAddWordModalOpen = ref(false);
const isRemoveWordModalOpen = ref(false);
const wordToRemove = ref<TWord | null>(null);

onMounted(async () => {
    words.value = await apiService.getWords();
});

const onAddNewWordClick = () => {
    isAddWordModalOpen.value = true;
};

const onAddNewWord = async (newWord: string) => {
    const word = await apiService.addWord(newWord);

    if (!word) {
        // TODO: handle errors
        return;
    }

    isAddWordModalOpen.value = false;
    words.value.push(word);
};

const isRemovingWords = ref(false);

const onRemoveWordsClick = async () => {
    isRemovingWords.value = !isRemovingWords.value;
};

const onRemoveWordClick = (word: TWord) => {
    isRemoveWordModalOpen.value = true;
    wordToRemove.value = word;
};

const onCloseRemoveWordModal = () => {
    isRemoveWordModalOpen.value = false;
    wordToRemove.value = null;
};

const onRemoveWord = async () => {
    if (!wordToRemove.value) {
        // TODO: handle errors
        return;
    }

    await apiService.removeWord(wordToRemove.value!.id);
    words.value = words.value.filter((word) => word.id !== wordToRemove.value!.id);

    wordToRemove.value = null;
    isRemoveWordModalOpen.value = false;
};
</script>

<template>
    <main class="container">
        <h1>Words</h1>

        <new-word-modal
            v-model:isModalOpen="isAddWordModalOpen"
            @close="isAddWordModalOpen = false"
            @addNewWord="onAddNewWord"
        />

        <remove-word-modal
            v-model:isModalOpen="isRemoveWordModalOpen"
            :word="wordToRemove!"
            @close="onCloseRemoveWordModal"
            @remove="onRemoveWord"
        />

        <new-word-button v-if="!isRemovingWords" @click="onAddNewWordClick" />
        <remove-words-button @click="onRemoveWordsClick" :isRemovingWords="isRemovingWords" />

        <word-component
            v-for="word in words"
            :key="word.id"
            :word="word"
            :isRemovingWords="isRemovingWords"
            @remove="onRemoveWordClick"
        />
    </main>
</template>

<style>
.container {
    margin: 0 auto;
    max-width: 40vw;
}
</style>
