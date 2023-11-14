import ApiService, { ApiError, type TWord, type TWordId } from '@/services/ApiService';
import { ref } from 'vue';
import { useLocalStorage } from './useLocalStorage';

const { getWordOrder, setWordOrder, isLocalStorageSet } = useLocalStorage();
export function useApiService() {
    const apiService = new ApiService();
    const words = ref<TWord[]>([]);
    const isAddWordModalOpen = ref(false);
    const isRemoveWordModalOpen = ref(false);
    const wordToRemove = ref<TWord | null>(null);
    const isRemovingWords = ref(false);
    const isLoading = ref(true);
    const isError = ref(false);

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

        try {
            const response = await apiService.fetchWords();

            if (response instanceof ApiError) {
                isError.value = true;
                isLoading.value = false;
                return;
            }

            words.value = response as TWord[];

            if (isLocalStorageSet()) {
                orderWords();
            } else {
                setWordOrder(words.value);
            }
        } catch (error: unknown) {
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
    };

    const addWord = async (newWord: string) => {
        try {
            const response = await apiService.addWord(newWord);

            if (response instanceof ApiError) {
                isError.value = true;
                return;
            }

            words.value.push(response as TWord);
            setWordOrder(words.value);
        } catch (error: unknown) {
            isError.value = true;
        } finally {
            isAddWordModalOpen.value = false;
        }
    };

    const removeWord = async (wordId: TWordId) => {
        try {
            const response = await apiService.removeWord(wordId);

            if (response instanceof ApiError) {
                isError.value = true;
                return;
            }

            words.value = words.value.filter((word) => word.id !== wordId).slice();
            setWordOrder(words.value);
            wordToRemove.value = null;
            isRemoveWordModalOpen.value = false;
        } catch (error: unknown) {
            isError.value = true;
        }
    };

    return {
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
    };
}
