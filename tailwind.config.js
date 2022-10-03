/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      animation: {
        'spin-ease-in-out': 'spin 1s ease-in-out infinite',
        longBounce: 'longBounce 1s ease-in-out infinite',
        blink: 'blink 1.1s steps(1,end) infinite'
      },
      backgroundSize: {
        'size-200': '200% 200%'
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%'
      },
      keyframes: {
        longBounce: {
          '0%, 100%': {
            transform: 'translateY(-100%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)'
          }
        },
        blink: {
          '0%, 100%': {
            opacity: 1
          },
          '50%': {
            opacity: 0
          }
        }
      },
      rotate: {
        360: '360deg'
      },
      screens: {
        betterhover: { raw: '(hover: hover)' }
      }
    }
  },
  plugins: [],
  darkMode: 'class'
};
