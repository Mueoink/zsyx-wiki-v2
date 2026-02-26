<!-- app/components/content/MajorCharacterSheet.vue -->
<template>
    <div v-if="charData" class="space-y-8 my-8 font-sans">
        <div
            class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm relative">
            <div class="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500"></div>

            <div class="p-6 md:p-8 relative">
                <Icon name="ph:fingerprint-duotone"
                    class="absolute right-4 top-4 text-[150px] text-slate-500/5 dark:text-gray-500/5 pointer-events-none" />

                <div class="flex flex-col md:flex-row justify-between gap-6 relative z-10">

                    <div class="space-y-4">
                        <div>
                            <div
                                class="text-xs font-mono text-slate-400 dark:text-gray-500 mb-1 tracking-widest uppercase">
                                File ID: {{ charData.id_code }}</div>
                            <h1 class="text-4xl font-black text-slate-900 dark:text-white font-serif tracking-widest">{{
                                charData.name }}</h1>
                            <div class="text-sm text-slate-500 dark:text-gray-400 mt-1 font-medium">外号：{{
                                charData.nicknames }}</div>
                        </div>

                        <div class="flex flex-wrap gap-2">
                            <span v-for="tag in charData.identity" :key="tag"
                                class="px-2.5 py-1 bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 text-xs rounded border border-slate-200 dark:border-gray-700 font-bold">
                                {{ tag }}
                            </span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-x-8 gap-y-3 text-sm md:text-right">
                        <div>
                            <div class="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase">常态性别 / A年龄
                            </div>
                            <div class="font-bold text-slate-700 dark:text-gray-200">{{ charData.gender }} / {{
                                charData.age }}</div>
                        </div>
                        <div>
                            <div class="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase">信仰</div>
                            <div class="font-bold text-indigo-600 dark:text-indigo-400">{{ charData.faith }}</div>
                        </div>
                        <div>
                            <div class="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase">职业</div>
                            <div class="font-bold text-slate-700 dark:text-gray-200">{{ charData.job }}</div>
                        </div>
                        <div>
                            <div class="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase">出场</div>
                            <div class="font-bold text-slate-700 dark:text-gray-200 text-xs">{{ charData.debut }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div class="bg-slate-50 dark:bg-[#15151a]/50 border border-slate-200 dark:border-gray-800 rounded-xl p-6">
                <h3 class="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white mb-4">
                    <Icon name="ph:eye-duotone" class="text-indigo-500" /> 外貌特征
                </h3>
                <div class="space-y-4">
                    <div v-for="(desc, idx) in charData.appearance" :key="idx"
                        class="relative pl-4 border-l-2 border-indigo-300 dark:border-indigo-700">
                        <p class="text-sm text-slate-600 dark:text-gray-300 leading-relaxed italic">
                            "{{ desc }}"
                        </p>
                    </div>
                </div>
            </div>

            <div class="bg-slate-50 dark:bg-[#15151a]/50 border border-slate-200 dark:border-gray-800 rounded-xl p-6">
                <h3 class="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white mb-4">
                    <Icon name="ph:mask-happy-duotone" class="text-amber-500" /> 性格侧写
                </h3>
                <div class="flex flex-wrap gap-2 mb-4">
                    <div v-for="phase in charData.personalityPhases" :key="phase.label"
                        class="flex flex-col bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700 rounded p-2 flex-1 min-w-[120px]">
                        <span
                            class="text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider mb-1">{{
                            phase.label }}</span>
                        <span class="text-xs text-slate-600 dark:text-gray-400 leading-snug">{{ phase.desc }}</span>
                    </div>
                </div>
                <div
                    class="text-xs text-slate-500 dark:text-gray-500 leading-relaxed pt-3 border-t border-slate-200 dark:border-gray-700/50">
                    {{ charData.personalityQuote }}
                </div>
            </div>
        </div>

        <div v-if="charData.background || charData.story"
            class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div v-if="charData.background" class="space-y-3">
                    <h3 class="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white">
                        <Icon name="ph:book-bookmark-duotone" class="text-emerald-500" /> 背景故事
                    </h3>
                    <div class="text-sm text-slate-600 dark:text-gray-400 leading-relaxed space-y-3">
                        <p v-for="(para, idx) in formatText(charData.background)" :key="idx">{{ para }}</p>
                    </div>
                </div>

                <div v-if="charData.story" class="space-y-3">
                    <h3 class="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white">
                        <Icon name="ph:path-duotone" class="text-purple-500" /> 角色故事线
                    </h3>
                    <div
                        class="text-sm text-slate-600 dark:text-gray-400 leading-relaxed space-y-3 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        <p v-for="(para, idx) in formatText(charData.story)" :key="idx">{{ para }}</p>
                    </div>
                </div>

            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div class="bg-slate-50 dark:bg-[#15151a]/50 border border-slate-200 dark:border-gray-800 rounded-xl p-6">
                <h3 class="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white mb-4">
                    <Icon name="ph:share-network-duotone" class="text-blue-500" /> 关联角色
                </h3>
                <div class="grid grid-cols-2 gap-3">
                    <div v-for="rel in charData.relations" :key="rel.name"
                        class="flex items-center justify-between p-2 bg-white dark:bg-[#1a1a21] rounded border border-slate-200 dark:border-gray-700/50">
                        <span class="font-bold text-slate-700 dark:text-gray-200 text-sm">{{ rel.name }}</span>
                        <span class="text-xs text-slate-400 dark:text-gray-500">{{ rel.type }}</span>
                    </div>
                </div>
            </div>

            <div
                class="bg-slate-50 dark:bg-[#15151a]/50 border border-slate-200 dark:border-gray-800 rounded-xl p-6 space-y-4">
                <h3 class="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white mb-2">
                    <Icon name="ph:chat-centered-text-duotone" class="text-pink-500" /> 人物评价
                </h3>
                <div v-for="(evalItem, idx) in charData.evaluations" :key="idx" class="relative pl-4">
                    <Icon name="ph:quotes-fill"
                        class="absolute left-0 top-0 text-xl text-slate-300 dark:text-gray-700" />
                    <p class="text-sm text-slate-600 dark:text-gray-300 italic mb-1 pl-2">{{ evalItem.content }}</p>
                    <div class="text-right text-xs font-bold text-slate-400 dark:text-gray-500">—— {{ evalItem.quoter }}
                    </div>
                </div>
            </div>

        </div>

        <div class="space-y-6">

            <div
                class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
                <h3 class="text-base font-bold text-slate-800 dark:text-white mb-3">能力与持有物</h3>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span v-for="ab in charData.abilities" :key="ab"
                        class="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-xs rounded border border-indigo-100 dark:border-indigo-800">{{
                        ab }}</span>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span v-for="item in charData.backpack" :key="item"
                        class="px-2 py-1 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 text-xs rounded border border-slate-200 dark:border-gray-700">{{
                        item }}</span>
                </div>
            </div>

            <div v-if="charData.remarks && charData.remarks.length > 0"
                class="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl p-6">
                <h3 class="flex items-center gap-2 text-base font-bold text-amber-800 dark:text-amber-500 mb-3">
                    <Icon name="ph:info-duotone" /> 档案备注
                </h3>
                <ul class="space-y-1.5 list-disc list-inside text-sm text-amber-900/80 dark:text-amber-100/60">
                    <li v-for="(remark, idx) in charData.remarks" :key="idx">{{ remark }}</li>
                </ul>
            </div>

        </div>

    </div>

    <div v-else class="p-8 text-center text-red-500 border border-red-500/20 bg-red-500/10 rounded-xl">
        错误：未找到 ID 为 "{{ characterId }}" 的角色数据。
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { characterRegistry } from '~/utils/characterRegistry'

const props = defineProps({
    characterId: { type: String, required: true }
})

const charData = computed(() => characterRegistry[props.characterId])

const formatText = (text) => {
    if (!text || typeof text !== 'string') return []
    return text.split('\n').filter(p => p && p.trim().length > 0)
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 4px;
}
</style>