<script setup lang="ts">
defineEmits(['click']);
defineProps<{
    isRemovingWords?: boolean;
}>();
</script>

<template>
    <Button v-if="!isRemovingWords" class="w-100 text-center ml-2" @click="$emit('click')">
        <span class="w-100 text-center"> Create </span>
    </Button>
</template>
