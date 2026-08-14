<template>
    <div
        class="belief-test-shell max-w-[1000px] mx-auto -mx-4 sm:mx-0 py-3 sm:py-6 md:py-8 px-0 sm:px-4 text-slate-800 dark:text-gray-300 font-sans transition-colors duration-300">

        <div v-if="showCommunityPage"
            class="w-full bg-white dark:bg-[#1a1a21] border-y sm:border border-slate-200 dark:border-gray-700/50 rounded-none sm:rounded-xl p-3 sm:p-6 md:p-8 shadow-none sm:shadow-sm transition-colors">
            <div class="flex flex-col md:flex-row items-center gap-6 md:gap-10 relative z-10">

                <div class="shrink-0 relative flex flex-col items-center">
                    <div
                        class="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white dark:bg-[#1a1a21] p-1.5 shadow-xl shrink-0 border border-slate-200 dark:border-gray-700 relative z-10">
                        <img :src="communityInfo.avatar" alt="Community"
                            class="w-full h-full object-cover rounded-xl !m-0 block relative z-10" />
                        <div
                            class="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-indigo-50 dark:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 rounded-lg text-[10px] font-bold tracking-widest z-20 border border-indigo-200 dark:border-indigo-700 shadow-sm flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span> 频道已连接
                        </div>
                    </div>
                </div>

                <div class="flex-1 flex flex-col justify-center text-center md:text-left w-full">
                    <div
                        class="flex items-center justify-center md:justify-start gap-2 text-indigo-500 mb-3 border-b border-slate-100 dark:border-gray-800 pb-3">
                        <Icon name="ph:broadcast-duotone" class="text-2xl" />
                        <span class="text-xs font-bold tracking-widest uppercase">诸神愚戏 WIKI 广播频道</span>
                    </div>

                    <h2
                        class="text-2xl md:text-4xl font-serif font-black text-slate-800 dark:text-white mb-5 tracking-wide truncate">
                        {{ communityInfo.title }}
                    </h2>

                    <div
                        class="bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-gray-800 rounded-lg p-3 sm:p-4 md:p-5 w-full max-w-md mx-auto md:mx-0 mb-6">
                        <div
                            class="flex justify-between items-center border-b border-slate-100 dark:border-gray-800 pb-2 mb-2">
                            <span
                                class="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">通讯频道</span>
                            <span class="text-indigo-600 dark:text-indigo-400 font-black text-sm truncate">{{
                                communityInfo.name }}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span
                                class="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">通讯解码</span>
                            <span class="text-fuchsia-600 dark:text-fuchsia-400 font-black text-sm truncate">{{
                                communityInfo.description }}</span>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full">
                        <button @click="startQuiz"
                            class="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2">
                            <Icon name="ph:rocket-duotone" class="text-lg" /> 启程！开始信仰测试
                        </button>
                        <a :href="communityInfo.joinLink" target="_blank"
                            class="w-full sm:w-auto px-8 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#15151a] dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300 rounded-xl font-bold text-sm transition-colors text-center flex items-center justify-center gap-2">
                            <Icon name="ph:users-three-duotone" class="text-lg" /> 去社区逛逛
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="currentQuestionIndex < questionsList.length"
            class="w-full bg-white dark:bg-[#1a1a21] border-y sm:border border-slate-200 dark:border-gray-700/50 rounded-none sm:rounded-xl p-3 sm:p-6 md:p-8 shadow-none sm:shadow-sm transition-colors">

            <div class="mb-6 md:mb-8">
                <div class="flex justify-between items-end mb-3 border-b border-slate-100 dark:border-gray-800 pb-3">
                    <span
                        class="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Icon name="ph:compass-rose-duotone" class="text-lg" /> 信仰解析进度
                    </span>
                    <span
                        class="text-xs font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                        {{ currentQuestionIndex + 1 }} / {{ questionsList.length }}
                    </span>
                </div>
                <div class="h-1.5 w-full bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full bg-indigo-500 transition-all duration-500 ease-out rounded-full"
                        :style="{ width: `${((currentQuestionIndex + 1) / questionsList.length) * 100}%` }">
                    </div>
                </div>
            </div>

            <h2
                class="text-lg sm:text-xl md:text-2xl font-serif font-black text-slate-800 dark:text-white mb-6 md:mb-8 leading-relaxed border-l-2 border-indigo-500 pl-3 sm:pl-4">
                {{ questionsList[currentQuestionIndex].question }}
            </h2>

            <div class="flex flex-col gap-3">
                <button v-for="(option, index) in questionsList[currentQuestionIndex].options" :key="index"
                    @click="selectOption(option, index)"
                    class="group flex items-center p-2.5 sm:p-4 bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-gray-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white dark:hover:bg-[#1a1a21] rounded-lg text-left transition-colors duration-200 w-full">
                    <div
                        class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700 rounded-md group-hover:bg-indigo-500 group-hover:border-indigo-500 transition-colors duration-200 shrink-0 mr-3 sm:mr-4">
                        <span class="font-black text-slate-500 dark:text-gray-400 group-hover:text-white text-sm">
                            {{ String.fromCharCode(65 + index) }}
                        </span>
                    </div>
                    <div class="text-slate-700 dark:text-gray-300 font-bold text-sm md:text-base flex-1 leading-snug">
                        {{ option }}
                    </div>
                </button>
            </div>

            <div class="mt-8 pt-4 border-t border-slate-100 dark:border-gray-800 flex justify-start"
                v-if="currentQuestionIndex > 0">
                <button @click="previousQuestion"
                    class="text-xs font-bold text-slate-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors">
                    <Icon name="ph:arrow-left-bold" /> 重新思考上一问题
                </button>
            </div>
        </div>

        <div v-else class="flex flex-col gap-5 sm:gap-8 items-center w-full">

            <div
                class="w-full bg-white dark:bg-[#1a1a21] border-y sm:border border-slate-200 dark:border-gray-700/50 rounded-none sm:rounded-xl px-3 py-4 sm:p-6 md:p-8 shadow-none sm:shadow-sm transition-colors">

                <h2
                    class="text-xl sm:text-2xl font-serif font-black mb-6 md:mb-8 text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-gray-800 pb-4">
                    <Icon name="ph:scroll-duotone" class="text-indigo-500 text-3xl" /> 信仰解析报告
                </h2>

              
                <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-6 sm:mb-8 border-b border-slate-100 dark:border-gray-800 pb-6 sm:pb-8">

                   
                    <div
                        class="relative overflow-hidden bg-indigo-50/60 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/50 rounded-lg p-3 sm:p-5 md:p-6 flex flex-col justify-between">
                        <Icon name="ph:crown-duotone"
                            class="absolute -right-4 -bottom-4 text-[100px] text-indigo-500/5 dark:text-indigo-400/5 pointer-events-none transform -rotate-12" />

                        <div>
                            <label
                                class="relative z-10 flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4">
                                <Icon name="ph:sparkle-fill" class="text-sm" /> 首选命途
                            </label>

                            <div class="relative z-10">
                                <span
                                    class="text-4xl md:text-5xl font-serif font-black text-indigo-700 dark:text-indigo-300 tracking-tight">
                                    {{ topFaction }}
                                </span>
                            </div>
                        </div>

                        <div
                            class="relative z-10 mt-6 flex items-center gap-2 border-t border-indigo-100/50 dark:border-indigo-800/30 pt-4">
                            <span
                                class="text-[10px] md:text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">信仰</span>
                            <span
                                class="px-3 py-1 bg-white dark:bg-[#15151a] text-slate-800 dark:text-gray-200 border border-slate-200 dark:border-gray-700 rounded-md text-xs font-bold shadow-sm">
                                {{ topFactionBranch }}
                            </span>
                        </div>
                    </div>

        
                    <div
                        class="relative overflow-hidden bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-gray-800 rounded-lg p-3 sm:p-5 md:p-6 flex flex-col justify-between">
                        <Icon name="ph:mask-happy-duotone"
                            class="absolute -right-4 -bottom-4 text-[100px] text-slate-900/5 dark:text-white/5 pointer-events-none transform rotate-12" />

                        <div>
                            <label
                                class="relative z-10 flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-4">
                                <Icon name="ph:ghost-duotone" class="text-sm" /> 潜在倾向
                            </label>

                            <div class="relative z-10">
                                <span
                                    class="text-3xl md:text-4xl font-serif font-black text-slate-700 dark:text-gray-300 tracking-tight">
                                    {{ secondFaction }}
                                </span>
                            </div>
                        </div>

                        <div
                            class="relative z-10 mt-6 flex items-center gap-2 border-t border-slate-200 dark:border-gray-800 pt-4">
                            <span
                                class="text-[10px] md:text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">信仰</span>
                            <span
                                class="px-3 py-1 bg-white dark:bg-[#1a1a21] text-slate-600 dark:text-gray-400 border border-slate-200 dark:border-gray-700 rounded-md text-xs font-bold">
                                {{ secondFactionBranch }}
                            </span>
                        </div>
                    </div>

                </div>

                <div
                    class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border border-indigo-200 dark:border-indigo-800/70 bg-indigo-50/70 dark:bg-indigo-950/20 rounded-lg p-3 sm:p-5">
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 font-black text-slate-800 dark:text-white mb-1">
                            <Icon name="ph:image-square-duotone" class="text-xl text-indigo-600 dark:text-indigo-400" />
                            保存你的信仰档案
                        </div>
                        <p class="m-0 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                            生成适合分享的高清长图，结果与角色匹配会一并收录。
                        </p>
                    </div>
                    <button @click="generateImage" :disabled="isGeneratingImage"
                        class="w-full sm:w-auto shrink-0 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-black text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                        <Icon :name="isGeneratingImage ? 'ph:spinner-gap-bold' : 'ph:image-square-duotone'"
                            :class="isGeneratingImage ? 'animate-spin' : ''" class="text-lg" />
                        {{ isGeneratingImage ? '正在生成...' : '生成分享图' }}
                    </button>
                    <p v-if="generationError"
                        class="w-full m-0 text-xs font-bold text-rose-600 dark:text-rose-400 sm:text-right">
                        {{ generationError }}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div v-if="recommendedPrimaryJob"
                        class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-800 rounded-lg p-3 sm:p-4 md:p-5 flex items-center gap-3 sm:gap-4">
                        <div
                            class="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 dark:bg-[#15151a] rounded-lg flex items-center justify-center border border-indigo-100 dark:border-gray-800 shrink-0">
                            <Icon name="ph:sword-duotone" class="text-2xl text-indigo-500" />
                        </div>
                        <div>
                            <div
                                class="text-[10px] text-slate-500 dark:text-gray-500 font-bold mb-0.5 uppercase tracking-widest">
                                推荐首选职业</div>
                            <div class="text-lg font-black text-slate-800 dark:text-gray-200">{{ recommendedPrimaryJob
                                }}</div>
                        </div>
                    </div>

                    <div v-if="recommendedSecondaryJob"
                        class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-800 rounded-lg p-3 sm:p-4 md:p-5 flex items-center gap-3 sm:gap-4">
                        <div
                            class="w-10 h-10 sm:w-12 sm:h-12 bg-fuchsia-50 dark:bg-[#15151a] rounded-lg flex items-center justify-center border border-fuchsia-100 dark:border-gray-800 shrink-0">
                            <Icon name="ph:shield-star-duotone" class="text-2xl text-fuchsia-500" />
                        </div>
                        <div>
                            <div
                                class="text-[10px] text-slate-500 dark:text-gray-500 font-bold mb-0.5 uppercase tracking-widest">
                                备选拓展方向</div>
                            <div class="text-lg font-black text-slate-800 dark:text-gray-200">{{ recommendedSecondaryJob
                                }}</div>
                        </div>
                    </div>
                </div>

                <div
                    class="bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-gray-800 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div
                        class="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest pl-2">
                        <Icon name="ph:shield-check-duotone" class="text-lg" /> 报告置信度评估
                    </div>
                    <div
                        class="flex items-center gap-3 bg-white dark:bg-[#1a1a21] px-4 py-1.5 rounded-md border border-slate-200 dark:border-gray-700">
                        <div class="text-xl font-black font-mono" :class="getCredibilityColor(credibilityScore)">
                            {{ credibilityScore }}%
                        </div>
                        <div class="w-px h-4 bg-slate-200 dark:bg-gray-700"></div>
                        <div class="text-sm font-bold text-slate-700 dark:text-gray-300">{{ credibilityRating }}</div>
                    </div>
                </div>

                <section class="mb-6 sm:mb-8" aria-labelledby="character-match-title">
                    <div class="flex items-center justify-between gap-3 mb-3">
                        <h3 id="character-match-title"
                            class="m-0 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Icon name="ph:identification-card-duotone" class="text-lg" /> 角色匹配
                        </h3>
                        <span v-if="showCharacterResult"
                            class="text-[10px] font-mono text-slate-400 dark:text-gray-500">MATCH ARCHIVE</span>
                    </div>

                    <button v-if="!showCharacterResult" @click="findMatchedCharacter"
                        class="group w-full p-3 sm:p-4 bg-white hover:bg-slate-50 dark:bg-[#1a1a21] dark:hover:bg-[#202028] border border-slate-200 dark:border-gray-700 rounded-lg text-left transition-colors flex items-center gap-3">
                        <span
                            class="w-10 h-10 rounded-md bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                            <Icon name="ph:scan-duotone" class="text-xl" />
                        </span>
                        <span class="flex-1 min-w-0">
                            <span class="block text-sm font-black text-slate-800 dark:text-gray-200">查找与你最相近的角色</span>
                            <span class="block mt-0.5 text-xs text-slate-500 dark:text-gray-500">依据命途与信仰分支进行匹配</span>
                        </span>
                        <Icon name="ph:arrow-right-bold"
                            class="text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" />
                    </button>

                    <div v-else
                        class="overflow-hidden bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700 rounded-lg">
                        <div v-if="matchedCharacter">
                            <header
                                class="px-3 py-4 sm:p-5 bg-slate-50 dark:bg-[#18181e] border-b border-slate-200 dark:border-gray-700 flex items-center gap-3 sm:gap-4">
                                <div class="flex-1 min-w-0">
                                    <div
                                        class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-1">
                                        高相似度档案</div>
                                    <div
                                        class="text-2xl sm:text-3xl font-serif font-black text-slate-900 dark:text-white leading-tight break-words">
                                        {{ matchedCharacter.name }}
                                    </div>
                                </div>
                                <div
                                    class="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-200 dark:border-gray-700 bg-white dark:bg-[#1a1a21] text-indigo-500 flex items-center justify-center shrink-0">
                                    <Icon name="ph:user-focus-duotone" class="text-2xl" />
                                </div>
                            </header>

                            <div class="p-3 sm:p-5 space-y-4">
                                <blockquote v-if="matchedCharacter.quote"
                                    class="m-0 border-l-2 border-indigo-400 pl-3 text-[13px] sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed whitespace-pre-line italic font-serif">
                                    “{{ matchedCharacter.quote }}”
                                </blockquote>

                                <div>
                                    <div
                                        class="text-[10px] text-slate-400 dark:text-gray-500 font-bold uppercase tracking-widest mb-1.5">
                                        档案记录</div>
                                    <p
                                        class="m-0 text-[13px] sm:text-sm font-medium text-slate-700 dark:text-gray-300 leading-relaxed">
                                        {{ matchedCharacter.description }}
                                    </p>
                                </div>

                                <div
                                    class="pt-3 border-t border-slate-100 dark:border-gray-800 text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-start gap-2 leading-relaxed">
                                    <Icon name="ph:intersect-duotone" class="text-lg shrink-0" />
                                    <span>{{ formatMatchReason(matchedCharacter) }}</span>
                                </div>
                            </div>
                        </div>

                        <div v-else class="px-4 py-8 text-center">
                            <Icon name="ph:orbit-duotone" class="text-3xl text-slate-300 dark:text-gray-700 mb-2" />
                            <p class="m-0 text-sm text-slate-500 dark:text-gray-500">暂未发现与你足够相近的已知角色</p>
                        </div>
                    </div>
                </section>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                        <label
                            class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Icon name="ph:chart-polar-duotone" class="text-lg" /> 命途倾向度
                        </label>
                        <div
                            class="space-y-3 bg-slate-50 dark:bg-[#15151a] p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-gray-800">
                            <div v-for="(data, index) in mainFactionPreferenceData" :key="index"
                                class="flex items-center gap-2 sm:gap-3 text-xs">
                                <span class="w-14 sm:w-16 text-right font-bold text-slate-600 dark:text-gray-400 shrink-0">{{
                                    data.name }}</span>
                                <div
                                    class="flex-1 h-2 bg-slate-200 dark:bg-gray-800 rounded-full relative overflow-hidden flex items-center shrink-0">
                                    <div class="absolute left-0 h-full rounded-full transition-all duration-500"
                                        :class="data.score >= 0 ? 'bg-indigo-500' : 'bg-rose-500'"
                                        :style="{ width: data.percentageValue + '%' }">
                                    </div>
                                </div>
                                <span class="w-10 font-mono text-right shrink-0 font-bold"
                                    :class="data.score >= 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-rose-600 dark:text-rose-400'">
                                    {{ data.percentage }}%
                                </span>
                            </div>
                            <div v-if="mainFactionPreferenceData.length === 0"
                                class="text-center text-xs text-slate-400 py-2">无足够数据</div>
                        </div>
                    </div>

                    <div>
                        <label
                            class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Icon name="ph:tree-structure-duotone" class="text-lg" /> 信仰分支解析
                        </label>
                        <div
                            class="space-y-3 bg-slate-50 dark:bg-[#15151a] p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-gray-800">
                            <div v-for="(data, index) in branchFactionPreferenceData" :key="index"
                                class="flex items-center gap-2 sm:gap-3 text-xs">
                                <span class="w-14 sm:w-16 text-right font-bold text-slate-600 dark:text-gray-400 shrink-0">{{
                                    data.name }}</span>
                                <div
                                    class="flex-1 h-2 bg-slate-200 dark:bg-gray-800 rounded-full relative overflow-hidden flex items-center shrink-0">
                                    <div class="absolute left-0 h-full rounded-full transition-all duration-500"
                                        :class="data.score >= 0 ? 'bg-fuchsia-500' : 'bg-rose-500'"
                                        :style="{ width: data.percentageValue + '%' }">
                                    </div>
                                </div>
                                <span class="w-10 font-mono text-right shrink-0 font-bold"
                                    :class="data.score >= 0 ? 'text-fuchsia-600 dark:text-fuchsia-400' : 'text-rose-600 dark:text-rose-400'">
                                    {{ data.percentage }}%
                                </span>
                            </div>
                            <div v-if="branchFactionPreferenceData.length === 0"
                                class="text-center text-xs text-slate-400 py-2">无足够数据</div>
                        </div>
                    </div>
                </div>

                <div
                    class="mt-10 pt-4 border-t border-slate-100/50 dark:border-gray-800/50 text-center flex flex-col items-center justify-center opacity-40 select-none">
                    <Icon name="ph:fingerprint-duotone" class="text-2xl text-slate-400 mb-1" />
                    <div class="text-[10px] font-mono text-slate-700 tracking-wider">诸神愚戏 WIKI 档案馆认证</div>
                </div>

            </div>

            <button @click="restartQuiz"
                class="w-[280px] max-w-[calc(100%_-_2rem)] py-3.5 bg-white hover:bg-slate-50 dark:bg-[#1a1a21] dark:hover:bg-gray-800 text-slate-700 dark:text-gray-200 border border-slate-300 dark:border-gray-700 rounded-lg font-bold text-sm transition-colors flex justify-center items-center gap-2 mb-5">
                <Icon name="ph:arrows-clockwise-bold" class="text-lg" /> 重新校准命运
            </button>

        </div>
    </div>
  
    <div v-if="!showCommunityPage && currentQuestionIndex >= questionsList.length"
        class="fixed top-[-9999px] left-[-9999px] pointer-events-none z-[-100]">
        <div ref="exportCard"
            class="w-[800px] bg-[#fafafa] text-slate-800 font-sans relative overflow-hidden border border-slate-200">

    
            <div
                class="h-32 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 relative flex items-center px-10 overflow-hidden">
                <div
                    class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.4),transparent)]">
                </div>
                <Icon name="ph:shooting-star-duotone" class="text-indigo-300 text-5xl mr-4 relative z-10" />
                <div class="relative z-10 flex-1">
                    <h1 class="text-3xl font-serif font-black tracking-widest m-0 p-0" style="color: #ffffff;">诸神愚戏 WIKI
                        档案馆</h1>
                    <p class="text-sm font-mono tracking-widest mt-1 uppercase m-0 p-0" style="color: #c7d2fe;">Belief &
                        Destiny Analysis Report</p>
                </div>
            </div>

    
            <div
                class="p-10 space-y-6 relative z-10 bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.03),transparent_50%)]">

               
                <div class="flex gap-6">
                    <div
                        class="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                        <label
                            class="text-xs font-bold text-indigo-500 tracking-widest uppercase flex items-center gap-2 mb-4">
                            <Icon name="ph:sparkle-fill" /> 首选命途
                        </label>
                        <div class="text-5xl font-serif font-black text-indigo-900 mb-4">{{ topFaction }}</div>
                        <span
                            class="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded text-xs font-bold">{{
                            topFactionBranch }}</span>
                    </div>
                    <div
                        class="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                        <label
                            class="text-xs font-bold text-slate-500 tracking-widest uppercase flex items-center gap-2 mb-4">
                            <Icon name="ph:ghost-duotone" /> 潜在倾向
                        </label>
                        <div class="text-4xl font-serif font-black text-slate-800 mb-4">{{ secondFaction }}</div>
                        <span
                            class="px-3 py-1 bg-white text-slate-600 border border-slate-200 rounded text-xs font-bold">{{
                            secondFactionBranch }}</span>
                    </div>
                </div>

                
                <div v-if="matchedCharacter" class="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-8 relative">
                    <Icon name="ph:magic-wand-duotone"
                        class="absolute -right-4 -top-4 text-[120px] text-indigo-500/10" />
                    <div class="text-lg font-bold text-slate-700 mb-4">在茫茫人海中，你如同 <span
                            class="text-3xl font-black text-indigo-600 mx-2 bg-white px-3 py-1 rounded-lg border border-indigo-200 shadow-sm">{{
                            matchedCharacter.name }}</span> 的倒影</div>
                    <div v-if="matchedCharacter.quote"
                        class="text-slate-600 italic font-serif text-sm border-l-4 border-indigo-400 pl-4 mb-4">"{{
                        matchedCharacter.quote }}"</div>
                    <div
                        class="text-sm font-bold text-slate-700 bg-white p-4 rounded-xl border border-slate-200 mb-4 leading-relaxed">
                        {{ matchedCharacter.description }}</div>
                    <div
                        class="flex items-center gap-2 text-indigo-700 font-bold text-sm bg-indigo-100/50 px-4 py-3 rounded-lg">
                        <Icon name="ph:sparkle-fill" class="text-amber-500 text-lg" /> {{
                            formatMatchReason(matchedCharacter) }}
                    </div>
                </div>

          
                <div class="grid grid-cols-2 gap-6">
                  
                    <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <div
                            class="text-xs font-bold text-indigo-600 mb-4 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                            <Icon name="ph:chart-polar-fill" class="text-base" /> 命途分析
                        </div>

                        <div class="space-y-2">
                            <div class="text-[10px] text-slate-400 font-bold mb-1 tracking-widest">>> 正倾</div>
                            <div v-for="(data, idx) in mainFactionPreferenceData.slice(0, 3)" :key="'export-m-top-' + idx"
                                class="flex justify-between items-center text-[11px] font-bold">
                                <span class="text-slate-700 w-10">{{ data.name }}</span>
                                <div class="flex-1 mx-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div class="h-full rounded-full"
                                        :class="data.score >= 0 ? 'bg-indigo-500' : 'bg-rose-500'"
                                        :style="{ width: data.percentageValue + '%' }"></div>
                                </div>
                                <span class="w-9 text-right font-mono"
                                    :class="data.score >= 0 ? 'text-indigo-600' : 'text-rose-600'">{{ data.percentage
                                    }}%</span>
                            </div>

                            <div class="my-3 border-t border-dashed border-slate-200"></div>

                            <div class="text-[10px] text-slate-400 font-bold mb-1 tracking-widest">>> 相悖</div>
                            <div v-for="(data, idx) in mainFactionPreferenceData.slice(-3)" :key="'export-m-bot-' + idx"
                                class="flex justify-between items-center text-[11px] font-bold">
                                <span class="text-slate-700 w-10">{{ data.name }}</span>
                                <div class="flex-1 mx-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div class="h-full rounded-full"
                                        :class="data.score >= 0 ? 'bg-indigo-500' : 'bg-rose-500'"
                                        :style="{ width: data.percentageValue + '%' }"></div>
                                </div>
                                <span class="w-9 text-right font-mono"
                                    :class="data.score >= 0 ? 'text-indigo-600' : 'text-rose-600'">{{ data.percentage
                                    }}%</span>
                            </div>
                        </div>
                    </div>

                    <!-- 信仰数据 -->
                    <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <div
                            class="text-xs font-bold text-fuchsia-600 mb-4 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                            <Icon name="ph:tree-structure-fill" class="text-base" /> 信仰分析
                        </div>

                        <div class="space-y-2">
                            <div class="text-[10px] text-slate-400 font-bold mb-1 tracking-widest">>> 正倾(前三)</div>
                            <div v-for="(data, idx) in branchFactionPreferenceData.slice(0, 3)"
                                :key="'export-b-top-' + idx"
                                class="flex justify-between items-center text-[11px] font-bold">
                                <span class="text-slate-700 w-10">{{ data.name }}</span>
                                <div class="flex-1 mx-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div class="h-full rounded-full"
                                        :class="data.score >= 0 ? 'bg-fuchsia-500' : 'bg-rose-500'"
                                        :style="{ width: data.percentageValue + '%' }"></div>
                                </div>
                                <span class="w-9 text-right font-mono"
                                    :class="data.score >= 0 ? 'text-fuchsia-600' : 'text-rose-600'">{{ data.percentage
                                    }}%</span>
                            </div>

                            <div class="my-3 border-t border-dashed border-slate-200"></div>

                            <div class="text-[10px] text-slate-400 font-bold mb-1 tracking-widest">>> 相悖(前三)</div>
                            <div v-for="(data, idx) in branchFactionPreferenceData.slice(-3)" :key="'export-b-bot-' + idx"
                                class="flex justify-between items-center text-[11px] font-bold">
                                <span class="text-slate-700 w-10">{{ data.name }}</span>
                                <div class="flex-1 mx-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div class="h-full rounded-full"
                                        :class="data.score >= 0 ? 'bg-fuchsia-500' : 'bg-rose-500'"
                                        :style="{ width: data.percentageValue + '%' }"></div>
                                </div>
                                <span class="w-9 text-right font-mono"
                                    :class="data.score >= 0 ? 'text-fuchsia-600' : 'text-rose-600'">{{ data.percentage
                                    }}%</span>
                            </div>
                        </div>
                    </div>
                </div>

           
                <div class="flex gap-4">
                    <div v-if="recommendedPrimaryJob"
                        class="flex-1 bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4">
                        <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex justify-center items-center">
                            <Icon name="ph:sword-duotone" class="text-2xl" />
                        </div>
                        <div>
                            <div class="text-[10px] text-slate-500 font-bold uppercase">推荐首选职业</div>
                            <div class="text-lg font-black text-slate-800">{{ recommendedPrimaryJob }}</div>
                        </div>
                    </div>
                    <div class="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 px-6">
                        <div class="text-center">
                            <div class="text-[10px] text-slate-500 font-bold uppercase mb-1">测试置信度</div>
                            <div class="text-2xl font-black text-indigo-600 font-mono">{{ credibilityScore }}%</div>
                        </div>
                    </div>
                </div>
            </div>

      
            <div class="bg-slate-100 border-t border-slate-200 p-6 flex justify-between items-center px-10">
                <div class="flex items-center gap-3">
                    <Icon name="ph:fingerprint-duotone" class="text-3xl text-slate-400" />
                    <div>
                        <div class="text-xs font-black text-slate-700">诸神愚戏 WIKI 官方社区</div>
                        <div class="text-[10px] text-slate-500 font-mono mt-0.5">QQ 频道：zsyxwiki233</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-xs font-bold text-slate-600 mb-1 flex items-center justify-end gap-1">
                        <Icon name="ph:link-bold" /> 获取你的专属报告
                    </div>
                    <div class="text-sm font-black font-mono text-indigo-600 tracking-wider">www.zsyxwiki.top</div>
                </div>
            </div>

        </div>
    </div>

    <Teleport to="body">
        <div v-if="showImagePreview" @click.self="closeImagePreview"
            class="fixed inset-0 z-[100] bg-slate-950/75 p-3 sm:p-6 flex items-center justify-center"
            role="dialog" aria-modal="true" aria-labelledby="share-preview-title">
            <div
                class="w-full max-w-3xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden flex flex-col">
                <header
                    class="px-4 py-3 sm:px-5 border-b border-slate-200 dark:border-gray-700 flex items-center justify-between gap-4 shrink-0">
                    <div class="min-w-0">
                        <h2 id="share-preview-title"
                            class="m-0 text-base sm:text-lg font-black text-slate-900 dark:text-white">分享图已生成</h2>
                        <p class="m-0 mt-0.5 text-xs text-slate-500 dark:text-gray-500">确认预览后下载，手机端也可使用系统分享。</p>
                    </div>
                    <button @click="closeImagePreview" aria-label="关闭分享图预览"
                        class="w-9 h-9 rounded-md hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-500 dark:text-gray-400 flex items-center justify-center shrink-0 transition-colors">
                        <Icon name="ph:x-bold" />
                    </button>
                </header>

                <div class="flex-1 overflow-y-auto bg-slate-100 dark:bg-[#101014] p-3 sm:p-5">
                    <img v-if="generatedImageUrl" :src="generatedImageUrl" alt="信仰解析报告分享图预览"
                        class="block w-full h-auto !m-0 mx-auto bg-white shadow-sm select-none" />
                </div>

                <footer class="p-3 sm:p-4 border-t border-slate-200 dark:border-gray-700 shrink-0">
                    <p class="m-0 mb-3 text-xs text-slate-500 dark:text-gray-400 text-center">
                        {{ previewHint }}
                    </p>
                    <div class="grid grid-cols-1 sm:flex sm:justify-end gap-2">
                        <button v-if="canShareGeneratedImage" @click="shareGeneratedImage"
                            class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                            <Icon name="ph:share-network-bold" /> 系统分享
                        </button>
                        <button @click="downloadGeneratedImage"
                            class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                            <Icon name="ph:download-simple-bold" /> 下载 PNG
                        </button>
                        <button @click="openGeneratedImage"
                            class="px-5 py-2.5 bg-white hover:bg-slate-50 dark:bg-[#1a1a21] dark:hover:bg-gray-800 border border-slate-300 dark:border-gray-600 text-slate-700 dark:text-gray-200 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                            <Icon name="ph:arrow-square-out-bold" /> 新页面打开
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { nextTick, onUnmounted, ref, shallowRef } from 'vue'
import { useBeliefTest } from '~/composables/useBeliefTest'

const {
    showCommunityPage, communityInfo, currentQuestionIndex, questionsList,
    topFaction, topFactionBranch, secondFaction, secondFactionBranch,
    recommendedPrimaryJob, recommendedSecondaryJob, showCharacterResult,
    matchedCharacter, mainFactionPreferenceData, branchFactionPreferenceData,
    credibilityScore, credibilityRating,
    startQuiz, selectOption, previousQuestion, findMatchedCharacter,
    formatMatchReason, restartQuiz
} = useBeliefTest()

const getCredibilityColor = (score) => {
    if (score <= 25) return 'text-rose-600 dark:text-rose-500';
    if (score <= 60) return 'text-amber-600 dark:text-amber-500';
    if (score <= 90) return 'text-indigo-600 dark:text-indigo-400';
    return 'text-emerald-600 dark:text-emerald-400';
}

const exportCard = ref(null);
const isGeneratingImage = ref(false);
const showImagePreview = ref(false);
const generatedImageUrl = ref('');
const generatedImageBlob = shallowRef(null);
const canShareGeneratedImage = ref(false);
const generationError = ref('');
const previewHint = ref('若浏览器未开始下载，可在新页面打开后长按图片保存。');

const getImageFilename = () => `信仰解析报告_${topFaction.value || '未知'}.png`;

const releaseGeneratedImage = () => {
    if (generatedImageUrl.value) {
        URL.revokeObjectURL(generatedImageUrl.value);
    }
    generatedImageUrl.value = '';
    generatedImageBlob.value = null;
    canShareGeneratedImage.value = false;
};

const waitForCardAssets = async () => {
    if (document.fonts?.ready) {
        await document.fonts.ready;
    }

    const images = Array.from(exportCard.value?.querySelectorAll('img') || []);
    await Promise.all(images.map((image) => {
        if (image.complete) return Promise.resolve();
        if (typeof image.decode === 'function') return image.decode().catch(() => undefined);
        return new Promise((resolve) => {
            image.addEventListener('load', resolve, { once: true });
            image.addEventListener('error', resolve, { once: true });
        });
    }));
};

const createShareBlob = async (htmlToImage) => {
    let lastError = null;

    // 高分辨率失败时逐级降档，优先保证低内存设备能够得到完整图片。
    for (const pixelRatio of [2, 1.5, 1]) {
        try {
            const blob = await htmlToImage.toBlob(exportCard.value, {
                pixelRatio,
                backgroundColor: '#fafafa',
                cacheBust: true,
                skipAutoScale: false,
            });

            if (blob && blob.size > 5_000) return blob;
            lastError = new Error('生成的图片内容为空');
        } catch (error) {
            lastError = error;
        }
    }

    // 少数旧 WebView 的 canvas.toBlob 不稳定，最后用 data URL 走一次兼容路径。
    try {
        const dataUrl = await htmlToImage.toPng(exportCard.value, {
            pixelRatio: 1,
            backgroundColor: '#fafafa',
            cacheBust: true,
            skipAutoScale: false,
        });
        const fallbackBlob = await fetch(dataUrl).then((response) => response.blob());
        if (fallbackBlob.size > 5_000) return fallbackBlob;
    } catch (error) {
        lastError = error;
    }

    throw lastError || new Error('图片生成失败');
};

const generateImage = async () => {
    if (!exportCard.value || isGeneratingImage.value) return;
    isGeneratingImage.value = true;
    generationError.value = '';

    try {
        if (!showCharacterResult.value) {
            findMatchedCharacter();
            await nextTick();
        }

        await waitForCardAssets();
        const htmlToImage = await import('html-to-image');
        const blob = await createShareBlob(htmlToImage);

        releaseGeneratedImage();
        generatedImageBlob.value = blob;
        generatedImageUrl.value = URL.createObjectURL(blob);

        if (typeof File !== 'undefined' && navigator.share && navigator.canShare) {
            try {
                const file = new File([blob], getImageFilename(), { type: 'image/png' });
                canShareGeneratedImage.value = navigator.canShare({ files: [file] });
            } catch {
                canShareGeneratedImage.value = false;
            }
        }

        previewHint.value = canShareGeneratedImage.value
            ? 'iPhone 或内置浏览器建议使用“系统分享”；也可以长按预览图保存。'
            : '若浏览器未开始下载，可在新页面打开后长按图片保存。';
        showImagePreview.value = true;
    } catch (error) {
        console.error('图片生成失败:', error);
        generationError.value = '生成失败，请关闭其他页面后重试；旧设备会自动使用较低清晰度。';
    } finally {
        isGeneratingImage.value = false;
    }
};

const downloadGeneratedImage = () => {
    if (!generatedImageUrl.value) return;

    const link = document.createElement('a');
    link.download = getImageFilename();
    link.href = generatedImageUrl.value;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
    previewHint.value = '若没有出现下载提示，请使用“系统分享”，或在新页面打开后长按图片保存。';
};

const shareGeneratedImage = async () => {
    if (!generatedImageBlob.value || !canShareGeneratedImage.value) return;

    try {
        const file = new File([generatedImageBlob.value], getImageFilename(), { type: 'image/png' });
        await navigator.share({
            files: [file],
            title: '诸神愚戏 WIKI 信仰解析报告',
        });
    } catch (error) {
        if (error?.name !== 'AbortError') {
            console.error('系统分享失败:', error);
            previewHint.value = '系统分享不可用，请尝试下载，或长按预览图保存。';
        }
    }
};

const openGeneratedImage = () => {
    if (!generatedImageUrl.value) return;
    const opened = window.open(generatedImageUrl.value, '_blank');
    if (!opened) {
        previewHint.value = '浏览器拦截了新页面，请直接长按上方预览图保存。';
    } else {
        opened.opener = null;
    }
};

const closeImagePreview = () => {
    showImagePreview.value = false;
    releaseGeneratedImage();
};

onUnmounted(releaseGeneratedImage);
</script>
