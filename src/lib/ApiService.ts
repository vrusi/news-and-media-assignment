import axios from 'axios';

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
            const response = await axios.get(
                'https://run.mocky.io/v3/80b9b658-fc89-4546-9e70-68be0e7b5ff1',
            );

            if (response.status === 200) {
                return response.data.words;
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
