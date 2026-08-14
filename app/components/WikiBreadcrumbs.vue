<template>
  <nav aria-label="面包屑导航" class="min-w-0">
    <ol class="flex flex-wrap items-center gap-y-1 text-xs text-slate-500 dark:text-gray-500">
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`" class="flex min-w-0 items-center">
        <span
          v-if="index > 0"
          class="mx-2 shrink-0 text-slate-300 dark:text-gray-700"
          aria-hidden="true"
        >/</span>

        <NuxtLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="group inline-flex min-w-0 items-center gap-1.5 py-1 font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <Icon
            v-if="index === 0"
            name="ph:house-line-duotone"
            class="shrink-0 text-sm text-amber-600 dark:text-amber-500"
            aria-hidden="true"
          />
          <span class="break-words">{{ item.label }}</span>
        </NuxtLink>

        <span
          v-else
          :aria-current="index === items.length - 1 ? 'page' : undefined"
          class="min-w-0 break-words py-1 font-semibold text-slate-700 dark:text-gray-300"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { SeoBreadcrumbItem } from '~/utils/seo'

defineProps<{
  items: SeoBreadcrumbItem[]
}>()
</script>
