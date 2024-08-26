<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const activeRoute = ref<string>(window.location.pathname)
const handleNavClick = (newRoute: string) => {
    activeRoute.value = newRoute
}
</script>

<template>
    <nav id="navbar"
        class="fixed z-50 mx-auto flex gap-4 md:gap-12 flex-nowrap justify-center w-[100vw] overflow-scroll py-5">
        <RouterLink @click="handleNavClick('/')"
            :class="activeRoute === '/' ? 'bg-red-600 rounded-3xl px-4 py-2' : 'px-4 py-2 text-nowrap'" to="/">
            <span class="text-white text-xs md:text-md line-clamp-1 !text-nowrap">My Feed</span>
        </RouterLink>
        <RouterLink @click="handleNavClick('/news')"
            :class="activeRoute.includes('/news') ? 'bg-red-600 rounded-3xl px-4 py-2' : 'px-4 py-2 text-nowrap'"
            to="/news">
            <span class="text-white text-xs md:text-md line-clamp-1 !text-nowrap">News</span>
        </RouterLink>
        <RouterLink @click="handleNavClick('/sport')"
            :class="activeRoute.includes('/sport') ? 'bg-red-600 rounded-3xl px-4 py-2' : 'px-4 py-2 text-nowrap'"
            to="/sport">
            <span class="text-white text-xs md:text-md line-clamp-1 !text-nowrap">Sport</span>
        </RouterLink>
        <RouterLink @click="handleNavClick('/tv-film')"
            :class="activeRoute.includes('/tv-film') ? 'bg-red-600 rounded-3xl px-4 py-2' : 'px-4 py-2 text-nowrap'"
            to="/tv-film">
            <span class="text-white text-xs md:text-md line-clamp-1 !text-nowrap">TV & Film</span>
        </RouterLink>
        <RouterLink @click="handleNavClick('/music')"
            :class="activeRoute.includes('/music') ? 'bg-red-600 rounded-3xl px-4 py-2' : 'px-4 py-2 text-nowrap'"
            to="/music">
            <span class="text-white text-xs md:text-md line-clamp-1 !text-nowrap">
                Music
            </span>
        </RouterLink>
    </nav>
</template>

<style scoped lang="css">
#navbar {
    transition-duration: 0.2s;
    -ms-overflow-style: none;
    /* Internet Explorer and Edge */
    scrollbar-width: none;
    /* Firefox */

    /* Hide the scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
        display: none;
    }
}

#navbar:hover{
     background-color: rgba(1, 1, 1, 1);
}
</style>
