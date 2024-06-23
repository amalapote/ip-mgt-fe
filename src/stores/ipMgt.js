import {defineStore} from 'pinia'
import axios from 'axios'
import {computed, ref, reactive} from "vue";
import {useRouter} from 'vue-router'

export const ipMgtStore = defineStore('ipMgt', () => {

    const router = useRouter()

    //ref state
    const loadingIp = ref(false);
    const disableIp = ref(false);
    const isSuccessIp = ref(false);
    const isErrorIp = ref(false);
    const errorResponseIp = ref(null);
    const successResponseIp = ref(null);
    const pagination = reactive({
        current_page: null,
        last_page: null,
        per_page: null,
        total: null,
    });

    //Add IP State
    const loadingAddIp = ref(false);
    const disableAddIp = ref(false);
    const isSuccessAddIp = ref(false);
    const isErrorAddIp = ref(false);
    const errorResponseAddIp = ref(null);
    const successResponseAddIp = ref(null);
    const ip = reactive({
        ip_address: null,
        label: null,
        comment: null,
    });

    // Function
    const clearIpMgtPayload = () => {
        ip.ip_address = null;
        ip.label = null;
        ip.comment = null;
        // isSuccessAddIp.value = null;
        // isErrorAddIp.value = null;
        // disableAddIp.value = false;
        // loadingAddIp.value = false;
    }

    //getter is computed
    const getLoadingIp = computed(() => loadingIp.value)
    const getDisableIp = computed(() => disableIp.value)
    const getIsSuccessIp = computed(() => isSuccessIp.value);
    const getIsErrorIp = computed(() => isErrorIp.value);
    const getErrorIp = computed(() => errorResponseIp.value);
    const getSuccessIp = computed(() => successResponseIp.value);
    const getPayLoadIp = computed(() => ip);
    const getPaginationIp = computed(() => pagination);

    const getLoadingAddIp = computed(() => loadingAddIp.value)
    const getDisableAddIp = computed(() => disableAddIp.value)
    const getIsSuccessAddIp = computed(() => isSuccessAddIp.value);
    const getIsErrorAddIp = computed(() => isErrorAddIp.value);
    const getErrorAddIp = computed(() => errorResponseAddIp.value);
    const getSuccessAddIp = computed(() => successResponseAddIp.value);
    const getPayLoadAddIp = computed(() => ip);
    const getPaginationAddIp = computed(() => pagination);

    //function is action
    async function ipGet(page = 1) {

        loadingIp.value = true;
        disableIp.value = true;

        await axios
            .get(`/api/v1/ip-management/index?page=${page}`)
            .then((response) => {
                successResponseIp.value = response.data.data
                // pagination.value = response.data.meta;
                pagination.current_page = response.data.meta.current_page;
                pagination.last_page = response.data.meta.last_page;
                pagination.per_page = response.data.meta.per_page;
                pagination.total = response.data.meta.total;

                isErrorIp.value = false;
                loadingIp.value = false;
                isSuccessIp.value = true;
                disableIp.value = false;
            })
            .catch((error) => {
                errorResponseIp.value = error.response.data;
                isErrorIp.value = true;
                loadingIp.value = false;
                isSuccessIp.value = false;
                disableIp.value = false;
            });
    }

    async function ipAudit(page = 1) {

        loadingIp.value = true;
        disableIp.value = true;

        await axios
            .get(`/api/v1/ip-management/index/audit?page=${page}`)
            .then((response) => {
                successResponseIp.value = response.data.data
                // pagination.value = response.data.meta;
                pagination.current_page = response.data.current_page;
                pagination.last_page = response.data.last_page;
                pagination.per_page = response.data.per_page;
                pagination.total = response.data.total;

                // isErrorIp.value = false;
                loadingIp.value = false;
                // isSuccessIp.value = true;
                // disableIp.value = false;
            })
            .catch((error) => {
                errorResponseIp.value = error.response;
                // isErrorIp.value = true;
                loadingIp.value = false;
                // isSuccessIp.value = false;
                // disableIp.value = false;
            });
    }

    async function ipAdd(payload) {
        loadingAddIp.value = true;
        disableAddIp.value = true;
        await axios
            .post(`/api/v1/ip-management/store`, payload)
            .then((response) => {
                successResponseAddIp.value = response.data.data
                isErrorAddIp.value = false;
                loadingAddIp.value = false;
                isSuccessAddIp.value = true;
                disableAddIp.value = false;
                clearIpMgtPayload();
                ipGet();
            })
            .catch((error) => {
                errorResponseAddIp.value = error.response.data.errors;
                isErrorAddIp.value = true;
                loadingAddIp.value = false;
                isSuccessAddIp.value = false;
                disableAddIp.value = false;
            });
    }

    async function ipEdit(payload) {
        loadingAddIp.value = true;
        disableAddIp.value = true;
        await axios
            .put(`/api/v1/ip-management/update/${payload.id}`, payload)
            .then((response) => {
                successResponseAddIp.value = response.data.data
                isErrorAddIp.value = false;
                loadingAddIp.value = false;
                isSuccessAddIp.value = true;
                disableAddIp.value = false;
                clearIpMgtPayload();
                ipGet();
            })
            .catch((error) => {
                errorResponseAddIp.value = error.response.data.errors;
                isErrorAddIp.value = true;
                loadingAddIp.value = false;
                isSuccessAddIp.value = false;
                disableAddIp.value = false;
            });
    }


    return {
        ipGet,
        ipAdd,
        ipEdit,
        ipAudit,
        ip,
        pagination,
        getDisableIp,
        getLoadingIp,
        getIsSuccessIp,
        getIsErrorIp,
        getErrorIp,
        getSuccessIp,
        getPayLoadIp,
        getPaginationIp,
        getDisableAddIp,
        getLoadingAddIp,
        getIsSuccessAddIp,
        getIsErrorAddIp,
        getErrorAddIp,
        getSuccessAddIp,
        getPayLoadAddIp,
        getPaginationAddIp
    }
});
