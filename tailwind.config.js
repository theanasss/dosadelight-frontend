/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8ED',
        gold: '#D9A321',
        'gold-light': '#F0C84A',
        'gold-dark': '#B8861A',
        maroon: '#7B2D26',
        'maroon-dark': '#5A1F1A',
        'maroon-light': '#A03D35',
        green: '#3F7D3A',
        'green-dark': '#155D27',
        'green-light': '#5BA054',
        'leaf-dark': '#0F3E1A',
        leaf: '#155D27',
        'leaf-light': '#2E7D32',
        brown: '#3B2418',
        'brown-light': '#5C3A2A',
        'warm-white': '#FFFAF2',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D9A321 0%, #F0C84A 50%, #B8861A 100%)',
        'maroon-gradient': 'linear-gradient(135deg, #7B2D26 0%, #A03D35 50%, #5A1F1A 100%)',
        'hero-gradient': 'linear-gradient(135deg, #FFF8ED 0%, #FFF0D6 100%)',
        'dark-gradient': 'linear-gradient(135deg, #3B2418 0%, #5C3A2A 100%)',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'spin-reverse': 'spin-reverse 20s linear infinite',
        'spin-medium': 'spin 15s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
        'breathe': 'breathe 4s ease-in-out infinite',
        'steam': 'steam 3s ease-in-out infinite',
        'particle-float': 'particle-float 5s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.7s ease forwards',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.6' },
          '100%': { transform: 'translateY(-60px) scale(1.5)', opacity: '0' },
        },
        'particle-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: '0.8' },
          '50%': { transform: 'translateY(-15px) rotate(180deg)', opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'gold': '0 0 30px rgba(217, 163, 33, 0.3)',
        'gold-lg': '0 0 60px rgba(217, 163, 33, 0.4)',
        'maroon': '0 0 30px rgba(123, 45, 38, 0.3)',
        'card': '0 8px 32px rgba(59, 36, 24, 0.12)',
        'card-hover': '0 20px 60px rgba(59, 36, 24, 0.2)',
      },
    },
  },
  plugins: [],
}
