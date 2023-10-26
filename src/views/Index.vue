<script setup lang="ts">
import Carousel from './carousel/Carousel.vue'
import Search from './search/Search.vue'
import Dashboard from './dashboard/Dashboard.vue'
</script>

<template>
    <div class="carousel-container">
        <Carousel></Carousel>
    </div>
    <div class="search-container">
        <Search></Search>
    </div>
    <div class="dashboard">
        <Dashboard></Dashboard>
    </div>
</template>

<style scoped>
.carousel-container{
    margin-bottom: 60px;
}
.search-container{
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
}
</style>