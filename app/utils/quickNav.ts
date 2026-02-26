// app/utils/quickNav.ts
export const quickNavItems = [
  {
    id: "nav-1",
    title: "信仰测试",
    icon: "ph:scales-duotone",
    link: "/community/test",
    theme: "amber", // 颜色：amber, indigo, emerald, purple 等
    badge: {
      text: "HOT",
      color: "red", // 徽章颜色
    },
    // 是否为重要入口
    isImportant: true,
  },
  {
    id: "nav-2",
    title: "信仰职业表",
    icon: "ph:sword-duotone",
    link: "/classes",
    theme: "indigo",
    isImportant: true,
  },
  {
    id: "nav-3",
    title: "万象图鉴",
    icon: "ph:tree-structure-duotone",
    link: "/wiki/items-hub",
    theme: "emerald",
  },
  {
    id: "nav-4",
    title: "寰宇编年史",
    icon: "ph:hourglass-high-duotone",
    link: "/storyline",
    theme: "purple",
  },
];
