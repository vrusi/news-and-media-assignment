import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import WordComponent from '@/components/WordComponent.vue';

describe('WordComponent', () => {
    it('renders the word', () => {
        const word = 'hello';
        const wrapper = mount(WordComponent, {
            props: {
                modelValue: { id: crypto.randomUUID(), value: word },
            },
        });

        expect(wrapper.text()).toContain(word);
    });

    it('emits a remove event when the remove button is clicked', async () => {
        const word = 'hello';
        const wrapper = mount(WordComponent, {
            props: {
                modelValue: { id: crypto.randomUUID(), value: word },
                isRemovingWords: true,
            },
        });

        await wrapper.find('button').trigger('click');

        expect(wrapper.emitted('remove')).toBeTruthy();

        expect(wrapper.emitted('remove')![0][0]).toEqual({
            id: wrapper.props().modelValue.id,
            value: word,
        });
    });
});
