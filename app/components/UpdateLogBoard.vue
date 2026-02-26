<!-- app/components/UpdateLogBoard.vue -->
<template>
    <div
        class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm transition-colors duration-300">
        
        <div class="bg-slate-50 dark:bg-[#22222b] border-b border-slate-200 dark:border-gray-700/50 px-4 py-2.5 flex items-center justify-between group cursor-pointer hover:bg-slate-100 dark:hover:bg-[#2a2a35] transition-colors"
            @click="goToAllLogs">
            <div class="flex items-center gap-2">
                <Icon name="ph:clock-counter-clockwise-duotone"
                    class="text-indigo-500 dark:text-indigo-400 text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors" />
                <h3
                    class="font-bold text-slate-700 dark:text-gray-200 text-sm tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    更新公告</h3>
            </div>
            <Icon name="ph:caret-right-bold"
                class="text-slate-400 dark:text-gray-500 text-xs group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
        </div>

        <div class="p-3 space-y-1.5" v-if="logs && logs.length > 0">

            <NuxtLink v-for="log in logs" :key="log.path" :to="log.path"
                class="group flex gap-3 text-sm hover:bg-slate-50 dark:hover:bg-white/5 p-2 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-gray-700/50">

                <div class="shrink-0 flex flex-col items-center gap-1 w-12 pt-0.5">
                    <span class="text-[13px] font-mono font-bold tracking-tighter"
                        :class="getColorClass(log.color, 'text')">
                        {{ log.version || 'v?' }}
                    </span>

                    <!-- 大版本 -->
                    <span v-if="log.updateType === 'major'"
                        class="text-[10px] bg-red-50 text-red-600 border border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30 px-1 py-0.5 rounded leading-none font-bold">
                        大版本
                    </span>
                    <!-- 常规 -->
                    <span v-else
                        class="text-[10px] bg-slate-100 text-slate-500 border border-slate-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 px-1 py-0.5 rounded leading-none">
                        常规
                    </span>
                </div>

                <!-- 标题与日期 -->
                <div class="min-w-0 flex-1 flex flex-col justify-center">
                    <div class="text-slate-700 dark:text-gray-300 truncate font-medium transition-colors"
                        :class="getColorClass(log.color, 'hover')">
                        {{ log.title }}
                    </div>
                    <div class="text-[10px] text-slate-400 dark:text-gray-500 mt-1 flex items-center gap-1 font-mono">
                        <Icon name="ph:calendar-blank-duotone" /> {{ log.date || '未知日期' }}
                    </div>
                </div>
            </NuxtLink>

        </div>

        <div v-else
            class="p-4 py-8 text-xs text-slate-400 dark:text-gray-500 text-center flex items-center justify-center">
            真实宇宙尚未发生变动
        </div>

    </div>
</template>

<script setup>
import { useAsyncData, useRouter } from '#imports'

const router = useRouter()

const goToAllLogs = () => {
    router.push('/changelog')
}

const { data: logs } = await useAsyncData('home-changelogs', () => {
    return queryCollection('content')
        .where('type', '=', 'changelog')
        .order('path', 'DESC')
        .limit(5)
        .all()
})


const getColorClass = (color, element) => {
    const theme = color?.toLowerCase() || 'purple'

    if (element === 'text') {
        const colors = {
            purple: 'text-indigo-600 dark:text-indigo-400',
            red: 'text-red-600 dark:text-red-400',
            blue: 'text-blue-600 dark:text-blue-400',
            gold: 'text-amber-600 dark:text-amber-500',
            green: 'text-emerald-600 dark:text-emerald-400'
        }
        return colors[theme] || colors.purple
    }

    if (element === 'hover') {
        const hovers = {
            purple: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-300',
            red: 'group-hover:text-red-600 dark:group-hover:text-red-300',
            blue: 'group-hover:text-blue-600 dark:group-hover:text-blue-300',
            gold: 'group-hover:text-amber-600 dark:group-hover:text-amber-300',
            green: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-300'
        }
        return hovers[theme] || hovers.purple
    }
}
</script>