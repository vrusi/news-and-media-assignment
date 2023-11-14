import RemoveWordsButton from '@/components/RemoveWordsButton.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('RemoveWordsButton', () => {
    it('renders properly', () => {
        const wrapper = mount(RemoveWordsButton, {
            props: {
                isRemovingWords: false,
            },
        });

        const button = wrapper.find('button');

        expect(button.exists()).toBe(true);
        expect(button.classes()).toContain('float');
        expect(button.classes()).toContain('large');
    });

    it('emits a "click" event when the button is clicked', async () => {
        const wrapper = mount(RemoveWordsButton);
        const button = wrapper.find('button');

        await button.trigger('click');

        expect(wrapper.emitted('click')).toHaveLength(1);
    });
});
