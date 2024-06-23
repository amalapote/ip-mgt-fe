<template>
    <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-200 mt-14">
            <Breadcrumb class="mt-0 mb-5"/>
            <div>
                <button @click="toggleVisibility"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><span v-if="isVisible"> Close Add IP Form</span> <span v-else> Open Add IP Form </span></button>
                <button @click="fetchItems()" type="button" class=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><span v-if="getLoading"> Loading Page</span> <span v-else> Refresh </span></button>
            </div>

            <div class="clearfix"></div>
            <div v-show="isVisible" class="mt-2 mb-5 border-b-solid border-2 border-sky-500 rounded-lg px-2 pb-4">
                <AddView/>
            </div>
            <div id="edit-custm" v-show="isVisibleEdit" class="mt-2 mb-5 border-b-solid border-2 border-sky-500 rounded-lg px-2 pb-4">
                <EditView :details="itemId" :toggleVisibility="isVisibleEdit" />
            </div>

            <div v-if="getIsSuccess" class="relative">

                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            IP
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Label
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Created
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Updated
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Comment
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Author
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody v-if="getSuccess">
                    <tr  v-for="(item, key, index) in getSuccess" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="px-6 py-4"> {{ item.id }}</td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ item.ip_address }}

                            <pre v-if="item[item.id] === itemId">
                                {{ item }}
                            </pre>
                        </th>
                        <td v-if="editIndex !== index">{{ item.label }}</td>
                        <td v-else>
                            <input v-model="editedItem.label" />
                        </td>
                        <td class="px-6 py-4">
                            {{ item.created_at }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.updated_at }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.comment }}
                        </td>
                        <td v-if="item.user" class="px-6 py-4">
                            {{ `${item.user.first_name} ${item.user.last_name}`}}
                        </td>
                        <td v-else class="px-6 py-4">
                            {{ '-' }}
                        </td>
                        <td class="px-6 py-4">
                            <router-link to="#edit-custm" @click="toggleEditVisibility(item)">Edit</router-link>
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
    store.ipGet()
});

</script>

<style scoped>
/* Add any additional styles here */
</style>
