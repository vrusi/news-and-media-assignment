import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import WordComponent from '../WordComponent.vue';

describe('WordComponent', () => {
    it('renders properly', () => {
        const wrapper = mount(WordComponent);
        expect(wrapper.text()).toContain('word');
    });
});
