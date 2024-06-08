# Usar a imagem Node 20.11.1 como base
FROM node:20.11.1 AS base

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de dependências e instalar as dependências
COPY package.json package-lock.json* ./
RUN npm install

# Copiar todos os arquivos da aplicação para o contêiner
COPY . .

# Construir a aplicação Next.js
RUN npm run build

# Configurar a imagem de produção
FROM node:20.11.1 AS runner

# Definir o diretório de trabalho
WORKDIR /app

# Copiar as dependências instaladas e a build da aplicação do estágio anterior
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json

# Definir a variável de ambiente NODE_ENV como produção
ENV NODE_ENV=local

# Expor a porta 3000
EXPOSE 3000

# Definir o comando para iniciar a aplicação Next.js
CMD ["npm", "run", "start"]
