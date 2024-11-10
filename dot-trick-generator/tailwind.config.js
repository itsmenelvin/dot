// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode via class
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        danger: 'var(--danger-color)',
        'button-hover-primary': 'var(--button-hover-primary)',
        'button-hover-secondary': 'var(--button-hover-secondary)',
        'button-hover-danger': 'var(--button-hover-danger)',
        'input-bg': 'var(--input-bg-color)',
        border: 'var(--border-color)',
        text: 'var(--text-color)',
        background: 'var(--background-color)',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'lg': '0.5rem',
      },
    },
  },
  plugins: [],
};
