// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: { 'half-minus-2rem': 'calc(50% - 2rem)' },
      fontFamily: {
        sans:  ['var(--font-rye)', 'Arial', 'sans-serif'],
        title: ['var(--font-rye)', 'Cormorant Garamond', 'serif'],
      },
      colors: {
        nautical: "#25394B",
        antique:  "#F2E3C0", // This existing color will be used for text brightening on hover
        blush:    "#C68CAF", // Your current text color
        'blush-darker': '#B07B9E', // 
        'antique-medium': '#E0D0AB', // 
      },
      boxShadow: {
        lg: '0 10px 15px -3px rgba(10,46,66,0.1), 0 4px 6px -2px rgba(10,46,66,0.05)',
        xl: '0 20px 25px -5px rgba(10,46,66,0.1), 0 10px 10px -5px rgba(10,46,66,0.04)',
      },
      transitionProperty: {
        shadow: 'box-shadow',
      },
      backgroundImage: {
        grain:   "url('/images/sand-background.jpeg')",
        backgroundImage: "url('/images/vector-background.jpeg')",
      },
      // --- NEW: Define custom text shadows using existing colors or neutral white ---
      textShadow: {
        'default': '2px 2px 0 rgba(0,0,0,0.4)', // Your existing "cut-out" text shadow
        // Subtle glow using a neutral white (rgba(255,255,255,...)) to provide a light source effect
        'subtle-glow': '0 0 8px rgba(255,255,255,0.6), 0 0 15px rgba(255,255,255,0.4)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addUtilities, theme }) {
      // Add custom utilities for text-shadow, ensuring hover variants are enabled
      const newTextShadows = {
        '.text-shadow-default': {
          textShadow: theme('textShadow.default'),
        },
        '.text-shadow-subtle-glow': {
          textShadow: theme('textShadow.subtle-glow'),
        },
      };
      addUtilities(newTextShadows, ['responsive', 'hover']);
    }
  ],
}