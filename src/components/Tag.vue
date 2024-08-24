<script setup lang="ts">
type TProps = {
  type: string
}

const props = withDefaults(defineProps<TProps>(), {
  type: 'news'
})

const colorIndex = {
  entertainment: 'bg-sky-700',
  'tv & film': 'bg-slate-800',
  'celeb gossip': 'bg-orange-500',
  'breaking news': 'bg-red-600',
  sport: 'bg-yellow-700',
  olympics: 'bg-indigo-500',
  football: 'bg-green-600',
  music: 'bg-fuchsia-500'
}

const getTagColor = (tagTitle: string) => {
  return colorIndex[tagTitle.trim() as keyof typeof colorIndex]
}
</script>

<template>
  <div
    class="px-4 py-1 text-xs md:text-md rounded-3xl whitespace-nowrap max-w-content max-h-content"
    :class="getTagColor(props.type)">
    {{ props.type }}
  </div>
</template>

<style lang="css">
  .max-w-content {
    max-width: max-content !important;
  }
  .max-h-content {
    max-height: max-content !important;
  }
</style>