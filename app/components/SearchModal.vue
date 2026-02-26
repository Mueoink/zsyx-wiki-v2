<!-- app/components/SearchModal.vue -->
<template>
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
            @click.self="close">

            <div class="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm"></div>

            <div
                class="relative w-full max-w-2xl bg-white dark:bg-[#1a1a21] rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-gray-700 flex flex-col max-h-[70vh]">

                <div class="flex items-center px-4 border-b border-slate-100 dark:border-gray-800">
                    <Icon name="ph:magnifying-glass-duotone" class="text-2xl text-slate-400 dark:text-gray-500" />
                    <input ref="searchInput" v-model="query" type="text"
                        class="w-full h-16 bg-transparent border-none outline-none px-4 text-lg text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 font-sans"
                        placeholder="搜索词条、作者、标签、内容..." @input="onInput" @keydown.down.prevent="navigate('down')"
                        @keydown.up.prevent="navigate('up')" @keydown.enter="onEnter" />
                    <div
                        class="hidden sm:flex items-center gap-1 text-xs text-slate-400 dark:text-gray-600 font-mono border border-slate-200 dark:border-gray-800 px-2 py-1 rounded">
                        <span>ESC</span>
                    </div>
                </div>

                <div class="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">

                    <NuxtLink v-for="(item, index) in searchResult" :key="item.id" :to="item.id" @click="close"
                        class="block px-4 py-3 rounded-lg transition-colors group relative"
                        :class="selectedIndex === index ? 'bg-indigo-50 dark:bg-indigo-500/20' : 'hover:bg-slate-50 dark:hover:bg-white/5'"
                        @mousemove="selectedIndex = index">
                        <div v-if="selectedIndex === index"
                            class="absolute left-0 top-2 bottom-2 w-1 bg-indigo-500 rounded-r-full"></div>

                        <div class="flex items-center justify-between mb-1">
                            <div class="flex items-center gap-2">
                                <Icon v-if="item.navType === 'community'" name="ph:users-three-duotone"
                                    class="text-amber-500" />
                                <Icon v-else-if="item.type === 'announcement'" name="ph:speaker-high-duotone"
                                    class="text-blue-500" />
                                <Icon v-else name="ph:file-text-duotone" class="text-indigo-500" />

                                <span class="font-bold text-slate-800 dark:text-gray-100"
                                    :class="selectedIndex === index ? 'text-indigo-700 dark:text-indigo-300' : ''">
                                    {{ item.title }}
                                </span>

                                <span v-if="item.category"
                                    class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400 border border-slate-200 dark:border-gray-700">
                                    {{ item.category }}
                                </span>
                            </div>
                            <!-- <span class="text-xs font-mono text-gray-600">{{ Math.round(item.score) }}</span> -->
                        </div>

              
                        <p class="text-xs text-slate-500 dark:text-gray-500 line-clamp-1 pl-6">
                            {{ item.description || '暂无简介...' }}
                        </p>

                
                        <div class="flex items-center gap-3 mt-2 pl-6 text-[10px]">
                            <!-- 作者 -->
                            <div v-if="item.authors" class="flex items-center gap-1 text-slate-400 dark:text-gray-600">
                                <Icon name="ph:pen-nib" /> {{ item.authors }}
                            </div>
                            <!-- 标签 -->
                            <div v-if="item.tags" class="flex items-center gap-1 text-indigo-400/80">
                                <Icon name="ph:hash" /> {{ item.tags }}
                            </div>
                        </div>
                    </NuxtLink>

                    <!-- 无结果 -->
                    <div v-if="query && searchResult.length === 0"
                        class="py-12 text-center text-slate-400 dark:text-gray-600">
                        <Icon name="ph:ghost-duotone" class="text-4xl mb-2 opacity-50" />
                        <p class="text-sm">未探测到相关卷宗...</p>
                    </div>

                    <!-- 提示 -->
                    <div v-if="!query" class="py-12 text-center text-slate-400 dark:text-gray-600">
                        <p class="text-sm">输入关键词，检索万物...</p>
                        <div class="flex justify-center gap-2 mt-4 text-[10px] font-mono opacity-60">
                            <span class="bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded">作者</span>
                            <span class="bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded">标签</span>
                            <span class="bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded">职业</span>
                        </div>
                    </div>

                </div>

                <div
                    class="bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-gray-800 p-2 flex items-center justify-between text-[10px] text-slate-400 dark:text-gray-600 px-4">
                    <div class="flex gap-4">
                        <span class="flex items-center gap-1"><kbd
                                class="font-sans bg-white dark:bg-gray-700 px-1 rounded border border-slate-200 dark:border-gray-600">↵</kbd>
                            打开</span>
                        <span class="flex items-center gap-1"><kbd
                                class="font-sans bg-white dark:bg-gray-700 px-1 rounded border border-slate-200 dark:border-gray-600">↑↓</kbd>
                            选择</span>
                    </div>
                    <span>诸神愚戏 WIKI 数据库</span>
                </div>

            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useMagicKeys, useRouter } from '#imports'
import { useWikiSearch } from '~/composables/useWikiSearch'

const router = useRouter()
const { Ctrl_K, Meta_K, Escape } = useMagicKeys()
const { initSearch, search, searchResult, isLoaded } = useWikiSearch()

const isOpen = ref(false)
const query = ref('')
const searchInput = ref(null)
const selectedIndex = ref(0)


watch([Ctrl_K, Meta_K], (v) => {
    if (v[0]) open()
})
watch(Escape, (v) => {
    if (v && isOpen.value) close()
})

const open = async () => {
    isOpen.value = true
    query.value = ''
    selectedIndex.value = 0
    await nextTick()
    searchInput.value?.focus()
    if (!isLoaded.value) {
        await initSearch()
    }
}

const close = () => {
    isOpen.value = false
}


const onInput = () => {
    search(query.value)
    selectedIndex.value = 0
}


const navigate = (dir) => {
    if (dir === 'down') {
        selectedIndex.value = (selectedIndex.value + 1) % searchResult.value.length
    } else {
        selectedIndex.value = (selectedIndex.value - 1 + searchResult.value.length) % searchResult.value.length
    }
}


const onEnter = () => {
    if (searchResult.value.length > 0) {
        const item = searchResult.value[selectedIndex.value]
        router.push(item.id)
        close()
    }
}

defineExpose({ open })
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.3);
    border-radius: 4px;
}
</style>