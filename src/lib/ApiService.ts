export type TWord = {
    id: number;
    value: string;
};

export default class ApiService {
    words: TWord[];

    constructor() {
        this.words = [
            {
                id: 1,
                value: 'one',
            },
            {
                id: 2,
                value: 'two',
            },
            {
                id: 3,
                value: 'three',
            },
        ];
    }

    async getWords(): Promise<TWord[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.words);
            }, 1000);
        });
    }

    async addWord(word: TWord): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.words.push(word);
                resolve();
            }, 1000);
        });
    }

    areWordsTheSame(wordA: TWord, wordB: TWord): boolean {
        return wordA.id === wordB.id && wordA.value === wordB.value;
    }

    async deleteWord(wordToDelete: TWord): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.words = this.words.filter((word) => !this.areWordsTheSame(word, wordToDelete));
                resolve();
            }, 1000);
        });
    }
}
