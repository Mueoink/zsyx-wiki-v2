<!-- app/components/CarouselBanner.vue -->
<template>
    <section
        class="relative bg-white dark:bg-[#1a1a21] border border-slate-200 dark:border-gray-700/50 p-1.5 rounded-xl shadow-lg shadow-slate-200/50 dark:shadow-black/20 transition-colors duration-300">

        <div ref="carouselContainer"
            class="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-2 rounded-lg scroll-smooth"
            @mouseenter="pauseCarousel" @mouseleave="resumeCarousel">

            <NuxtLink v-for="(slide, index) in carouselSlides" :key="slide.id" :to="slide.link"
                class="snap-center shrink-0 w-full md:w-[85%] lg:w-[100%] xl:w-[800px] h-[220px] md:h-[320px] relative group cursor-pointer bg-slate-800 dark:bg-gray-900 overflow-hidden rounded-lg block">

                <div v-if="slide.image"
                    class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    :style="{ backgroundImage: `url(${slide.image})` }">
                </div>
                <div v-else
                    class="absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105"
                    :class="slide.gradient">
                </div>


                <div
                    class="absolute inset-y-0 left-0 w-full md:w-3/4 bg-gradient-to-r from-white/95 via-white/60 dark:from-[#15151a]/95 dark:via-[#15151a]/60 to-transparent p-6 md:p-10 flex flex-col justify-end transition-colors duration-300">

                    <div class="flex items-center gap-2 mb-3 relative z-10">
                        <span class="px-2 py-0.5 text-white text-[10px] font-bold tracking-wider rounded shadow-sm"
                            :class="getTagColorClass(slide.tagColor)">
                            {{ slide.tag }}
                        </span>

                        <span class="text-xs text-indigo-600 dark:text-indigo-300 font-mono font-bold drop-shadow-sm"
                            v-if="slide.version">
                            {{ slide.version }}
                        </span>
                    </div>

                    <h2
                        class="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 font-serif tracking-wide drop-shadow-md transition-colors duration-300 relative z-10 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                        {{ slide.title }}
                    </h2>

                    <p
                        class="text-sm text-slate-700 dark:text-gray-300 line-clamp-2 md:line-clamp-3 leading-relaxed max-w-lg transition-colors duration-300 font-medium drop-shadow-sm relative z-10">
                        {{ slide.description }}
                    </p>

                    <div
                        class="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-500 dark:text-indigo-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <span>点击查看</span>
                        <Icon name="ph:arrow-right-bold" />
                    </div>
                </div>
            </NuxtLink>

        </div>

        <div class="absolute bottom-4 right-4 flex gap-1.5 z-10 pointer-events-none">
            <div v-for="(slide, index) in carouselSlides" :key="`dot-${index}`"
                class="w-4 h-1 rounded-full transition-colors"
                :class="currentIndex === index ? getDotColorClass(slide.tagColor) : 'bg-slate-300/80 dark:bg-white/20 backdrop-blur-sm'">
            </div>
        </div>

    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntervalFn } from '@vueuse/core'


const carouselContainer = ref(null)
const currentIndex = ref(0)
const totalSlides = carouselSlides.length

const nextSlide = () => {
    if (!carouselContainer.value || totalSlides <= 1) return
    currentIndex.value = (currentIndex.value + 1) % totalSlides
    const slideWidth = carouselContainer.value.clientWidth
    carouselContainer.value.scrollTo({
        left: currentIndex.value * slideWidth,
        behavior: 'smooth'
    })
}


const { pause: pauseCarousel, resume: resumeCarousel } = useIntervalFn(() => {
    nextSlide()
}, 3500)

onMounted(() => {
    if (carouselContainer.value) {
        carouselContainer.value.addEventListener('scroll', () => {
            const scrollLeft = carouselContainer.value.scrollLeft
            const slideWidth = carouselContainer.value.clientWidth
            currentIndex.value = Math.round(scrollLeft / slideWidth)
        })
    }
})

const getTagColorClass = (color) => {
    const colors = {
        indigo: 'bg-indigo-600',
        amber: 'bg-amber-500 text-black',
        emerald: 'bg-emerald-600',
        red: 'bg-red-600'
    }
    return colors[color] || 'bg-gray-600'
}

const getDotColorClass = (color) => {
    const colors = {
        indigo: 'bg-indigo-500',
        amber: 'bg-amber-500',
        emerald: 'bg-emerald-500',
        red: 'bg-red-500'
    }
    return colors[color] || 'bg-gray-400'
}
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