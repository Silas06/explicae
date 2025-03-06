<script lang="ts" setup>
const props = defineProps<{
  label: string
  value: string
}>()
</script>
<template>
  <span class="text-sm"
    >{{ props.label }}: <span class="font-700">{{ props.value }}</span></span
  >
</template>
