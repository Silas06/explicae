<script lang="ts" setup>
import type { ITopic } from '@/types/topic'
import HAccordion from './HAccordion.vue'
import HBookTopics from '@/components/HBookTopics.vue'
import HReportItem from './HReportItem.vue'
import { onMounted, ref, watch } from 'vue'

import HTopicContent from './HTopicContent.vue'

const props = defineProps<{
  bookTopics: ITopic[]
  isChild?: boolean
  noChevron?: boolean
  initialShow?: number
}>()

const items = ref<ITopic[]>(props.bookTopics)
const activeAccordion = ref<number | null>(props.initialShow || null)

watch(
  () => props.bookTopics,
  () => {
    items.value = props.bookTopics
  },
  { deep: true },
)

onMounted(() => {
  if (props.initialShow !== undefined) {
    activeAccordion.value = props.initialShow
  }
})
</script>

<template>
  <HAccordion
    v-for="(topic, idx) in items || []"
    :key="topic.idTopic"
    :title="topic.title"
    :no-chevron="noChevron"
    :initial-show="activeAccordion === idx"
    @toggle="activeAccordion = idx"
  >
    <template v-if="isChild" #titleArea="{ show, toggle }">
      <div class="flex items-center gap-4">
        <button
          @click="
            () => {
              toggle()
            }
          "
        >
          <i v-if="!show" class="fas fa-plus text-primary"></i>
          <i v-else class="fas fa-minus text-primary"></i>
        </button>
        <span class="">{{ topic.title }}</span>
      </div>
    </template>
    <template v-if="topic.report" #descriptionArea>
      <div class="flex gap-4 mt-1">
        <HReportItem label="Aulas" :value="topic.report.totalLesson" />
        <HReportItem label="Exercícios" :value="topic.report.totalExercices" />
        <HReportItem label="Materiais" :value="topic.report.totalMaterial" />
      </div>
    </template>
    <div :class="`${topic.topics.length > 0 ? 'pl-2' : ''}`">
      <HTopicContent v-if="topic.topics.length === 0" :id-topic="topic.idTopic" />
      <HBookTopics
        v-if="topic.topics.length > 0"
        :bookTopics="topic.topics || []"
        is-child
        no-chevron
      />
    </div>
  </HAccordion>
</template>
