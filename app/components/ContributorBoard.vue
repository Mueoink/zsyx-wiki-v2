<!-- app/components/ContributorBoard.vue -->
<template>

    <div
        class="bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm transition-colors duration-300">


        <NuxtLink to="/contributors"
            class="bg-gradient-to-r from-amber-50 to-white dark:from-amber-900/40 dark:to-[#22222b] border-b border-amber-100 dark:border-amber-900/30 px-4 py-2.5 flex items-center justify-between group cursor-pointer hover:from-amber-100 dark:hover:from-amber-900/60 transition-colors">
            <div class="flex items-center gap-2">
                <Icon name="ph:medal-duotone"
                    class="text-amber-500 text-lg group-hover:scale-110 transition-transform" />
                <h3
                    class="font-bold text-slate-800 dark:text-gray-200 text-sm tracking-widest group-hover:text-amber-700 dark:group-hover:text-amber-100 transition-colors">
                    贡献人员</h3>
            </div>
            <Icon name="ph:caret-right-bold"
                class="text-gray-400 dark:text-gray-500 text-xs group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
        </NuxtLink>

        <div class="p-3 flex flex-col gap-2.5" v-if="displayMembers.length > 0">

            <div v-for="(member, index) in displayMembers" :key="member.name"
                class="flex items-center gap-3 bg-slate-50 dark:bg-[#22222b] border p-2 rounded-lg relative overflow-hidden transition-colors hover:bg-slate-100 dark:hover:bg-[#2a2a35]"
                :class="getBorderClass(member.role)">

   
                <div v-if="index < 2"
                    class="absolute right-0 top-0 text-5xl -translate-y-1 translate-x-1 font-serif italic"
                    :class="index === 0 ? 'text-amber-500/10' : 'text-red-500/10'">
                    {{ index + 1 }}
                </div>


                <div class="w-10 h-10 bg-slate-200 dark:bg-gray-800 shrink-0 rounded-full shadow-inner flex items-center justify-center overflow-hidden border-2"
                    :class="getAvatarBorder(member.role)">
                    <img :src="member.avatar" alt="avatar" class="w-full h-full object-cover" />
                </div>


                <div class="z-10 flex-1">
                    <div class="text-sm font-bold flex items-center gap-1.5 drop-shadow-sm"
                        :class="getNameColor(member.role)">
                        {{ member.name }}
                        <Icon v-if="member.role === 'creator'" name="ph:crown-fill" class="text-amber-500 text-xs" />
                        <Icon v-if="member.role === 'lead'" name="ph:star-fill" class="text-red-500 text-xs" />
                    </div>

                    <div class="flex flex-wrap gap-1 mt-0.5">
                        <div
                            class="text-[11px] text-slate-600 dark:text-gray-400 font-mono bg-slate-200/60 dark:bg-black/30 px-1.5 py-0.5 rounded-sm inline-block">
                            {{ member.title }}
                        </div>
                        <div
                            class="text-[11px] text-slate-600 dark:text-gray-400 font-mono bg-slate-200/60 dark:bg-black/30 px-1.5 py-0.5 rounded-sm inline-block">
                            贡献次数: {{ member.editCount }}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { useAsyncData } from '#imports'

const { data: allDocs } = await useAsyncData('all-docs-for-stats', () => {
    return queryCollection('content').all()
})

const editCounts = {}
if (allDocs.value) {
    allDocs.value.forEach(doc => {
        if (doc.authors && Array.isArray(doc.authors)) {
            doc.authors.forEach(name => {
                editCounts[name] = (editCounts[name] || 0) + 1
            })
        }
    })
}

const buildDisplayList = () => {
    const creator = teamMembers.find(m => m.role === 'creator')
    const lead = teamMembers.find(m => m.role === 'lead')

    const fixedList = [creator, lead].filter(Boolean).map(m => ({
        ...m,
        editCount: editCounts[m.name] || 0
    }))

    const fixedNames = fixedList.map(m => m.name)
    const others = teamMembers.filter(m => !fixedNames.includes(m.name))

    const topContributors = others
        .map(m => ({ ...m, editCount: editCounts[m.name] || 0 }))
        .sort((a, b) => b.editCount - a.editCount)
        .slice(0, 2)

    return [...fixedList, ...topContributors]
}

const displayMembers = buildDisplayList()

const getBorderClass = (role) => {
    if (role === 'creator') return 'border-amber-200 dark:border-amber-700/30'
    if (role === 'lead') return 'border-red-200 dark:border-red-700/30'
    return 'border-blue-200 dark:border-blue-700/30'
}
const getAvatarBorder = (role) => {
    if (role === 'creator') return 'border-amber-400 dark:border-amber-500'
    if (role === 'lead') return 'border-red-400 dark:border-red-500'
    return 'border-blue-400 dark:border-blue-500'
}
const getNameColor = (role) => {

    if (role === 'creator') return 'text-amber-600 dark:text-amber-400'
    if (role === 'lead') return 'text-red-600 dark:text-red-400'
    return 'text-blue-600 dark:text-blue-400'
}
</script>