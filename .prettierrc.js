module.exports = {
  semi: false,
  singleQuote: true,
  printWidth: 80,
  trailingComma: 'all',
  jsxSingleQuote: false,
  tabWidth: 2,
  endOfLine: 'auto',
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
  overrides: [
    {
      files: '*.css',
      options: {
        singleQuote: true,
        tabWidth: 2,
      },
    },
    {
      files: '*.json',
      options: {
        tabWidth: 2,
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      options: {
        semi: false,
        singleQuote: true,
      },
    },
    {
      files: '*.js',
      options: {
        semi: false,
        singleQuote: true,
      },
    },
  ],
}
