/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{vue,js,ts}", "./content/**/*.md"],
  theme: {
    extend: {},
  },
  // 挂载排版神器插件！
  plugins: [require("@tailwindcss/typography")],
};
