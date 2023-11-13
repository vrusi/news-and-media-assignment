<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    isModalOpen?: boolean;
}>();

const emit = defineEmits(['close', 'addNewWord']);

const newWord = ref('');

const onSave = () => {
    emit('addNewWord', newWord.value);
    newWord.value = '';
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
        header="New Word"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <InputText
            class="w-100 mb-1"
            type="text"
            v-model="newWord"
            placeholder="word"
            size="large"
        />

        <Button label="Save" class="w-100" @click="onSave" :disabled="!newWord" />
    </Dialog>
</template>

<style scoped></style>
