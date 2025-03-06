<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { Form } from 'vee-validate'
import IconLogo from '@/components/icons/IconLogo.vue'
import EButton from '@/components/EButton.vue'
import EInput from '@/components/EInput.vue'
import router from '@/router'

const store = useStore()
const email = ref('')
const password = ref('')
const showPassword = ref(false)

async function handleLogin() {
  try {
    await store.dispatch('auth/login', { email: email.value, password: password.value })
    router.push({ name: 'Cadernos' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main>
    <div class="h-[270px] bg-primary w-full flex items-center justify-center">
      <IconLogo color="var(--color-lightest)" />
    </div>
    <div class="px-5">
      <div class="bg-white py-10 px-8 rounded-lg shadow-lg w-full max-w-[550px] mx-auto mt-[-60px]">
        <h1 class="text-2xl font-bold text-center">Login</h1>
        <Form class="mt-4" @submit="handleLogin">
          <EInput v-model="email" label="Email" name="email" rules="required|email" />
          <EInput
            v-model="password"
            label="Senha"
            name="password"
            :type="showPassword ? 'text' : 'password'"
            rules="required"
          >
            <template #suffix>
              <button type="button" class="p-2 relative" @click="showPassword = !showPassword">
                <i v-if="!showPassword" class="fas fa-eye"></i>
                <i v-else class="fas fa-eye-slash"></i>
              </button>
            </template>
          </EInput>
          <EButton
            :loading="store.state.auth.loading"
            :disabled="store.state.auth.loading"
            type="submit"
            title="Entrar"
            bgColor="bg-primary"
            textColor="text-white"
            class="w-full mt-5"
          />
        </Form>
      </div>
    </div>
  </main>
</template>
