import { beforeEach, describe, expect, it, vi } from 'vitest';
import ApiService, { API_URLS, ApiError, type TWord } from '../ApiService';
import axios from 'axios';

vi.mock('axios');

describe('API Service', () => {
    beforeEach(() => {
        (axios.get as any).mockReset();
    });

    describe('fetchWords', () => {
        const assertWordsMatch = (wordsActual: TWord[], wordsExpected: TWord[]) => {
            const idsActual = wordsActual.map((word) => word.id);
            const valuesActual = wordsActual.map((word) => word.value);
            const idsExpected = wordsExpected.map((word) => word.id);
            const valuesExpected = wordsExpected.map((word) => word.value);

            expect(idsActual).toStrictEqual(idsExpected);
            expect(valuesActual).toStrictEqual(valuesExpected);
        };

        it('calls a GET request to get the words', async () => {
            const wordsMock = {
                words: [
                    {
                        id: '156b29c9-e750-4527-b048-3b3175345d6a',
                        value: 'apple',
                    },
                    {
                        id: 'fa1a98f5-1be1-473e-a309-fe7a6cb2cffc',
                        value: 'banana',
                    },
                    {
                        id: '3385f1be-b051-4667-a168-64ddc4111df1',
                        value: 'cat',
                    },
                ],
            };

            (axios.get as any).mockResolvedValue({
                data: wordsMock,
                status: 200,
            });

            const apiService = new ApiService(API_URLS.WORDS_3);
            const words = await apiService.fetchWords();

            expect(axios.get).toHaveBeenCalledWith(API_URLS.WORDS_3);
            expect(words).not.toBeInstanceOf(ApiError);
            assertWordsMatch(wordsMock.words as TWord[], words as TWord[]);
        });

        it('returns an error if the request fails', async () => {
            (axios.get as any).mockResolvedValue({
                status: 500,
            });

            const apiService = new ApiService(API_URLS.WORDS_3);
            const response = await apiService.fetchWords();

            expect(axios.get).toHaveBeenCalledWith(API_URLS.WORDS_3);
            expect(response).toBeInstanceOf(ApiError);
            expect((response as ApiError).message).toBe('Error while fetching words.');
        });
    });
});
