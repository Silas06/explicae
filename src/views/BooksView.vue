<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import HFullSpinner from '@/components/HFullSpinner.vue'
import BookItem from '@/components/BookItem.vue'
import ETitlePage from '@/components/ETitlePage.vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const booksList = computed(() => store.state.books.books)

async function loadBooks() {
  try {
    await store.dispatch('books/getBooks')
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  loadBooks()
})
</script>

<template>
  <HFullSpinner v-if="store.state.books.loading" />
  <div class="max-w-screen-2xl mx-auto px-4">
    <ETitlePage title="Cadernos" />
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5"
    >
      <BookItem
        v-for="book in booksList"
        :key="String(book.idBooks)"
        :book="book"
        @click="router.push({ name: 'Caderno', params: { slug: book.slug } })"
      />
    </div>
  </div>
</template>
