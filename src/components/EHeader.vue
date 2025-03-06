<template>
  <div class="area-header">
    <header>
      <button
        @click="$router.push({ name: 'Home' })"
        class="absolute md:top-2 left-0 w-[150px] md:w-[300px]"
      >
        <img src="../assets/logo.svg" alt="Logo" />
      </button>
      <nav id="nav" :class="{ active: active }">
        <ul class="menu">
          <li>
            <button
              class="cursor-pointer"
              :class="{ ativo: route.name === 'Cadernos' }"
              @click="handleNavigate('Cadernos')"
            >
              CADERNOS
            </button>
          </li>
        </ul>
      </nav>

      <div class="flex items-center pr-5">
        <UserAuth />
        <div class="justify-between showMenu">
          <button id="btn-mobile" class="bg-white" @click.stop.prevent="toggleMenu">
            <span id="hamburger"></span>
          </button>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import UserAuth from '@/components/UserAuth.vue'
const router = useRouter()
const route = useRoute()

const active = ref(true)

function watchScreenWidth() {
  const widthScreen = window.innerWidth
  if (widthScreen < 1770) active.value = false
  else active.value = true
}

function handleNavigate(nameRoute: string) {
  router.push({ name: nameRoute })

  if (window.innerWidth < 1600) toggleMenu()
}

function toggleMenu() {
  active.value = !active.value
}

onMounted(() => {
  window.addEventListener('resize', watchScreenWidth)
})
</script>

<style scoped>
.showMenu {
  display: none;
}

.area-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 137px;
  transition: all 0.8s ease-in-out;
  z-index: 102;
}

header {
  background-color: var(--color-lightest);
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  align-items: center;
  height: 95px;
  position: relative;
}

nav {
  width: 100%;
  display: flex;
  justify-content: center;
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 64px;
}

.menu li {
  text-transform: uppercase;
  display: block;
  text-align: center;
  line-height: 1.1;
  transition: all 0.3s;
  white-space: nowrap;
  font-size: 24px;
}

#btn-mobile {
  display: none;
}

#hamburger {
  border-top: 2px solid;
  width: 20px;
  display: block;
  color: var(--color-light);
}

#hamburger::after,
#hamburger::before {
  content: '';
  display: block;
  width: 20px;
  height: 2px;
  background-color: currentColor;
  margin-top: 5px;
  transition: 0.3s;
  position: relative;
}

.active#hamburger {
  border-color: transparent;
}

.active#hamburger::before {
  transform: rotate(135deg);
}

.active#hamburger::after {
  transform: rotate(-135deg);
  top: -7px;
}

.ativo {
  color: var(--color-primary) !important;
  font-weight: bolder;
}

.menu li:has(a):has(.ativo) {
  /* border-color: #fff; */
}

.menu li:not(:last-child) {
  padding: 5px;
}

.menu li button {
  text-transform: uppercase;
  color: var(--color-primary);
  text-decoration: none;
  transition: all 0.3s;
}

.menu li button:hover {
  font-weight: 600;
}

@media (max-width: 1770px) {
  header::after {
    height: 16.4px;
    width: 100vw;
  }

  header {
    z-index: 195;
    overflow: hidden;
    height: 83px;
  }

  .ativo {
    font-weight: 600;
  }

  .menu li:hover {
    transform: scale(1.1);
  }

  .menu li {
    max-width: 100%;
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    font-size: 18px;
  }
}

@media (max-width: 970px) {
  .menu {
    top: 100px;
    gap: 25px;
  }
}

@media (max-width: 1600px) {
  #nav.active .menu {
    display: initial;
    animation: enterUp 0.3s;
  }
  #btn-mobile {
    display: flex;
    padding: 0.8rem;
    border-radius: 0.4rem;
    border: none;
    background: none;
    align-items: center;
  }
  .menu li {
    border-top: solid 8px #ffffff30;
  }

  .showMenu {
    display: initial;
  }

  nav {
    justify-content: end;
    padding-right: 1rem;
  }

  .menu {
    display: none;
    flex-direction: column;
    position: fixed;
    width: 100%;
    background-color: var(--color-lightest);
    z-index: 199;
    right: 0;
    left: 0;
    top: 93px;
    bottom: 0;
    padding: 0;
    margin-top: -10px;
    overflow: auto;
  }
}

@keyframes enterUp {
  0% {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }

  100% {
    transform: translate3d(0, 0px, 0);
    opacity: 1;
  }
}
</style>
