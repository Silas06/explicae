<script lang="ts" setup>
const props = defineProps<{
  title: string
  handleBack?: () => void
}>()
</script>
<template>
  <div class="flex items-center gap-2">
    <button
      v-if="props.handleBack"
      v-tooltip="'Voltar'"
      @click="() => props.handleBack && props.handleBack()"
      class="text-primary border px-2"
    >
      <i class="fas fa-arrow-left"></i>
    </button>
    <h1 class="text-2xl font-bold my-8">{{ props.title }}</h1>
  </div>
</template>
