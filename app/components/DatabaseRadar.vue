<!-- app/components/DatabaseRadar.vue -->
<template>
    <div
        class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-xl shadow-sm transition-colors duration-300 overflow-hidden relative flex flex-col h-full">


        <div class="absolute inset-0 opacity-[0.03] dark:opacity-5 pointer-events-none"
            style="background-image: radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0); background-size: 24px 24px;">
        </div>


        <div
            class="bg-slate-50 dark:bg-black/40 border-b border-slate-200 dark:border-gray-800/60 px-5 py-3 flex items-center justify-between z-10 transition-colors duration-300">
            <div class="flex items-center gap-3">

                <div class="relative flex h-2.5 w-2.5">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </div>
                <span
                    class="text-xs font-mono font-bold text-slate-600 dark:text-emerald-500/80 tracking-widest uppercase">
                    Akasha Terminal // 虚空终端在线
                </span>
            </div>
            <div class="text-[10px] font-mono text-slate-400 dark:text-gray-700 hidden sm:block">
                同步率: 100% | 延迟: 12ms
            </div>
        </div>


        <div class="p-5 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 z-10 flex-1 content-center">

     
            <div class="flex flex-col justify-center border-l-2 border-indigo-500/50 pl-4 relative group">
                <Icon name="ph:files-duotone"
                    class="absolute right-0 top-1/2 -translate-y-1/2 text-5xl text-indigo-500/5 dark:text-indigo-500/10 group-hover:scale-110 transition-transform duration-500" />
                <div class="text-[10px] text-slate-500 dark:text-gray-500 font-bold tracking-widest uppercase mb-1">
                    Total Entries</div>
           
                <div
                    class="text-3xl md:text-4xl font-black text-slate-800 dark:text-gray-100 font-serif tabular-nums tracking-tight">
                    {{ Math.round(displayEntries) }}
                </div>
                <div class="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono mt-1 flex items-center gap-1">
                    <Icon name="ph:trend-up-bold" /> 全站已归档
                </div>
            </div>

       
            <div class="flex flex-col justify-center border-l-2 border-amber-500/50 pl-4 relative group">
                <Icon name="ph:planet-duotone"
                    class="absolute right-0 top-1/2 -translate-y-1/2 text-5xl text-amber-500/5 dark:text-amber-500/10 group-hover:scale-110 transition-transform duration-500" />
                <div class="text-[10px] text-slate-500 dark:text-gray-500 font-bold tracking-widest uppercase mb-1">
                    Known Faiths</div>
                <div class="flex items-baseline gap-1">
                    <div
                        class="text-3xl md:text-4xl font-black text-slate-800 dark:text-gray-100 font-serif tabular-nums tracking-tight">
                        {{ Math.round(displayFaiths) }}
                    </div>
                    <div class="text-sm font-bold text-slate-400 dark:text-gray-600">/ 16</div>
                </div>
           
                <div class="w-full bg-slate-200 dark:bg-gray-800 h-1 mt-1.5 rounded-full overflow-hidden">
                
                    <div class="bg-amber-500 h-full transition-all duration-1000 ease-out"
                        :style="{ width: `${(Math.round(displayFaiths) / 16) * 100}%` }"></div>
                </div>
            </div>

       
            <div class="flex flex-col justify-center border-l-2 border-red-500/50 pl-4 relative group">
                <Icon name="ph:warning-octagon-duotone"
                    class="absolute right-0 top-1/2 -translate-y-1/2 text-5xl text-red-500/5 dark:text-red-500/10 group-hover:scale-110 transition-transform duration-500" />
                <div class="text-[10px] text-slate-500 dark:text-gray-500 font-bold tracking-widest uppercase mb-1">
                    Items</div>
                <div
                    class="text-3xl md:text-4xl font-black text-slate-800 dark:text-gray-100 font-serif tabular-nums tracking-tight">
                    {{ Math.round(displayItems) }}
                </div>
                <div class="text-[10px] text-red-600 dark:text-red-400 font-mono mt-1 flex items-center gap-1">
                    <Icon name="ph:lock-key-duotone" /> 万象图鉴总数
                </div>
            </div>

      
            <div class="flex flex-col justify-center border-l-2 border-emerald-500/50 pl-4 relative group">
                <Icon name="ph:users-three-duotone"
                    class="absolute right-0 top-1/2 -translate-y-1/2 text-5xl text-emerald-500/5 dark:text-emerald-500/10 group-hover:scale-110 transition-transform duration-500" />
                <div class="text-[10px] text-slate-500 dark:text-gray-500 font-bold tracking-widest uppercase mb-1">
                    Contributors</div>
                <div
                    class="text-3xl md:text-4xl font-black text-slate-800 dark:text-gray-100 font-serif tabular-nums tracking-tight">
                    {{ Math.round(displayContributors) }}
                </div>
                <div class="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-1 flex items-center gap-1">
                    <Icon name="ph:pencil-simple-duotone" /> 参与编撰人员
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAsyncData } from '#imports'
import { TransitionPresets, useTransition } from '@vueuse/core'

const { data: allDocs } = await useAsyncData('radar-docs', () => {
    return queryCollection('content').all()
})

const targetEntries = computed(() => allDocs.value?.length || 0)
const targetFaiths = computed(() => faithClasses?.length || 0)
const targetItems = computed(() => allItems?.length || 0)
const targetContributors = computed(() => teamMembers?.length || 0)


const sourceEntries = ref(0)
const sourceFaiths = ref(0)
const sourceItems = ref(0)
const sourceContributors = ref(0)


const displayEntries = useTransition(sourceEntries, { duration: 1500, transition: TransitionPresets.easeOutExpo })
const displayFaiths = useTransition(sourceFaiths, { duration: 1500, transition: TransitionPresets.easeOutExpo })
const displayItems = useTransition(sourceItems, { duration: 1500, transition: TransitionPresets.easeOutExpo })
const displayContributors = useTransition(sourceContributors, { duration: 1500, transition: TransitionPresets.easeOutExpo })


onMounted(() => {
   
    setTimeout(() => {
        sourceEntries.value = targetEntries.value
        sourceFaiths.value = targetFaiths.value
        sourceItems.value = targetItems.value
        sourceContributors.value = targetContributors.value
    }, 100)
})
</script>