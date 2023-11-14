import axios from 'axios';

export const API_URLS = {
    WORDS_3: 'https://run.mocky.io/v3/80b9b658-fc89-4546-9e70-68be0e7b5ff1',
    WORDS_10: 'https://run.mocky.io/v3/68b65f8d-8502-4cce-b6e5-5a4042e44d97',
    WORDS_15K: 'https://run.mocky.io/v3/9c7da90e-48b9-42ab-b942-3ab802c1117b',
};

const API_CURRENT = API_URLS.WORDS_15K;

export type TWord = {
    id: TWordId;
    value: string;
};

export type TWordId = `${string}-${string}-${string}-${string}-${string}`;

export class ApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export default class ApiService {
    words: TWord[];
    apiUrl: string;

    constructor(apiUrl: string = API_CURRENT) {
        this.words = [];
        this.apiUrl = apiUrl;
    }

    async fetchWords(): Promise<TWord[] | ApiError> {
        try {
            const response = await axios.get(this.apiUrl);
            if (response.status === 200) {
                this.words = response.data.words;
                return this.words;
            } else {
                return new ApiError('Error while fetching words.');
            }
        } catch (error: unknown) {
            return new ApiError('Error while fetching words.');
        }
    }

    async addWord(value: string): Promise<TWord | ApiError> {
        if (this.words.find((word) => word.value === value)) {
            return new ApiError('Word already exists.');
        }

        return new Promise((resolve) => {
            const word = {
                id: crypto.randomUUID(),
                value,
            };

            setTimeout(() => {
                this.words.push(word);
                resolve(word);
            }, 500);
        });
    }

    async removeWord(idToDelete: TWordId): Promise<void | ApiError> {
        if (!this.words.find((word) => word.id === idToDelete)) {
            return new ApiError('Word not found.');
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                this.words = this.words.filter((word) => word.id !== idToDelete);
                resolve();
            }, 500);
        });
    }
}
