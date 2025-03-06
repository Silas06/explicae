<script lang="ts" setup>
import { type IBook } from '@/types/book'

const props = defineProps<{
  book: IBook
}>()
</script>

<template>
  <div class="book-container">
    <!-- Páginas do livro -->
    <div class="book-pages"></div>

    <!-- Capa do livro -->
    <img :src="props.book.thumb" alt="Book cover" class="book-cover" />
  </div>
</template>

<style scoped>
.book-container {
  width: 288px; /* Ajuste conforme necessário */
  height: 396px; /* Ajuste conforme necessário */
  position: relative;
  perspective: 900px; /* Profundidade para o efeito 3D */
  cursor: pointer;
  margin: 0 auto;
}

.book-pages {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #f8f8f8, #e0e0e0); /* Simula páginas */
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 5px;
  box-shadow: inset -5px 0px 10px rgba(0, 0, 0, 0.2); /* Efeito de sombra interna */
}

.book-cover {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  transform-origin: left center; /* Faz a rotação ocorrer a partir da lateral esquerda */
  position: absolute;
  left: 0;
  top: 0;
  background-color: white;
  border-radius: 5px;
}

.book-container:hover .book-cover {
  transform: rotateY(-08deg); /* Inclina a capa para abrir */
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3); /* Sombra para dar profundidade */
}
</style>
