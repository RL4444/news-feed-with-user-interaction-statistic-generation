<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted } from 'vue'
import NewsItem from './NewsItem.vue'

type TNewsItem = {
  id: string
  title: string
  description?: string
  url: string
  imgSrc?: string
  imgSrcSet?: string
  downloadedAt?: string
  tag: string
}

type TProps = {
  data: Array<TNewsItem>
}

const props = defineProps<TProps>();
const loaded = ref<boolean>(false);
const imageIndex = ref<number>(0);
const isMoving = ref<boolean>(false);

const moveImage = async () => {
  isMoving.value = true;
  const imageToScrollTo = document.getElementById(`image-${imageIndex.value}`);
  window.scrollTo({top: imageToScrollTo?.offsetTop, behavior: 'smooth'})
  setTimeout(() => isMoving.value = false, 400)
}

const handleScroll = (e: any) => {
  if (isMoving.value) return
  if (e.type === 'wheel') {
    if (e.wheelDeltaY <= -80) {
      console.log('move image down');
      if (imageIndex.value + 1 <= props.data.length) {
        imageIndex.value = imageIndex.value + 1
        moveImage()
      }
    } else if (e.wheelDeltaY >= 80) {
      console.log('going back image up');
      if (imageIndex.value -1 >=0) {
        imageIndex.value = imageIndex.value - 1
        moveImage()
      }
    }
  } else {
    console.log({ e })
  }
}

const checkScrollPosition = (e: any) => {
  console.log('e in checkScrollPosition ', e)
}

onMounted(() => {
  window.scrollTo({top: 0, behavior: 'instant'})
  const container = document.getElementById('news-container')
  container?.addEventListener('wheel', handleScroll)
  container?.addEventListener('scroll', checkScrollPosition)

  loaded.value = true
})

onUnmounted(() => {
  const container = document.getElementById('news-container')
  container?.removeEventListener('wheel', handleScroll)
  container?.removeEventListener('scroll', checkScrollPosition)
})
</script>


<template>
  <div @scroll="checkScrollPosition" id="news-container" class="h-[100dvh!] w-[100vw!] relative overflow-auto">
    <NewsItem v-for="(item, index) in props.data" :imageId="`image-${index}`" :key="item.id" :id="item.id"
      :title="item.title" :description="item.description" :url="item.url" :imgSrc="item.imgSrc!"
      :imgSrcSet="item.imgSrcSet" :downloadedAt="item.downloadedAt" :tag="item.tag" />
  </div>
</template>
