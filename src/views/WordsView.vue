<script setup lang="ts">
import NewWordButton from '@/components/NewWordButton.vue';
import NewWordModal from '@/components/NewWordModal.vue';
import RemoveWordModal from '@/components/RemoveWordModal.vue';
import RemoveWordsButton from '@/components/RemoveWordsButton.vue';
import WordComponent from '@/components/WordComponent.vue';
import ApiService, { ApiError, type TWord } from '@/lib/ApiService';
import { onMounted, ref } from 'vue';
import draggable from 'vuedraggable';

const apiService = new ApiService();
const words = ref<TWord[]>([]);
const isAddWordModalOpen = ref(false);
const isRemoveWordModalOpen = ref(false);
const wordToRemove = ref<TWord | null>(null);
const isRemovingWords = ref(false);

const isLoading = ref(true);
const isError = ref(false);
const errorMessage = ref('');

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

const loadData = async () => {
    isLoading.value = true;
    isError.value = false;
    errorMessage.value = '';

    const response = await apiService.getWords();

    if (response instanceof ApiError) {
        isError.value = true;
        isLoading.value = false;
        return;
    }

    words.value = response as TWord[];

    const localStorageWordIds = localStorage.getItem('wordIds');

    if (!localStorageWordIds) {
        setWordOrder();
    } else {
        orderWords();
    }
    isLoading.value = false;
};

onMounted(() => {
    loadData();
});

const onAddNewWordClick = () => {
    isAddWordModalOpen.value = true;
};

const onAddNewWord = async (newWord: string) => {
    const response = await apiService.addWord(newWord);

    if (response instanceof ApiError) {
        isError.value = true;
        errorMessage.value = response.message;
        return;
    }

    const word = response as TWord;

    setWordOrder();
    isAddWordModalOpen.value = false;
    words.value.push(word);
};

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
        isRemoveWordModalOpen.value = false;
        return;
    }

    const response = await apiService.removeWord(wordToRemove.value.id);

    if (response instanceof ApiError) {
        isError.value = true;
        errorMessage.value = response.message;
        return;
    }

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
        <h1 class="text-center">Words</h1>

        <template v-if="isLoading">
            <div class="column">
                <ProgressSpinner />
                <span class="my-2">Loading...</span>
            </div>
        </template>

        <template v-else-if="isError">
            <div class="column">
                <i class="pi pi-exclamation-circle icon-error" />
                <span class="my-2">Could not load data.</span>
                <Button outlined rounded @click="loadData">Try again</Button>
            </div>
        </template>

        <template v-else>
            <div class="content">
                <div class="display-mobile">
                    <remove-word-modal
                        v-if="wordToRemove"
                        v-model:isModalOpen="isRemoveWordModalOpen"
                        :word="wordToRemove"
                        @close="onCloseRemoveWordModal"
                        @remove="onRemoveWord"
                    />

                    <new-word-modal
                        v-model:isModalOpen="isAddWordModalOpen"
                        @close="isAddWordModalOpen = false"
                        @addNewWord="onAddNewWord"
                    />

                    <remove-words-button
                        @click="onRemoveWordsClick"
                        :isRemovingWords="isRemovingWords"
                    />

                    <new-word-button v-if="!isRemovingWords" @click="onAddNewWordClick" />
                </div>

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
            </div>

            <div class="display-desktop w-100 my-2">
                <Button
                    v-if="!isRemovingWords"
                    class="w-100 text-center mr-1"
                    severity="danger"
                    outlined
                    @click="onRemoveWordsClick"
                >
                    <span class="w-100 text-center"> Remove </span>
                </Button>

                <Button
                    v-else
                    class="w-100 text-center"
                    severity="secondary"
                    @click="onRemoveWordsClick"
                >
                    <span class="w-100 text-center"> Cancel </span>
                </Button>

                <Button
                    v-if="!isRemovingWords"
                    class="w-100 text-center ml-2"
                    @click="onAddNewWordClick"
                >
                    <span class="w-100 text-center"> Create </span>
                </Button>
            </div>
        </template>
    </main>
</template>

<style scoped>
.icon-error {
    color: #ef4444;
    font-size: 6rem;
    margin-bottom: 1rem;
}

.display-desktop {
    display: none;
}

@media screen and (min-width: 700px) {
    .content {
        height: 60vh;
        border: 1px solid #ccc;
        border-radius: 6px;
        padding: 0 2rem;
        max-width: 20rem;
        margin: auto;
        overflow: hidden;
        overflow-y: scroll;
    }

    .content::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: transparent;
    }

    .content::-webkit-scrollbar {
        width: 2px;
        background-color: transparent;
    }

    .content::-webkit-scrollbar-thumb {
        background-color: var(--primary-color);
    }

    .display-mobile {
        display: none;
    }

    .display-desktop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 20rem;
        margin-left: auto;
        margin-right: auto;
    }
}
</style>
