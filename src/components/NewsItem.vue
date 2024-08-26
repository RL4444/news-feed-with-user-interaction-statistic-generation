<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Tag from './Tag.vue'
import { getCurrentState, updateState } from '../state/useLocalStorage'
import { CaTime, CaStarFilled, CaStar } from '@kalimahapps/vue-icons'

type TNewsItem = {
    id: string
    title: string
    description?: string
    url: string
    imgSrc: string
    imgSrcSet?: string
    downloadedAt?: string
    tag: string
    imageId: string
}

const toggleFavourite = () => {
    const userPreferences = getCurrentState();
    isFavourited.value = !isFavourited.value
    console.log({ userPreferences });

    if (isFavourited.value) {
        userPreferences.fav_stories.push(props.id)
    } else {
        userPreferences.fav_stories = userPreferences.fav_stories.filter((eachId: string) => eachId !== props.id)
    }

    updateState(userPreferences)
}

const isFavourited = ref<boolean>(false)
const props = withDefaults(defineProps<TNewsItem>(), {})
const tags = ref<Array<string>>(['news'])
onMounted(() => {
    // split tags strings into array of strings 
    if (props.tag) {
        if (props.tag.includes(',')) {
            tags.value = props.tag.split(',')
        } else {
            tags.value = [props.tag]
        }
    }

    // check if user has marked this as a favourite
    const userPreferences = getCurrentState();
    if (userPreferences.fav_stories.indexOf(props.id) >= 0) {
        isFavourited.value = true
    }
})

</script>
<template>
    <div class="h-[100vh] w-[100vw] relative" :id="props.imageId">
        <div class="absolute p-2 z-20 flex flex-col items-end h-[100vh] w-[100vw]">
            <div class="mt-auto flex justify-end">

            </div>
            <div class="flex flex-col mt-auto w-full justify-between">
                <div class="leading-loose p-2 md:p-8">
                    <div>
                        <span class="flex items-baseline">
                            <p
                                class="tex-white text-4xl bg-red-600 font-bold mr-8 mt-12 mb-6 px-4 rounded max-w-content">
                                BBC</p>
                            <button @click="toggleFavourite">
                                <CaStarFilled v-if="isFavourited" class="icon" />
                                <CaStar v-else class="icon" />
                            </button>
                        </span>
                        <h2 class="text-white font-extrabold text-2xl sm:text-4xl xl:text-7xl md:max-w-[40vw]">
                            {{ props.title }}
                        </h2>
                    </div>
                    <div class="flex mt-2 md:mt-4 md:max-w-[40vw]">
                        <span class="flex items-center gap-2">
                            <CaTime />
                            <span>{{ props.downloadedAt }}</span>
                        </span>
                    </div>
                    <div class="mt-2 md:mt-4 flex flex-row gap-4">
                        <Tag v-for="tag in tags" :key="tag" :type="tag" />
                    </div>
                    <div class="flex flex-col lg:flex-row mt-4 md:mt-6 my-6 gap-4 lg:max-w-[40vw]">
                        <p v-if="props.description" class="text-white md:text-xl">
                            {{ props.description }}...
                        </p>
                    </div>
                    <div class="max-w-[200px] mx-auto">
                        <a :href="props.url" target="_blank" ref="noopener norefferer"
                            class="bg-white text-red-500 font-bold shadow-lg no-underline px-8 py-2 flex rounded justify-center text-nowrap">
                            Read More
                        </a>
                    </div>
                </div>
                <div class="md:mb-8 md:p-4 md:h-20 md:mt-auto md:mx-auto md:hidden w-full"></div>
            </div>
        </div>
        <!-- image-darkening -->
        <div class="h-[100%] absolute w-[100%] darker-image inset-0 z-10"></div>
        <!-- shadow-layers -->
        <div class="h-[75vh] md:h-[100%] absolute w-[100%] inner-shadow inset-0 z-10"></div>
        <img class="h-[60vh] left-0 top-[0vh] right-0 md:h-[100%] object-cover absolute w-[100%] md:inset-0 z-0"
            :alt="props.description" :srcset="props.imgSrcSet" :src="props.imgSrc" />
    </div>
</template>

<style scoped lang="css">
.icon {
    color: #f4e91b;
    font-size: 2.1em;
    margin-right: 0.5em;
}
</style>