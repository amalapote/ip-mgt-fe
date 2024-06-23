<template>
    <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-200 mt-14">
            <Breadcrumb class="mt-0 mb-5"/>
            <div v-if="getSuccess" class="relative">

                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            EVENT
                        </th>
                        <th scope="col" class="px-6 py-3">
                            OLD VALUES
                        </th>
                        <th scope="col" class="px-6 py-3">
                            NEW VALUES
                        </th>
                        <th scope="col" class="px-6 py-3">
                            URL
                        </th>
                        <th scope="col" class="px-6 py-3">
                            IP ADDRESS
                        </th>
                    </tr>
                    </thead>
                    <tbody v-if="getSuccess">
                    <tr  v-for="(item, key, index) in getSuccess" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="px-6 py-4"> {{ item.id }}</td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ item.event }}
                        </th>
                        <td class="px-6 py-4">
                            {{ item.old_values }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.new_values }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.url }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.ip_address }}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div v-if="getPagination" class="w-auto">
                    <button
                        class="w-auto"
                        :disabled="getPagination.current_page === 1"
                        @click="fetchItems(getPagination.current_page - 1)">
                        << Previous
                    </button> |
                    <button
                        class="w-auto"
                        :disabled="getPagination.current_page === getPagination.last_page"
                        @click="fetchItems(getPagination.current_page + 1)">
                        Next >>
                    </button>
                </div>

            </div>
            <div v-else>
                <p> Please wait while where loading the page </p>
            </div>
        </div>
    </div>

</template>

<script setup>
import {ipMgtStore} from "@/stores/ipMgt.js";
import Breadcrumb from '@/components/Breadcrumb.vue';
import AddView from '@/views/Home/AddView.vue';
import EditView from '@/views/Home/EditView.vue';
import {computed, reactive, onMounted, ref} from 'vue';

const store = ipMgtStore()

const isVisible = ref(false);
const isVisibleEdit = ref(false);
const editIndex = ref(-1);
const itemId = ref(null);
const editedItem = ref({});

/**
 * Getter
 * @type {Ref<UnwrapRef<boolean>>}
 */
const getLoading = computed(() => store.getLoadingIp)
const getIsSuccess = computed(() => store.getIsSuccessIp);
const getIsError = computed(() => store.getIsErrorIp);
const getError = computed(() => store.getErrorIp);
const getSuccess = computed(() => store.getSuccessIp);
const getPayLoad = computed(() => store.getPayLoadIp);
const getDisable = computed(() => store.getDisableIp);
const getPagination = computed(() => store.getPaginationIp);


/**
 *
 * @type {Ref<UnwrapRef<boolean>>}
 */
const fetchItems = store.ipGet;

const toggleVisibility = () => {
    isVisible.value = !isVisible.value
}

const toggleEditVisibility = (item) => {
    itemId.value = item;
    isVisibleEdit.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const closeToggleEditVisibility = (item) => {
    isVisibleEdit.value = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
    store.ipAudit()
});

</script>

<style scoped>
/* Add any additional styles here */
</style>
