import axios from 'axios';

const API_URL_3_WORDS = 'https://run.mocky.io/v3/80b9b658-fc89-4546-9e70-68be0e7b5ff1';
const API_URL_10_WORDS = 'https://run.mocky.io/v3/68b65f8d-8502-4cce-b6e5-5a4042e44d97';
const API_CURRENT = API_URL_10_WORDS;

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

    constructor() {
        this.words = [];
    }

    async getWords(): Promise<TWord[] | ApiError> {
        try {
            const response = await axios.get(API_CURRENT);

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
