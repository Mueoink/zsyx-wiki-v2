<!-- app/components/OcGenerator.vue -->
<template>
    <div class="max-w-[1000px] mx-auto py-8 text-slate-800 dark:text-gray-300 font-sans transition-colors duration-300">

        <div v-if="showImagePreviewModal" @click="showImagePreviewModal = false"
            class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
            <div @click.stop
                class="bg-white dark:bg-[#1a1a21] p-6 rounded-2xl max-w-2xl w-full flex flex-col gap-4 text-center border border-slate-200 dark:border-gray-700 shadow-2xl">
                <h3 class="text-xl font-bold text-slate-800 dark:text-white">卡片生成成功</h3>
                <div
                    class="overflow-y-auto max-h-[60vh] rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-[#15151a]">
                    <img :src="generatedImageUrl" alt="OC卡片" class="w-full h-auto object-contain !m-0 block" />
                </div>
                <p class="text-sm text-slate-500 dark:text-gray-400">请长按图片或右键保存到本地</p>
                <button @click="showImagePreviewModal = false"
                    class="mx-auto px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors">
                    关闭
                </button>
            </div>
        </div>

        <div class="flex flex-col gap-10 items-center w-full">
            <div
                class="w-full bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-sm transition-colors">
                <h2
                    class="text-2xl font-serif font-black mb-8 text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-gray-800 pb-4">
                    <Icon name="ph:user-circle-gear-duotone" class="text-indigo-500 text-3xl" /> 角色档案录入终端
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div class="space-y-6">
                        <div>
                            <label
                                class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-3">1.
                                基础识别</label>
                            <div class="space-y-4">
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-16 h-16 shrink-0 rounded-xl bg-slate-100 dark:bg-[#15151a] border border-slate-200 dark:border-gray-800 overflow-hidden relative group cursor-pointer">
                                        <img :src="displayAvatarSrc" @error="onImageError"
                                            class="w-full h-full object-cover !m-0 block" />
                                        <label
                                            class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <Icon name="ph:upload-simple-bold" class="text-white text-xl" />
                                            <input type="file" @change="handleAvatarUpload" accept="image/*"
                                                class="hidden">
                                        </label>
                                    </div>
                                    <div class="flex-1">
                                        <input v-model="oc.name" type="text" placeholder="输入OC代号/真名"
                                            class="oc-input text-lg font-bold">
                                    </div>
                                </div>
                                <div class="grid grid-cols-3 gap-3">
                                    <input v-model="oc.info.gender" placeholder="性别" class="oc-input">
                                    <input v-model="oc.info.age" type="number" placeholder="年龄" class="oc-input">
                                    <input v-model="oc.info.birthday" placeholder="生日" class="oc-input">
                                </div>
                                <div class="grid grid-cols-2 gap-3">
                                    <input v-model="oc.info.height" placeholder="身高 (如:185cm)" class="oc-input">
                                    <input v-model="oc.info.weight" placeholder="体重 (如:70kg)" class="oc-input">
                                </div>
                                <input v-model="oc.info.hobby" placeholder="爱好记录" class="oc-input">
                               
                                <textarea v-model="oc.info.history" placeholder="过往档案记录 (选填，例如：曾参与远暮镇弑神之战，并活到了最后...)"
                                    rows="2" class="oc-input resize-y"></textarea>
                            </div>
                        </div>

                        <div>
                            <label
                                class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-3">2.
                                信仰与排名</label>
                            <div class="space-y-3">
                                <div class="grid grid-cols-2 gap-3">
                                    <select v-model="oc.keyStats.faith" @change="handleFaithChange"
                                        class="oc-input font-bold text-indigo-700 dark:text-indigo-400">
                                        <option v-for="faith in faiths" :key="faith" :value="faith">【{{ faith }}】
                                        </option>
                                    </select>
                                    <select v-model="oc.keyStats.profession" class="oc-input">
                                        <option v-for="prof in availableProfessions" :key="prof.name"
                                            :value="prof.name">
                                            【{{ prof.type }}】{{ prof.name }}
                                        </option>
                                        <option v-if="availableProfessions.length === 0" value="无" disabled>暂无收录职业
                                        </option>
                                    </select>
                                </div>
                                <div class="grid grid-cols-2 gap-3">
                                    <div><label class="oc-label">登神之路</label><input
                                            v-model.number="oc.keyStats.ascensionPath" type="number" class="oc-input">
                                    </div>
                                    <div><label class="oc-label">觐见之梯</label><input
                                            v-model.number="oc.keyStats.stairway" type="number" class="oc-input"></div>
                                    <div><label class="oc-label">全球排名</label><input
                                            v-model.number="oc.keyStats.globalRank" type="number" class="oc-input">
                                    </div>
                                    <div><label class="oc-label">命途排名</label><input
                                            v-model.number="oc.keyStats.pathRank" type="number" class="oc-input"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div>
                            <label
                                class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-3 flex justify-between">
                                <span>3. 角色属性</span><span class="text-[10px] lowercase text-slate-400">Slider</span>
                            </label>
                            <div
                                class="space-y-4 bg-slate-50 dark:bg-[#15151a] p-4 rounded-xl border border-slate-200 dark:border-gray-800">
                                <div v-for="(stat, key) in { piety: '虔诚', morality: '道德' }" :key="key">
                                    <div class="flex justify-between text-xs mb-1 font-bold">
                                        <span class="text-slate-600 dark:text-gray-400">{{ stat }}</span>
                                        <span :class="oc.attributes[key] >= 0 ? 'text-indigo-500' : 'text-rose-500'">{{
                                            oc.attributes[key] }}</span>
                                    </div>
                                    <input v-model.number="oc.attributes[key]" type="range" min="-10" max="10" step="0.1"
                                        class="oc-range w-full">
                                </div>
                                <hr class="border-slate-200 dark:border-gray-700">
                                <div v-for="(stat, key) in { intelligence: '智力', constitution: '体质', charisma: '魅力', sanity: '理智', combatPower: '战力' }"
                                    :key="key">
                                    <div class="flex justify-between text-xs mb-1 font-bold">
                                        <span class="text-slate-600 dark:text-gray-400">{{ stat }}</span>
                                        <span :class="oc.attributes[key] >= 0 ? 'text-indigo-500' : 'text-rose-500'">{{
                                            oc.attributes[key] }}</span>
                                    </div>
                                    <input v-model.number="oc.attributes[key]" type="range" min="-10" max="10"
                                        step="0.1" class="oc-range w-full">
                                </div>
                            </div>
                        </div>

                       
                        <div>
                            <label
                                class="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-3">4.
                                天赋与奇物配置</label>
                            <div class="flex flex-col gap-2">
                                <select v-model="selectedItem" class="oc-input">
                                    <option value="" disabled>从官方数据库中检索...</option>
                                    <optgroup v-for="(items, group) in groupedItems" :key="group"
                                        :label="`[${group}阶] 收录记录`">
                                        <option v-for="item in items" :key="item.name" :value="item">
                                            [{{ item.type }}] {{ item.name }}
                                        </option>
                                    </optgroup>
                                </select>
                                <button @click="addItem" :disabled="!selectedItem"
                                    class="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-300 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    <Icon name="ph:plus-bold" /> 添加至卡片
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <button @click="generateImage" :disabled="isGenerating"
                class="w-[280px] py-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white rounded-full font-black text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center gap-2 active:scale-95">
                <Icon :name="isGenerating ? 'ph:spinner-gap-bold' : 'ph:camera-duotone'"
                    :class="isGenerating ? 'animate-spin' : ''" />
                {{ isGenerating ? '正在显影...' : '生成档案快照' }}
            </button>

            <div class="w-full max-w-[640px] flex justify-center pb-12">
                <div ref="previewCard" id="oc-preview-card"
                    class="w-full bg-[#fafafa] dark:bg-[#15151a] rounded-[24px] overflow-hidden relative shadow-2xl border border-slate-200 dark:border-gray-800 pb-8 text-slate-800 dark:text-gray-200 transition-colors">

                    <div
                        class="h-32 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden">
                        <div
                            class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.4),transparent)]">
                        </div>
                        <div
                            class="absolute bottom-2 right-4 text-white/20 font-serif font-black text-4xl tracking-widest italic select-none">
                            ARCHIVES</div>
                    </div>

                    <div class="px-6 md:px-8 -mt-16 relative z-10">

                
                        <div class="flex items-end gap-5 mb-8">
                            <div
                                class="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white dark:bg-[#1a1a21] p-1.5 shadow-xl shrink-0 border border-slate-200 dark:border-gray-700">
                                <img :src="displayAvatarSrc" @error="onImageError"
                                    class="w-full h-full object-cover rounded-xl !m-0 block" />
                            </div>
                            <div class="pb-1 min-w-0">
                     
                                <h1
                                    class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-2 tracking-wide truncate">
                                    {{ oc.name || '未命名实体' }}</h1>
                                <div class="flex flex-wrap items-center gap-2">
                                    <span
                                        class="px-3 py-1 bg-fuchsia-100 dark:bg-fuchsia-500/20 text-fuchsia-700 dark:text-fuchsia-400 border border-fuchsia-200 dark:border-fuchsia-500/30 rounded-lg text-xs font-bold tracking-widest flex items-center whitespace-nowrap shrink-0 leading-none">
                                        【{{ oc.keyStats.faith || '无信者' }}】
                                    </span>
                                    <span
                                        class="px-3 py-1 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 rounded-lg text-xs font-bold flex items-center whitespace-nowrap shrink-0 leading-none">
                                        {{ oc.keyStats.profession || '平民' }}
                                    </span>
                                </div>
                            </div>
                        </div>

                    
                        <div class="grid grid-cols-4 gap-2 md:gap-3 mb-8">
                            <div
                                class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-800 rounded-xl p-2 md:p-3 text-center shadow-sm">
                                <div
                                    class="text-[9px] md:text-[10px] text-slate-500 dark:text-gray-400 font-bold mb-1 whitespace-nowrap">
                                    登神之路</div>
                                <div class="text-lg md:text-xl font-black font-mono text-slate-800 dark:text-gray-200">
                                    {{ oc.keyStats.ascensionPath }}</div>
                            </div>
                            <div
                                class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-800 rounded-xl p-2 md:p-3 text-center shadow-sm">
                                <div
                                    class="text-[9px] md:text-[10px] text-slate-500 dark:text-gray-400 font-bold mb-1 whitespace-nowrap">
                                    觐见之梯</div>
                                <div class="text-lg md:text-xl font-black font-mono text-slate-800 dark:text-gray-200">
                                    {{ oc.keyStats.stairway }}</div>
                            </div>
                            <div
                                class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-800 rounded-xl p-2 md:p-3 text-center shadow-sm">
                                <div
                                    class="text-[9px] md:text-[10px] text-slate-500 dark:text-gray-400 font-bold mb-1 whitespace-nowrap">
                                    全球排名</div>
                                <div class="text-lg md:text-xl font-black font-mono text-amber-600 dark:text-amber-500">
                                    {{ oc.keyStats.globalRank }}</div>
                            </div>
                            <div
                                class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-800 rounded-xl p-2 md:p-3 text-center shadow-sm">
                                <div
                                    class="text-[9px] md:text-[10px] text-slate-500 dark:text-gray-400 font-bold mb-1 whitespace-nowrap">
                                    命途排名</div>
                                <div
                                    class="text-lg md:text-xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                                    {{ oc.keyStats.pathRank }}</div>
                            </div>
                        </div>

                      
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">

                            <div
                                class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-800 rounded-xl p-4 md:p-5 shadow-sm">
                                <h3
                                    class="text-sm font-bold border-b border-slate-100 dark:border-gray-800 pb-2 mb-3 flex items-center gap-2 text-slate-700 dark:text-gray-300">
                                    <Icon name="ph:identification-card-duotone" class="text-lg" /> 生物学特征
                                </h3>
                                <div class="space-y-2 text-sm">
                                    <div class="flex justify-between"><span
                                            class="text-slate-500 dark:text-gray-500">生理性别</span><span
                                            class="font-bold">{{ oc.info.gender }}</span></div>
                                    <div class="flex justify-between"><span
                                            class="text-slate-500 dark:text-gray-500">骨龄评估</span><span
                                            class="font-bold">{{ oc.info.age }} 岁</span></div>
                                    <div class="flex justify-between"><span
                                            class="text-slate-500 dark:text-gray-500">身高/体重</span><span
                                            class="font-bold">{{ oc.info.height }} / {{ oc.info.weight }}</span></div>
                                    <div class="flex justify-between"><span
                                            class="text-slate-500 dark:text-gray-500">生日</span><span
                                            class="font-bold">{{ oc.info.birthday }}</span></div>
                                    <div
                                        class="pt-2 mt-2 border-t border-slate-100 dark:border-gray-800 flex flex-col gap-1.5">
                                        <span class="text-slate-500 dark:text-gray-500 text-[11px]">爱好：</span>
                                        <span
                                            class="font-bold text-[13px] bg-slate-50 dark:bg-[#15151a] p-2 rounded-md border border-slate-100 dark:border-gray-800">{{
                                            oc.info.hobby || '无显著特征' }}</span>
                                    </div>
                                    
                                </div>
                            </div>

                            <div
                                class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-800 rounded-xl p-4 md:p-5 shadow-sm">
                                <h3
                                    class="text-sm font-bold border-b border-slate-100 dark:border-gray-800 pb-2 mb-3 flex items-center gap-2 text-slate-700 dark:text-gray-300">
                                    <Icon name="ph:chart-polar-duotone" class="text-lg" /> 内在刻度分析
                                </h3>
                                <div class="space-y-3">
                                    <div v-for="(statConfig, key) in attributeConfigs" :key="key"
                                        class="flex items-center gap-3 text-xs">
                                        <span
                                            class="w-8 text-right font-bold text-slate-600 dark:text-gray-400 shrink-0">{{
                                            statConfig.name }}</span>
                                        <div
                                            class="flex-1 h-2 bg-slate-100 dark:bg-gray-800 rounded-full relative overflow-hidden flex items-center shrink-0">
                                            <div
                                                class="absolute left-1/2 w-[1px] h-full bg-slate-300 dark:bg-gray-600 z-10 -translate-x-1/2">
                                            </div>
                                            <div class="absolute h-full rounded-full transition-all duration-300"
                                                :style="getCenteredBarStyle(oc.attributes[key], statConfig.max)"
                                                :class="oc.attributes[key] >= 0 ? 'bg-indigo-500' : 'bg-rose-500'">
                                            </div>
                                        </div>
                                        <span class="w-8 font-mono text-right shrink-0"
                                            :class="oc.attributes[key] >= 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-rose-600 dark:text-rose-400'">
                                            {{ oc.attributes[key] }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="oc.info.history && oc.info.history.trim() !== ''"
                            class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-800 rounded-xl p-4 md:p-5 shadow-sm mb-8">
                            <h3
                                class="text-sm font-bold border-b border-slate-100 dark:border-gray-800 pb-2 mb-3 flex items-center gap-2 text-slate-700 dark:text-gray-300">
                                <Icon name="ph:scroll-duotone" class="text-lg" /> 过往档案简述
                            </h3>
                            <p
                                class="text-xs md:text-[13px] text-slate-600 dark:text-gray-400 leading-relaxed whitespace-pre-line italic font-serif">
                                "{{ oc.info.history }}"
                            </p>
                        </div>


            
                        <div
                            class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-800 rounded-xl p-4 md:p-5 shadow-sm">
                            <h3
                                class="text-sm font-bold border-b border-slate-100 dark:border-gray-800 pb-2 mb-4 flex items-center gap-2 text-slate-700 dark:text-gray-300">
                                <Icon name="ph:backpack-duotone" class="text-lg" /> 天赋与道具配置
                            </h3>

                            <div v-if="oc.backpack.length === 0"
                                class="text-center py-6 text-slate-400 dark:text-gray-600 text-sm italic border-2 border-dashed border-slate-200 dark:border-gray-700 rounded-xl">
                                暂无记录数据...
                            </div>

                            <div v-else>

                                <div class="grid gap-3 mb-3">
                                    <div v-for="item in topItems" :key="item.id"
                                        class="group relative bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-gray-800 rounded-lg p-3 flex gap-3 transition-all items-start">

                                        <button @click="removeItem(item.id)"
                                            class="screenshot-ignore absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                                            <Icon name="ph:x-bold" />
                                        </button>

                                        <div class="shrink-0 pt-0.5 flex flex-col items-center gap-1">
                                            <span
                                                class="px-2 py-0.5 rounded text-[10px] font-black font-mono shadow-sm flex items-center justify-center leading-none"
                                                :class="getRarityColorClass(item.group)">
                                                {{ item.level }}
                                            </span>
                                            <span class="text-[9px] text-slate-400 font-bold whitespace-nowrap">{{
                                                item.type }}</span>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div
                                                class="font-bold text-[13px] text-slate-800 dark:text-gray-200 mb-1 leading-tight">
                                                {{ item.name }}</div>
                                            <p
                                                class="text-[11px] text-slate-500 dark:text-gray-500 line-clamp-2 leading-relaxed">
                                                {{ item.desc }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="restItems.length > 0"
                                    class="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-gray-800">
                                    <div v-for="item in restItems" :key="item.id"
                                        class="group relative inline-flex items-center gap-1.5 bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700 rounded-full px-2 py-1 shadow-sm">
                                        <button @click="removeItem(item.id)"
                                            class="screenshot-ignore absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10">
                                            <Icon name="ph:x-bold" class="text-[8px]" />
                                        </button>
                                        <span
                                            class="px-1.5 py-[2px] rounded-full text-[9px] font-black font-mono flex items-center justify-center leading-none"
                                            :class="getRarityColorClass(item.group)">
                                            {{ item.level }}
                                        </span>
                                        <span class="text-[11px] font-bold text-slate-700 dark:text-gray-300 pr-1">{{
                                            item.name }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            class="mt-8 pt-4 border-t border-slate-100/50 dark:border-gray-800/50 text-center flex flex-col items-center justify-center opacity-40 select-none">
                            <Icon name="ph:fingerprint-duotone" class="text-2xl text-slate-400 mb-1" />
                            <div class="text-[10px] font-mono text-slate-700 tracking-wider">诸神愚戏 WIKI 档案馆认证</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

import { faithClasses } from '~/utils/classes'
import { allItems } from '~/utils/items'

const parseLevel = (level) => {
    const lv = level.toUpperCase();
    if (lv.includes("SSSS") || lv.includes("SSS'S")) return { weight: 70, group: "SSS+" };
    if (lv.includes("SSS")) return { weight: 60, group: "SSS" };
    if (lv.includes("SS")) return { weight: 50, group: "SS" };
    if (lv.includes("S")) return { weight: 40, group: "S" };
    if (lv.includes("A")) return { weight: 30, group: "A" };
    if (lv.includes("B")) return { weight: 20, group: "B" };
    if (lv.includes("C")) return { weight: 10, group: "C" };
    return { weight: 0, group: "UNKNOWN" };
};

const faiths = faithClasses.map(f => f.faith);

const oc = reactive({
    name: '百灵',
    avatarUrl: '/avatar.png',
    avatarFile: null,
    info: { height: '162cm', weight: '45kg', gender: '女', age: 19, birthday: '保密', hobby: '收集未知图谱',history: '' },
    keyStats: { faith: faiths[0] || '诞育', profession: '', ascensionPath: 10, stairway: 1, globalRank: 999, pathRank: 99 },
    attributes: { piety: 0.2, morality: -0.1, intelligence: 7.5, constitution: 3.5, charisma: 8.5, sanity: 4.5, combatPower: 6.0 },
    backpack: [],
});

const availableProfessions = computed(() => {
    const selectedFaithObj = faithClasses.find(f => f.faith === oc.keyStats.faith);
    if (!selectedFaithObj) return [];
    return selectedFaithObj.careers.filter(c => c.name && c.name.trim() !== "");
});

const handleFaithChange = () => {
    if (availableProfessions.value.length > 0) {
        oc.keyStats.profession = availableProfessions.value[0].name;
    } else {
        oc.keyStats.profession = '';
    }
}
handleFaithChange();



const avatarPreviewUrl = ref(null);
const displayAvatarSrc = computed(() => avatarPreviewUrl.value || oc.avatarUrl);

const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (avatarPreviewUrl.value) URL.revokeObjectURL(avatarPreviewUrl.value);
    oc.avatarFile = file;
    avatarPreviewUrl.value = URL.createObjectURL(file);
};

const onImageError = (event) => {
    event.target.src = 'https://api.dicebear.com/7.x/shapes/svg?seed=fallback';
};


const attributeConfigs = {
    piety: { name: '虔诚', max: 1 },
    morality: { name: '道德', max: 1 },
    intelligence: { name: '智力', max: 10 },
    constitution: { name: '体质', max: 10 },
    charisma: { name: '魅力', max: 10 },
    sanity: { name: '理智', max: 10 },
    combatPower: { name: '战力', max: 10 },
}

const getCenteredBarStyle = (value, maxLimit) => {
    const percentage = Math.abs(value) / maxLimit * 50;
    if (value >= 0) {
        return { left: '50%', width: `${percentage}%` };
    } else {
        return { right: '50%', width: `${percentage}%` };
    }
}


const groupedItems = computed(() => {
    const groups = {};
    allItems.forEach(item => {
        const parsed = parseLevel(item.level);
        if (!groups[parsed.group]) groups[parsed.group] = [];

        groups[parsed.group].push({ ...item, weight: parsed.weight, group: parsed.group });
    });
    return groups;
});

const selectedItem = ref('');

const addItem = () => {
    if (!selectedItem.value) return;


    const effectText = selectedItem.value.effects && selectedItem.value.effects.length > 0
        ? selectedItem.value.effects[0].replace('特殊效果', '')
        : (selectedItem.value.desc || '缺乏记录的神秘存在。');

    oc.backpack.push({
        id: Date.now(),
        name: selectedItem.value.name,
        type: selectedItem.value.type || '未知', 
        level: selectedItem.value.level,
        group: selectedItem.value.group,
        weight: selectedItem.value.weight,
        desc: effectText
    });
    selectedItem.value = '';
}

const removeItem = (id) => {
    oc.backpack = oc.backpack.filter(item => item.id !== id);
}


const sortedBackpack = computed(() => {
    return [...oc.backpack].sort((a, b) => b.weight - a.weight);
})

// 分割逻辑
const topItems = computed(() => sortedBackpack.value.slice(0, 3));
const restItems = computed(() => sortedBackpack.value.slice(3));

const getRarityColorClass = (group) => {
    if (group === 'SSS+') return 'bg-amber-100 text-amber-700 border-amber-300';
    if (group === 'SSS') return 'bg-amber-50 text-amber-600 border-amber-200';
    if (group === 'SS') return 'bg-purple-100 text-purple-700 border-purple-300';
    if (group === 'S') return 'bg-indigo-100 text-indigo-700 border-indigo-300';
    return 'bg-slate-200 text-slate-700 border-slate-300';
}


const previewCard = ref(null);
const isGenerating = ref(false);
const showImagePreviewModal = ref(false);
const generatedImageUrl = ref('');

const generateImage = async () => {
    if (!previewCard.value || isGenerating.value) return;
    isGenerating.value = true;

    try {
        const htmlToImage = await import('html-to-image');

        const dataUrl = await htmlToImage.toPng(previewCard.value, {
            quality: 1,
            pixelRatio: 2,
            filter: (node) => {
                if (node.classList && node.classList.contains('screenshot-ignore')) {
                    return false;
                }
                return true;
            }
        });

        generatedImageUrl.value = dataUrl;
        showImagePreviewModal.value = true;

    } catch (error) {
        console.error('图片生成失败:', error);
        alert('档案截取失败，可能是由于网络图片加载导致的跨域问题。');
    } finally {
        isGenerating.value = false;
    }
}
</script>

<style scoped>
.oc-input {
    @apply w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-gray-800 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all;
}

.oc-label {
    @apply block text-[10px] text-slate-500 dark:text-gray-500 mb-1 font-bold;
}

.oc-range {
    @apply accent-indigo-500 dark:accent-indigo-400 cursor-pointer bg-slate-200 dark:bg-gray-800 rounded-full h-1.5 appearance-none;
}

.oc-range::-webkit-slider-thumb {
    @apply appearance-none w-3.5 h-3.5 bg-white border-2 border-indigo-500 rounded-full shadow-sm;
}
</style>