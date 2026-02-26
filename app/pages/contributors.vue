<!-- app/pages/contributors.vue -->
<template>
    <div class="max-w-[1200px] mx-auto px-4 py-8 xl:px-8 min-h-[80vh]">

        <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-500 mb-8 font-mono">
            <NuxtLink to="/" class="hover:text-amber-600 dark:hover:text-amber-500 transition flex items-center gap-1">
                <Icon name="ph:planet-duotone" class="text-sm" /> 切片宇宙
            </NuxtLink>
            <Icon name="ph:caret-right-bold" />
            <span class="text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">贡献与支持</span>
        </div>


        <header
            class="relative bg-white dark:bg-[#1a1a21] border border-amber-200 dark:border-amber-900/30 rounded-xl p-8 mb-12 flex flex-col items-center text-center shadow-md dark:shadow-[0_0_30px_rgba(217,119,6,0.05)] overflow-hidden transition-colors duration-300">
            <!-- 背景 -->
            <Icon name="ph:medal-duotone"
                class="absolute -top-10 -right-10 text-9xl text-amber-500/10 dark:text-amber-500/5 rotate-12 pointer-events-none" />
            <Icon name="ph:users-three-duotone"
                class="absolute -bottom-10 -left-10 text-9xl text-amber-500/10 dark:text-amber-500/5 -rotate-12 pointer-events-none" />

            <div
                class="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 mb-6">
                <Icon name="ph:crown-simple-duotone" class="text-3xl text-white" />
            </div>
            <h1 class="text-4xl md:text-5xl font-black text-slate-800 dark:text-white font-serif mb-4 tracking-wide">
                贡献人员 <span class="text-amber-600 dark:text-amber-500">与</span> 社区支持
            </h1>
            <p class="text-sm md:text-base text-slate-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                在此，我们向所有为《诸神愚戏 WIKI》编写卷宗的贡献者，以及在社区中</p>
            <p class="text-sm md:text-base text-slate-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                默默提供支持的伙伴们致以最崇高的敬意。
            </p>
        </header>

        <section class="mb-16">
            <div
                class="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-gray-700/50 pb-3 transition-colors duration-300">
                <Icon name="ph:pen-nib-duotone" class="text-2xl text-amber-600 dark:text-amber-500" />
                <h2 class="text-2xl font-bold text-slate-800 dark:text-gray-100 font-serif">内容贡献人员</h2>
                <span
                    class="text-xs text-slate-500 dark:text-gray-500 font-mono bg-slate-100 dark:bg-gray-800 px-2 py-0.5 rounded ml-2">WIKI
                    核心编辑</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="(member, index) in displayTeamMembers" :key="member.name"
                    class="relative group bg-white dark:bg-[#1a1a21] border p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center gap-4 overflow-hidden"
                    :class="getBorderClass(member.role)">

                    <!-- 名次水印 -->
                    <div v-if="index < 3"
                        class="absolute right-0 bottom-0 text-7xl font-serif italic font-black -mb-4 -mr-2 transition-transform group-hover:scale-110"
                        :class="getWatermarkColor(index)">
                        {{ index + 1 }}
                    </div>

                    <!-- 头像 -->
                    <div class="w-14 h-14 bg-slate-100 dark:bg-gray-900 shrink-0 rounded-full flex items-center justify-center overflow-hidden border-2 z-10 shadow-sm"
                        :class="getAvatarBorder(member.role)">
                        <img :src="member.avatar" alt="avatar" class="w-full h-full object-cover" />
                    </div>

                    <!-- 信息 -->
                    <div class="z-10 flex-1 min-w-0">
                        <div class="text-[14px] text-slate-500 dark:text-gray-500 font-mono mb-0.5">{{ member.title }}
                        </div>
                        <div class="text-base font-bold truncate flex items-center gap-1.5"
                            :class="getNameColor(member.role)">
                            {{ member.name }}
                            <Icon v-if="member.role === 'creator'" name="ph:crown-fill"
                                class="text-amber-500 text-xs shrink-0" />
                            <Icon v-if="member.role === 'lead'" name="ph:star-fill"
                                class="text-red-500 text-xs shrink-0" />
                        </div>
                        <div
                            class="text-[10px] text-slate-600 dark:text-gray-400 font-mono mt-1.5 bg-slate-100 dark:bg-black/40 px-2 py-0.5 rounded inline-block border border-slate-200 dark:border-gray-700/50">
                            <Icon name="ph:pencil-simple-duotone" class="mr-0.5" /> {{ member.editCount }} 贡献
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div
                class="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-gray-700/50 pb-3 transition-colors duration-300">
                <Icon name="ph:hands-clapping-duotone" class="text-2xl text-purple-600 dark:text-purple-400" />
                <h2 class="text-2xl font-bold text-slate-800 dark:text-gray-100 font-serif">社区支持人员</h2>
                <span
                    class="text-xs text-slate-500 dark:text-gray-500 font-mono bg-slate-100 dark:bg-gray-800 px-2 py-0.5 rounded ml-2">同人/群管/外围支持</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="member in communityMembers" :key="member.name"
                    class="group bg-white dark:bg-[#1a1a21] border border-purple-200 dark:border-purple-900/30 p-5 rounded-xl transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500/50 hover:bg-purple-50 dark:hover:bg-[#1f1a26] flex items-center gap-4">

                    <div
                        class="w-14 h-14 bg-slate-100 dark:bg-gray-900 shrink-0 rounded-full flex items-center justify-center overflow-hidden border-2 border-purple-300 dark:border-purple-500/60 shadow-sm dark:shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                        <img :src="member.avatar" alt="avatar"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    <div class="flex-1 min-w-0">
                        <div class="text-[14px] text-purple-600/70 dark:text-purple-400/70 font-mono mb-0.5">{{
                            member.title }}</div>
                        <div class="text-base font-bold text-purple-800 dark:text-purple-300 truncate tracking-wide">
                            {{ member.name }}
                        </div>
                        <div
                            class="w-6 h-0.5 bg-purple-400 dark:bg-purple-500/50 mt-2 rounded-full group-hover:w-12 transition-all duration-300">
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script setup>
import { useAsyncData, useSeoMeta } from '#imports'

const { data: allDocs } = await useAsyncData('contributors-stats', () => {
    return queryCollection('content').all()
})

const editCounts = {}
if (allDocs.value) {
    allDocs.value.forEach(doc => {
        if (doc.authors && Array.isArray(doc.authors)) {
            doc.authors.forEach(name => {
                editCounts[name] = (editCounts[name] || 0) + 1
            })
        }
    })
}

// 整理完整榜单
const buildDisplayList = () => {
    const creator = teamMembers.find(m => m.role === 'creator')
    const lead = teamMembers.find(m => m.role === 'lead')

    const fixedList = [creator, lead].filter(Boolean).map(m => ({
        ...m, editCount: editCounts[m.name] || 0
    }))

    const fixedNames = fixedList.map(m => m.name)
    const others = teamMembers.filter(m => !fixedNames.includes(m.name))

    const sortedOthers = others
        .map(m => ({ ...m, editCount: editCounts[m.name] || 0 }))
        .sort((a, b) => b.editCount - a.editCount)

    return [...fixedList, ...sortedOthers]
}

const displayTeamMembers = buildDisplayList()

const getBorderClass = (role) => {
    if (role === 'creator') return 'border-amber-200 dark:border-amber-700/40 hover:border-amber-400 dark:hover:border-amber-500/60 shadow-sm dark:shadow-[0_0_15px_rgba(217,119,6,0.05)]'
    if (role === 'lead') return 'border-red-200 dark:border-red-700/40 hover:border-red-400 dark:hover:border-red-500/60 shadow-sm dark:shadow-[0_0_15px_rgba(239,68,68,0.05)]'
    return 'border-blue-200 dark:border-blue-700/30 hover:border-blue-400 dark:hover:border-blue-500/50'
}

const getAvatarBorder = (role) => {
    if (role === 'creator') return 'border-amber-400 dark:border-amber-500 shadow-sm dark:shadow-[0_0_10px_rgba(217,119,6,0.3)]'
    if (role === 'lead') return 'border-red-400 dark:border-red-500 shadow-sm dark:shadow-[0_0_10px_rgba(239,68,68,0.3)]'
    return 'border-blue-400 dark:border-blue-500/70'
}

const getNameColor = (role) => {
    if (role === 'creator') return 'text-amber-600 dark:text-amber-400'
    if (role === 'lead') return 'text-red-600 dark:text-red-400'
    return 'text-blue-600 dark:text-blue-300'
}

const getWatermarkColor = (index) => {
    if (index === 0) return 'text-amber-500/20 dark:text-amber-500/10'
    if (index === 1) return 'text-red-500/20 dark:text-red-500/10'
    return 'text-blue-500/10 dark:text-blue-500/5'
}


useSeoMeta({
    title: '贡献与支持 - 诸神愚戏 WIKI',
    description: '致敬所有为诸神愚戏WIKI扩张添砖加瓦的贡献者与社区支持者。'
})
</script>