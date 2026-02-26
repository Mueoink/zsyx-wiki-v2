<!-- app/components/QuickNavMatrix.vue -->
<template>
    <section class="grid grid-cols-2 md:grid-cols-4 gap-3">

        <NuxtLink v-for="item in quickNavItems" :key="item.id" :to="item.link"
            class="relative group bg-white dark:bg-[#1a1a21] border transition-colors p-4 flex flex-col items-center justify-center gap-3 rounded-xl shadow-sm hover:shadow-md dark:shadow-none overflow-hidden duration-300"
            :class="getCardBorderClass(item.theme, item.isImportant)">


            <div v-if="item.isImportant" class="absolute left-0 top-0 bottom-0 w-1.5 transition-shadow duration-300"
                :class="getImportantGlowClass(item.theme)"></div>

            <span v-if="item.badge"
                class="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-sm z-10"
                :class="getBadgeClass(item.badge.color)">
                {{ item.badge.text }}
            </span>

            <Icon :name="item.icon"
                class="text-4xl group-hover:-translate-y-1 transition-all duration-300 drop-shadow-sm dark:drop-shadow-lg"
                :class="getIconColorClass(item.theme, item.isImportant)" />

            <h3 class="font-bold text-sm md:text-base tracking-widest transition-colors duration-300"
                :class="getTextColorClass(item.theme, item.isImportant)">
                {{ item.title }}
            </h3>

        </NuxtLink>

    </section>
</template>

<script setup>
const getCardBorderClass = (theme, isImportant) => {
    if (isImportant) {

        const colors = {
            amber: 'border-amber-200 dark:border-amber-900/50 hover:border-amber-400 dark:hover:border-amber-500',
            indigo: 'border-indigo-200 dark:border-indigo-900/50 hover:border-indigo-400 dark:hover:border-indigo-500',
        }
        return colors[theme] || 'border-gray-200 dark:border-gray-700/50'
    }

    const hovers = {
        amber: 'border-slate-200 dark:border-gray-700/50 hover:border-amber-400 dark:hover:border-amber-500',
        indigo: 'border-slate-200 dark:border-gray-700/50 hover:border-indigo-400 dark:hover:border-indigo-500',
        emerald: 'border-slate-200 dark:border-gray-700/50 hover:border-emerald-400 dark:hover:border-emerald-500',
        purple: 'border-slate-200 dark:border-gray-700/50 hover:border-purple-400 dark:hover:border-purple-500',
    }
    return hovers[theme] || 'border-slate-200 dark:border-gray-700/50'
}


const getImportantGlowClass = (theme) => {
    const glows = {
        amber: 'bg-gradient-to-b from-amber-400 to-orange-500 group-hover:shadow-[0_0_15px_#d97706]',
        indigo: 'bg-gradient-to-b from-indigo-400 to-blue-500 group-hover:shadow-[0_0_15px_#6366f1]'
    }
    return glows[theme] || 'bg-gray-500'
}


const getIconColorClass = (theme, isImportant) => {
    if (isImportant) {
        const colors = {
            amber: 'text-amber-500',
            indigo: 'text-indigo-500'
        }
        return colors[theme] || 'text-gray-500'
    }
    const hovers = {
        amber: 'text-slate-400 dark:text-gray-400 group-hover:text-amber-500',
        indigo: 'text-slate-400 dark:text-gray-400 group-hover:text-indigo-500',
        emerald: 'text-slate-400 dark:text-gray-400 group-hover:text-emerald-500',
        purple: 'text-slate-400 dark:text-gray-400 group-hover:text-purple-500',
    }
    return hovers[theme] || 'text-gray-400'
}


const getTextColorClass = (theme, isImportant) => {
    if (isImportant) {
        return 'text-slate-800 dark:text-gray-200'
    }
    const hovers = {
        amber: 'text-slate-600 dark:text-gray-400 group-hover:text-slate-800 dark:group-hover:text-gray-200',
        indigo: 'text-slate-600 dark:text-gray-400 group-hover:text-slate-800 dark:group-hover:text-gray-200',
        emerald: 'text-slate-600 dark:text-gray-400 group-hover:text-slate-800 dark:group-hover:text-gray-200',
        purple: 'text-slate-600 dark:text-gray-400 group-hover:text-slate-800 dark:group-hover:text-gray-200',
    }
    return hovers[theme] || 'text-gray-400'
}


const getBadgeClass = (color) => {
    const badges = {
        red: 'bg-red-500 text-white',
        blue: 'bg-blue-500 text-white',
        green: 'bg-emerald-500 text-white'
    }
    return badges[color] || 'bg-gray-500 text-white'
}
</script>