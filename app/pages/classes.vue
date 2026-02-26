<!-- app/pages/classes.vue -->
<template>
    <div class="max-w-[1200px] mx-auto px-4 py-8 xl:px-8 min-h-[80vh]">
        <div class="mb-10 text-center relative flex flex-col items-center">
            <Icon name="ph:hexagon-duotone"
                class="absolute left-1/2 -top-10 -translate-x-1/2 text-[150px] text-indigo-500/5 dark:text-indigo-500/10 pointer-events-none transition-colors" />

            <div
                class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold rounded-full mb-4 z-10 transition-colors">
                <Icon name="ph:books-duotone" /> 诸神愚戏WIKI数据库
            </div>

            <h1
                class="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white font-serif mb-4 tracking-wider z-10 transition-colors">
                信 仰 职 业 表
            </h1>

            <p
                class="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed mb-6 z-10 transition-colors">
                切片宇宙的凡人通过供奉不同的【信仰】，来获得非凡力量，从而区分出截然不同的六大职业。
            </p>

            <!-- 贡献者区域 -->
            <div
                class="flex flex-wrap justify-center items-center gap-4 text-sm text-slate-600 dark:text-gray-500 z-10 bg-white/80 dark:bg-[#1a1a21]/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-slate-200 dark:border-gray-700/50 shadow-sm transition-colors">
                <div class="flex items-center gap-1.5">
                    <Icon name="ph:database-duotone" class="text-base text-slate-500 dark:text-gray-400" />
                    全表由以下人员合力编撰
                </div>

                <div v-if="validAuthors.length > 0" class="flex items-center gap-2">
                    <Icon name="ph:pen-nib-duotone" class="text-base text-slate-400 dark:text-gray-400" />
                    <div class="flex flex-wrap justify-center gap-2.5">
                        <div v-for="author in validAuthors" :key="author.name"
                            class="flex items-center gap-1.5 pr-3 pl-0.5 py-1 rounded-full border bg-slate-50 dark:bg-[#15151a] shadow-sm transition-all hover:-translate-y-0.5"
                            :class="getAuthorTagClass(author.role)">
                            <img :src="author.avatar" alt="avatar"
                                class="w-6 h-6 rounded-full object-cover border border-slate-300 dark:border-black/50" />
                            <span class="font-bold tracking-wide flex items-center gap-1 text-[13px]">
                                {{ author.name }}
                                <Icon v-if="author.role === 'creator'" name="ph:crown-fill"
                                    class="text-amber-500 text-[11px]" />
                                <Icon v-if="author.role === 'lead'" name="ph:star-fill"
                                    class="text-red-500 text-[11px]" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="space-y-12 relative z-10">

            <section v-for="(faithData, index) in faithClasses" :key="faithData.faith"
                class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-lg flex flex-col xl:flex-row group transition-colors">

                <div class="xl:w-[320px] shrink-0 p-8 relative flex flex-col justify-center overflow-hidden border-b xl:border-b-0 xl:border-r border-slate-200 dark:border-gray-700/50 transition-colors"
                    :class="getThemeBg(faithData.theme)">


                    <Icon :name="faithData.icon"
                        class="absolute -right-6 -bottom-6 text-9xl opacity-[0.03] dark:opacity-10 -rotate-12 transition-transform duration-700 group-hover:scale-110" />

                    <div class="relative z-10">

                        <div class="w-14 h-14 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/10 flex items-center justify-center mb-4 shadow-sm dark:shadow-inner transition-colors"
                            :class="getThemeText(faithData.theme)">
                            <Icon :name="faithData.icon" class="text-3xl" />
                        </div>

                        <div
                            class="text-[10px] font-mono tracking-widest text-slate-500 dark:text-white/50 mb-1 transition-colors">
                            FAITH ORIGIN</div>

                        <h2
                            class="text-4xl font-black text-slate-800 dark:text-white font-serif tracking-widest mb-4 drop-shadow-sm dark:drop-shadow-md transition-colors">
                            {{ faithData.faith }}
                        </h2>

                        <p
                            class="text-sm text-slate-600 dark:text-white/70 leading-relaxed font-medium transition-colors">
                            {{ faithData.description }}
                        </p>
                    </div>
                </div>

                <div
                    class="flex-1 p-6 md:p-8 bg-slate-50 dark:bg-gradient-to-br dark:from-[#1a1a21] dark:to-[#15151a] transition-colors">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <!-- 职业卡片 -->
                        <div v-for="career in faithData.careers" :key="career.name"
                            class="bg-white dark:bg-[#22222b] border border-slate-200 dark:border-gray-700/40 rounded-xl p-4 hover:border-slate-300 dark:hover:border-gray-500 hover:shadow-md dark:hover:shadow-none transition-all duration-300 relative overflow-hidden group/card">

                            <!-- 类型 -->
                            <div class="absolute top-0 right-0 px-2 py-0.5 text-[10px] font-bold tracking-widest rounded-bl-lg border-l border-b border-slate-100 dark:border-gray-700/50 transition-colors"
                                :class="getTypeBadge(career.type)">
                                {{ career.type }}
                            </div>

                            <!-- 名称 -->
                            <h3
                                class="text-lg font-bold text-slate-800 dark:text-gray-100 font-serif mb-2 flex items-center gap-2 group-hover/card:text-slate-900 dark:group-hover/card:text-white transition-colors">
                                <Icon name="ph:caret-double-right-duotone" class="text-xs"
                                    :class="getThemeText(faithData.theme)" />
                                {{ career.name }}
                            </h3>

                            <!-- 描述 -->
                            <p class="text-xs text-slate-600 dark:text-gray-400 leading-relaxed pr-6 transition-colors">
                                {{ career.desc }}
                            </p>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    </div>
</template>

<script setup>
import { useSeoMeta } from '#imports'
import { computed } from 'vue'

const getThemeBg = (theme) => {

    const bgs = {
        emerald: 'bg-emerald-50 dark:bg-gradient-to-br dark:from-emerald-900/80 dark:to-teal-900/40',
        green: 'bg-green-50 dark:bg-gradient-to-br dark:from-green-900/80 dark:to-lime-900/40',
        slate: 'bg-slate-100 dark:bg-gradient-to-br dark:from-slate-900/80 dark:to-gray-900/40',
        purple: 'bg-purple-50 dark:bg-gradient-to-br dark:from-purple-900/80 dark:to-fuchsia-900/40',
        lime: 'bg-lime-50 dark:bg-gradient-to-br dark:from-lime-900/80 dark:to-green-900/40',
        red: 'bg-red-50 dark:bg-gradient-to-br dark:from-red-900/80 dark:to-orange-900/40',
        blue: 'bg-blue-50 dark:bg-gradient-to-br dark:from-blue-900/80 dark:to-cyan-900/40',
        cyan: 'bg-cyan-50 dark:bg-gradient-to-br dark:from-cyan-900/80 dark:to-blue-900/40',
        rose: 'bg-rose-50 dark:bg-gradient-to-br dark:from-rose-900/80 dark:to-red-900/40',
        fuchsia: 'bg-fuchsia-50 dark:bg-gradient-to-br dark:from-fuchsia-900/80 dark:to-pink-900/40',
        yellow: 'bg-yellow-50 dark:bg-gradient-to-br dark:from-yellow-900/80 dark:to-amber-900/40',
        zinc: 'bg-zinc-100 dark:bg-gradient-to-br dark:from-zinc-900/80 dark:to-slate-900/40',
        indigo: 'bg-indigo-50 dark:bg-gradient-to-br dark:from-indigo-900/80 dark:to-purple-900/40',
        violet: 'bg-violet-50 dark:bg-gradient-to-br dark:from-violet-900/80 dark:to-purple-900/40',
        pink: 'bg-pink-50 dark:bg-gradient-to-br dark:from-pink-900/80 dark:to-rose-900/40',
        amber: 'bg-amber-50 dark:bg-gradient-to-br dark:from-amber-900/80 dark:to-yellow-900/40',
    }
    return bgs[theme] || bgs.indigo
}

const getThemeText = (theme) => {
    // 浅色模式用稍深的主题色(600)，暗色模式用稍浅的(400)保证高对比度
    const texts = {
        emerald: 'text-emerald-600 dark:text-emerald-400',
        green: 'text-green-600 dark:text-green-400',
        slate: 'text-slate-600 dark:text-slate-400',
        purple: 'text-purple-600 dark:text-purple-400',
        lime: 'text-lime-600 dark:text-lime-400',
        red: 'text-red-600 dark:text-red-400',
        blue: 'text-blue-600 dark:text-blue-400',
        cyan: 'text-cyan-600 dark:text-cyan-400',
        rose: 'text-rose-600 dark:text-rose-400',
        fuchsia: 'text-fuchsia-600 dark:text-fuchsia-400',
        yellow: 'text-yellow-600 dark:text-yellow-400',
        zinc: 'text-zinc-600 dark:text-zinc-400',
        indigo: 'text-indigo-600 dark:text-indigo-400',
        violet: 'text-violet-600 dark:text-violet-400',
        pink: 'text-pink-600 dark:text-pink-400',
        amber: 'text-amber-600 dark:text-amber-400',
    }
    return texts[theme] || texts.indigo
}

const getTypeBadge = (type) => {
    const badges = {
        '战士': 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400',
        '法师': 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
        '牧师': 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        '刺客': 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
        '猎人': 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
        '歌者': 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400'
    }
    return badges[type] || 'bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400'
}

const getAuthorTagClass = (role) => {
    if (role === 'creator') return 'border-amber-200 dark:border-amber-500/50 text-amber-600 dark:text-amber-400'
    if (role === 'lead') return 'border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-400'
    return 'border-blue-200 dark:border-blue-500/50 text-blue-600 dark:text-blue-400'
}

useSeoMeta({
    title: '信仰职业表 - 诸神愚戏 WIKI',
    description: '全景展示原文中基于信仰觉醒的六大职业与核心能力。'
})

const pageAuthors = ['槐安', 'Mars', '1', '粟尘', '翎洛']

const validAuthors = computed(() => {
    return pageAuthors.map(name => {
        return teamMembers.find(m => m.name === name)
    }).filter(Boolean)
})
</script>