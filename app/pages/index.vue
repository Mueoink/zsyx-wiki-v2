<!-- app/pages/index.vue -->
<template>
    <div>
        <main class="max-w-[1400px] mx-auto px-4 xl:px-8 mt-6 flex flex-col lg:flex-row gap-6">
            <div class="flex-1 min-w-0 flex flex-col gap-6">

                <!-- 首页滚动大屏 -->
              <CarouselBanner />
                <!-- WIKI导航 -->
               <QuickNavMatrix />
               <!-- 数据雷达 -->
              <section class="mt-2 h-40 md:h-48">
                    <DatabaseRadar />
                </section>

            </div>

            <aside class="w-full lg:w-[320px] shrink-0 flex flex-col gap-6 self-start sticky top-24 pb-8">

                <!-- 更新日志 -->
               <UpdateLogBoard />
               <!-- 情报中心 -->
               <AnnouncementBoard />
               <!-- 贡献人员 -->
               <ContributorBoard />

            </aside>
        </main>
        <footer class="max-w-[1400px] mx-auto px-4 xl:px-8 mt-16 mb-8 relative z-10">
            <div class="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent w-full mb-8"></div>
            <div class="flex flex-col items-center justify-center gap-2 text-sm text-gray-500 text-center">

                <div class="flex items-center gap-1.5 justify-center tracking-widest">
                    <Icon name="ph:copyright-duotone" class="text-sm" />
                    2024-2026 诸神愚戏 WIKI
                </div>

                <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans" target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center gap-1.5 hover:text-amber-500 transition-colors group">
                    <span>基于</span>
                    <span
                        class="font-bold decoration-gray-700 group-hover:decoration-amber-500/50 transition-colors">
                        CC BY-NC-ND 4.0
                    </span>
                    <span>发布</span>
                </a>

            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { useAsyncData } from '#imports'


const { data: announcements } = await useAsyncData('home-announcements', () => {
    return queryCollection('content')
        .where('type', '=', 'announcement') // 只抓取公告
        .all()
})

const carouselContainer = ref(null)
const currentIndex = ref(0)
const totalSlides = 2

const nextSlide = () => {
    if (!carouselContainer.value) return
    currentIndex.value = (currentIndex.value + 1) % totalSlides
    const slideWidth = carouselContainer.value.clientWidth
    carouselContainer.value.scrollTo({
        left: currentIndex.value * slideWidth,
        behavior: 'smooth'
    })
}

const { pause: pauseCarousel, resume: resumeCarousel } = useIntervalFn(() => {
    nextSlide()
}, 4000)

onMounted(() => {
    if (carouselContainer.value) {
        carouselContainer.value.addEventListener('scroll', () => {
            const scrollLeft = carouselContainer.value.scrollLeft
            const slideWidth = carouselContainer.value.clientWidth
            currentIndex.value = Math.round(scrollLeft / slideWidth)
        })
    }
})

useSeoMeta({
    title: '诸神愚戏 WIKI - 神谕与谎言的档案馆',
    description: '全网最详尽的《诸神愚戏》世界观设定集。',
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>