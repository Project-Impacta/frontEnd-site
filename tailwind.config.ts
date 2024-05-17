import { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx,jsx}',
    './components/**/*.{ts,tsx,jsx}',
    './src/**/*.{ts,tsx,jsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
      fontFamily: {
        sans: ['Roboto', 'Montserrat', 'Lato', 'sans-serif'],
      },
      colors: {
        light: {
          backgroundColor: '#F2F2F2',
          primaryButton: '#0597F2',
          secondaryButton: '#0C87F2',
          textPrimary: '#012340',
          textSecondary: '#262626',
          formFieldBackground: '#F0F0F0',
          formFieldBorder: '#012340',
          auxiliaryLink: '#0C87F2',
          detailAccent: '#D0D0D0',
        },
        dark: {
          backgroundColor: '#011826',
          primaryButton: '#0597F8',
          secondaryButton: '#0C87F8',
          textPrimary: '#F2F2F2',
          textSecondary: '#f8f8ff',
          formFieldBackground: '#011826',
          formFieldBorder: '#F2F2F2',
          detailAccent: '#012340',
        },
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      textColor: ['visited'],
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
