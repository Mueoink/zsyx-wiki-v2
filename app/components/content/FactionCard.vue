<!-- app/components/content/FactionCard.vue -->
<template>
    <aside
        class="w-full mb-10 bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/60 rounded-xl overflow-hidden shadow-md dark:shadow-lg font-sans transition-colors duration-300">

        <div
            class="relative min-h-[140px] bg-gradient-to-br from-slate-100 to-slate-200/50 dark:from-[#1e2329] dark:to-[#15181d] border-b border-slate-200 dark:border-gray-700/60 flex flex-col items-center justify-center p-8 transition-colors duration-300 overflow-hidden">

            <Icon name="ph:flag-banner-duotone"
                class="absolute -right-10 -bottom-10 text-[180px] text-slate-900/[0.03] dark:text-white/[0.03] pointer-events-none transition-colors duration-300" />

            <div
                class="absolute top-4 left-4 px-2.5 py-1 bg-white/80 dark:bg-black/50 border border-slate-300/50 dark:border-gray-600/50 text-slate-600 dark:text-gray-400 text-[10px] font-bold tracking-widest rounded shadow-sm backdrop-blur-sm transition-colors uppercase">
                {{ isPlayer ? '玩家阵营 PLAYER FACTION' : '原住民势力 NATIVE FACTION' }}
            </div>
            <h3
                class="text-4xl md:text-5xl font-black text-slate-800 dark:text-gray-100 font-serif tracking-widest relative z-10 transition-colors drop-shadow-sm text-center mt-2">
                {{ name }}
            </h3>
        </div>

        <div class="flex flex-col md:flex-row">

            <div
                class="md:w-1/3 p-5 md:p-6 md:border-r border-slate-200 dark:border-gray-800 bg-slate-50/50 dark:bg-[#15151a]/30 transition-colors duration-300 space-y-4">

                <div
                    class="flex justify-between items-center py-2 border-b border-slate-200/60 dark:border-gray-800/60">
                    <span
                        class="text-slate-500 dark:text-gray-500 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                        <Icon name="ph:hands-praying-duotone" class="text-amber-500 text-lg" /> 主导信仰
                    </span>
                    <span
                        class="text-slate-800 dark:text-gray-200 font-bold bg-white dark:bg-gray-800 px-2.5 py-0.5 rounded border border-slate-200 dark:border-gray-700 text-sm shadow-sm">{{
                        faith }}</span>
                </div>

                <div v-if="type"
                    class="flex flex-col gap-1.5 border-b border-slate-200/60 dark:border-gray-800/60 pb-3">
                    <span
                        class="text-slate-500 dark:text-gray-500 flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-widest">
                        <Icon name="ph:buildings-duotone" class="text-slate-400 dark:text-gray-400 text-base" /> 组织性质
                    </span>
                    <span class="text-slate-800 dark:text-gray-200 font-medium pl-6 text-sm leading-relaxed">{{ type
                        }}</span>
                </div>

                <div v-if="leader"
                    class="flex flex-col gap-1.5 border-b border-slate-200/60 dark:border-gray-800/60 pb-3">
                    <span
                        class="text-slate-500 dark:text-gray-500 flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-widest">
                        <Icon name="ph:crown-simple-duotone" class="text-indigo-500 text-base" /> 权力中心 / 领袖
                    </span>
                    <span class="text-indigo-700 dark:text-indigo-300 font-bold pl-6 text-sm">{{ leader }}</span>
                </div>

                <div class="flex justify-between items-center pt-2">
                    <span
                        class="text-slate-500 dark:text-gray-500 flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-widest">
                        <Icon name="ph:activity-duotone" class="text-purple-500 text-base" /> 势力状态
                    </span>
                    <span
                        :class="status === '存续' ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50' : status === '覆灭' ? 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50' : 'text-slate-600 dark:text-gray-400 bg-slate-100 dark:bg-gray-800 border-slate-200 dark:border-gray-700'"
                        class="font-black tracking-widest px-3 py-1 rounded border text-xs shadow-sm">
                        {{ status }}
                    </span>
                </div>

            </div>

            <div
                class="flex-1 p-5 md:p-8 bg-white dark:bg-[#1a1a21] transition-colors duration-300 flex flex-col gap-6">

                <div v-if="coreBelief" class="relative pl-6 py-2">
                    <Icon name="ph:quotes-duotone"
                        class="absolute left-0 -top-1 text-3xl text-emerald-500/20 dark:text-emerald-500/10" />
                    <p
                        class="text-sm md:text-base font-serif italic text-emerald-800 dark:text-emerald-200/80 leading-relaxed font-bold tracking-wide">
                        {{ coreBelief }}
                    </p>
                </div>

                <div v-if="territory" class="space-y-1.5">
                    <div
                        class="text-[11px] text-emerald-600 dark:text-emerald-500 font-bold flex items-center gap-1.5 tracking-widest uppercase">
                        <Icon name="ph:map-pin-duotone" class="text-base" /> 势力范围 / 核心领地
                    </div>
                    <p class="text-[13px] md:text-sm text-slate-700 dark:text-gray-300 leading-relaxed pl-1">
                        {{ territory }}
                    </p>
                </div>

                <div v-if="structure" class="space-y-1.5">
                    <div
                        class="text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1.5 tracking-widest uppercase">
                        <Icon name="ph:tree-structure-duotone" class="text-base" /> 组织结构 & 下属分支
                    </div>
                    <p class="text-[13px] md:text-sm text-slate-700 dark:text-gray-300 leading-relaxed pl-1">
                        {{ structure }}
                    </p>
                </div>

                <div v-if="keyFigures" class="space-y-1.5">
                    <div
                        class="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5 tracking-widest uppercase">
                        <Icon name="ph:users-three-duotone" class="text-base" /> 重要人物
                    </div>
                    <p
                        class="text-[13px] md:text-sm text-indigo-900/80 dark:text-indigo-300/90 leading-relaxed pl-1 font-medium">
                        {{ keyFigures }}
                    </p>
                </div>

                <div v-if="allies || enemies"
                    class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-gray-800/60 mt-auto">
                    <div v-if="allies"
                        class="bg-blue-50/80 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg p-3">
                        <div
                            class="text-[10px] text-blue-600 dark:text-blue-400 font-bold mb-1.5 flex items-center gap-1 uppercase tracking-widest">
                            <Icon name="ph:handshake-duotone" class="text-sm" /> 合作 / 同盟势力
                        </div>
                        <div class="text-xs md:text-sm font-medium text-slate-700 dark:text-gray-300 leading-relaxed">{{
                            allies }}</div>
                    </div>
                    <div v-if="enemies"
                        class="bg-red-50/80 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-3">
                        <div
                            class="text-[10px] text-red-600 dark:text-red-400 font-bold mb-1.5 flex items-center gap-1 uppercase tracking-widest">
                            <Icon name="ph:swords-duotone" class="text-sm" /> 敌对势力
                        </div>
                        <div class="text-xs md:text-sm font-medium text-slate-700 dark:text-gray-300 leading-relaxed">{{
                            enemies }}</div>
                    </div>
                </div>

                <div v-if="notes" class="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800/60">
                    <div
                        class="text-[10px] text-amber-600 dark:text-amber-500 font-bold mb-1.5 flex items-center gap-1 uppercase tracking-widest">
                        <Icon name="ph:warning-circle-duotone" class="text-sm" /> 附加备注
                    </div>
                    <div
                        class="text-[13px] text-slate-600 dark:text-gray-400 leading-relaxed italic border-l-2 border-amber-300 dark:border-amber-700 pl-3">
                        {{ notes }}
                    </div>
                </div>

            </div>

        </div>
    </aside>
</template>

<script setup>
defineProps({
    name: { type: String, required: true },
    isPlayer: { type: Boolean, default: false },
    faith: { type: String, default: '无明确信仰' },
    type: { type: String, default: '' },
    leader: { type: String, default: '' },
    status: { type: String, default: '存续' },
    coreBelief: { type: String, default: '' },
    territory: { type: String, default: '' }, 
    structure: { type: String, default: '' }, 
    keyFigures: { type: String, default: '' }, 
    allies: { type: String, default: '' },
    enemies: { type: String, default: '' },
    notes: { type: String, default: '' } 
})
</script>