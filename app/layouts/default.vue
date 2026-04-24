<template>
    <div
        class="min-h-screen bg-slate-50 dark:bg-[#15151a] text-slate-800 dark:text-gray-300 font-sans pb-12 selection:bg-amber-500/30 flex flex-col transition-colors duration-300">

        <div
            class="fixed inset-0 z-0 pointer-events-none wiki-bg-pattern opacity-50 dark:opacity-100 transition-opacity duration-300">
        </div>
        <div
            class="fixed inset-0 z-0 pointer-events-none wiki-bg-glow opacity-40 dark:opacity-100 transition-opacity duration-300">
        </div>

        <header
            class="sticky top-0 z-50 h-14 bg-white/90 dark:bg-[#1a1a21]/90 backdrop-blur-md border-b border-slate-200 dark:border-gray-700/50 flex items-center px-4 xl:px-8 justify-between transition-colors duration-300">

            <NuxtLink to="/" class="flex items-center gap-2 sm:gap-3 min-w-0 group">
                <div
                    class="w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <img src="/logo.png" alt="诸神愚戏 WIKI" class="w-full h-full object-contain" />
                </div>
                <span
                    class="text-base sm:text-lg font-extrabold tracking-wide sm:tracking-widest font-serif truncate text-slate-800 dark:text-gray-100 transition-colors">
                    诸神愚戏
                    <span
                        class="text-slate-500 dark:text-gray-400 font-sans ml-1 text-xs sm:text-sm tracking-normal font-bold hidden sm:inline-block">WIKI</span>
                </span>
            </NuxtLink>

            <nav class="hidden lg:flex items-center gap-8 h-full">
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
                            <NuxtLink v-for="cat in wikiCategories" :key="cat" :to="`/category/${encodeURIComponent(cat)}`"
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

            <div class="flex items-center gap-2 sm:gap-3 shrink-0">

                <div @click="searchModal?.open()"
                    class="hidden md:flex items-center bg-slate-100 dark:bg-[#15151a] border border-slate-200 dark:border-gray-700/50 hover:border-slate-300 dark:hover:border-gray-500 transition px-4 py-1.5 w-64 group rounded-full cursor-pointer select-none">
                    <Icon name="ph:magnifying-glass-bold"
                        class="text-slate-400 dark:text-gray-500 group-hover:text-indigo-500 dark:group-hover:text-amber-500 transition-colors mr-2" />
                    <span class="text-sm text-slate-400 dark:text-gray-500">检索词条...</span>
                    <div
                        class="ml-auto text-[10px] font-mono bg-white dark:bg-gray-800 px-1.5 rounded text-slate-400 dark:text-gray-400 shadow-sm dark:shadow-none border border-slate-200 dark:border-transparent">
                        Ctrl+K</div>
                </div>

                <ThemeToggle />

                <button @click="isMobileMenuOpen = true"
                    class="lg:hidden text-slate-500 dark:text-gray-400 hover:text-indigo-500 transition p-1">
                    <Icon name="ph:list-bold" class="text-xl" />
                </button>
            </div>
        </header>


        <Transition name="fade">
            <div v-if="isMobileMenuOpen" @click="isMobileMenuOpen = false"
                class="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm z-[60] lg:hidden">
            </div>
        </Transition>


        <Transition name="slide-right">
            <div v-if="isMobileMenuOpen"
                class="fixed top-0 right-0 h-full w-64 sm:w-80 bg-white dark:bg-[#1a1a21] shadow-2xl z-[70] lg:hidden flex flex-col border-l border-slate-200 dark:border-gray-700/50">

                <div
                    class="h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-gray-700/50 shrink-0 bg-slate-50 dark:bg-[#15151a]">
                    <span class="font-bold text-slate-800 dark:text-gray-200 text-sm">菜单导航</span>
                    <button @click="isMobileMenuOpen = false"
                        class="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 bg-white dark:bg-gray-800 rounded-md border border-slate-200 dark:border-gray-700 shadow-sm transition">
                        <Icon name="ph:x-bold" class="text-sm" />
                    </button>
                </div>
                <div class="flex-1 overflow-y-auto py-5 px-4 flex flex-col gap-6">

                    <button @click="handleMobileSearch"
                        class="w-full flex items-center bg-slate-100 dark:bg-[#15151a] border border-slate-200 dark:border-gray-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-500 transition hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <Icon name="ph:magnifying-glass-bold" class="mr-2 text-lg" /> 检索档案馆词条...
                    </button>

                    <div>
                        <div
                            class="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                            <Icon name="ph:books-duotone" class="text-sm" /> WIKI 枢纽
                        </div>
                        <div class="flex flex-col gap-1 pl-3 border-l-2 border-slate-100 dark:border-gray-800/80">
                            <NuxtLink v-for="cat in wikiCategories" :key="cat" :to="`/category/${encodeURIComponent(cat)}`"
                                class="py-2 px-3 text-sm text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800/50 transition">
                                {{ cat }}
                            </NuxtLink>
                        </div>
                    </div>

                    <div>
                        <div
                            class="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                            <Icon name="ph:users-three-duotone" class="text-sm" /> 社区项目
                        </div>
                        <div class="flex flex-col gap-1 pl-3 border-l-2 border-slate-100 dark:border-gray-800/80">
                            <NuxtLink v-for="project in communityProjects" :key="project.path" :to="project.path"
                                class="py-2 px-3 text-sm text-slate-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800/50 transition">
                                {{ project.title }}
                            </NuxtLink>
                        </div>
                    </div>

                    <div class="pt-2 mt-2 border-t border-slate-100 dark:border-gray-800/80">
                        <NuxtLink to="/timeline"
                            class="text-sm font-bold text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-2 py-3 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800/50">
                            <Icon name="ph:hourglass-high-duotone" class="text-lg text-indigo-500" /> 编年史
                        </NuxtLink>
                    </div>

                </div>
            </div>
        </Transition>


        <main class="flex-1 relative z-10">
            <slot />
        </main>

        <SearchModal ref="searchModal" />

    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const searchModal = ref(null)
const route = useRoute()


const isMobileMenuOpen = ref(false)


watch(() => route.path, () => {
    isMobileMenuOpen.value = false
})


const handleMobileSearch = () => {
    isMobileMenuOpen.value = false
    setTimeout(() => {
        searchModal.value?.open()
    }, 150)
}



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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-right-enter-from,
.slide-right-leave-to {
    transform: translateX(100%);
}
</style>