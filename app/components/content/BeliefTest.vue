<template>
    <div
        class="max-w-[1000px] mx-auto py-8 px-4 text-slate-800 dark:text-gray-300 font-sans transition-colors duration-300">

        <div v-if="showCommunityPage"
            class="w-full bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-sm transition-colors">
            <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">

                <div class="shrink-0 relative flex flex-col items-center">
                    <div
                        class="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white dark:bg-[#1a1a21] p-1.5 shadow-xl shrink-0 border border-slate-200 dark:border-gray-700 relative z-10">
                        <div
                            class="absolute inset-0 bg-indigo-400 dark:bg-indigo-500 blur-2xl opacity-20 rounded-full scale-125 pointer-events-none">
                        </div>
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
                        class="text-3xl md:text-4xl font-serif font-black text-slate-800 dark:text-white mb-6 tracking-wide truncate">
                        {{ communityInfo.title }}
                    </h2>

                    <div
                        class="bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-gray-800 rounded-xl p-4 md:p-5 shadow-sm w-full max-w-md mx-auto md:mx-0 mb-8">
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
                            class="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white rounded-xl font-bold text-sm shadow-md transition-transform hover:-translate-y-1 flex items-center justify-center gap-2">
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
            class="w-full bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-sm transition-colors">

            <div class="mb-8">
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
                class="text-xl md:text-2xl font-serif font-black text-slate-800 dark:text-white mb-8 leading-relaxed border-l-4 border-indigo-500 pl-4">
                {{ questionsList[currentQuestionIndex].question }}
            </h2>

            <div class="flex flex-col gap-3">
                <button v-for="(option, index) in questionsList[currentQuestionIndex].options" :key="index"
                    @click="selectOption(option, index)"
                    class="group flex items-center p-3 sm:p-4 bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-gray-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white dark:hover:bg-[#1a1a21] rounded-xl text-left transition-all duration-300 w-full hover:shadow-sm">
                    <div
                        class="w-10 h-10 flex items-center justify-center bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700 rounded-lg group-hover:bg-indigo-500 group-hover:border-indigo-500 transition-all duration-300 shrink-0 mr-4">
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

        <div v-else class="flex flex-col gap-10 items-center w-full">

            <div
                class="w-full bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-sm transition-colors">

                <h2
                    class="text-2xl font-serif font-black mb-8 text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-gray-800 pb-4">
                    <Icon name="ph:scroll-duotone" class="text-indigo-500 text-3xl" /> 信仰解析报告
                </h2>

              
                <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 border-b border-slate-100 dark:border-gray-800 pb-8">

                   
                    <div
                        class="relative overflow-hidden bg-gradient-to-br from-indigo-50/50 to-white dark:from-indigo-900/10 dark:to-[#1a1a21] border border-indigo-100 dark:border-indigo-800/50 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
                        <Icon name="ph:crown-duotone"
                            class="absolute -right-4 -bottom-4 text-[100px] text-indigo-500/5 dark:text-indigo-400/5 pointer-events-none transform -rotate-12" />

                        <div>
                            <label
                                class="relative z-10 flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4">
                                <Icon name="ph:sparkle-fill" class="text-sm" /> 首选命途
                            </label>

                            <div class="relative z-10">
                                <span
                                    class="text-4xl md:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600 dark:from-indigo-400 dark:to-fuchsia-400 tracking-tight">
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
                        class="relative overflow-hidden bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
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

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div v-if="recommendedPrimaryJob"
                        class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-800 rounded-xl p-4 md:p-5 shadow-sm flex items-center gap-4">
                        <div
                            class="w-12 h-12 bg-indigo-50 dark:bg-[#15151a] rounded-xl flex items-center justify-center border border-indigo-100 dark:border-gray-800 shrink-0">
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
                        class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-800 rounded-xl p-4 md:p-5 shadow-sm flex items-center gap-4">
                        <div
                            class="w-12 h-12 bg-fuchsia-50 dark:bg-[#15151a] rounded-xl flex items-center justify-center border border-fuchsia-100 dark:border-gray-800 shrink-0">
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
                    class="bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-gray-800 rounded-xl p-4 shadow-sm flex items-center justify-between gap-4 mb-8">
                    <div
                        class="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest pl-2">
                        <Icon name="ph:shield-check-duotone" class="text-lg" /> 报告置信度评估
                    </div>
                    <div
                        class="flex items-center gap-3 bg-white dark:bg-[#1a1a21] px-4 py-1.5 rounded-lg border border-slate-200 dark:border-gray-700 shadow-sm">
                        <div class="text-xl font-black font-mono" :class="getCredibilityColor(credibilityScore)">
                            {{ credibilityScore }}%
                        </div>
                        <div class="w-px h-4 bg-slate-200 dark:bg-gray-700"></div>
                        <div class="text-sm font-bold text-slate-700 dark:text-gray-300">{{ credibilityRating }}</div>
                    </div>
                </div>

                <div class="mb-8">
                    <label
                        class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Icon name="ph:users-three-duotone" class="text-lg" /> 角色匹配
                    </label>

                    <button v-if="!showCharacterResult" @click="findMatchedCharacter"
                        class="w-full py-6 bg-slate-50 hover:bg-slate-100 dark:bg-[#15151a] dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-800 rounded-xl text-slate-700 dark:text-gray-300 text-sm font-bold transition-colors flex flex-col items-center justify-center gap-2">
                        <Icon name="ph:magic-wand-duotone" class="text-3xl text-indigo-500" />
                        检索数据库中的相似存在
                    </button>

                    <div v-if="showCharacterResult"
                        class="bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-gray-800 rounded-xl p-5 md:p-6 shadow-sm">
                        <div v-if="matchedCharacter">
                            <div class="flex items-end gap-3 mb-4">
                                <div
                                    class="text-2xl md:text-3xl font-serif font-black text-slate-900 dark:text-white bg-white dark:bg-[#1a1a21] px-4 py-2 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm inline-block">
                                    {{ matchedCharacter.name }}
                                </div>
                            </div>

                            <div v-if="matchedCharacter.quote"
                                class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-800 rounded-xl p-4 shadow-sm mb-4">
                                <p
                                    class="text-xs md:text-[13px] text-slate-600 dark:text-gray-400 leading-relaxed whitespace-pre-line italic font-serif">
                                    "{{ matchedCharacter.quote }}"
                                </p>
                            </div>

                            <div class="space-y-3 mb-4 text-sm">
                                <div class="flex flex-col gap-1.5 pt-2 border-t border-slate-200 dark:border-gray-800">
                                    <span
                                        class="text-slate-500 dark:text-gray-500 text-[11px] font-bold uppercase tracking-widest">档案记录</span>
                                    <span
                                        class="font-bold text-[13px] bg-white dark:bg-[#1a1a21] p-3 rounded-lg border border-slate-200 dark:border-gray-700 leading-relaxed">
                                        {{ matchedCharacter.description }}
                                    </span>
                                </div>
                            </div>

                            <div
                                class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-3 text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-start gap-2">
                                <Icon name="ph:sparkle-duotone" class="text-lg shrink-0" />
                                <span>{{ formatMatchReason(matchedCharacter) }}</span>
                            </div>
                        </div>

                        <div v-else class="text-center py-6 text-slate-400 dark:text-gray-600 text-sm italic">
                            浩瀚宇宙中，暂未发现与您完全重合的已知角色...
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Icon name="ph:chart-polar-duotone" class="text-lg" /> 命途倾向度
                        </label>
                        <div
                            class="space-y-3 bg-slate-50 dark:bg-[#15151a] p-4 rounded-xl border border-slate-200 dark:border-gray-800">
                            <div v-for="(data, index) in mainFactionPreferenceData" :key="index"
                                class="flex items-center gap-3 text-xs">
                                <span class="w-16 text-right font-bold text-slate-600 dark:text-gray-400 shrink-0">{{
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
                            class="space-y-3 bg-slate-50 dark:bg-[#15151a] p-4 rounded-xl border border-slate-200 dark:border-gray-800">
                            <div v-for="(data, index) in branchFactionPreferenceData" :key="index"
                                class="flex items-center gap-3 text-xs">
                                <span class="w-16 text-right font-bold text-slate-600 dark:text-gray-400 shrink-0">{{
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
                class="w-[280px] py-4 bg-slate-800 hover:bg-slate-700 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-full font-black text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex justify-center items-center gap-2 active:scale-95 mb-8">
                <Icon name="ph:arrows-clockwise-bold" class="text-lg" /> 重新校准命运
            </button>
            <button @click="generateImage" :disabled="isGeneratingImage"
                class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white rounded-xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:active:scale-100">
                <Icon :name="isGeneratingImage ? 'ph:spinner-gap-bold' : 'ph:camera-duotone'"
                    :class="isGeneratingImage ? 'animate-spin' : ''" class="text-lg" />
                {{ isGeneratingImage ? '正在生成...' : '生成专属档案卡片' }}
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
</template>

<script setup>
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

const generateImage = async () => {
    if (!exportCard.value || isGeneratingImage.value) return;
    isGeneratingImage.value = true;

    try {
        const htmlToImage = await import('html-to-image');

        // toJpeg 或 toPng。为了不透明背景推荐 toPng 或 toJpeg，此处用 toPng
        const dataUrl = await htmlToImage.toPng(exportCard.value, {
            quality: 1,
            pixelRatio: 2, // 提高清晰度
            backgroundColor: '#fafafa', // 强制底色
        });

        // 触发下载
        const link = document.createElement('a');
        link.download = `信仰解析报告_${topFaction.value || '未知'}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error('图片生成失败:', error);
        alert('档案生成失败，可能是由于网络波动或环境限制。');
    } finally {
        isGeneratingImage.value = false;
    }
}
</script>