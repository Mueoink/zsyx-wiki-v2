<!-- app/components/content/StoryEvent.vue -->
<template>
    <div
        class="my-8 bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-xl shadow-sm overflow-hidden transition-colors duration-300">

        <div
            class="relative p-5 md:p-6 border-b border-slate-100 dark:border-gray-800/60 bg-slate-50/50 dark:bg-[#1a1a21]">
            <Icon name="ph:folder-open-duotone"
                class="absolute right-4 top-4 text-6xl opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

            <div class="flex flex-col gap-3 relative z-10">
                <div class="flex flex-wrap items-center gap-2">
                    <span
                        class="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded border border-indigo-200 dark:border-indigo-500/20">
                        {{ type || '特殊试炼' }}
                    </span>
                    <span v-if="faith"
                        class="px-2 py-0.5 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold rounded border border-amber-200 dark:border-amber-500/20 flex items-center gap-1">
                        <Icon name="ph:hands-praying-duotone" /> {{ faith }}
                    </span>
                    <span v-if="chapter"
                        class="px-2 py-0.5 bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400 text-xs font-mono rounded border border-slate-200 dark:border-gray-700">
                        {{ chapter }}
                    </span>
                </div>

                <!-- 标题 -->
                <h3
                    class="text-2xl font-black text-slate-800 dark:text-gray-100 font-serif tracking-wide flex items-center gap-2">
                    <Icon name="ph:bookmark-simple-fill" class="text-amber-500 text-lg" />
                    {{ title }}
                </h3>

                <!-- 试炼目标-->
                <div v-if="objective"
                    class="flex items-start gap-2 text-sm text-slate-600 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg border border-amber-100 dark:border-amber-900/30">
                    <Icon name="ph:target-duotone" class="text-amber-600 dark:text-amber-500 text-lg shrink-0 mt-0.5" />
                    <div class="font-medium leading-relaxed">
                        <span
                            class="font-bold text-amber-700 dark:text-amber-500 text-xs uppercase mr-1">MISSION:</span>
                        {{ objective }}
                    </div>
                </div>
            </div>
        </div>

        <div class="p-5 md:p-6 space-y-6">

            <div v-if="$slots.summary" class="space-y-2">
                <div
                    class="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1">
                    <Icon name="ph:article-duotone" /> 事件概述
                </div>
                <div
                    class="text-sm text-slate-700 dark:text-gray-300 leading-loose text-justify bg-slate-50 dark:bg-[#15151a] p-4 rounded-lg border border-slate-100 dark:border-gray-800/50">
                    <slot name="summary" />
                </div>
            </div>

            <div v-if="$slots.nodes" class="space-y-2">
                <button @click="isNodesOpen = !isNodesOpen"
                    class="w-full flex items-center justify-between text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                    <div class="flex items-center gap-1">
                        <Icon name="ph:key-duotone" /> 关键节点
                    </div>
                    <Icon :name="isNodesOpen ? 'ph:caret-up-bold' : 'ph:caret-down-bold'" />
                </button>

                <div v-show="isNodesOpen"
                    class="text-sm text-slate-600 dark:text-gray-400 leading-relaxed border-l-2 border-indigo-500/30 pl-4 py-1 space-y-2 transition-all">
                    <slot name="nodes" />
                </div>
            </div>

        </div>

        <div
            class="bg-slate-50 dark:bg-[#15151a]/50 border-t border-slate-100 dark:border-gray-800 p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

            <div v-if="teammates && teammates.length > 0">
                <div
                    class="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <Icon name="ph:users-three-duotone" /> 参与人员
                </div>
                <div class="flex flex-wrap gap-2">
                    <span v-for="mate in teammates" :key="mate"
                        class="px-2 py-1 bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300 text-xs rounded shadow-sm">
                        {{ mate }}
                    </span>
                </div>
            </div>

            <div class="space-y-3">
                <div v-if="location">
                    <div
                        class="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Icon name="ph:map-pin-duotone" /> 发生地域
                    </div>
                    <div class="text-slate-700 dark:text-gray-300 font-medium">{{ location }}</div>
                </div>
                <div v-if="timeline">
                    <div
                        class="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Icon name="ph:clock-counter-clockwise-duotone" /> 时间线
                    </div>
                    <div class="text-slate-700 dark:text-gray-300 font-medium">{{ timeline }}</div>
                </div>
            </div>

        </div>

        <div v-if="$slots.extra"
            class="p-4 bg-amber-50/50 dark:bg-amber-900/5 border-t border-amber-100 dark:border-amber-900/20 text-xs text-amber-800/80 dark:text-amber-500/80">
            <div class="font-bold flex items-center gap-1 mb-1 opacity-70">
                <Icon name="ph:paperclip-duotone" /> 附件/备注
            </div>
            <div class="leading-relaxed">
                <slot name="extra" />
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    title: { type: String, required: true },
    type: { type: String, default: '试炼事件' },
    faith: { type: String, default: '' }, // 信仰，如[战争]
    chapter: { type: String, default: '' }, // 章节范围
    objective: { type: String, default: '' }, // 试炼目标
    teammates: { type: Array, default: () => [] }, // 队友数组
    location: { type: String, default: '' }, // 地域
    timeline: { type: String, default: '' } // 时间线
})

const isNodesOpen = ref(true) // 关键节点
</script>