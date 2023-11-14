<script setup lang="ts">
import NewWordButton from '@/components/NewWordButton.vue';
import NewWordButtonLarge from '@/components/NewWordButtonLarge.vue';
import NewWordModal from '@/components/NewWordModal.vue';
import RemoveWordModal from '@/components/RemoveWordModal.vue';
import RemoveWordsButton from '@/components/RemoveWordsButton.vue';
import RemoveWordsButtonLarge from '@/components/RemoveWordsButtonLarge.vue';
import WordComponent from '@/components/WordComponent.vue';
import { useApiService } from '@/composables/useApiService';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { type TWord } from '@/services/ApiService';
import { defineEmits, onMounted, watch } from 'vue';
import draggable from 'vuedraggable';

const {
    words,
    isAddWordModalOpen,
    isRemoveWordModalOpen,
    wordToRemove,
    isRemovingWords,
    isLoading,
    isError,
    loadData,
    addWord,
    removeWord,
} = useApiService();

const { setWordOrder } = useLocalStorage();

const emit = defineEmits(['wordCount']);

onMounted(loadData);

watch(
    words,
    () => {
        setWordOrder(words.value);
        emit('wordCount', words.value.length);
    },
    { deep: true },
);

const onRemoveWordsButtonClick = async () => {
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

const getDraggableData = () => {
    return {
        isRemovingWords: isRemovingWords.value,
        onRemove: onRemoveWordClick,
    };
};

const onDrag = () => {
    setWordOrder(words.value);
};
</script>

<template>
    <main class="container">
        <h1 class="text-center">Words</h1>

        <template v-if="isLoading">
            <div class="column">
                <ProgressSpinner />
                <span class="my-2"> Loading... </span>
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
                <div class="hide-desktop">
                    <RemoveWordModal
                        v-if="wordToRemove"
                        v-model:isModalOpen="isRemoveWordModalOpen"
                        :word="wordToRemove"
                        @close="onCloseRemoveWordModal"
                        @remove="removeWord(wordToRemove.id)"
                    />

                    <NewWordModal
                        v-model:isModalOpen="isAddWordModalOpen"
                        @close="isAddWordModalOpen = false"
                        @addNewWord="addWord"
                    />

                    <RemoveWordsButton
                        :is-removing-words="isRemovingWords"
                        @click="onRemoveWordsButtonClick"
                    />

                    <NewWordButton v-if="!isRemovingWords" @click="isAddWordModalOpen = true" />
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
                            :is-removing-words="isRemovingWords"
                            @remove="onRemoveWordClick"
                        />
                    </template>
                </draggable>
            </div>

            <div class="hide-mobile w-100 my-2">
                <RemoveWordsButtonLarge
                    :is-removing-words="isRemovingWords"
                    @click="onRemoveWordsButtonClick"
                />

                <NewWordButtonLarge
                    :is-removing-words="isRemovingWords"
                    @click="isAddWordModalOpen = true"
                />
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

.hide-mobile {
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

    .hide-desktop {
        display: none;
    }

    .hide-mobile {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 20rem;
        margin-left: auto;
        margin-right: auto;
    }
}
</style>
