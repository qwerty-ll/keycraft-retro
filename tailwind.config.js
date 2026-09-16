/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#EBE5D8',
          300: '#DFD7C5',
        },
        vintage: {
          surface: '#F7F4EE',
          card: '#FFFFFF',
          border: '#E2DBD0',
          dark: '#262320',
          muted: '#6B645C',
          accent: '#C2622D', // Тёплый янтарный
          accentHover: '#A85122',
          accentLight: '#FBF0E9',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        retro: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'clean': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'clean-hover': '0 8px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
