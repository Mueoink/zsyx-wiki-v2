<!-- app/components/content/BeliefTest.vue -->
<template>
    <div class="w-full font-sans my-10">
        <div v-if="showCommunityPage"
            class="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 rounded-3xl p-1 shadow-lg border border-indigo-100">

            <div class="p-6 md:p-10 relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">

                <div class="shrink-0 relative w-36 h-36 md:w-44 md:h-44 mx-auto md:mx-0">
                    <div
                        class="absolute inset-0 bg-indigo-400 blur-2xl opacity-20 rounded-full scale-125 pointer-events-none">
                    </div>

                    <div class="w-full h-full rounded-2xl bg-white shadow-lg border-4 border-white relative z-10">
                        <img :src="communityInfo.avatar" alt="Community"
                            class="w-full h-full object-cover rounded-xl" />
                    </div>

                    <div
                        class="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black tracking-widest z-20 border border-indigo-200 shadow-sm flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> 频道已连接
                    </div>
                </div>

                <div class="flex-1 flex flex-col justify-center text-center md:text-left relative z-10 mt-4 md:mt-0">
                    <div class="flex items-center justify-center md:justify-start gap-2 text-indigo-600 mb-2">
                        <Icon name="ph:broadcast-duotone" class="text-xl" />
                        <span class="text-sm font-black tracking-wider">诸神愚戏WIKI广播频道</span>
                    </div>

                    <h2 class="text-3xl md:text-5xl font-black text-black mb-6 tracking-tight leading-tight">
                        {{ communityInfo.title }}
                    </h2>

                    <div
                        class="bg-white rounded-xl p-4 mb-6 inline-block border border-gray-200 shadow-sm text-base text-black text-left w-full max-w-md">
                        <div class="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
                            <span class="text-gray-700 font-bold text-sm">通讯频道</span>
                            <span class="text-indigo-700 font-black text-lg">{{ communityInfo.name }}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-700 font-bold text-sm">通讯解码</span>
                            <span class="text-fuchsia-700 font-black px-2 py-1 rounded text-lg">{{
                                communityInfo.description }}</span>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button @click="startQuiz"
                            class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 text-white rounded-full font-black text-base shadow-md transition-transform hover:-translate-y-1 group flex items-center justify-center gap-2">
                            启程！开始信仰测试
                            <Icon name="ph:rocket-duotone"
                                class="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                        <a :href="communityInfo.joinLink" target="_blank"
                            class="px-8 py-4 bg-white hover:bg-gray-50 text-black rounded-full font-black text-base shadow-sm border border-gray-300 transition-transform hover:-translate-y-1 text-center flex items-center justify-center gap-2">
                            <Icon name="ph:users-three-duotone" class="text-xl text-gray-600" /> 去社区逛逛
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="currentQuestionIndex < questionsList.length"
            class="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-gray-200 relative overflow-hidden">

            <div class="flex flex-col mb-8 relative z-10">
                <div class="flex justify-between items-end mb-3">
                    <span class="text-sm text-gray-800 font-black">灵魂共鸣进度</span>
                    <span
                        class="text-base font-black text-indigo-700 bg-indigo-50 px-4 py-1 rounded-full border border-indigo-100">
                        {{ currentQuestionIndex + 1 }} / {{ questionsList.length }}
                    </span>
                </div>
                <div class="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-500 ease-out rounded-full"
                        :style="{ width: `${((currentQuestionIndex + 1) / questionsList.length) * 100}%` }">
                    </div>
                </div>
            </div>

            <h2
                class="text-2xl md:text-3xl font-black text-black mb-8 leading-relaxed relative z-10 border-l-4 border-indigo-500 pl-4">
                {{ questionsList[currentQuestionIndex].question }}
            </h2>

            <div class="flex flex-col gap-4 mt-6 relative z-10">
                <button v-for="(option, index) in questionsList[currentQuestionIndex].options" :key="index"
                    @click="selectOption(option, index)"
                    class="group flex items-center p-2 pr-6 bg-white border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-md transition-all duration-300 rounded-2xl text-left transform hover:scale-[1.01]">

                    <div
                        class="w-12 h-12 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-xl group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300 shrink-0 mr-4">
                        <span class="font-black text-gray-800 group-hover:text-white text-lg">
                            {{ String.fromCharCode(65 + index) }}
                        </span>
                    </div>

                    <div class="text-black font-bold text-lg flex-1 py-3">
                        {{ option }}
                    </div>
                </button>
            </div>

            <div class="mt-8 pt-6 border-t border-gray-100 flex justify-start relative z-10"
                v-if="currentQuestionIndex > 0">
                <button @click="previousQuestion"
                    class="text-sm text-gray-600 hover:text-indigo-600 font-black flex items-center gap-1.5 transition-colors px-4 py-2 hover:bg-gray-50 rounded-full border border-transparent hover:border-gray-200">
                    <Icon name="ph:arrow-left-bold" /> 返回上一题，我再想想
                </button>
            </div>
        </div>

        <div v-else class="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-gray-200">

            <div
                class="pb-8 mb-8 border-b-2 border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative">

                <div>
                    <div
                        class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-sm font-black mb-4 shadow-sm">
                        <Icon name="ph:check-circle-fill" class="text-lg" /> 命运解析完毕
                    </div>
                    <h2 class="text-xl text-black font-bold mb-2">和你灵魂最契合的命途是：</h2>
                    <div class="text-6xl md:text-8xl font-black text-black tracking-tight drop-shadow-sm">
                        {{ topFaction }}
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">
                            {{ topFactionBranch }}
                        </span>
                    </div>
                </div>

                <div
                    class="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm w-full md:w-auto text-left md:text-right">
                    <div
                        class="text-sm text-gray-600 font-bold mb-2 flex items-center justify-start md:justify-end gap-2">
                        <Icon name="ph:mask-happy-duotone" class="text-lg text-indigo-500" /> 潜藏的另一个倾向
                    </div>
                    <div class="text-3xl font-black text-black">
                        【{{ secondFaction }}】 · {{ secondFactionBranch }}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" v-if="recommendedPrimaryJob">
                <div class="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center gap-4">
                    <div
                        class="w-12 h-12 bg-white shadow-sm rounded-xl flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100">
                        <Icon name="ph:sword-duotone" class="text-2xl" />
                    </div>
                    <div>
                        <div class="text-xs text-indigo-600 font-black mb-1">最合适/你的最佳首选哦</div>
                        <div class="text-xl font-black text-indigo-950">{{ recommendedPrimaryJob }}</div>
                    </div>
                </div>

                <div class="p-5 rounded-2xl bg-orange-50 border border-orange-100 flex items-center gap-4"
                    v-if="recommendedSecondaryJob">
                    <div
                        class="w-12 h-12 bg-white shadow-sm rounded-xl flex items-center justify-center text-orange-600 shrink-0 border border-orange-100">
                        <Icon name="ph:shield-star-duotone" class="text-2xl" />
                    </div>
                    <div>
                        <div class="text-xs text-orange-600 font-black mb-1">或者/也可以试试?</div>
                        <div class="text-xl font-black text-orange-950">{{ recommendedSecondaryJob }}</div>
                    </div>
                </div>
            </div>

            <div
                class="mb-12 bg-gray-50 border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-2 text-gray-700 font-bold">
                    <Icon name="ph:shield-check-fill" class="text-xl text-indigo-500" />
                    <span>本次信仰测试可信度</span>
                </div>
                <div class="flex items-center gap-4 bg-white px-6 py-2 rounded-xl border border-gray-200 shadow-sm">
                    <div class="text-4xl font-black" :class="getCredibilityColor(credibilityScore)">
                        {{ credibilityScore }}
                    </div>
                    <div class="w-px h-8 bg-gray-200"></div>
                    <div class="text-xl font-black text-black">{{ credibilityRating }}</div>
                </div>
            </div>

            <div class="mb-12">
                <div
                    class="text-2xl font-black text-black mb-6 flex items-center gap-3 border-b-2 border-gray-100 pb-3">
                    <Icon name="ph:users-three-fill" class="text-fuchsia-600" /> 内在匹配
                </div>

                <button v-if="!showCharacterResult" @click="findMatchedCharacter"
                    class="w-full relative overflow-hidden group rounded-3xl p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 shadow-lg transition-transform hover:scale-[1.01]">
                    <div
                        class="bg-white group-hover:bg-gray-50 transition-colors py-10 rounded-[22px] flex flex-col items-center justify-center gap-3">
                        <Icon name="ph:magic-wand-duotone"
                            class="text-5xl text-purple-600 group-hover:rotate-12 transition-transform duration-300" />
                        <span class="text-xl font-black text-black tracking-wider">你究竟最像谁？</span>
                    </div>
                </button>

                <div v-if="showCharacterResult"
                    class="bg-indigo-50/50 border-2 border-indigo-100 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-inner">
                    <div v-if="matchedCharacter" class="relative z-10">
                        <div class="flex flex-col md:flex-row md:items-end gap-3 mb-6">
                            <div class="text-gray-800 font-bold text-lg">在茫茫人海中，你如同……</div>
                            <div
                                class="text-3xl md:text-5xl font-black text-indigo-900 bg-white px-5 py-2 rounded-xl border border-indigo-200 shadow-sm inline-block">
                                {{ matchedCharacter.name }}
                            </div>
                            <div class="text-gray-800 font-bold text-lg mb-1 md:mb-2">的倒影</div>
                        </div>

                        <blockquote v-if="matchedCharacter.quote"
                            class="bg-white border-l-4 border-indigo-500 p-5 rounded-r-xl shadow-sm mb-6 relative">
                            <Icon name="ph:quotes-fill" class="absolute top-2 right-4 text-indigo-100 text-5xl" />
                            <p class="text-lg text-black italic font-bold relative z-10">
                                "{{ matchedCharacter.quote }}"
                            </p>
                        </blockquote>

                        <div class="mb-6">
                            <div class="text-sm font-black text-indigo-500 mb-2 uppercase tracking-widest">>> 档案记载</div>
                            <p
                                class="text-base text-black leading-relaxed font-bold bg-white/80 p-5 rounded-xl border border-white">
                                {{ matchedCharacter.description }}
                            </p>
                        </div>

                        <div class="bg-indigo-900 text-white p-6 rounded-2xl shadow-md">
                            <div class="flex items-start gap-4">
                                <Icon name="ph:sparkle-fill" class="text-amber-400 text-3xl shrink-0 mt-0.5" />
                                <div class="text-base font-bold leading-relaxed text-indigo-50">
                                    {{ formatMatchReason(matchedCharacter) }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="text-center py-10 relative z-10 bg-white rounded-2xl border border-gray-200">
                        <Icon name="ph:alien-duotone" class="text-6xl text-gray-400 mx-auto mb-4" />
                        <p class="text-xl font-black text-black">浩瀚宇宙中，竟找不到与你完全重合的倒影。</p>
                        <p class="text-base font-bold text-gray-500 mt-2">或许是由于你的灵魂太独特了</p>
                    </div>
                </div>
            </div>

      
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                <div v-if="mainFactionPreferenceData.length > 0"
                    class="bg-white rounded-3xl p-6 border-2 border-gray-100 shadow-sm">
                    <div
                        class="text-lg font-black text-black flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                        <Icon name="ph:chart-polar-fill" class="text-indigo-600" /> 命途倾向
                    </div>
                    <div class="space-y-5">
                        <div v-for="(data, index) in mainFactionPreferenceData" :key="index">
                            <div class="flex justify-between text-sm font-black text-black mb-2">
                                <span>{{ data.name }}</span>
                                <span class="text-indigo-700">{{ data.percentage }}%</span>
                            </div>
                            <div class="h-3 w-full bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                                <div class="h-full transition-all duration-1000 ease-out rounded-full"
                                    :class="data.score >= 0 ? 'bg-indigo-500' : 'bg-rose-500'"
                                    :style="{ width: data.percentageValue + '%' }">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="branchFactionPreferenceData.length > 0"
                    class="bg-white rounded-3xl p-6 border-2 border-gray-100 shadow-sm">
                    <div
                        class="text-lg font-black text-black flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                        <Icon name="ph:tree-structure-fill" class="text-fuchsia-600" /> 信仰分析
                    </div>
                    <div class="space-y-5">
                        <div v-for="(data, index) in branchFactionPreferenceData" :key="index">
                            <div class="flex justify-between text-sm font-black text-black mb-2">
                                <span>{{ data.name }}</span>
                                <span class="text-fuchsia-700">{{ data.percentage }}%</span>
                            </div>
                            <div class="h-3 w-full bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                                <div class="h-full transition-all duration-1000 ease-out rounded-full"
                                    :class="data.score >= 0 ? 'bg-fuchsia-500' : 'bg-rose-500'"
                                    :style="{ width: data.percentageValue + '%' }">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="flex justify-center pt-6 border-t-2 border-gray-100">
                <button @click="restartQuiz"
                    class="px-8 py-4 bg-black hover:bg-gray-800 text-white rounded-xl font-black text-base shadow-lg transition-transform hover:-translate-y-1 flex items-center gap-2 active:scale-95">
                    <Icon name="ph:arrows-clockwise-bold" class="text-xl text-indigo-300" /> 我不服，重新校准命运
                </button>
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
    if (score <= 25) return 'text-rose-600';
    if (score <= 60) return 'text-orange-600';
    if (score <= 90) return 'text-indigo-600';
    return 'text-emerald-600';
}
</script>