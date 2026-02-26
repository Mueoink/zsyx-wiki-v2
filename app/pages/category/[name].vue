<!-- app/pages/category/[name].vue -->
<template>
    <div class="max-w-[1200px] mx-auto px-4 py-8 xl:px-8 min-h-[80vh]">

        <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-500 mb-6 font-mono transition-colors">
            <NuxtLink to="/" class="hover:text-slate-800 dark:hover:text-gray-300 transition flex items-center gap-1">
                <Icon name="ph:planet-duotone" class="text-sm" /> 真实宇宙
            </NuxtLink>
            <Icon name="ph:caret-right-bold" />
            <span
                class="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded transition-colors">{{
                categoryName }}</span>
        </div>

        <header
            class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700 rounded-xl p-6 md:p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm dark:shadow-md relative overflow-hidden transition-colors duration-300">

            <div class="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>

            <div class="pl-2">
                <div
                    class="px-2 py-1 bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-gray-300 text-[10px] font-mono tracking-widest rounded border border-slate-200 dark:border-gray-700 inline-block mb-3 transition-colors">
                    CATEGORY HUB
                </div>

                <h1
                    class="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white font-serif mb-2 transition-colors">
                    {{ categoryName }}
                </h1>
                <p class="text-sm text-slate-500 dark:text-gray-400 transition-colors">
                    所有归属于【{{ categoryName }}】的资料卷宗均收录于此。
                </p>
            </div>

            <div
                class="w-full md:w-32 py-4 bg-slate-50 dark:bg-[#22222b] border border-slate-200 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center shrink-0 shadow-sm dark:shadow-inner transition-colors">
                <div class="text-4xl font-black text-amber-500 font-serif leading-none">{{ entries?.length || 0 }}</div>
                <div class="text-[10px] text-slate-400 dark:text-gray-500 font-mono mt-1 transition-colors">收录卷宗</div>
            </div>
        </header>

        <div v-if="entries && entries.length > 0">

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <NuxtLink v-for="entry in entries" :key="entry.path" :to="entry.path"
                    class="group bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors duration-300 rounded-xl p-5 flex flex-col min-h-[200px] shadow-sm hover:shadow-md dark:hover:shadow-lg">

                    <div class="flex justify-between items-start mb-2">
                        <h2
                            class="text-lg font-bold text-slate-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 font-serif pr-3">
                            {{ entry.title || '未命名卷宗' }}
                        </h2>
                        <Icon name="ph:arrow-right-bold"
                            class="text-slate-400 dark:text-gray-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors mt-1 shrink-0" />
                    </div>

                    <p class="text-sm text-slate-500 dark:text-gray-400 line-clamp-3 mb-5 transition-colors">
                        {{ entry.description || '暂无详细描述...' }}
                    </p>

                    <div
                        class="mt-auto pt-3 border-t border-slate-100 dark:border-gray-700/50 flex flex-wrap items-center justify-between gap-3 transition-colors">

                        <!-- Tags 列表 -->
                        <div class="flex flex-wrap gap-1.5">
                            <template v-if="entry.tags && entry.tags.length > 0">
                                <span v-for="tag in entry.tags.slice(0, 2)" :key="tag"
                                    class="px-2 py-0.5 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 text-[10px] rounded border border-slate-200 dark:border-gray-700 font-mono transition-colors">
                                    <span class="text-amber-500 mr-0.5">#</span>{{ tag }}
                                </span>
                                <span v-if="entry.tags.length > 2"
                                    class="text-[10px] text-slate-400 dark:text-gray-600 font-mono mt-0.5 transition-colors">...</span>
                            </template>
                            <span v-else
                                class="text-[10px] text-slate-400 dark:text-gray-600 font-mono transition-colors">无标签</span>
                        </div>

                        <!-- 作者 -->
                        <div
                            class="flex items-center gap-1 text-[11px] text-slate-500 dark:text-gray-500 font-mono transition-colors">
                            <Icon name="ph:pen-nib-duotone" />
         
                            {{ (entry.authors && entry.authors.length > 0) ? entry.authors[0] : '佚名' }}
                            <span v-if="entry.authors && entry.authors.length > 1">等</span>
                        </div>

                    </div>
                </NuxtLink>

            </div>
        </div>

        <div v-else
            class="flex flex-col items-center justify-center py-24 bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700 rounded-xl shadow-sm transition-colors">
            <Icon name="ph:folder-open-duotone"
                class="text-5xl text-slate-300 dark:text-gray-600 mb-4 transition-colors" />
            <h2 class="text-lg font-bold text-slate-700 dark:text-gray-300 mb-1 transition-colors">大厅空空如也</h2>
            <p class="text-sm text-slate-500 dark:text-gray-500 transition-colors">“{{ categoryName }}” 分类下似乎还没有收录任何卷宗。
            </p>
        </div>

    </div>
</template>

<script setup>
import { useRoute, useAsyncData, useSeoMeta } from '#imports'

const route = useRoute()
const categoryName = decodeURIComponent(route.params.name)

const { data: entries } = await useAsyncData(`category-${categoryName}`, () => {
    return queryCollection('content')
        .where('category', '=', categoryName)
        .all()
})

useSeoMeta({
    title: `${categoryName} - 诸神愚戏WIKI`,
    description: `探索诸神愚戏WIKI中关于【${categoryName}】的全部收录卷宗。`
})
</script>