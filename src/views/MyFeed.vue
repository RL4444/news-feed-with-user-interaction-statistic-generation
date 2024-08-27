<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue'
import { getCurrentState } from '../state/useLocalStorage';
import moment from 'moment';
import ListWrapper from '../components/ListWrapper.vue'
import { type TNewsItem } from '../types/index'
import music from '../__data/bbc-music.json'
import news from '../__data/bbc-news.json'
import sport from '../__data/bbc-sport.json'
import tvFilm from '../__data/bbc-tv-film.json'

const sortedStories = ref<Array<TNewsItem>>([] as Array<TNewsItem>)
const sortNewsStories = async () => {
    const todaysDate = moment().format('DD-MM-yyyy');
    const yesterdaysDate = moment().subtract('1', 'day').format('DD-MM-yyyy')
    // only the latest news stories are impportant here
    const allNews = [...music.data, ...news.data, ...sport.data, ...tvFilm.data].flat().filter(eachStory => {
        if (eachStory.downloadedAt === todaysDate || eachStory.downloadedAt === yesterdaysDate) {
            return true
        }
    });
    const state = getCurrentState();

    // TODO: potentially make this a ref for extending the amount of stories generated
    const LIMIT = 30;
    do
        for (const metric in state.weight_metrics) {
            if (sortedStories.value.length < LIMIT) {
                const chooseRandomStory = async (tag: string) => {
                    const filteredByTag = allNews.filter(eachStory => eachStory.tag.indexOf(tag) > -1);
                    if (!filteredByTag.length) return

                    const randomIndex = Math.floor(Math.random() * filteredByTag.length) + 1;
                    if (filteredByTag[randomIndex] && sortedStories.value.indexOf(filteredByTag[randomIndex]) < 0) {
                        const storyRaw = toRaw(filteredByTag[randomIndex]);
                        const currentStoriesCopy = toRaw([...sortedStories.value])
                        sortedStories.value = [...currentStoriesCopy, storyRaw]
                        return
                    } else {
                       await chooseRandomStory(tag)
                    }
                }

                for (let i = 0; i < state.weight_metrics[metric]; i++) {
                   await chooseRandomStory(metric)
                }
            }
        }
    while (sortedStories.value.length < LIMIT);
    const unRawStories = [... new Set(sortedStories.value.map(eachStory => toRaw(eachStory)).flat())];
    sortedStories.value = unRawStories
}

const loaded = ref<boolean>(false)
onMounted(async () => {
    await sortNewsStories();
    loaded.value = true
})
</script>

<template>
    <div class="w-full" v-if="loaded">
        <ListWrapper :data="sortedStories" />
    </div>
</template>