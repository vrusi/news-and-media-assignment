<script setup lang="ts">
defineEmits(['click']);
</script>

<template>
    <Button class="float large" icon="pi pi-plus" rounded @click="$emit('click')" />
</template>

<style scoped>
.float {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    box-shadow: 2px 2px 3px #999;
}

.large {
    width: 4rem;
    height: 4rem;
}
</style>
