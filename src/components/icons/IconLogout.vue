<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: string
    size?: number
  }>(),
  {
    color: '#6B7280',
    size: 24,
  },
)
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-logout"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    :stroke="props.color"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
    <path d="M9 12h12l-3 -3" />
    <path d="M18 15l3 -3" />
  </svg>
</template>
