import { mount } from '@vue/test-utils';
import NewWordButton from '@/components/NewWordButton.vue';
import { describe, expect, it } from 'vitest';

describe('NewWordButton', () => {
    it('emits a "click" event when clicked', async () => {
        const wrapper = mount(NewWordButton);
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('renders a button with the "pi-plus" icon', () => {
        const wrapper = mount(NewWordButton);
        expect(wrapper.find('button i.pi.pi-plus')).toBeTruthy();
    });

    it('renders a button with the "large" class', () => {
        const wrapper = mount(NewWordButton);
        expect(wrapper.find('button.large')).toBeTruthy();
    });
});
