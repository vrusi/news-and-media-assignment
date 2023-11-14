import { type TWord } from '@/services/ApiService';

export function useLocalStorage() {
    const getWordOrder = (): Array<string> => {
        try {
            const localStorageWordIds = localStorage.getItem('wordIds');
            return localStorageWordIds ? JSON.parse(localStorageWordIds) : [];
        } catch (error: unknown) {
            return [];
        }
    };

    const setWordOrder = (words: TWord[]): void => {
        const clonedWords = words.map((word) => {
            return { ...word };
        });

        localStorage.setItem('wordIds', JSON.stringify(clonedWords.map((word) => word.id)));
    };

    const isLocalStorageSet = (): boolean => {
        const localStorageWordIds = localStorage.getItem('wordIds');
        return localStorageWordIds ? true : false;
    };

    return { getWordOrder, setWordOrder, isLocalStorageSet };
}
