<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    isRemovingWords?: boolean;
}>();

defineEmits(['click']);

const icon = computed(() => {
    return props.isRemovingWords ? 'pi pi-times' : 'pi pi-trash';
});

const severity = computed(() => {
    return props.isRemovingWords ? 'secondary' : 'danger';
});
</script>

<template>
    <Button class="float" :icon="icon" rounded @click="$emit('click')" :severity="severity" />
</template>

<style scoped>
.float {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    box-shadow: 2px 2px 3px #999;
}
</style>
