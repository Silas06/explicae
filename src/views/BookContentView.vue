<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import HFullSpinner from '@/components/HFullSpinner.vue'
import ETitlePage from '@/components/ETitlePage.vue'
import HBookTopics from '@/components/HBookTopics.vue'
import sleep from '@/utils/sleep'
import { topics } from '@/data/topics'

import { useRoute } from 'vue-router'
import type { ITopic } from '@/types/topic'
import router from '@/router'
const route = useRoute()
const loading = ref(false)
const bookTopics = ref<ITopic[]>()

const bookName = computed(() => {
  const bookSlug = route.params.slug
  return bookSlug || ''
})

async function loadBookTopics() {
  try {
    loading.value = true
    await sleep(1000)
    type BookSlug = 'lingua-portuguesa' | 'matematica'
    const slug = String(route.params.slug) as BookSlug
    console.log(slug)

    const slugMock = 'lingua-portuguesa'

    const topicsItem = topics[slugMock]

    if (!topicsItem) {
      throw new Error('Tópicos não encontrados')
    }
    const topicsList = topicsItem.topics
    bookTopics.value = topicsList
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBookTopics()
})
</script>

<template>
  <HFullSpinner v-if="loading" />
  <div class="max-w-screen-2xl mx-auto px-4">
    <ETitlePage :title="`Caderno - ${bookName}`" :handleBack="() => router.go(-1)" />
    <HBookTopics :bookTopics="bookTopics || []" :initialShow="0"> </HBookTopics>
  </div>
</template>
