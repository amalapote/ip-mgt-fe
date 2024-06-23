<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">

            <div v-if="getIsError"  role="alert">
                <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                    <svg class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span class="sr-only">Danger</span>
                    <div>
                        <span v-if="getError" class="font-medium">{{ errorMessage }}</span>
                        <ul class="mt-1.5 list-disc list-inside">
                            <li v-for="(error, key, index) in getError['email']" :key="index">{{ error }}</li>
                            <li v-for="(error, key, index) in getError['password']" :key="index">{{ error }}</li>
                            <li v-for="(error, key, index) in getError['first_name']" :key="index">{{ error }}</li>
                            <li v-for="(error, key, index) in getError['last_name']" :key="index">{{ error }}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div v-if="getIsSuccess"  role="alert">
                <div class="flex p-4 mb-4 text-sm text-green-400 rounded-lg bg-green-400:10 dark:text-green-400" role="alert">
                    <svg class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span class="sr-only">Success</span>
                    <div>
                        <span class="font-medium">{{ successMessage }}</span>
                    </div>
                </div>
            </div>

            <h2 class="text-2xl font-bold mb-6 text-center"> {{ title }}</h2>

            <form @submit.prevent="action(payload)">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        v-model="payload.email"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-10 p-2"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label for="first_name" class="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        v-model="payload.first_name"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-10 p-2"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label for="last_name" class="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        v-model="payload.last_name"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-10 p-2"
                        required
                    />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        v-model="payload.password"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-10 p-2"
                        required
                    />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700">Password Confirmation</label>
                    <input
                        type="password"
                        id="password"
                        v-model="payload.password_confirmation"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-10 p-2"
                        required
                    />
                </div>
                <div class="flex items-center justify-between">
                    <router-link to="/" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        < Back to Login
                    </router-link>

                    <button
                        :disabled="getDisable"
                        type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <span v-if="getLoading"> Loading....</span>
                        <span v-else> Sign Up</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

</template>

<script setup>
import {useAuthStore} from '@/stores/auth'
import {ref, computed} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const store = useAuthStore()

/**
 * State
 * @type {Ref<UnwrapRef<boolean>>}
 */
  const payload = store.signUp;

/**
 * Getter
 * @type {Ref<UnwrapRef<boolean>>}
 */
const getLoading = computed(() => store.getLoading)
const getIsSuccess = computed(() => store.getIsSuccess);
const getIsError = computed(() => store.getIsError);
const getError = computed(() => store.getError);
const getSuccess = computed(() => store.getSuccess);
const getPayLoad = computed(() => store.getPayLoad);
const getDisable = computed(() => store.getDisable);

/**
 *
 * @type {Ref<UnwrapRef<boolean>>}
 */
const action = store.registration;


const title = ref('Registration')
const showAlert = ref(false)
const errorMessage = ref('Something went wrong!')
const successMessage = ref('Registration successful! You will be redirected to login shortly.')

const email = ref('')
const password = ref('')
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
