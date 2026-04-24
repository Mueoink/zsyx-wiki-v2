<template>
    <div
        class="max-w-[1000px] mx-auto py-8 px-4 text-slate-800 dark:text-gray-300 font-sans transition-colors duration-300">

        <div class="flex flex-col gap-8 items-center w-full">

            <div
                class="w-full bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-sm transition-colors">

                <div class="text-center mb-6 border-b border-slate-100 dark:border-gray-800 pb-6">
                    <h2
                        class="text-2xl md:text-3xl font-serif font-black text-slate-800 dark:text-white flex items-center justify-center gap-2 mb-2">
                        <Icon name="ph:shooting-star-duotone" class="text-amber-500 text-3xl md:text-4xl" /> 虚空祈求终端
                    </h2>
                    <div
                        class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold tracking-widest border border-indigo-100 dark:border-indigo-800/50">
                        <Icon name="ph:broadcast-duotone" /> 官方QQ频道：zsyxwiki233
                    </div>
                </div>

                <div class="mb-8">
                    <button @click="showRates = !showRates"
                        class="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 dark:bg-[#15151a] dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-800 rounded-xl transition-colors font-bold text-sm text-slate-600 dark:text-gray-300">
                        <span class="flex items-center gap-2">
                            <Icon name="ph:info-duotone" class="text-indigo-500 text-lg" /> 祈求概率公示
                        </span>
                        <Icon :name="showRates ? 'ph:caret-up-bold' : 'ph:caret-down-bold'" />
                    </button>

                    <transition name="collapse">
                        <div v-show="showRates" class="overflow-hidden">
                            <div
                                class="p-4 md:p-6 mt-2 bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-800 rounded-xl text-xs md:text-sm text-slate-600 dark:text-gray-300 space-y-4">
                                <ul class="list-disc pl-5 space-y-1 font-bold">
                                    <li>所有SSS以上的等级均视为SP</li>
                                    <li>天赋和道具均可从虚空中祈求获得</li>
                                    <li class="text-indigo-600 dark:text-indigo-400">五连祈求必定出现一个B或B级以上的等级</li>
                                </ul>

                                <div
                                    class="overflow-x-auto custom-scrollbar border border-slate-200 dark:border-gray-700 rounded-lg">
                                    <table class="w-full text-center border-collapse min-w-[500px]">
                                        <thead>
                                            <tr
                                                class="bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-200 font-bold">
                                                <th
                                                    class="p-2.5 border-b border-slate-200 dark:border-gray-700 text-left pl-4">
                                                    等级</th>
                                                <th class="p-2.5 border-b border-slate-200 dark:border-gray-700">单抽概率
                                                    (%)</th>
                                                <th class="p-2.5 border-b border-slate-200 dark:border-gray-700">五连基础概率
                                                    (%)</th>
                                                <th class="p-2.5 border-b border-slate-200 dark:border-gray-700 pr-4">
                                                    五连保底 (B+) 概率 (%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="rate in rateData1" :key="rate.level"
                                                class="border-b border-slate-100 dark:border-gray-800/50 hover:bg-slate-50 dark:hover:bg-[#15151a]">
                                                <td class="p-2.5 text-left pl-4 font-black"
                                                    :class="getTextColorClass(rate.level)">{{ rate.level }}</td>
                                                <td class="p-2.5 font-mono">{{ rate.single }}</td>
                                                <td class="p-2.5 font-mono">{{ rate.multiBase }}</td>
                                                <td class="p-2.5 font-mono pr-4">{{ rate.multiPity }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <p class="font-bold text-amber-600 dark:text-amber-500 pt-2">
                                    当累计500抽未出现SS或SS以上等级时，则第500抽必定为SS或SS以上稀有度</p>

                                <div
                                    class="overflow-x-auto custom-scrollbar border border-slate-200 dark:border-gray-700 rounded-lg">
                                    <table class="w-full text-center border-collapse">
                                        <thead>
                                            <tr
                                                class="bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-200 font-bold">
                                                <th class="p-2.5 border-b border-slate-200 dark:border-gray-700">SS 概率
                                                    (%)</th>
                                                <th class="p-2.5 border-b border-slate-200 dark:border-gray-700">SSS 概率
                                                    (%)</th>
                                                <th class="p-2.5 border-b border-slate-200 dark:border-gray-700">SP 概率
                                                    (%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="hover:bg-slate-50 dark:hover:bg-[#15151a]">
                                                <td class="p-2.5 font-mono font-bold text-orange-500">95</td>
                                                <td class="p-2.5 font-mono font-bold text-rose-500">4.99</td>
                                                <td class="p-2.5 font-mono font-bold text-amber-500">0.01</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                    <button @click="performSingleDraw" :disabled="isDrawing"
                        class="w-full sm:w-auto min-w-[180px] px-6 py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 dark:disabled:bg-gray-800 disabled:text-slate-400 text-white rounded-xl font-black text-sm md:text-base shadow-md hover:shadow-lg transition-all active:scale-95 disabled:active:scale-100 flex items-center justify-center gap-2">
                        <Icon v-if="!isDrawing" name="ph:star-duotone" class="text-xl" />
                        <Icon v-else name="ph:spinner-gap-bold" class="text-xl animate-spin" />
                        {{ isDrawing ? '祈求中...' : '进行祈求 (x1)' }}
                    </button>

                    <button @click="performMultiDraw(5)" :disabled="isDrawing"
                        class="w-full sm:w-auto min-w-[180px] px-6 py-4 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-200 dark:disabled:bg-gray-800 disabled:text-slate-400 text-white rounded-xl font-black text-sm md:text-base shadow-md hover:shadow-lg transition-all active:scale-95 disabled:active:scale-100 flex items-center justify-center gap-2">
                        <Icon v-if="!isDrawing" name="ph:stars-duotone" class="text-xl" />
                        <Icon v-else name="ph:spinner-gap-bold" class="text-xl animate-spin" />
                        {{ isDrawing ? '祈求中...' : '进行祈求 (x5)' }}
                    </button>
                </div>

                <div
                    class="text-center text-xs font-bold text-slate-500 dark:text-gray-400 bg-slate-50 dark:bg-[#15151a] py-2.5 px-5 rounded-xl border border-slate-100 dark:border-gray-800 inline-block mx-auto mb-8 w-full md:w-auto shadow-sm">
                    已祈求 <span class="text-indigo-500 text-sm mx-1">{{ drawCount }}</span> 次 <span
                        class="mx-3 text-slate-300 dark:text-gray-700">|</span> 距下次SS+保底 <span
                        class="text-amber-500 text-sm mx-1">{{ pityThresholdSSPlus - pityCounterSSPlus }}</span> 次
                </div>

                <div
                    class="w-full min-h-[360px] flex items-center justify-center relative bg-slate-50 dark:bg-[#15151a] rounded-2xl border border-slate-100 dark:border-gray-800 p-4 md:p-8 overflow-hidden shadow-inner">

                    <transition name="fade" mode="out-in">
                        <div v-if="isDrawing" key="loading"
                            class="flex flex-col items-center justify-center text-slate-400 dark:text-gray-500">
                            <Icon name="ph:spinner-gap-bold" class="text-5xl animate-spin mb-4 text-amber-500" />
                            <p class="font-bold text-sm tracking-widest">正在沟通虚空...</p>
                            <p v-if="currentDrawType === 5" class="text-xs mt-2 opacity-60">(五连祈求进行中)</p>
                        </div>

                      <div v-else-if="drawnCard" :key="drawnCard.uniqueId" class="w-full max-w-[460px]">
                            <div class="relative bg-white dark:bg-[#1a1a21] border-2 rounded-2xl p-5 md:p-7 flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-500 overflow-hidden min-h-[320px] md:min-h-[360px]"
                                :class="getCardWrapperStyle(drawnCard.group)">

                                <!-- 发光背景特效 -->
                                <div v-if="['SP', 'SSS', 'SS', 'S'].includes(drawnCard.group)"
                                    class="absolute inset-0 opacity-20 pointer-events-none"
                                    :class="getShineBackground(drawnCard.group)"></div>

                                <!-- 顶部双角标 -->
                                <div class="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                                    <span
                                        class="px-4 py-1.5 rounded-lg text-sm font-black shadow-md tracking-wider flex items-center justify-center leading-none border-transparent"
                                        :style="getRarityStyle(drawnCard.group)">
                                        {{ drawnCard.level }}
                                    </span>
                                    <span
                                        class="text-xs font-bold text-slate-500 dark:text-gray-400 bg-slate-100/80 dark:bg-[#15151a]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-gray-700 leading-none shadow-sm">
                                        {{ drawnCard.type }}
                                    </span>
                                </div>

                                <!-- 实体名称 -->
                                <h3
                                    class="text-2xl md:text-3xl font-serif font-black mt-14 mb-3 text-slate-800 dark:text-white relative z-10 leading-snug drop-shadow-sm px-2">
                                    {{ drawnCard.name }}
                                </h3>

                                <!-- 基础属性与持有者标签 -->
                                <div class="flex flex-wrap items-center justify-center gap-2 mb-5 relative z-10">
                                    <span v-if="drawnCard.baseInfo"
                                        class="text-[11px] md:text-xs bg-slate-100 dark:bg-[#15151a] text-slate-600 dark:text-gray-300 px-2.5 py-1 rounded-md border border-slate-200 dark:border-gray-800 font-bold">
                                        {{ drawnCard.baseInfo }}
                                    </span>
                                    <span v-if="drawnCard.owners"
                                        class="text-[11px] md:text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-800/50 font-bold flex items-center gap-1.5">
                                        <Icon name="ph:user-circle-duotone" class="text-sm" /> 持有记录: {{ drawnCard.owners
                                        }}
                                    </span>
                                </div>

                                <!-- 详细数据滚动区 -->
                                <div
                                    class="flex-1 w-full relative z-10 bg-white/90 dark:bg-[#1a1a21]/90 backdrop-blur-md p-4 md:p-5 rounded-xl border border-slate-100 dark:border-gray-700 shadow-sm text-left flex flex-col gap-3 md:gap-4 max-h-[260px] md:max-h-[320px] overflow-y-auto custom-scrollbar">

                                    <!-- 效果列表 -->
                                    <div v-if="drawnCard.effects && drawnCard.effects.length > 0"
                                        class="text-sm md:text-[15px] text-slate-800 dark:text-gray-200 space-y-3">
                                        <div v-for="(eff, idx) in drawnCard.effects" :key="idx"
                                            class="flex items-start gap-2 font-bold">
                                            <Icon name="ph:sparkle-fill"
                                                class="text-indigo-500 dark:text-indigo-400 mt-1 shrink-0 text-base" />
                                            <span class="leading-relaxed">{{ eff }}</span>
                                        </div>
                                    </div>
                                    <!-- 备用描述(当没有effects时显示) -->
                                    <div v-else-if="drawnCard.desc"
                                        class="text-sm md:text-[15px] text-slate-800 dark:text-gray-200 leading-relaxed font-bold text-center py-4">
                                        {{ drawnCard.desc }}
                                    </div>

                                    <!-- 档案馆备注 -->
                                   <div v-if="drawnCard.remark"
                                        class="text-xs md:text-[13px] text-slate-500 dark:text-gray-400 italic border-t border-slate-200 dark:border-gray-800 pt-3 md:pt-4 mt-1 md:mt-2 leading-relaxed font-serif whitespace-pre-line">
                                        "{{ drawnCard.remark }}"
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div v-else key="placeholder"
                            class="text-center text-slate-400 dark:text-gray-600 flex flex-col items-center justify-center">
                            <Icon name="ph:hand-tap-duotone" class="text-5xl mb-4 opacity-50" />
                            <p class="text-sm md:text-base font-bold tracking-widest leading-relaxed">
                                点击按钮开始祈求<br />获取你的天赋或道具</p>
                        </div>
                    </transition>

                </div>

                <div v-if="multiDrawHighestGroup && !isDrawing && currentDrawType === 5"
                    class="mt-6 text-center text-xs md:text-sm font-bold text-slate-600 dark:text-gray-400 bg-indigo-50 dark:bg-indigo-900/20 py-3.5 px-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50 shadow-sm flex flex-col sm:flex-row items-center justify-center gap-2">
                    <div>本次五连祈求最高获得</div>
                    <div class="flex items-center gap-2">
                       <span
                            class="px-2.5 py-1 rounded text-xs font-black shadow-sm tracking-wider leading-none border-transparent"
                            :style="getRarityStyle(multiDrawHighestGroup)">
                            {{ multiDrawHighestGroup }}
                        </span>
                        <span>级别物品!</span>
                    </div>
                    <span class="opacity-60 font-normal text-xs mt-1 sm:mt-0">(已展示最高稀有度，其余见记录)</span>
                </div>
            </div>

            <div v-if="drawHistory.length > 0"
                class="w-full bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-sm transition-colors">
                <h3
                    class="text-xl font-serif font-black mb-6 text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-gray-800 pb-4">
                    <Icon name="ph:clock-counter-clockwise-duotone" class="text-indigo-500 text-2xl" /> 祈求记录
                </h3>

                <div
                    class="mb-8 bg-slate-50 dark:bg-[#15151a] p-5 rounded-xl border border-slate-100 dark:border-gray-800 shadow-inner">
                    <h4
                        class="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Icon name="ph:chart-bar-duotone" /> 低稀有度统计 (D-B)
                    </h4>
                    <div class="flex flex-wrap gap-4 md:gap-6">
                        <div v-for="(count, group) in lowLevelCounts" :key="group"
                            class="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-gray-300 bg-white dark:bg-[#1a1a21] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-gray-700 shadow-sm">
                           <span
                                class="px-2 py-0.5 rounded text-[10px] font-black tracking-wider shadow-sm leading-none border-transparent"
                                :style="getRarityStyle(group)">
                                {{ group }}
                            </span>
                            <span class="font-mono text-indigo-500">{{ count }}</span> <span
                                class="text-xs text-slate-400">个</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4
                        class="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Icon name="ph:list-stars-duotone" /> 高稀有度获得列表 (A级及以上)
                    </h4>
                    <div v-if="highLevelHistoryItems.length > 0"
                        class="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                        <div v-for="card in highLevelHistoryItems" :key="card.uniqueId"
                            class="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-[#15151a] dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-800 rounded-xl transition-colors shadow-sm">
                            <div class="flex items-center gap-3 md:gap-4 min-w-0">
                               <span
                                    class="px-2.5 py-1 rounded text-xs font-black shadow-sm tracking-wider shrink-0 leading-none border-transparent"
                                    :style="getRarityStyle(card.group)">
                                    {{ card.level }}
                                </span>
                                <span
                                    class="text-sm md:text-base font-bold text-slate-800 dark:text-gray-200 truncate">{{
                                    card.name }}</span>
                            </div>
                            <span
                                class="text-xs text-slate-400 dark:text-gray-500 shrink-0 ml-2 font-mono bg-white dark:bg-[#1a1a21] px-2 py-1 rounded border border-slate-100 dark:border-gray-700">第
                                {{ card.drawNumber }} 次</span>
                        </div>
                    </div>
                    <div v-else
                        class="text-center py-8 text-slate-400 dark:text-gray-600 text-sm font-bold border-2 border-dashed border-slate-200 dark:border-gray-700 rounded-xl bg-slate-50/50 dark:bg-[#15151a]/50">
                        <Icon name="ph:empty-duotone" class="text-4xl mb-2 mx-auto opacity-50" />
                        尚未获得 A 级或以上物品
                    </div>
                </div>
            </div>

            <div
                class="mt-4 pt-6 border-t border-slate-200 dark:border-gray-800 w-full text-center flex flex-col items-center justify-center opacity-40 select-none">
                <Icon name="ph:fingerprint-duotone" class="text-3xl text-slate-400 mb-2" />
                <div class="text-[10px] font-mono text-slate-700 dark:text-gray-400 tracking-wider">诸神愚戏 WIKI 档案馆认证
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { allItems } from '~/utils/items'

const rateData1 = [
    { level: 'D', single: '37.4', multiBase: '44.595', multiPity: '-' },
    { level: 'C', single: '32', multiBase: '30', multiPity: '-' },
    { level: 'B', single: '16.2', multiBase: '15', multiPity: '75.995' },
    { level: 'A', single: '9.0', multiBase: '6', multiPity: '20.6' },
    { level: 'S', single: '3.54', multiBase: '3', multiPity: '2' },
    { level: 'SS', single: '1.42', multiBase: '1.2', multiPity: '1.2' },
    { level: 'SSS', single: '0.43', multiBase: '0.2', multiPity: '0.2' },
    { level: 'SP', single: '0.01', multiBase: '0.005', multiPity: '0.005' },
]

const parseLevel = (level) => {
    if (!level) return "D";
    const lv = level.toUpperCase();
    if (lv.includes("SSSS") || lv.includes("SSS'S") || lv.includes("SP")) return "SP";
    if (lv.includes("SSS")) return "SSS";
    if (lv.includes("SS")) return "SS";
    if (lv.includes("S")) return "S";
    if (lv.includes("A")) return "A";
    if (lv.includes("B")) return "B";
    if (lv.includes("C")) return "C";
    return "D";
};

const itemPool = {
    'D': [], 'C': [], 'B': [], 'A': [], 'S': [], 'SS': [], 'SSS': [], 'SP': []
};

allItems.forEach(item => {
    const group = parseLevel(item.level);
    itemPool[group].push(item);
});

const rankWeight = { 'D': 1, 'C': 2, 'B': 3, 'A': 4, 'S': 5, 'SS': 6, 'SSS': 7, 'SP': 8 };

const showRates = ref(false);
const isDrawing = ref(false);
const drawnCard = ref(null);
const drawCount = ref(0);
const drawHistory = ref([]);
let uniqueCounter = 0;
const currentDrawType = ref(1);
const multiDrawHighestGroup = ref(null);
const pityCounterSSPlus = ref(0);
const pityThresholdSSPlus = 500;

const probabilitiesSingle = { 'D': 37.4, 'C': 32, 'B': 16.2, 'A': 9.0, 'S': 3.54, 'SS': 1.42, 'SSS': 0.43, 'SP': 0.01 };
// const probabilitiesSingle = { 'D': 0, 'C': 0, 'B': 0, 'A': 0, 'S': 0, 'SS': 0, 'SSS': 0, 'SP': 100 };
const probabilitiesMulti = { 'D': 44.595, 'C': 30, 'B': 15, 'A': 6, 'S': 3, 'SS': 1.2, 'SSS': 0.2, 'SP': 0.005 };
const probabilitiesGuaranteedBPlus = { 'B': 75.995, 'A': 20.6, 'S': 2, 'SS': 1.2, 'SSS': 0.2, 'SP': 0.005 };
const probabilitiesPitySSPlus = { 'SS': 95, 'SSS': 4.99, 'SP': 0.01 }; // sp:0.01

const determineGroup = (probabilities) => {
    const random = Math.random() * 100;
    let cumulative = 0;
    const groups = ['D', 'C', 'B', 'A', 'S', 'SS', 'SSS', 'SP'];
    for (const g of groups) {
        if (probabilities[g]) {
            cumulative += probabilities[g];
            if (random <= cumulative) return g;
        }
    }
    return 'D';
};

const findCard = (group, drawNumber) => {
    const pool = itemPool[group];
    if (!pool || pool.length === 0) {
        return {
            uniqueId: uniqueCounter++,
            drawNumber,
            name: "虚空回响",
            type: "系统异常",
            level: group,
            group: group,
            desc: `警告：核心数据库缺失 [${group}] 阶层的可提取实体数据。`,
        };
    }

    // 随机抽取一个实体，并把所有属性(effects, owners, remark等)完整保留
    const randomItem = pool[Math.floor(Math.random() * pool.length)];

    return {
        ...randomItem,
        uniqueId: uniqueCounter++,
        drawNumber,
        group,
        // 如果数据里既没有 effects 也没有 desc，给个默认提示
        desc: randomItem.desc || '缺乏记录的神秘存在。'
    };
};

const performSingleDraw = () => {
    if (isDrawing.value) return;
    isDrawing.value = true;
    currentDrawType.value = 1;
    multiDrawHighestGroup.value = null;

    setTimeout(() => {
        pityCounterSSPlus.value++;
        let drawnGroup;

        if (pityCounterSSPlus.value >= pityThresholdSSPlus) {
            drawnGroup = determineGroup(probabilitiesPitySSPlus);
            pityCounterSSPlus.value = 0;
        } else {
            drawnGroup = determineGroup(probabilitiesSingle);
            if (rankWeight[drawnGroup] >= rankWeight['SS']) {
                pityCounterSSPlus.value = 0;
            }
        }

        const card = findCard(drawnGroup, drawCount.value + 1);
        drawnCard.value = card;
        drawHistory.value.unshift(card);
        drawCount.value++;
        isDrawing.value = false;
    }, 1200);
};

const performMultiDraw = (count = 5) => {
    if (isDrawing.value) return;
    isDrawing.value = true;
    currentDrawType.value = 5;
    multiDrawHighestGroup.value = null;

    const startingCount = drawCount.value;
    const results = [];
    let maxWeight = 0;
    let hasGuaranteed = false;
    let pityTriggered = false;

    for (let i = 0; i < count; i++) {
        pityCounterSSPlus.value++;
        let drawnGroup;

        if (!pityTriggered && pityCounterSSPlus.value >= pityThresholdSSPlus) {
            drawnGroup = determineGroup(probabilitiesPitySSPlus);
            pityTriggered = true;
            pityCounterSSPlus.value = 0;
        } else {
            drawnGroup = determineGroup(probabilitiesMulti);
            if (rankWeight[drawnGroup] >= rankWeight['SS']) {
                pityCounterSSPlus.value = 0;
            }
        }

        const card = findCard(drawnGroup, startingCount + i + 1);
        results.push(card);

        if (rankWeight[drawnGroup] >= rankWeight['B']) hasGuaranteed = true;
        if (rankWeight[drawnGroup] > maxWeight) maxWeight = rankWeight[drawnGroup];
    }

    if (!hasGuaranteed && !pityTriggered) {
        const replaceIndex = Math.floor(Math.random() * count);
        const gGroup = determineGroup(probabilitiesGuaranteedBPlus);
        const gCard = findCard(gGroup, results[replaceIndex].drawNumber);
        results[replaceIndex] = gCard;
        if (rankWeight[gGroup] > maxWeight) maxWeight = rankWeight[gGroup];
    }

    const maxGroups = ['D', 'C', 'B', 'A', 'S', 'SS', 'SSS', 'SP'];
    const maxGroupStr = maxGroups[maxWeight - 1];
    const highestCards = results.filter(c => c.group === maxGroupStr);
    const displayCard = highestCards[Math.floor(Math.random() * highestCards.length)];

    setTimeout(() => {
        drawnCard.value = displayCard;
        drawHistory.value.unshift(...[...results].reverse());
        drawCount.value += count;
        multiDrawHighestGroup.value = maxGroupStr;
        isDrawing.value = false;
    }, 1500);
};

const lowLevelCounts = computed(() => {
    const counts = { 'D': 0, 'C': 0, 'B': 0 };
    drawHistory.value.forEach(c => {
        if (['D', 'C', 'B'].includes(c.group)) counts[c.group]++;
    });
    return counts;
});

const highLevelHistoryItems = computed(() => {
    return drawHistory.value.filter(c => rankWeight[c.group] >= rankWeight['A']);
});

const getTextColorClass = (group) => {
  
    if (group === 'SP') return 'text-rose-500';
    if (group === 'SSS') return 'text-orange-500';
    if (group === 'SS') return 'text-amber-500';
    if (group === 'S') return 'text-purple-500';
    if (group === 'A') return 'text-indigo-500';
    if (group === 'B') return 'text-emerald-500';
    if (group === 'C') return 'text-slate-500';
    return 'text-slate-400';
};

const getRarityStyle = (group) => {
   
    if (group === 'SP') return { backgroundColor: '#f43f5e', color: '#ffffff' }; // rose-500
    if (group === 'SSS') return { backgroundColor: '#f97316', color: '#ffffff' }; // orange-500
    if (group === 'SS') return { backgroundColor: '#f59e0b', color: '#ffffff' }; // amber-500
    if (group === 'S') return { backgroundColor: '#a855f7', color: '#ffffff' }; // purple-500
    if (group === 'A') return { backgroundColor: '#6366f1', color: '#ffffff' }; // indigo-500
    if (group === 'B') return { backgroundColor: '#10b981', color: '#ffffff' }; // emerald-500
    if (group === 'C') return { backgroundColor: '#94a3b8', color: '#ffffff' }; // slate-400
    return { backgroundColor: '#cbd5e1', color: '#334155' }; // slate-300
};

const getCardWrapperStyle = (group) => {
   
    if (group === 'SP') return 'border-rose-300 dark:border-rose-500 shadow-rose-500/30';
    if (group === 'SSS') return 'border-orange-300 dark:border-orange-500 shadow-orange-500/30';
    if (group === 'SS') return 'border-amber-300 dark:border-amber-500 shadow-amber-500/20';
    if (group === 'S') return 'border-purple-300 dark:border-purple-500 shadow-purple-500/20';
    return 'border-slate-200 dark:border-gray-700';
};

const getShineBackground = (group) => {
    
    if (group === 'SP') return 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-300 via-transparent to-transparent dark:from-rose-500';
    if (group === 'SSS') return 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-300 via-transparent to-transparent dark:from-orange-500';
    if (group === 'SS') return 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-300 via-transparent to-transparent dark:from-amber-500';
    if (group === 'S') return 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-300 via-transparent to-transparent dark:from-purple-500';
    return '';
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.98);
}

.collapse-enter-active,
.collapse-leave-active {
    transition: all 0.3s ease-in-out;
    max-height: 800px;
}

.collapse-enter-from,
.collapse-leave-to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 20px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #334155;
}
</style>