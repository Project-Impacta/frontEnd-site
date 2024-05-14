# Store Impacta - Documentação Visual

## Tema e Estilos

Este projeto utiliza temas claro e escuro para fornecer uma experiência visual agradável aos usuários. Os estilos de cores e fontes são definidos de acordo com os temas selecionados.

### Tema Claro

- **Cores:**
  - **Background:** ![#F2F2F2](https://via.placeholder.com/15/F2F2F2/000000?text=+) `#F2F2F2`
  - **Botão Primário:** ![#0597F2](https://via.placeholder.com/15/0597F2/000000?text=+) `#0597F2`
  - **Botão Secundário:** ![#0C87F2](https://via.placeholder.com/15/0C87F2/000000?text=+) `#0C87F2`
  - **Texto Primário:** ![#012340](https://via.placeholder.com/15/012340/000000?text=+) `#012340`
  - **Texto Secundário:** ![#262626](https://via.placeholder.com/15/262626/000000?text=+) `#262626`
  - **Campo de Formulário (Background):** ![#F2F2F2](https://via.placeholder.com/15/F2F2F2/000000?text=+) `#F2F2F2`
  - **Borda do Campo de Formulário:** ![#012340](https://via.placeholder.com/15/012340/000000?text=+) `#012340`
  - **Link Auxiliar:** ![#0C87F2](https://via.placeholder.com/15/0C87F2/000000?text=+) `#0C87F2`

### Tema Escuro

- **Cores:**
  - **Background:** ![#011826](https://via.placeholder.com/15/011826/000000?text=+) `#011826`
  - **Botão Primário:** ![#0597F2](https://via.placeholder.com/15/0597F2/000000?text=+) `#0597F2`
  - **Texto Primário:** ![#F2F2F2](https://via.placeholder.com/15/F2F2F2/000000?text=+) `#F2F2F2`
  - **Campo de Formulário (Background):** ![#011826](https://via.placeholder.com/15/011826/000000?text=+) `#011826`
  - **Borda do Campo de Formulário:** ![#26221F](https://via.placeholder.com/15/26221F/000000?text=+) `#26221F`
  - **Acento de Detalhe:** ![#012340](https://via.placeholder.com/15/012340/000000?text=+) `#012340`

### Fontes

As fontes utilizadas neste projeto são importadas do Google Fonts e incluem:

- **Roboto:** Peso 400, 500 e 700
- **Montserrat:** Peso 400, 500 e 700
- **Lato:** Peso 400 e 700

## Estilos de Elementos

### Título

Os títulos são estilizados com a fonte Montserrat, com um peso de 700 e um tamanho de 2rem.

### Descrição

As descrições são estilizadas com a fonte Lato, com um peso de 400 e um tamanho de 1rem. O espaçamento entre linhas é configurado para 1.5 para melhor legibilidade.

### Botão

Os botões possuem um padding de 10px por 20px, bordas arredondadas e são estilizados com a fonte Roboto, com um peso de 500.

## Responsividade

O projeto é responsivo e adapta-se automaticamente a diferentes tamanhos de tela. As seguintes definições de responsividade são aplicadas:

- **text-sm:** Define o tamanho do texto como "small" (pequeno). É aplicado a telas pequenas e maiores.
- **sm:text-base:** Define o tamanho do texto como "base" (base). É aplicado a telas médias (a partir de 640px) e maiores.
- **md:text-lg:** Define o tamanho do texto como "large" (grande). É aplicado a telas grandes (a partir de 768px) e maiores.
- **lg:text-xl:** Define o tamanho do texto como "extra large" (extra grande). É aplicado a telas extra grandes (a partir de 1024px) e maiores.
- **xl:text-2xl:** Define o tamanho do texto como "2 extra large" (2 vezes extra grande). É aplicado a telas extra extra grandes (a partir de 1280px) e maiores.

As classes do Tailwind CSS são utilizadas para fornecer estilos responsivos aos elementos, garantindo uma experiência de usuário consistente em todos os dispositivos.

## Iniciando o Projeto

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

OBS: Deve ser copiado o aquivo '.env.example' na raiz do projeto e renomear para '.env', isso fara que o codigo consiga rodar o comando abaixo sem precisar motificar o next.config.ts

```bash
npm run dev
```
