<script setup lang="ts">
import NewWordButton from '@/components/NewWordButton.vue';
import NewWordModal from '@/components/NewWordModal.vue';
import RemoveWordModal from '@/components/RemoveWordModal.vue';
import RemoveWordsButton from '@/components/RemoveWordsButton.vue';
import WordComponent from '@/components/WordComponent.vue';
import ApiService, { type TWord, ApiError } from '@/lib/ApiService';
import { onMounted, ref } from 'vue';
import draggable from 'vuedraggable';

const apiService = new ApiService();
const words = ref<TWord[]>([]);
const isAddWordModalOpen = ref(false);
const isRemoveWordModalOpen = ref(false);
const wordToRemove = ref<TWord | null>(null);

const isError = ref(false);

const setWordOrder = (): void => {
    localStorage.setItem('wordIds', JSON.stringify(words.value.map((word) => word.id)));
};

const getWordOrder = (): Array<string> => {
    const localStorageWordIds = localStorage.getItem('wordIds');
    if (!localStorageWordIds) {
        return [];
    }

    return JSON.parse(localStorageWordIds);
};

const orderWords = (): void => {
    const wordsUnordered = words.value;

    if (!wordsUnordered) {
        return;
    }

    const order = getWordOrder();
    words.value = [...wordsUnordered].sort((a, b) => {
        return order.indexOf(a.id) - order.indexOf(b.id);
    });
};

onMounted(async () => {
    const response = await apiService.getWords();

    if (response instanceof ApiError) {
        isError.value = true;
        return;
    }

    words.value = response as TWord[];

    const localStorageWordIds = localStorage.getItem('wordIds');

    if (!localStorageWordIds) {
        setWordOrder();
    } else {
        orderWords();
    }
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

    setWordOrder();
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
    setWordOrder();

    wordToRemove.value = null;
    isRemoveWordModalOpen.value = false;
};

const getDraggableData = () => {
    return {
        isRemovingWords: isRemovingWords.value,
        onRemove: onRemoveWordClick,
    };
};

const onDrag = () => {
    setWordOrder();
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
            v-if="wordToRemove"
            v-model:isModalOpen="isRemoveWordModalOpen"
            :word="wordToRemove"
            @close="onCloseRemoveWordModal"
            @remove="onRemoveWord"
        />

        <new-word-button v-if="!isRemovingWords" @click="onAddNewWordClick" />

        <remove-words-button @click="onRemoveWordsClick" :isRemovingWords="isRemovingWords" />

        <draggable
            v-model="words"
            itemKey="id"
            :component-data="getDraggableData()"
            @update="onDrag"
        >
            <template #item="{ element }">
                <word-component
                    :modelValue="element"
                    :isRemovingWords="isRemovingWords"
                    @remove="onRemoveWordClick"
                />
            </template>
        </draggable>
    </main>
</template>

<style>
.container {
    margin: 0 auto;
    max-width: 40vw;
}

#draggable-wrapper {
    position: absolute;
}
</style>
