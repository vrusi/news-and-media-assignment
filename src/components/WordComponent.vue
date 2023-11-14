<script setup lang="ts">
import type { TWord } from '@/services/ApiService';
import { computed } from 'vue';

const props = defineProps<{
    modelValue: TWord;
    isRemovingWords?: boolean;
}>();

const emit = defineEmits(['remove']);

const onClick = () => {
    emit('remove', props.modelValue);
};

const word = computed(() => props.modelValue.value);
</script>

<template>
    <div :class="{ word: true, 'justify-space-between': isRemovingWords }">
        {{ word }}

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
