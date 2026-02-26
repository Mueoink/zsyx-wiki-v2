<!-- app/components/content/Spoiler.vue -->
<template>
    <span class="inline-block px-2 py-0.5 mx-1 rounded cursor-pointer transition-all duration-300 border" :class="revealed
        ? 'bg-gray-800 border-gray-600 text-gray-300'
        : 'bg-black border-black text-black select-none hover:bg-gray-900 hover:border-gray-900'"
        @click="revealed = true" title="点击反转剧透">
        <slot />
    </span>
</template>

<script setup>
import { ref } from 'vue'
const revealed = ref(false)
</script>