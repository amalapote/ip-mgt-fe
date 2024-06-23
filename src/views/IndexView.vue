<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'
</script>

<template>

    <!-- Header -->
    <Header/>

    <!-- Sidebar -->
    <Sidebar/>

    <!-- Main Content -->
    <main>
        <router-view/>
    </main>

</template>
