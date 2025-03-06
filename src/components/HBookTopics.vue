<script lang="ts" setup>
import type { ITopic } from '@/types/topic'
import HAccordion from './HAccordion.vue'
import HBookTopics from '@/components/HBookTopics.vue'
import HReportItem from './HReportItem.vue'
import { computed, onMounted, ref } from 'vue'

import HTopicContent from './HTopicContent.vue'

const props = defineProps<{
  bookTopics: ITopic[]
  isChild?: boolean
  noChevron?: boolean
  initialShow?: number
}>()

const activeAccordion = ref<number | null>(props.initialShow || null)

const items = computed(() => props.bookTopics)

onMounted(() => {
  if (props.initialShow !== undefined) {
    activeAccordion.value = props.initialShow
  }
})
</script>

<template>
  <HAccordion
    v-for="(topic, idx) in items"
    :key="topic.idTopic"
    :title="topic.title"
    :no-chevron="noChevron"
    :initial-show="activeAccordion === idx"
    @toggle="activeAccordion = activeAccordion === idx ? null : idx"
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
        <HReportItem label="Aulas" :value="topic.report?.totalLesson ?? 0" />
        <HReportItem label="Exercícios" :value="topic.report?.totalExercices ?? 0" />
        <HReportItem label="Materiais" :value="topic.report?.totalMaterial ?? 0" />
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
