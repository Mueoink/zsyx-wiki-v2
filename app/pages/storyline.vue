<!-- app/pages/storyline.vue -->
<template>
    <div
        class="relative min-h-screen pb-32 overflow-hidden bg-slate-50 dark:bg-[#0a0a0c] transition-colors duration-500">
        <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div
                class="absolute inset-0 bg-slate-50 dark:bg-gradient-to-b dark:from-[#0a0a0c] dark:via-[#1a1a2e] dark:to-[#0a0a0c] opacity-90 transition-colors duration-500">
            </div>

            <div
                class="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] border border-white/5 rounded-full animate-[spin_120s_linear_infinite]">
            </div>
            <div
                class="hidden dark:block absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] border border-dashed border-white/5 rounded-full animate-[spin_80s_linear_infinite_reverse]">
            </div>

            <div
                class="dark:hidden absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2">
            </div>
            <div
                class="dark:hidden absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2">
            </div>
        </div>

        <div class="relative z-10 pt-24 pb-24 text-center px-4">
            <div
                class="inline-flex items-center gap-3 px-4 py-1.5 border border-indigo-200 dark:border-amber-500/20 bg-white/50 dark:bg-amber-500/5 text-indigo-600 dark:text-amber-500 text-xs font-mono font-bold tracking-[0.2em] rounded-full mb-6 backdrop-blur-md shadow-sm transition-colors">
                <Icon name="ph:hourglass-high-duotone" /> CHRONICLES OF AKASHA
            </div>
            <h1
                class="text-5xl md:text-7xl font-black text-slate-900 dark:text-white font-serif mb-6 tracking-widest drop-shadow-sm dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-colors">
                寰 宇 编 年 史
            </h1>
            <p
                class="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium dark:font-light transition-colors">
                这是被诸神注视的棋盘，也是凡人挣扎的舞台。<br class="hidden md:block" />
                在此查阅所有已发生的宏大篇章，见证从微末到神座的每一步。
            </p>
        </div>

        <!-- ================= 3. 垂直时间轴核心 (通栏大卡片布局) ================= -->
        <div class="relative z-10 max-w-4xl mx-auto px-4">

            <!-- 中轴线 (贯穿) -->
            <div
                class="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-indigo-500/30 to-transparent transition-colors">
            </div>

            <div class="space-y-16">

                <NuxtLink v-for="(vol, index) in volumes" :key="vol.id" :to="vol.path" class="relative group block">

                    <div
                        class="absolute left-8 md:left-1/2 top-1/2 -translate-y-1/2 w-4 h-4 md:-ml-2 rounded-full border-4 border-white dark:border-[#0a0a0c] bg-slate-400 dark:bg-indigo-500 shadow-md dark:shadow-[0_0_20px_rgba(99,102,241,0.5)] z-20 transition-all duration-500 group-hover:scale-125 group-hover:bg-indigo-600 dark:group-hover:bg-amber-500">
                    </div>

    
                    <div
                        class="relative ml-16 md:ml-0 bg-white dark:bg-[#15151a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl dark:shadow-none transition-all duration-500 group-hover:-translate-y-1 group-hover:border-indigo-300 dark:group-hover:border-indigo-500/30 overflow-hidden">


                        <div
                            class="absolute -right-6 -bottom-8 text-[10rem] font-black text-slate-100 dark:text-white/5 font-serif leading-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12 pointer-events-none">
                            0{{ index + 1 }}
                        </div>

       
                        <div class="relative z-10 flex flex-col md:flex-row md:items-center gap-6">

    
                            <div class="shrink-0 flex flex-col items-start gap-3">
                                <div
                                    class="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center shadow-inner transition-colors group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20">
                                    <Icon :name="vol.icon"
                                        class="text-4xl text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-amber-400 transition-colors duration-300" />
                                </div>
                                <span
                                    class="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-indigo-300 border border-slate-200 dark:border-white/5 group-hover:border-indigo-200 dark:group-hover:border-indigo-500/30 transition-colors">
                                    {{ vol.chapterCount }} 章
                                </span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h2
                                    class="text-3xl md:text-4xl font-black text-slate-800 dark:text-white font-serif mb-3 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                                    {{ vol.title.split('：')[1] || vol.title }}
                                </h2>
                                <p
                                    class="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                                    {{ vol.desc }}
                                </p>

                
                                <div
                                    class="mt-6 flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-indigo-400/50 group-hover:text-indigo-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                                    <span>点击查阅完整卷宗</span>
                                    <Icon name="ph:arrow-right-bold"
                                        class="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                        </div>
                    </div>

                </NuxtLink>

            </div>

            <div class="mt-24 text-center pb-20">
                <div
                    class="inline-flex flex-col items-center gap-3 text-slate-400 dark:text-slate-600 font-mono text-xs">
                    <div class="h-16 w-px bg-gradient-to-b from-slate-300 dark:from-indigo-500/30 to-transparent"></div>
                    <span>T O &nbsp; B E &nbsp; C O N T I N U E D</span>
                </div>
            </div>

        </div>

    </div>
</template>

<script setup>
import { useSeoMeta } from '#imports'

useSeoMeta({
    title: '寰宇编年史 - 诸神愚戏 WIKI',
    description: '按分卷索引，探索诸神愚戏的完整时间线与大事件。'
})
</script>