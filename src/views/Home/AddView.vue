<template>
    <div v-if="getIsErrorAddIp"  role="alert">
        <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span class="sr-only">Danger</span>
            <div>
                <span v-if="getErrorAddIp" class="font-medium">{{ errorMessage }}</span>
                <ul class="mt-1.5 list-disc list-inside">
                    <li v-for="(error, key, index) in getErrorAddIp['label']" :key="index">{{ error }}</li>
                    <li v-for="(error, key, index) in getErrorAddIp['comment']" :key="index">{{ error }}</li>
                    <li v-for="(error, key, index) in getErrorAddIp['ip_address']" :key="index">{{ error }}</li>
                </ul>
            </div>
        </div>
    </div>

    <div v-if="getIsSuccessAddIp"  role="alert">
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

    <h2 class="text-2xl font-bold text-start"> {{ title }}</h2>
    <form @submit.prevent="addIp(payload)">
        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <label for="ip_Address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IP Address</label>
                <input v-model="payload.ip_address" type="text" id="ip_Address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="IP Address" required />
            </div>
            <div>
                <label for="label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Label</label>
                <input v-model="payload.label" type="text" id="label" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Label" required />
            </div>
            <div>
                <label for="comment" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
                <textarea v-model="payload.comment" id="comment" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your comments here..."></textarea>
            </div>
        </div>
        <button
            :disabled="getDisableAddIp"
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <span v-if="getLoadingAddIp"> Loading....</span>
            <span v-else> Save IP</span>
        </button>
    </form>

</template>

<script setup>
import {ipMgtStore} from "@/stores/ipMgt.js";
import {computed, ref} from "vue";

const store = ipMgtStore()

/**
 * Data
 * @type {Ref<UnwrapRef<string>>}
 */
const title = ref('Add IP Address')
const errorMessage = ref('Something went wrong!')
const successMessage = ref('Saving IP Address successful! Records will be refresh shortly')

/**
 * State
 * @type {Ref<UnwrapRef<boolean>>}
 */
const payload = store.ip;

/**
 * Getter
 * @type {ComputedRef<*>}
 */
const getLoadingAddIp = computed(() => store.getLoadingAddIp)
const getIsSuccessAddIp = computed(() => store.getIsSuccessAddIp);
const getIsErrorAddIp = computed(() => store.getIsErrorAddIp);
const getErrorAddIp = computed(() => store.getErrorAddIp);
const getSuccessAddIp = computed(() => store.getSuccessAddIp);
const getPayLoadAddIp = computed(() => store.getPayLoadAddIp);
const getDisableAddIp = computed(() => store.getDisableAddIp);
const getPaginationAddIp = computed(() => store.getPaginationAddIp);

/**
 * Action
 */
const addIp = store.ipAdd


</script>

<style scoped>

</style>
