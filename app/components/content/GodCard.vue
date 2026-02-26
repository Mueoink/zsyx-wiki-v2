<!-- app/components/content/GodCard.vue -->
<template>
    <aside
        class="w-full mb-8 bg-white dark:bg-[#1a1a21] border border-amber-200 dark:border-amber-900/40 rounded-xl overflow-hidden shadow-md dark:shadow-[0_0_20px_rgba(217,119,6,0.08)] font-sans transition-colors duration-300">

        <div
            class="relative h-24 bg-gradient-to-br from-amber-100 to-orange-50 dark:from-[#2a1a3a] dark:to-[#3a2a1a] border-b border-amber-200 dark:border-amber-900/30 flex flex-col items-center justify-center transition-colors duration-300">

            <div
                class="absolute top-3 left-3 px-2 py-0.5 bg-white/60 dark:bg-black/50 border border-amber-300/50 dark:border-amber-700/50 text-amber-700 dark:text-amber-500 text-[10px] font-bold tracking-widest rounded backdrop-blur-sm transition-colors duration-300">
                ENTITY : 神明
            </div>

            <Icon name="ph:crown-duotone"
                class="absolute text-7xl text-amber-500/10 dark:text-amber-500/5 pointer-events-none" />

            <h3
                class="text-3xl font-black text-amber-950 dark:text-amber-50 font-serif tracking-widest relative z-10 transition-colors duration-300 drop-shadow-sm">
                {{ name }}
            </h3>
            <p v-if="title"
                class="text-sm font-bold text-amber-700 dark:text-amber-400 font-mono tracking-widest mt-1 relative z-10 transition-colors duration-300">
                {{ title }}
            </p>
        </div>

        <div class="flex flex-col md:flex-row">

            <div
                class="md:w-1/3 p-4 md:p-5 md:border-r border-slate-200 dark:border-gray-800 bg-slate-50/50 dark:bg-[#15151a]/30 transition-colors duration-300 space-y-3">

                <div
                    class="flex justify-between items-center py-1.5 border-b border-slate-200/50 dark:border-gray-800/50">
                    <span class="text-slate-500 dark:text-gray-500 flex items-center gap-1.5 text-xs font-medium">
                        <Icon name="ph:star-duotone" class="text-amber-500 dark:text-amber-600 text-sm" /> 神明级别
                    </span>
                    <span class="text-amber-700 dark:text-amber-400 font-black font-mono tracking-wider">{{ level
                        }}</span>
                </div>

                <div
                    class="flex justify-between items-center py-1.5 border-b border-slate-200/50 dark:border-gray-800/50">
                    <span class="text-slate-500 dark:text-gray-500 flex items-center gap-1.5 text-xs font-medium">
                        <Icon name="ph:planet-duotone" class="text-indigo-500 text-sm" /> 所属命途
                    </span>
                    <span class="text-slate-800 font-medium dark:text-gray-200 ">{{ path }}</span>
                </div>

                <div
                    class="flex justify-between items-center py-1.5 border-b border-slate-200/50 dark:border-gray-800/50">
                    <span class="text-slate-500 dark:text-gray-500 flex items-center gap-1.5 text-xs font-medium">
                        <Icon name="ph:sword-duotone" class="text-red-500 text-sm" /> 对立信仰
                    </span>
                    <span class="text-slate-900 font-medium dark:text-gray-200 font-medium">{{ opposingFaith }}</span>
                </div>

                <div
                    class="flex justify-between items-center py-1.5 border-b border-slate-200/50 dark:border-gray-800/50">
                    <span class="text-slate-500 dark:text-gray-500 flex items-center gap-1.5 text-xs font-medium">
                        <Icon name="ph:gender-intersex-duotone" class="text-purple-500 text-sm" /> 常态性别
                    </span>
                    <span class="text-purple-700 dark:text-purple-300 font-medium">{{ gender }}</span>
                </div>

                <div class="flex justify-between items-center py-1.5 pt-2">
                    <span class="text-slate-500 dark:text-gray-500 flex items-center gap-1.5 text-xs font-medium">
                        <Icon name="ph:heartbeat-duotone" class="text-emerald-500 text-sm" /> 当前状态
                    </span>
                    <span
                        :class="status === '存活' ? 'text-emerald-600 dark:text-emerald-400' : status === '陨落' ? 'text-red-600 dark:text-red-500' : 'text-slate-500 dark:text-gray-400'"
                        class="font-black tracking-widest">
                        {{ status }}
                    </span>
                </div>

            </div>

            <div
                class="flex-1 p-5 md:p-8 bg-white dark:bg-[#1a1a21] transition-colors duration-300 flex flex-col gap-5">

                <div v-if="prayer"
                    class="flex items-start gap-3 bg-amber-50/50 dark:bg-amber-900/10 p-3.5 rounded-lg border border-amber-100 dark:border-amber-900/30">
                    <Icon name="ph:quotes-duotone"
                        class="text-2xl text-amber-400 dark:text-amber-600/80 shrink-0 mt-0.5" />
                    <p
                        class="text-[13px] md:text-sm font-serif italic text-amber-800 dark:text-amber-200/90 leading-relaxed font-medium pt-0.5">
                        {{ prayer }}
                    </p>
                </div>

                <div v-if="appearance" class="space-y-1.5">
                    <div
                        class="text-xs text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5 tracking-widest uppercase">
                        <Icon name="ph:eye-duotone" class="text-base" /> 显化形象
                    </div>
                    <p class="text-[13px] md:text-sm text-slate-700 dark:text-gray-300 leading-loose text-justify">
                        {{ appearance }}
                    </p>
                </div>

                <div v-if="decree" class="space-y-1.5">
                    <div
                        class="text-xs text-amber-600 dark:text-amber-500 font-bold flex items-center gap-1.5 tracking-widest uppercase">
                        <Icon name="ph:scroll-duotone" class="text-base" /> 谕行
                    </div>
                    <p
                        class="text-[13px] md:text-sm text-slate-700 dark:text-gray-300 leading-loose text-justify border-l-2 border-amber-400/40 dark:border-amber-500/30 pl-3">
                        {{ decree }}
                    </p>
                </div>

                <div
                    class="flex flex-col sm:flex-row sm:items-start gap-6 pt-4 border-t border-slate-100 dark:border-gray-800/60 mt-auto">

                    <div v-if="chosen" class="flex-1 space-y-1">
                        <div
                            class="text-[11px] text-emerald-600 dark:text-emerald-500 font-bold flex items-center gap-1 tracking-widest uppercase">
                            <Icon name="ph:user-circle-gear-duotone" class="text-sm" /> 历代神选
                        </div>
                        <p class="text-sm font-bold text-emerald-800 dark:text-emerald-400">
                            {{ chosen }}
                        </p>
                    </div>

                    <div v-if="subGods" class="flex-1 space-y-1">
                        <div
                            class="text-[11px] text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1 tracking-widest uppercase">
                            <Icon name="ph:users-three-duotone" class="text-sm" /> 从神
                        </div>
                        <p class="text-sm font-bold text-purple-800 dark:text-purple-400">
                            {{ subGods }}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    </aside>
</template>

<script setup>
defineProps({
    name: { type: String, required: true },
    title: { type: String, default: '' },
    level: { type: String, default: '未知' },
    path: { type: String, default: '不明' },
    opposingFaith: { type: String, default: '无' },
    gender: { type: String, default: '不可名状' },
    status: { type: String, default: '沉睡' },
    prayer: { type: String, default: '' }, // 祷词
    appearance: { type: String, default: '' }, // 形象
    decree: { type: String, default: '' }, // 谕行
    chosen: { type: String, default: '' }, // 神选
    subGods: { type: String, default: '' } // 从神
})
</script>