<!-- app/pages/[...slug].vue -->
<template>
  <div class="max-w-[1000px] mx-auto px-4 py-10 xl:px-8">

    <div v-if="doc">
      <div v-if="doc.layoutType === 'hub'" class="-mx-4 md:-mx-10 xl:-mx-[200px]">
        <TemplateHub :doc="doc" :authors="validAuthors" />
      </div>
      <div v-else>
 
      <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-500 mb-6 font-mono transition-colors">
        <NuxtLink to="/" class="hover:text-amber-600 dark:hover:text-amber-500 transition">真实宇宙</NuxtLink>
        <Icon name="ph:caret-right-bold" class="text-slate-400 dark:text-gray-600" />

        <template v-if="doc.navType === 'community'">
          <span class="text-slate-600 dark:text-gray-400">社区项目</span>
        </template>
        <template v-else-if="doc.category">
          <NuxtLink :to="`/category/${doc.category}`"
            class="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            {{ doc.category }}
          </NuxtLink>
        </template>
        <template v-else>
          <span class="text-slate-600 dark:text-gray-400">未分类卷宗</span>
        </template>

        <Icon name="ph:caret-right-bold" class="text-slate-400 dark:text-gray-600" />
        <span class="text-slate-800 dark:text-gray-200 font-bold">{{ doc.title }}</span>
      </div>

      <article
        class="relative bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 p-6 md:p-10 rounded-xl shadow-md dark:shadow-lg transition-colors duration-300">

        <!-- ================= 2. 文章头部信息区 ================= -->
        <div class="mb-8 border-b border-slate-200 dark:border-gray-700/50 pb-6 transition-colors">

          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span v-if="doc.category"
              class="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[11px] rounded border border-indigo-200 dark:border-indigo-500/30 font-bold transition-colors">
              {{ doc.category }}
            </span>
            <span v-if="doc.navType === 'community'"
              class="px-2 py-0.5 bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] rounded border border-amber-200 dark:border-amber-500/30 font-bold transition-colors">
              社区专属
            </span>

            <span v-for="tag in doc.tags" :key="tag"
              class="px-2 py-0.5 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 text-[11px] rounded border border-slate-200 dark:border-gray-700 font-medium flex items-center gap-1 transition-colors">
              <Icon name="ph:hash-bold" class="text-slate-400 dark:text-gray-500" />
              {{ tag }}
            </span>
          </div>

          <h1
            class="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-gray-100 font-serif mb-4 drop-shadow-sm transition-colors">
            {{ doc.title || '未命名卷宗' }}
          </h1>

          <div
            class="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-gray-500 mt-6 transition-colors">
            <div class="flex items-center gap-1.5">
              <Icon name="ph:database-duotone" class="text-base text-slate-400 dark:text-gray-500" />
              收录于诸神愚戏 WIKI 数据库
            </div>

            <!-- ================= 3. 酷炫作者胶囊 ================= -->
            <div v-if="validAuthors.length > 0" class="flex items-center gap-2">
              <Icon name="ph:pen-nib-duotone" class="text-base text-slate-400 dark:text-gray-400" />
              <div class="flex flex-wrap gap-2.5">
                <div v-for="author in validAuthors" :key="author.name"
                  class="flex items-center gap-1.5 pr-3 pl-0.5 py-1 rounded-full border bg-slate-50 dark:bg-[#15151a] shadow-sm transition-colors"
                  :class="getAuthorTagClass(author.role)">

                  <img :src="author.avatar" alt="avatar"
                    class="w-6 h-6 rounded-full object-cover border border-slate-300 dark:border-black/50 transition-colors" />

                  <span class="font-bold tracking-wide flex items-center gap-1 text-[13px]">
                    {{ author.name }}
                    <Icon v-if="author.role === 'creator'" name="ph:crown-fill" class="text-amber-500 text-[11px]" />
                    <Icon v-if="author.role === 'lead'" name="ph:star-fill" class="text-red-500 text-[11px]" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div
          class="wiki-prose prose dark:prose-invert prose-indigo prose-img:rounded-xl prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-800 dark:prose-headings:text-gray-200 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500 dark:hover:prose-a:text-indigo-300 max-w-none transition-colors duration-300">
          <ContentRenderer :value="doc" />
        </div>

      </article>
    </div>
    </div>


    <div v-else class="flex flex-col items-center justify-center py-32">
      <div
        class="w-24 h-24 bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-full flex items-center justify-center mb-6 shadow-inner transition-colors">
        <Icon name="ph:ghost-duotone" class="text-5xl text-slate-400 dark:text-gray-600" />
      </div>
      <h1 class="text-2xl font-bold text-slate-700 dark:text-gray-300 mb-2 transition-colors">卷宗不存在或已迷失在切片宇宙中</h1>
      <p class="text-sm text-slate-500 dark:text-gray-500 mb-6 transition-colors">你访问的链接对应的 Markdown 文件似乎没有被创建。</p>
      <NuxtLink to="/"
        class="px-6 py-2 bg-white dark:bg-[#1a1a21] border border-slate-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-all rounded-full text-sm font-bold flex items-center gap-2 shadow-sm">
        <Icon name="ph:house-duotone" /> 返回真实宇宙
      </NuxtLink>
    </div>

  </div>
</template>

<script setup>
import { useRoute, useAsyncData, useSeoMeta } from '#imports'
import { computed } from 'vue'

const route = useRoute()

const { data: doc } = await useAsyncData(`page-${route.path}`, () =>
  queryCollection('content').path(route.path).first()
)

const validAuthors = computed(() => {
  if (!doc.value || !doc.value.authors || !Array.isArray(doc.value.authors)) return []
  return doc.value.authors.map(name => {
    return teamMembers.find(m => m.name === name)
  }).filter(Boolean)
})

const getAuthorTagClass = (role) => {

  if (role === 'creator') return 'border-amber-400 dark:border-amber-500/50 text-amber-600 dark:text-amber-400'
  if (role === 'lead') return 'border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-400'
  return 'border-blue-400 dark:border-blue-500/50 text-blue-700 dark:text-blue-400'
}

if (doc.value) {
  const parentName = doc.value.navType === 'community'
    ? '社区项目'
    : (doc.value.category || '未分类')

  useSeoMeta({
    title: `${doc.value.title} - ${parentName} - 诸神愚戏WIKI`,
    description: doc.value.description || '诸神愚戏 WIKI 设定集收录内容'
  })
}
</script>

<style scoped>


:deep(.wiki-prose h1 a),
:deep(.wiki-prose h2 a),
:deep(.wiki-prose h3 a),
:deep(.wiki-prose h4 a),
:deep(.wiki-prose h5 a),
:deep(.wiki-prose h6 a) {
  text-decoration: none !important;
  font-weight: 800 !important;
  color: inherit !important;
}


:deep(.wiki-prose :not(pre) > code) {
  background-color: #f1f5f9 !important;
  /* slate-100 */
  color: #4f46e5 !important;
  /* indigo-600 */
  padding: 3px 6px !important;
  border-radius: 6px !important;
  border: 1px solid #e2e8f0 !important;
  /* slate-200 */
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 0.85em !important;
  word-break: break-word !important;
  transition: all 0.3s ease;
}


:deep(html.dark .wiki-prose :not(pre) > code) {
  background-color: rgba(34, 34, 43, 0.8) !important;
  color: #818cf8 !important;

  border: 1px solid rgba(96, 111, 132, 0.5) !important;
}

:deep(.wiki-prose :not(pre) > code::before),
:deep(.wiki-prose :not(pre) > code::after) {
  content: none !important;
  display: none !important;
}


:deep(.wiki-prose hr) {
  border-color: #e2e8f0 !important;
  margin-top: 2em !important;
  margin-bottom: 2em !important;
  transition: border-color 0.3s ease;
}

:deep(html.dark .wiki-prose hr) {
  border-color: rgba(75, 85, 99, 0.4) !important;
}
</style>