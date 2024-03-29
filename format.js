// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process')

try {
  execSync(
    'npx prettier --write . && next lint && tsc --project tsconfig.json',
    { stdio: 'inherit' },
  )
  console.log('Prettier formatting completed.')
} catch (error) {
  console.error('Error occurred during Prettier formatting:', error)
  process.exit(1)
}

/*adicionar o package.json do projeto
{
    "scripts": {
      "format": "node format.js"
    },
  }
rodar script: npm run format
 */
