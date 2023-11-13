import axios from 'axios';

export type TWord = {
    id: TWordId;
    value: string;
};

export type TWordId = `${string}-${string}-${string}-${string}-${string}`;

export default class ApiService {
    words: TWord[];

    constructor() {
        this.words = [];
    }

    async getWords(): Promise<TWord[] | void> {
        try {
            return new Promise((resolve, reject) => {
                axios.get('https://run.mocky.io/v3/80b9b658-fc89-4546-9e70-68be0e7b5ff1').then(
                    (response: any) => {
                        this.words = response.data.words;
                        resolve(this.words);
                    },
                    (error: Error) => {
                        reject(error);
                    },
                );
            });
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async addWord(value: string): Promise<TWord | void> {
        if (this.words.find((word) => word.value === value)) {
            console.error('Word already exists');
        }

        try {
            return new Promise((resolve, reject) => {
                try {
                    const word = {
                        id: crypto.randomUUID(),
                        value,
                    };

                    setTimeout(() => {
                        this.words.push(word);
                        resolve(word);
                    }, 500);
                } catch (error) {
                    reject(error);
                }
            });
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async removeWord(idToDelete: TWordId): Promise<void> {
        try {
            if (!this.words.find((word) => word.id === idToDelete)) {
                console.log('Word not found');
                return;
            }

            return new Promise((resolve, reject) => {
                try {
                    setTimeout(() => {
                        this.words = this.words.filter((word) => word.id !== idToDelete);
                        resolve();
                    }, 500);
                } catch (error) {
                    reject(error);
                }
            });
        } catch (error: unknown) {
            console.error(error);
        }
    }
}
