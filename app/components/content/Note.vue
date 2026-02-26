<!-- app/components/content/Note.vue -->
<template>
    <div
        class="my-6 px-5 py-4 bg-blue-50 border border-blue-100 border-l-4 border-l-blue-500 rounded-r-lg rounded-l-sm shadow-md relative overflow-hidden">
        <Icon name="ph:info-duotone" class="absolute -right-4 -top-4 text-6xl text-blue-500/10 pointer-events-none" />
        <div class="flex items-center gap-1.5 text-blue-700 font-bold text-xs tracking-widest mb-2 font-mono uppercase">
            <Icon name="ph:info-bold" class="text-sm" />
            Note
        </div>
        <div class="
      text-slate-700 text-sm leading-relaxed 
      [&>p]:my-0 [&>p]:leading-relaxed 
      [&_strong]:text-blue-900 
      [&_a]:text-blue-600 hover:[&_a]:text-blue-500 
      [&_code]:bg-blue-100/80 [&_code]:text-blue-800 [&_code]:border-blue-200
    ">
            <slot />
        </div>

    </div>
</template>