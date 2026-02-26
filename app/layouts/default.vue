<!-- app/layouts/default.vue -->
<template>
    <div class="min-h-screen bg-slate-50 dark:bg-[#15151a] text-slate-800 dark:text-gray-300 font-sans pb-12 selection:bg-amber-500/30 flex flex-col transition-colors duration-300">

        <div class="fixed inset-0 z-0 pointer-events-none wiki-bg-pattern opacity-50 dark:opacity-100 transition-opacity duration-300"></div>
        <div class="fixed inset-0 z-0 pointer-events-none wiki-bg-glow opacity-40 dark:opacity-100 transition-opacity duration-300"></div>


        <header
            class="sticky top-0 z-50 h-14 bg-white/90 dark:bg-[#1a1a21]/90 backdrop-blur-md border-b border-slate-200 dark:border-gray-700/50 flex items-center px-4 xl:px-8 justify-between transition-colors duration-300">

            <!-- Logo -->
            <NuxtLink to="/" class="flex items-center gap-3">
               <div
                    class="w-8 h-8 rounded-md flex items-center justify-center overflow-hidden shrink-0 drop-shadow-md hover:scale-105 transition-transform">
                    <img src="/logo.png" alt="诸神愚戏 WIKI" class="w-full h-full object-contain" />
                </div>
                <span class="text-lg font-extrabold tracking-widest font-serif drop-shadow-md">
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 dark:from-indigo-400 dark:via-purple-400 dark:to-amber-300">诸神愚戏</span>
                    <span class="text-slate-800 dark:text-gray-100 font-sans ml-1 text-sm tracking-normal font-bold">WIKI</span>
                </span>
            </NuxtLink>

            <!-- 导航栏 -->
            <nav class="hidden lg:flex items-center gap-8 h-full">

                <!-- WIKI 枢纽 -->
                <div class="relative group h-full flex items-center">
                    <div
                        class="flex items-center gap-1 cursor-pointer text-sm font-bold text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                        <Icon name="ph:books-duotone" class="text-lg" /> WIKI 枢纽
                        <Icon name="ph:caret-down-bold"
                            class="text-[10px] group-hover:rotate-180 transition-transform" />
                    </div>

                    <div
                        class="absolute top-14 left-1/2 -translate-x-1/2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div
                            class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-[#1a1a21] border-t border-l border-slate-200 dark:border-gray-700/50 rotate-45">
                        </div>
                        <div
                            class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-xl shadow-xl overflow-hidden flex flex-col relative z-10 py-1.5">
                            <NuxtLink v-for="cat in wikiCategories" :key="cat" :to="`/category/${cat}`"
                                class="px-4 py-2 text-sm text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-gray-800/50 hover:pl-5 transition-all flex items-center gap-2">
                                <Icon name="ph:caret-right-bold" class="text-indigo-500 text-[10px]" />
                                {{ cat }}
                            </NuxtLink>
                            <div v-if="wikiCategories.length === 0" class="px-4 py-3 text-xs text-gray-500">暂无分类...
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 社区项目 -->
                <div class="relative group h-full flex items-center">
                    <div
                        class="flex items-center gap-1 cursor-pointer text-sm font-bold text-slate-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition">
                        <Icon name="ph:users-three-duotone" class="text-lg" /> 社区项目
                        <Icon name="ph:caret-down-bold"
                            class="text-[10px] group-hover:rotate-180 transition-transform" />
                    </div>

                    <div
                        class="absolute top-14 left-1/2 -translate-x-1/2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div
                            class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-[#1a1a21] border-t border-l border-slate-200 dark:border-gray-700/50 rotate-45">
                        </div>
                        <div
                            class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-xl shadow-xl overflow-hidden flex flex-col relative z-10 py-1.5">
                            <NuxtLink v-for="project in communityProjects" :key="project.path" :to="project.path"
                                class="px-4 py-2 text-sm text-slate-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-gray-800/50 hover:pl-5 transition-all flex items-center gap-2">
                                <Icon name="ph:star-four-fill" class="text-amber-500 text-[10px]" />
                                {{ project.title }}
                            </NuxtLink>
                            <div v-if="communityProjects.length === 0" class="px-4 py-3 text-xs text-gray-500">暂无项目...
                            </div>
                        </div>
                    </div>
                </div>

                <NuxtLink to="/timeline"
                    class="text-sm font-bold text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition flex items-center gap-1">
                    <Icon name="ph:hourglass-high-duotone" class="text-lg" /> 编年史
                </NuxtLink>

            </nav>

            <div class="flex items-center gap-3">
                
                <!-- 搜索框 -->
                <div @click="searchModal?.open()"
                    class="hidden md:flex items-center bg-slate-100 dark:bg-[#15151a] border border-slate-200 dark:border-gray-700/50 hover:border-slate-300 dark:hover:border-gray-500 transition px-4 py-1.5 w-64 group rounded-full cursor-pointer select-none">
                    <Icon name="ph:magnifying-glass-bold"
                        class="text-slate-400 dark:text-gray-500 group-hover:text-indigo-500 dark:group-hover:text-amber-500 transition-colors mr-2" />
                    <span class="text-sm text-slate-400 dark:text-gray-500">检索词条...</span>
                    <div
                        class="ml-auto text-[10px] font-mono bg-white dark:bg-gray-800 px-1.5 rounded text-slate-400 dark:text-gray-400 shadow-sm dark:shadow-none border border-slate-200 dark:border-transparent">
                        Ctrl+K</div>
                </div>

                <!-- 昼夜切换 -->
                <ThemeToggle />

                <button class="lg:hidden text-slate-500 dark:text-gray-400 hover:text-indigo-500 transition">
                    <Icon name="ph:list-bold" class="text-xl" />
                </button>
            </div>
        </header>

        <main class="flex-1 relative z-10">
            <slot />
        </main>
        <SearchModal ref="searchModal" />

    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const searchModal = ref(null)

const { data: allContents } = await useAsyncData('navigation-data', () =>
    queryCollection('content')
        .select('title', 'path', 'navType', 'category', 'hideInMenu')
        .all()
)


const wikiCategories = computed(() => {
    if (!allContents.value) return []
    const wikis = allContents.value.filter(item => item.navType === 'wiki' && item.category && item.hideInMenu !== true)
    return [...new Set(wikis.map(item => item.category))]
})

const communityProjects = computed(() => {
    if (!allContents.value) return []
    return allContents.value.filter(item => item.navType === 'community')
})
</script>

<style>

.wiki-bg-pattern {
    background-image:
        linear-gradient(to right, rgba(120, 120, 120, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(120, 120, 120, 0.05) 1px, transparent 1px);
    background-size: 48px 48px;
}

.wiki-bg-glow {
    background:
        radial-gradient(circle at 50% 0%, rgba(49, 46, 129, 0.1) 0%, transparent 60%),
        radial-gradient(circle at 80% 100%, rgba(120, 53, 15, 0.05) 0%, transparent 50%);
}



::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    transition: background-color 0.3s ease;
}
::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3);
}
::-webkit-scrollbar-thumb:active {
    background-color: rgba(0, 0, 0, 0.4);
}


.dark ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.15);
}
.dark ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.3);
}
.dark ::-webkit-scrollbar-thumb:active {
    background-color: rgba(255, 255, 255, 0.5);
}


::-webkit-scrollbar-track,
::-webkit-scrollbar-corner {
    background-color: transparent;
}


* {
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
    scrollbar-width: thin;
}
.dark * {
    scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
}
</style>