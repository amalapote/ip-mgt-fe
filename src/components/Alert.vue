<!-- src/components/Alert.vue -->
<template>

    <div v-if="visible"  role="alert">
        <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span class="sr-only">Danger</span>
            <pre>
                {{ errorMessage }}
            </pre>
            <div>
                <span v-if="message" class="font-medium">{{ 'Something went wrong' }}</span>
                <ul v-if="message.errors" class="mt-1.5 list-disc list-inside">
                    <li v-for="(error, index) in message.errors" :key="index">{{ error[0] }}</li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, watch} from 'vue'

const props = defineProps({
    message: {
        type: Object,
        required: true
    },
    show: {
        type: Boolean,
        default: false
    }
})

const visible = ref(props.show)
const errorMessage = ref(props.message)

const closeAlert = () => {
    visible.value = false
}

watch(() => props.show, (newVal) => {
    visible.value = newVal
})

watch(() => props.message, (newVal) => {
    errorMessage.value = newVal
})
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
