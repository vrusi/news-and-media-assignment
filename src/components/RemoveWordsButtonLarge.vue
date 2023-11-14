<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    isRemovingWords?: boolean;
}>();

defineEmits(['click']);

const label = computed(() => {
    return props.isRemovingWords ? 'Cancel' : 'Remove';
});

const severity = computed(() => {
    return props.isRemovingWords ? 'secondary' : 'danger';
});
</script>

<template>
    <Button
        :class="{
            'mr-1': !isRemovingWords,
            'w-100 text-center': true,
        }"
        :outlined="!isRemovingWords"
        :severity="severity"
        @click="$emit('click')"
    >
        <span class="w-100 text-center"> {{ label }} </span>
    </Button>
</template>
