module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx,jsx}',
    './components/**/*.{ts,tsx,jsx}',
    './src/**/*.{ts,tsx,jsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Montserrat', 'Lato', 'sans-serif'],
      },
      colors: {
        light: {
          background: '#F2F2F2',
          primaryButton: '#0597F2',
          secondaryButton: '#0C87F2',
          textPrimary: '#012340',
          textSecondary: '#262626',
          formFieldBackground: '#F2F2F2',
          formFieldBorder: '#012340',
          auxiliaryLink: '#0C87F2',
        },
        dark: {
          background: '#011826',
          primaryButton: '#0597F2',
          textPrimary: '#F2F2F2',
          formFieldBackground: '#011826',
          formFieldBorder: '#26221F',
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
  plugins: [],
}
