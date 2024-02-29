// format.js
const { execSync } = require('child_process')

try {
  execSync('npx prettier --write .', { stdio: 'inherit' })
  console.log('Prettier formatting completed.')
} catch (error) {
  console.error('Error occurred during Prettier formatting:', error)
  process.exit(1)
}

/*adicionar o packsge.json do projeto
{
    "scripts": {
      "format": "node format.js"
    },
  }
rodar script: npm run format
 */
