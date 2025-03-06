<script lang="ts" setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import IconLogout from '@/components/icons/IconLogout.vue'
import IconUserCircle from '@/components/icons/IconUserCircle.vue'
import { computed } from 'vue'
const store = useStore()
const router = useRouter()

const user = computed(() => store.state.auth.user)
function handleLogout() {
  store.dispatch('auth/logout')
  router.push({ name: 'Login' })
}
</script>

<template>
  <VDropdown>
    <!-- This will be the popover target (for the events and position) -->
    <div class="cursor-pointer bg-gray-50 p-4 rounded-[8px] flex items-center gap-1">
      <IconUserCircle /> <span class="whitespace-nowrap">{{ user.name }}</span>
    </div>
    <!-- This will be the content of the popover -->
    <template #popper>
      <div class="bg-white shadow-lg rounded-lg p-4">
        <button
          type="button"
          class="text-gray-500 text-sm hover:bg-gray-100 w-full flex items-center gap-1 p-2 rounded"
          @click="handleLogout"
        >
          <IconLogout />
          Sair
        </button>
      </div>
    </template>
  </VDropdown>
</template>
