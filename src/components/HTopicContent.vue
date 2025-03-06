<script lang="ts" setup>
import { topic } from '@/data/topicDetail'
import type { ITopic } from '@/types/topic'
import { formatTime } from '@/utils/formatTime'
import sleep from '@/utils/sleep'
import { computed, onMounted, ref } from 'vue'
import HCheckbox from './HCheckbox.vue'
import HSpinner from './HSpinner.vue'
import HReportItem from './HReportItem.vue'
import HSlidesHorizontal from './HSlidesHorizontal.vue'
import type { IExerciseExibition, IExercise, IArchiveExibition, IArchive } from '@/types/topic'
const props = defineProps<{
  idTopic: number
}>()
const loading = ref<boolean>(false)
const topicDetail = ref<ITopic | null>()
const activeTab = ref<'lesson' | 'exercise' | 'material'>('lesson')

const exercicesItems = computed(() => {
  const items: IExerciseExibition[] = []
  const exercisesEnem = topicDetail.value?.exercices?.filter(
    (item: IExercise) => item.IDModelVestibular === 1,
  )
  const exercisesFuvest = topicDetail.value?.exercices?.filter(
    (item: IExercise) => item.IDModelVestibular === 2,
  )

  const totalQuestionEnem = exercisesEnem?.length || 0
  const totalDurationEnem = exercisesEnem?.reduce(
    (acc: number, curr: IExercise) => acc + curr.duration,
    0,
  )
  const exerciseEnemCount = `${totalQuestionEnem} ${totalQuestionEnem > 1 ? 'questões' : 'questão'} | ${formatTime(totalDurationEnem)}`

  items.push({
    exercises: exercisesEnem,
    title: 'QUESTÕES ENEM',
    count: exerciseEnemCount,
  })

  const totalQuestionFuvest = exercisesFuvest?.length || 0
  const totalDurationFuvest = exercisesFuvest?.reduce(
    (acc: number, curr: IExercise) => acc + curr.duration,
    0,
  )
  const exerciseFuvestCount = `${totalQuestionFuvest} ${totalQuestionFuvest > 1 ? 'questões' : 'questão'} | ${formatTime(totalDurationFuvest)}`

  items.push({
    exercises: exercisesFuvest,
    title: 'QUESTÕES FUVEST',
    count: exerciseFuvestCount,
  })

  return items || []
})

const totalExercices = computed(() => {
  return exercicesItems.value?.reduce(
    (acc, curr) => (curr.exercises ? acc + curr.exercises.length : acc + 0),
    0,
  )
})

const materialItems = computed(() => {
  const items: IArchiveExibition[] = []
  const theoryItems = topicDetail.value?.archives?.filter(
    (item: IArchive) => item.IDMaterialType === 2,
  )
  const revisionItems = topicDetail.value?.archives?.filter(
    (item: IArchive) => item.IDMaterialType === 5,
  )
  const questionEnemItems = topicDetail.value?.archives?.filter(
    (item: IArchive) => item.IDMaterialType === 0,
  )

  const totaltheoryItems = theoryItems && theoryItems.length > 0 ? theoryItems[0]?.questionCount : 0
  const totalDurationTheory = theoryItems?.reduce(
    (acc: number, curr: IExercise) => acc + curr.duration,
    0,
  )
  const theoryCount = `${totaltheoryItems} ${totaltheoryItems > 1 ? 'questões' : 'questão'} | ${formatTime(totalDurationTheory)}`

  items.push({
    archives: theoryItems,
    title: 'TEORIA + QUESTÕES ORIENTADAS',
    count: theoryCount,
  })

  const totalRevisionItems =
    revisionItems && revisionItems.length > 0 ? revisionItems[0].questionCount : 0
  const totalDurationRevision = revisionItems?.reduce(
    (acc: number, curr: IExercise) => acc + curr.duration,
    0,
  )
  const revisionCount = `${totalRevisionItems} ${totalRevisionItems > 1 ? 'questões' : 'questão'} | ${formatTime(totalDurationRevision)}`
  items.push({
    archives: revisionItems,
    title: 'REVISÃO',
    count: revisionCount,
  })

  const totalEnemItems =
    questionEnemItems && questionEnemItems.length > 0 ? questionEnemItems[0].questionCount : 0
  const totalDurationEnem = questionEnemItems?.reduce(
    (acc: number, curr: IExercise) => acc + curr.duration,
    0,
  )
  const enemCount = `${totalEnemItems} ${totalEnemItems > 1 ? 'questões' : 'questão'} | ${formatTime(totalDurationEnem)}`
  items.push({
    archives: questionEnemItems,
    title: 'QUESTÕES ENEM',
    count: enemCount,
  })

  return items
})

const totalMaterial = computed(() => {
  return materialItems.value?.reduce(
    (acc, curr) => (curr.archives ? acc + curr.archives.length : acc + 0),
    0,
  )
})

const totalLesson = computed(() => {
  return topicDetail.value?.videos?.length || 0
})

async function handleGetTopicDetail() {
  try {
    loading.value = true
    await sleep(1000)
    const topicItem = topic.find((item) => item.idTopic === props.idTopic)
    topicDetail.value = topicItem
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  handleGetTopicDetail()
})
</script>
<template>
  <HSlidesHorizontal class="justify-start flex px-2 bg-lightest pt-4">
    <HReportItem
      label="Aulas"
      :value="String(totalLesson)"
      class="cursor-pointer border-b-[3px]"
      :class="{
        'border-primary': activeTab === 'lesson',
        'border-transparent': activeTab !== 'lesson',
      }"
      @click="activeTab = 'lesson'"
    />
    <HReportItem
      label="Exercícios"
      :value="String(totalExercices)"
      class="cursor-pointer border-b-[3px]"
      :class="{
        'border-primary': activeTab === 'exercise',
        'border-transparent': activeTab !== 'exercise',
      }"
      @click="activeTab = 'exercise'"
    />
    <HReportItem
      label="Materiais"
      :value="String(totalMaterial)"
      class="cursor-pointer border-b-[3px]"
      :class="{
        'border-primary': activeTab === 'material',
        'border-transparent': activeTab !== 'material',
      }"
      @click="activeTab = 'material'"
    />
  </HSlidesHorizontal>

  <div v-if="loading">
    <HSpinner />
  </div>
  <div v-if="!loading && topicDetail" class="pl-4 mt-4">
    <template v-if="activeTab === 'lesson'">
      <p class="font-500 text-sm">TEORIA</p>
      <ul>
        <li
          v-for="item in topicDetail.videos"
          :key="String(item.idTopic)"
          class="flex items-center justify-between gap-2 hover:bg-gray-100 py-1 cursor-pointer"
        >
          <div class="flex items-center gap-2">
            <HCheckbox v-model="item.is_complete" />
            {{ item.title }}
          </div>
          <span class="text-xs text-slate-400">{{ formatTime(item.time) }}</span>
        </li>
      </ul>
    </template>
    <template v-else-if="activeTab === 'exercise'">
      <div v-for="item in exercicesItems" :key="String(item.title)" class="mb-4">
        <div class="flex justify-between">
          <p class="font-500 text-sm">{{ item.title }}</p>
          <div>
            <span class="font-500 text-sm">{{ item.count }}</span>
          </div>
        </div>
        <ul>
          <li
            v-for="exercise in item!.exercises"
            :key="String(exercise.title)"
            v-tooltip="'Conteúdo exclusivo para aluno premium'"
            class="flex items-center justify-between gap-2 hover:bg-gray-100 py-1 cursor-pointer text-gray-400"
          >
            <div class="flex items-center gap-2">
              <i class="fas fa-lock"></i>
              {{ exercise.title }}
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">
                {{
                  `${exercise.questionCount} ${exercise.questionCount > 1 ? 'questões' : 'questão'}`
                }}
                | {{ formatTime(exercise.duration) }}</span
              >
              <i class="fas fa-list"></i>
            </div>
          </li>
        </ul>
      </div>
    </template>
    <template v-else-if="activeTab === 'material'">
      <div v-for="item in materialItems" :key="String(item.title)" class="mb-4">
        <div class="flex">
          <p class="font-500 text-sm flex-1">{{ item.title }}</p>
          <div>
            <span class="font-500 text-sm">{{ item.count }}</span>
          </div>
        </div>
        <ul>
          <li
            v-for="archive in item!.archives"
            :key="String(archive.title)"
            v-tooltip="'Conteúdo exclusivo para aluno premium'"
            class="flex flex-col sm:flex-row sm:items-center gap-2 hover:bg-gray-100 py-1 cursor-pointer text-gray-400"
          >
            <div class="flex sm:items-center gap-2 flex-1">
              <i class="fas fa-lock"></i>
              {{ archive.title }}
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm"
                >{{
                  `${archive.questionCount} ${archive.questionCount > 1 ? 'questões' : 'questão'}`
                }}
                | {{ formatTime(archive.duration) }}</span
              >
              <i class="fas fa-list"></i>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
