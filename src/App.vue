<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useStore } from 'vuex'

import EHeader from '@/components/EHeader.vue'
import HFooter from '@/components/HFooter.vue'
const store = useStore()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <EHeader v-if="!!store.state.auth.token" />
    <div
      class="flex-1"
      :class="{
        'mt-[126px]': !!store.state.auth.token,
      }"
    >
      <RouterView />
    </div>
    <HFooter />
  </div>
</template>
