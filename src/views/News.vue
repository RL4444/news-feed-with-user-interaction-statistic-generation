<script setup lang="ts">
import ListWrapper from '../components/ListWrapper.vue'
import data from '../__data/bbc-news.json'
</script>

<template>
    <div class="w-full">
        <ListWrapper :data="data.data"/>
    </div>
</template>