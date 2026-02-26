<!-- app/components/ItemCard.vue -->
<template>
    <div class="relative bg-white dark:bg-[#1a1a21] border transition-all duration-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md flex flex-col h-full"
        :class="getLevelBorder(item.group)">

        <div class="absolute top-0 right-0 px-3 py-1 text-[13px] font-black tracking-widest rounded-bl-xl border-l border-b backdrop-blur-md shadow-sm z-10"
            :class="getLevelBadge(item.group)">
            {{ item.level }}
        </div>


        <div class="p-5 md:p-6 border-b border-slate-100 dark:border-gray-800/60 relative overflow-hidden"
            :class="getLevelBg(item.group)">
            <Icon :name="item.type === '道具' ? 'ph:treasure-chest-duotone' : 'ph:shooting-star-duotone'"
                class="absolute -right-4 -top-2 text-[80px] opacity-[0.03] dark:opacity-[0.06] pointer-events-none" />

            <div class="flex items-center gap-2 mb-2.5 relative z-10">
                <span class="px-2 py-0.5 text-[10px] font-bold rounded-sm border"
                    :class="item.type === '道具' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30' : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30'">
                    {{ item.type }}
                </span>
                <span class="text-xs text-slate-600 dark:text-gray-400 font-mono tracking-widest">{{ item.baseInfo
                    }}</span>
            </div>
            <h3
                class="text-xl md:text-2xl font-bold text-slate-900 dark:text-gray-100 font-serif tracking-wide relative z-10 drop-shadow-sm leading-tight">
                {{ item.name }}</h3>
        </div>

        <div class="p-5 md:p-6 space-y-5 flex-1 bg-slate-50/30 dark:bg-transparent">


            <div v-if="item.firstAppear"
                class="text-[13px] text-slate-600 dark:text-gray-400 font-mono flex items-center gap-1.5 font-medium">
                <Icon name="ph:clock-countdown-duotone" class="text-indigo-500 text-base" /> {{ item.firstAppear }}
            </div>

            <div class="space-y-2">
                <div
                    class="text-xs text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5 tracking-widest">
                    <Icon name="ph:sparkle-duotone" class="text-base" /> 效果描述
                </div>
                <ul class="text-slate-800 dark:text-gray-300 leading-relaxed text-sm space-y-2.5">
                    <li v-for="(eff, idx) in item.effects" :key="idx" class="relative pl-3.5">
                        <span class="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-indigo-500/50"></span>
                        {{ eff }}
                    </li>
                </ul>
            </div>

            <div v-if="item.owners" class="pt-2 border-t border-slate-200/60 dark:border-gray-800/60">
                <span class="text-xs text-slate-500 dark:text-gray-500 mr-2">已知持有:</span>
                <span class="text-slate-800 dark:text-amber-400/90 font-bold text-sm">{{ item.owners }}</span>
            </div>

            <div v-if="item.remark"
                class="text-[13px] text-slate-600 dark:text-gray-400 leading-relaxed pl-3 border-l-2 border-slate-300 dark:border-gray-700 italic">
                {{ item.remark }}
            </div>
        </div>

        <div
            class="px-5 py-4 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between mt-auto bg-slate-50 dark:bg-[#15151a]/50">
            <span class="text-xs font-medium text-slate-500 dark:text-gray-400 flex items-center gap-1.5 tracking-wide">
                <Icon name="ph:pen-nib-duotone" class="text-base" /> 卷宗收录
            </span>
            <div class="flex -space-x-1.5">
                <img v-for="author in validAuthors" :key="author.name" :src="author.avatar" :title="author.name"
                    class="w-6 h-6 rounded-full border border-white dark:border-gray-800 object-cover shadow-sm z-10 hover:z-20 hover:scale-110 transition-transform cursor-help" />
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ item: Object })

const validAuthors = computed(() => {
    if (!props.item.authors) return []
    return props.item.authors.map(name => teamMembers.find(m => m.name === name)).filter(Boolean)
})

const getLevelBorder = (group) => {
    const map = {
        'SSS+': 'border-red-300 dark:border-red-900/50 hover:border-red-500 dark:shadow-[0_0_15px_rgba(239,68,68,0.1)]',
        'SSS': 'border-amber-300 dark:border-amber-900/50 hover:border-amber-500',
        'SS': 'border-orange-300 dark:border-orange-900/50 hover:border-orange-500',
        'S': 'border-purple-200 dark:border-purple-900/50 hover:border-purple-400',
        'A': 'border-blue-200 dark:border-blue-900/50 hover:border-blue-400',
    }
    return map[group] || 'border-slate-200 dark:border-gray-700 hover:border-slate-400 dark:hover:border-gray-500'
}

const getLevelBadge = (group) => {
    const map = {
        'SSS+': 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/30',
        'SSS': 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30',
        'SS': 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/30',
        'S': 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/30',
        'A': 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
    }
    return map[group] || 'bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 border-slate-200 dark:border-gray-700'
}

const getLevelBg = (group) => {
    if (group === 'SSS+') return 'bg-gradient-to-r from-red-50 dark:from-red-950/20 to-transparent'
    if (group === 'SSS') return 'bg-gradient-to-r from-amber-50 dark:from-amber-950/20 to-transparent'
    return 'bg-transparent'
}
</script>