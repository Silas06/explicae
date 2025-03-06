<script lang="ts" setup>
import HSpinner from './HSpinner.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    bgColor?: string
    textColor?: string
    loading?: boolean
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    title: '',
    bgColor: 'bg-primary',
    textColor: 'text-white',
    type: 'button',
  },
)
</script>

<template>
  <button
    :disabled="disabled"
    :type="props.type"
    :class="`${props.bgColor} ${props.textColor} flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-pure focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 font-600 text-lg`"
  >
    <slot>
      {{ props.title }}
    </slot>
    <HSpinner v-if="loading" height="h-6" />
  </button>
</template>
