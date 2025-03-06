<script setup lang="ts">
import { Field, defineRule } from 'vee-validate'
import * as validations from '@/utils/validators'

const objValid: any = validations

Object.keys(objValid).forEach((x: string) => {
  defineRule(x, objValid[x])
})

const props = withDefaults(
  defineProps<{
    label?: string
    type?: string
    name: string
    placeholder?: string
    mask?: string
    maska?: string | object
    min?: number
    disabled?: boolean
    rules?: string
  }>(),
  {
    label: '',
    type: 'text',
    name: '',
    placeholder: '',
    mask: '',
    maska: '',
    min: 0,
    disabled: false,
    rules: '',
  },
)

const value = defineModel<number | string>()

const emit = defineEmits(['change', 'blur', 'enter'])
function change() {
  emit('change')
}
function blur() {
  emit('blur')
}
function enter() {
  emit('enter')
}
</script>

<template>
  <Field v-slot="{ field, errorMessage }" v-model="value" :name="name" :rules="rules">
    <label class="flex flex-col gap-1 w-full mb-5">
      <span class="font-500 text-[#111928]">{{ props.label }}</span>
      <div class="relative">
        <div v-if="$slots.icon" class="absolute inset-y-0 start-0 flex items-center ps-2">
          <slot name="icon" />
        </div>
        <div v-if="$slots.suffix" class="absolute inset-y-0 end-0 flex items-center px-3">
          <slot name="suffix" />
        </div>
        <input
          v-bind="{ ...field, ...$attrs }"
          :min="min"
          v-model="value"
          v-maska="maska"
          :data-maska="mask"
          class="block bg-[#F9FAFB] w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg transition focus:ring-primary focus:border-primary focus:outline-none"
          :class="{
            'border-danger': errorMessage,
            'border-par-gray-light': !errorMessage,
            'bg-par-gray-lightest': props.disabled,
            'ps-9': $slots.icon,
          }"
          :type="props.type"
          :placeholder="props.placeholder"
          :disabled="disabled"
          @change="change"
          @blur="blur"
          @keydown.enter="enter"
        />
      </div>
      <div v-if="errorMessage" class="mx-2 mt-[-5px]">
        <span class="text-red-500 text-sm">{{ errorMessage }}</span>
      </div>
    </label>
  </Field>
</template>

<style scoped>
input::placeholder {
  color: #6b7280;
}
</style>
