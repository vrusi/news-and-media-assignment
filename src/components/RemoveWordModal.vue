<script setup lang="ts">
import type { TWord } from '@/lib/ApiService';

defineProps<{
    isModalOpen?: boolean;
    word: TWord;
}>();

const emit = defineEmits(['close', 'remove']);

const onRemove = () => {
    emit('remove');
};

const onClose = () => {
    emit('close');
};
</script>

<template>
    <Dialog
        :visible="isModalOpen"
        @update:visible="onClose"
        modal
        header="Are you sure you want to remove this word?"
        class="modal"
    >
        <div class="word">
            {{ word.value }}
        </div>

        <Button label="Remove" class="w-100" @click="onRemove" severity="danger" />
    </Dialog>
</template>

<style scoped>
.word {
    margin: 2rem auto;
    text-align: center;
    font-size: 2rem;
}
</style>
