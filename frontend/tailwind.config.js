//Añadi los paths al archivo tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ['"JetBrains Mono Variable"', 'monospace'],
      },
    },
  },
  plugins: [],
}
