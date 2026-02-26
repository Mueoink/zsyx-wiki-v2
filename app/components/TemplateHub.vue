<!-- app/components/TemplateHub.vue -->
<template>
    <div class="max-w-[1400px] mx-auto px-4 py-8 xl:px-8 min-h-[80vh]">

        <div class="mb-10 text-center relative flex flex-col items-center">
            <Icon name="ph:hexagon-duotone"
                class="absolute left-1/2 -top-10 -translate-x-1/2 text-[150px] text-indigo-500/5 dark:text-indigo-500/10 pointer-events-none transition-colors" />

            <div
                class="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-mono font-bold rounded-full mb-4 z-10 transition-colors">
                <Icon name="ph:books-duotone" /> {{ doc.category || '核心枢纽' }}
            </div>

            <h1
                class="text-4xl md:text-5xl font-black text-slate-800 dark:text-white font-serif mb-4 tracking-widest z-10 drop-shadow-md transition-colors">
                {{ doc.title }}
            </h1>

            <p
                class="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed mb-6 z-10 transition-colors">
                {{ doc.description }}
            </p>

           
            <div v-if="authors && authors.length > 0"
                class="flex flex-wrap justify-center items-center gap-4 text-sm text-slate-600 dark:text-gray-500 z-10 bg-white/80 dark:bg-[#1a1a21]/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-slate-200 dark:border-gray-700/50 shadow-sm transition-colors">
                <div class="flex items-center gap-1.5">
                    <Icon name="ph:database-duotone" class="text-base text-slate-500 dark:text-gray-400" />
                    此大厅由以下贡献者合力构建
                </div>
                <div class="flex items-center gap-2">
                    <Icon name="ph:pen-nib-duotone" class="text-base text-slate-400 dark:text-gray-400" />
                    <div class="flex flex-wrap justify-center gap-2">
                        <div v-for="author in authors" :key="author.name"
                            class="flex items-center gap-1.5 pr-2 pl-0.5 py-0.5 rounded-full border bg-slate-50 dark:bg-[#15151a] shadow-sm transition-transform hover:-translate-y-0.5"
                            :class="getAuthorTagClass(author.role)">
                            <img :src="author.avatar" alt="avatar"
                                class="w-5 h-5 rounded-full object-cover border border-slate-300 dark:border-black/50" />
                            <span class="font-bold tracking-wide text-xs">{{ author.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

       
        <div class="relative z-10 transition-colors duration-300">
            <ContentRenderer :value="doc" />
        </div>

    </div>
</template>

<script setup>

const props = defineProps({
    doc: { type: Object, required: true },
    authors: { type: Array, default: () => [] }
})


const getAuthorTagClass = (role) => {
    if (role === 'creator') return 'border-amber-200 dark:border-amber-500/50 text-amber-600 dark:text-amber-400'
    if (role === 'lead') return 'border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-400'
    return 'border-blue-200 dark:border-blue-500/50 text-blue-600 dark:text-blue-400'
}
</script>