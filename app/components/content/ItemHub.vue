<!-- app/components/content/ItemHub.vue -->
<template>
    <div class="mt-8">
        <div
            class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-xl p-4 md:p-6 mb-8 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-center z-20 relative transition-colors duration-300">
            <div
                class="flex items-center gap-2 bg-slate-100 dark:bg-[#15151a] p-1 rounded-lg border border-slate-200 dark:border-gray-800">
                <button v-for="t in ['全部', '道具', '天赋']" :key="t" @click="filterType = t"
                    class="px-4 py-1.5 text-sm font-bold rounded-md transition-colors"
                    :class="filterType === t ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300'">
                    {{ t }}
                </button>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-1.5">
                <span class="text-xs text-slate-400 dark:text-gray-600 mr-2 font-mono">品阶过滤:</span>
                <button v-for="lvl in ['全部', 'SSS+', 'SSS', 'SS', 'S', 'A', 'B', 'C']" :key="lvl"
                    @click="filterLevel = lvl"
                    class="px-2.5 py-1 text-[11px] font-bold font-mono rounded border transition-colors"
                    :class="filterLevel === lvl ? 'bg-amber-100 dark:bg-amber-500/20 border-amber-300 dark:border-amber-500/50 text-amber-700 dark:text-amber-400' : 'bg-slate-50 dark:bg-[#1a1a21] border-slate-200 dark:border-gray-700 text-slate-500 dark:text-gray-500 hover:border-slate-300 dark:hover:border-gray-600'">
                    {{ lvl }}
                </button>
            </div>

        </div>

        <div v-if="filteredList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            <ItemCard v-for="item in filteredList" :key="item.name" :item="item" />
        </div>
        <div v-else
            class="py-24 text-center text-slate-500 dark:text-gray-500 bg-white dark:bg-[#1a1a21] rounded-xl border border-slate-200 dark:border-gray-700/50 transition-colors duration-300">
            <Icon name="ph:magnifying-glass-duotone" class="text-4xl mb-2 opacity-50" />
            <p>没有找到符合该条件的收录记录...</p>
        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filterType = ref('全部')
const filterLevel = ref('全部')

const filteredList = computed(() => {
    return allItems.filter(item => {
        const matchType = filterType.value === '全部' || item.type === filterType.value;
        const matchLevel = filterLevel.value === '全部' || item.group === filterLevel.value;
        return matchType && matchLevel;
    })
        .sort((a, b) => b.weight - a.weight);
})
</script>