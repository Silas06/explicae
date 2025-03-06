<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  title?: string
  noChevron?: boolean
  initialShow?: boolean
  noMargin?: boolean
}
const emit = defineEmits(['toggle'])
const props = withDefaults(defineProps<Props>(), {
  title: '',
  noChevron: false,
  initialShow: false,
  noMargin: false,
})

const show = ref<boolean>(props.initialShow)

function toggle() {
  show.value = !show.value
  emit('toggle')
}

function enter(el: any) {
  el.style.height = `${el.scrollHeight}px`
}

function leave(el: any) {
  el.style.height = ''
}

watch(
  () => props.initialShow,
  () => (show.value = props.initialShow),
)
</script>

<template>
  <div :class="{ 'my-2': !noMargin }">
    <div
      class="px-2 py-1"
      :class="{
        'bg-lightest': show,
      }"
    >
      <div class="flex justify-between">
        <slot
          v-if="$slots.titleArea"
          :show="show"
          :toggle="toggle"
          v-bind="$attrs"
          name="titleArea"
        />
        <h2 v-else-if="title" class="text-xl font-600">
          {{ title }}
        </h2>
        <button v-if="!noChevron" class="flex" @click.prevent="toggle">
          <i class="fas fa-chevron-down transition-all" :class="!show ? '' : 'rotate-90'"></i>
        </button>
      </div>
      <slot name="descriptionArea" />
    </div>
    <transition
      name="accordion"
      @after-enter="leave"
      @enter="enter"
      @after-leave="leave"
      @before-leave="enter"
    >
      <div v-if="show" class="body">
        <slot />
      </div>
    </transition>
  </div>
</template>
<style>
.accordion {
  width: 100%;
  margin-bottom: 20px;
}

.accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition:
    height 0.3s ease,
    opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}
</style>
