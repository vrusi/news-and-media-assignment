<script setup lang="ts">
import type { TWord } from '@/lib/ApiService';

const props = defineProps<{
    modelValue: TWord;
    isRemovingWords?: boolean;
}>();

const emit = defineEmits(['remove']);

const onClick = () => {
    emit('remove', props.modelValue);
};
</script>

<template>
    <div :class="{ word: true, 'justify-space-between': isRemovingWords }">
        {{ modelValue.value }}

        <Button
            v-if="isRemovingWords"
            icon="pi pi-trash"
            severity="danger"
            text
            class="icon"
            @click="onClick"
        />
    </div>
</template>

<style scoped>
.word {
    margin: 1rem auto;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    padding: 1rem;
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
}

.word:hover {
    cursor: pointer;
}

.justify-space-between {
    justify-content: space-between;
}

.icon {
    padding: 0;
    margin: 0;
}
</style>
