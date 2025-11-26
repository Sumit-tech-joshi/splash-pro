module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', md: '2rem' },
    },
    extend: {
      colors: {
        primary: '#2b4b5e',
        accent: '#004ea0',
        muted: '#f5f5f5',
        dark: '#1f2937',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.06)',
        lift: '0 12px 24px rgba(0,0,0,0.10)'
      },
      borderRadius: { '2xl': '1rem' }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};