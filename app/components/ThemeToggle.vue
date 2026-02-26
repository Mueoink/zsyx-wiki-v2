<!-- app/components/ThemeToggle.vue -->
<template>
    <button @click="toggleTheme"
        class="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
        title="切换昼夜模式">

        <ClientOnly>
            <Icon v-if="colorMode.value === 'dark'" name="ph:sun-duotone" class="text-xl text-amber-500" />
            <Icon v-else name="ph:moon-duotone" class="text-xl text-indigo-500" />
            <template #fallback>
                <div class="w-5 h-5 rounded-full border-2 border-gray-300 animate-pulse"></div>
            </template>
        </ClientOnly>
    </button>
</template>

<script setup>
import { useColorMode } from '#imports'

const colorMode = useColorMode()

const toggleTheme = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>