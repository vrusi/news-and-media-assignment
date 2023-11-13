export type TWord = {
    id: TWordId;
    value: string;
};

export type TWordId = `${string}-${string}-${string}-${string}-${string}`;

const WORDS = ['Abaddon', 'abadejo'];

export default class ApiService {
    words: TWord[];

    constructor() {
        this.words = WORDS.map((word) => ({ id: crypto.randomUUID(), value: word }));
    }

    async getWords(): Promise<TWord[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.words.splice(0));
            }, 1000);
        });
    }

    async addWord(value: string): Promise<void | TWord> {
        // TODO: validate value - check if already exists
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const word = {
                    id: crypto.randomUUID(),
                    value,
                };

                this.words.push(word);

                resolve(word);
            }, 1000);
        });
    }

    areWordsTheSame(wordA: TWord, wordB: TWord): boolean {
        return wordA.id === wordB.id && wordA.value === wordB.value;
    }

    async removeWord(idToDelete: TWordId): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.words = this.words.filter((word) => word.id !== idToDelete);
                resolve();
            }, 1000);
        });
    }
}
