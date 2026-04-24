<!-- app/components/AnnouncementBoard.vue -->
<template>
    <div
        class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm transition-colors duration-300">

        <div
            class="bg-slate-50 dark:bg-[#22222b] border-b border-slate-200 dark:border-gray-700/50 px-4 py-2.5 flex items-center gap-2 transition-colors duration-300">
            <Icon name="ph:speaker-high-duotone" class="text-blue-600 dark:text-blue-400 text-lg" />
            <h3 class="font-bold text-slate-800 dark:text-gray-200 text-sm tracking-widest">情报中心</h3>
        </div>

        <ul class="p-4 space-y-3 text-sm text-slate-700 dark:text-gray-300"
            v-if="announcements && announcements.length > 0">

            <li v-for="anno in announcements" :key="anno.path" class="flex items-start gap-2 group">
                <span class="mt-1 text-[10px] transition-colors duration-300" :class="getColorClass(anno.color, 'dot')">
                    ■
                </span>

                <NuxtLink :to="anno.path" class="leading-relaxed transition-colors duration-300 line-clamp-2"
                    :class="getColorClass(anno.color, 'text')">
                    {{ anno.title }}

                    <span v-if="anno.date"
                        class="text-[10px] text-slate-400 dark:text-gray-500 ml-1 font-mono group-hover:text-slate-600 dark:group-hover:text-gray-400 transition-colors">
                        [{{ anno.date }}]
                    </span>
                </NuxtLink>
            </li>

        </ul>

        <div v-else class="p-4 text-xs text-slate-500 dark:text-gray-500 text-center">暂无最新情报</div>
    </div>
</template>

<script setup>
import { useAsyncData } from '#imports'

const { data: announcements } = await useAsyncData('home-announcements', () => {
    return queryCollection('content')
        .where('type', '=', 'announcement')
        .order('path', 'DESC')
        .all()
})


const getColorClass = (color, type) => {
    const theme = color?.toLowerCase() || 'purple' 

    if (type === 'dot') {
        const dotColors = {
            purple: 'text-indigo-600 dark:text-indigo-400',
            red: 'text-red-600 dark:text-red-500',
            blue: 'text-blue-600 dark:text-blue-400',
            gold: 'text-amber-600 dark:text-amber-500'
        }
        return dotColors[theme] || dotColors.purple
    }


    if (type === 'text') {
        const textColors = {
            purple: 'hover:text-indigo-600 dark:hover:text-indigo-300',
            red: 'hover:text-red-600 dark:hover:text-red-400',
            blue: 'hover:text-blue-600 dark:hover:text-blue-300',
            gold: 'hover:text-amber-600 dark:hover:text-amber-400'
        }
        return textColors[theme] || textColors.purple
    }
}
</script>