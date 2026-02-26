<!-- app/components/content/CharacterSheet.vue -->
<template>
    <div v-if="charData" class="space-y-8 my-8 font-sans">

        <div class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm overflow-hidden relative flex flex-col gap-8 transition-colors duration-300"
            :class="hasGallery ? 'lg:flex-row' : ''">

            <Icon name="ph:user-circle-gear-duotone"
                class="absolute -right-10 -top-10 text-[200px] text-slate-500/5 dark:text-gray-500/5 pointer-events-none" />

            <div v-if="hasGallery" class="lg:w-1/3 flex flex-col gap-4 shrink-0">
                <div
                    class="aspect-[3/4] bg-slate-100 dark:bg-black/30 rounded-lg overflow-hidden border border-slate-200 dark:border-gray-700 relative group">
                    <img :src="currentImage.src"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div
                        class="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white text-xs py-2 px-3 text-center">
                        {{ currentImage.text || '未知画师' }}
                    </div>
                </div>
                <div v-if="safeGallery.length > 1" class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <button v-for="(img, idx) in safeGallery" :key="idx" @click="currentIndex = idx"
                        class="w-12 h-12 shrink-0 rounded border-2 overflow-hidden transition-all"
                        :class="currentIndex === idx ? 'border-indigo-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'">
                        <img :src="img.src" class="w-full h-full object-cover" />
                    </button>
                </div>
            </div>

            <div class="flex-1 space-y-6 relative z-10">
                <div>
                    <h2 class="text-4xl font-black text-slate-900 dark:text-white font-serif tracking-widest mb-2">{{
                        charData.name }}</h2>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="tag in (charData.identity || [])" :key="tag"
                            class="px-2 py-0.5 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 text-xs rounded border border-slate-200 dark:border-gray-700 font-bold transition-colors">
                            {{ tag }}
                        </span>
                    </div>
                </div>

                <div
                    class="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-[#15151a]/50 p-4 rounded-lg border border-slate-100 dark:border-gray-800 transition-colors">
                    <div class="space-y-1">
                        <div class="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase">常态性别</div>
                        <div class="font-bold text-slate-700 dark:text-gray-200">{{ charData.gender }}</div>
                    </div>
                    <div class="space-y-1">
                        <div class="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase">年龄</div>
                        <div class="font-bold text-slate-700 dark:text-gray-200">{{ charData.age }}</div>
                    </div>
                    <div class="col-span-2 space-y-1">
                        <div class="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase">信仰</div>
                        <div class="font-bold text-indigo-600 dark:text-indigo-400">{{ charData.faith }}</div>
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <div
                        class="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/10 rounded border border-amber-200 dark:border-amber-900/30 transition-colors">
                        <span class="text-xs font-bold text-amber-800 dark:text-amber-500 flex items-center gap-1.5">
                            <Icon name="ph:trophy-duotone" /> 登神之路
                        </span>
                        <div class="text-right">
                            <div class="text-sm font-black text-amber-900 dark:text-amber-400">{{ charData.rank?.godRoad
                                || '?' }}</div>
                            <div class="text-[10px] text-amber-700/60 dark:text-amber-500/60">全球排名: {{
                                charData.rank?.globalRank || '?' }}</div>
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/10 rounded border border-purple-200 dark:border-purple-900/30 transition-colors">
                        <span class="text-xs font-bold text-purple-800 dark:text-purple-500 flex items-center gap-1.5">
                            <Icon name="ph:steps-duotone" /> 觐见之梯
                        </span>
                        <div class="text-right">
                            <div class="text-sm font-black text-purple-900 dark:text-purple-400">{{
                                charData.rank?.ladder || '?' }}</div>
                            <div class="text-[10px] text-purple-700/60 dark:text-purple-500/60">命途排名: {{
                                charData.rank?.pathRank || '?' }}</div>
                        </div>
                    </div>
                </div>

                <div v-if="charData.personality"
                    class="text-sm text-slate-600 dark:text-gray-400 leading-relaxed italic border-l-2 border-slate-300 dark:border-gray-600 pl-3">
                    "{{ charData.personality }}"
                </div>
            </div>
        </div>

        <div v-if="charData.background || charData.story" class="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div v-if="charData.background" class="space-y-3">
                <h3 class="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white">
                    <Icon name="ph:book-open-text-duotone" class="text-indigo-500" /> 背景故事
                </h3>
                <div
                    class="text-sm text-slate-600 dark:text-gray-400 leading-relaxed space-y-4 bg-slate-50 dark:bg-[#1a1a21]/50 p-5 rounded-xl border border-slate-100 dark:border-gray-800 transition-colors">
                    <p v-for="(para, idx) in formatText(charData.background)" :key="idx">
                        {{ para }}
                    </p>
                </div>
            </div>

            <div v-if="charData.story" class="space-y-3">
                <h3 class="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white">
                    <Icon name="ph:path-duotone" class="text-amber-500" /> 角色故事线
                </h3>
                <div
                    class="text-sm text-slate-600 dark:text-gray-400 leading-relaxed space-y-4 bg-slate-50 dark:bg-[#1a1a21]/50 p-5 rounded-xl border border-slate-100 dark:border-gray-800 h-[400px] overflow-y-auto pr-2 custom-scrollbar transition-colors">
                    <p v-for="(para, idx) in formatText(charData.story)" :key="idx">
                        {{ para }}
                    </p>
                </div>
            </div>

        </div>

        <div class="space-y-4" v-if="charData.skills && charData.skills.length > 0">
            <h3
                class="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white border-l-4 border-indigo-500 pl-3">
                信仰天赋与能力
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="skill in charData.skills" :key="skill.name"
                    class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 p-4 rounded-lg hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors group">
                    <div class="flex justify-between items-start mb-2">
                        <div
                            class="font-bold text-slate-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {{ skill.name }}
                        </div>
                        <span class="text-[10px] font-black px-1.5 py-0.5 rounded border transition-colors"
                            :class="getLevelClass(skill.level)">
                            {{ skill.level || '?' }}
                        </span>
                    </div>
                    <div class="text-xs text-slate-500 dark:text-gray-500 mb-2 font-mono flex items-center gap-2">
                        <span>{{ skill.type }}</span>
                        <span class="w-1 h-1 rounded-full bg-slate-300 dark:bg-gray-600"></span>
                        <span>{{ skill.active ? '主动' : '被动' }}</span>
                    </div>
                    <p class="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                        {{ skill.desc }}
                    </p>
                </div>
            </div>
        </div>

        <div class="bg-slate-50 dark:bg-[#15151a]/50 border border-slate-200 dark:border-gray-800 rounded-xl p-6 transition-colors"
            v-if="charData.items && charData.items.length > 0">
            <h3 class="flex items-center gap-2 text-lg font-bold text-slate-700 dark:text-gray-300 mb-4">
                <Icon name="ph:backpack-duotone" /> 角色背包清单
            </h3>

            <div class="flex flex-wrap gap-2">
                <span v-for="item in charData.items" :key="item.name"
                    class="px-3 py-1.5 bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700 text-xs font-medium text-slate-700 dark:text-gray-300 rounded shadow-sm flex items-center gap-1.5 transition-colors hover:border-indigo-300 dark:hover:border-indigo-700">
                    {{ item.name }}
                    <span v-if="item.level" class="text-[9px] font-bold opacity-60"
                        :class="getLevelTextColor(item.level)">
                        {{ item.level }}
                    </span>
                </span>
            </div>
        </div>

    </div>

    <div v-else class="p-8 text-center text-red-500 border border-red-500/20 bg-red-500/10 rounded-xl">
        错误：未找到 ID 为 "{{ characterId }}" 的角色数据。请检查 角色注册数据表。
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { characterRegistry } from '~/utils/characterRegistry'

const props = defineProps({
    characterId: { type: String, required: true }
})

// 从注册表中获取数据
const charData = computed(() => {
    return characterRegistry[props.characterId]
})


const safeGallery = computed(() => {
    return Array.isArray(charData.value?.gallery) ? charData.value.gallery : []
})


const hasGallery = computed(() => {
    return safeGallery.value.length > 0
})

const currentIndex = ref(0)
const currentImage = computed(() => safeGallery.value[currentIndex.value] || { src: '', text: '' })


const formatText = (text) => {
    if (!text || typeof text !== 'string') return []
    return text.split('\n').filter(p => p && p.trim().length > 0)
}

const getLevelClass = (level) => {
    if (!level || typeof level !== 'string') return 'bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 border-slate-200 dark:border-gray-700'
    if (level.includes('EX')) return 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
    if (level.includes('SSS')) return 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
    if (level.includes('SS')) return 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900/30'
    if (level.includes('S')) return 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30'
    return 'bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 border-slate-200 dark:border-gray-700'
}

const getLevelTextColor = (level) => {
    if (!level || typeof level !== 'string') return 'text-slate-500'
    if (level.includes('S')) return 'text-amber-600 dark:text-amber-400'
    if (level.includes('A')) return 'text-indigo-600 dark:text-indigo-400'
    return 'text-slate-500'
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