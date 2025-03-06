<template>
  <div
    ref="cards"
    class="overflow-x-hidden"
    @touchmove="touchMoveAges"
    @touchstart="handleTouchStartAges"
    @touchend="handleTouchEndAges"
  >
    <div class="flex items-center gap-4 relative z-20 w-[fit-content]">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDragging = ref(false)
const startX = ref()
const scrollLeft = ref()
const cards = ref<any>(null)

function handleTouchStartAges(e: any) {
  isDragging.value = true
  startX.value = e.touches[0].pageX - cards.value.offsetLeft
  scrollLeft.value = cards.value.scrollLeft
}

function handleTouchEndAges() {
  isDragging.value = false
}

function touchMoveAges(e: any) {
  if (!isDragging.value) return
  e.preventDefault()
  const x = e.touches[0].pageX - cards.value.offsetLeft
  const walk = x - startX.value
  cards.value.scrollLeft = scrollLeft.value - walk
}
</script>
