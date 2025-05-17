# Jogo da Forca

Um jogo da forca interativo desenvolvido com HTML, CSS e JavaScript, projetado para desktops e dispositivos móveis. O jogador adivinha palavras em 10 rodadas, com suporte a palavras com espaços, letras acentuadas, e um sistema de pontuação. O jogo oferece cinco níveis de dificuldade, dicas automáticas, e um tema claro/escuro alternável.

![Captura de tela do jogo](screenshot.png) *(Adicione uma captura de tela para visualização)*

## Funcionalidades
- **Níveis de dificuldade**: Muito Fácil, Fácil, Médio, Difícil, Muito Difícil.
- **Suporte a palavras com espaço**: Espaços são exibidos como vazios (ex.: `m u i t o   f a c i l`) e não precisam ser adivinhados.
- **Letras acentuadas e ç**: Tratadas como equivalentes (ex.: `á` = `a`, `ç` = `c`).
- **Teclado virtual**: Layout QWERTY (sem `ç`) com botões clicáveis.
- **Sistema de pontuação**: 10 pontos por rodada, menos ~1,67 por erro, 0 com 6 erros.
- **Dicas automáticas**: Cada palavra vem com uma dica.
- **Tema claro/escuro**: Alternável com botão 🌓.
- **Responsividade**: Adaptável a telas pequenas (mobile-friendly).
- **Acessibilidade**: Suporte a **Forced Colors Mode** para alto contraste.
- **10 rodadas**: Palavras não se repetem no mesmo jogo, com pontuação final exibida.

## Tecnologias
- **HTML5**: Estrutura do jogo.
- **CSS3**: Estilização com Flexbox, animações (`pulse`), e temas claro/escuro.
- **JavaScript (ES6)**: Lógica do jogo, manipulação do DOM, e `fetch` para carregar palavras.
- **JSON**: Banco de palavras em `words.json`.

## Estrutura do Projeto
```
jogo-da-forca/
├── index.html       # Página principal com HTML, CSS e JavaScript
├── words.json       # Lista de palavras com dicas e níveis
└── README.md        # Documentação do projeto
```

## Como Executar Localmente
1. **Pré-requisitos**:
   - Node.js (opcional, para servidor local).
   - Um navegador moderno (Chrome, Firefox, etc.).
   - Git instalado.

2. **Clonar o repositório**:
   ```bash
   git clone https://github.com/SEU_USUARIO/jogo-da-forca.git
   cd jogo-da-forca
   ```

3. **Rodar localmente**:
   - Use um servidor local para evitar problemas de CORS com `fetch('words.json')`:
     ```bash
     npx http-server
     ```
     Ou use a extensão **Live Server** no VS Code.
   - Abra `http://localhost:8080` no navegador.

4. **Testar o jogo**:
   - Escolha um nível na tela inicial e clique em "Iniciar Jogo".
   - Adivinhe a palavra clicando nas letras do teclado virtual ou digitando (`a-z`).
   - Complete 10 rodadas para ver a pontuação final.
   - Clique em "Voltar ao Início" para reiniciar.

## Como Publicar no Vercel
1. **Pré-requisitos**:
   - Conta no [Vercel](https://vercel.com).
   - Repositório no GitHub com `index.html` e `words.json`.

2. **Configurar o repositório**:
   - Faça push do projeto para o GitHub:
     ```bash
     git add .
     git commit -m "Initial commit"
     git push origin main
     ```

3. **Hospedar no Vercel**:
   - Faça login no [Vercel](https://vercel.com).
   - Clique em **Add New** > **Project** e importe o repositório `jogo-da-forca`.
   - Configure:
     - **Framework Preset**: Other.
     - **Root Directory**: `.` (raiz).
     - **Output Directory**: `.` (servir `index.html` diretamente).
   - Clique em **Deploy**.
   - Acesse a URL fornecida (ex.: `https://jogo-da-forca.vercel.app`).

4. **Atualizar o site**:
   - Edite `index.html` ou `words.json`, faça commit e push:
     ```bash
     git add .
     git commit -m "Atualização"
     git push origin main
     ```
   - O Vercel atualizará automaticamente.

## Como Adicionar Palavras
- Edite `words.json` para incluir novas palavras:
  ```json
  {
    "words": [
      { "word": "muito facil", "hint": "Nível de dificuldade baixo", "level": "muito_facil" },
      { "word": "nova york", "hint": "Cidade americana famosa", "level": "facil" },
      ...
    ]
  }
  ```
- Cada palavra precisa de `word`, `hint` e `level` (um dos cinco níveis).
- Faça push para atualizar no GitHub/Vercel.

## Possíveis Melhorias
- Adicionar mais palavras ao `words.json` (ex.: 500 palavras, 100 por nível).
- Implementar reinício automático após o fim do jogo.
- Melhorar acessibilidade com `aria-label` nos botões.
- Adicionar validação para palavras inválidas no `words.json`.
- Incluir sons ou animações adicionais para vitórias/derrotas.

## Licença
[MIT License](LICENSE) *(Adicione um arquivo LICENSE se desejar)*

## Contato
- Autor: [SEU_NOME]
- GitHub: [SEU_USUARIO](https://github.com/SEU_USUARIO)
- E-mail: seu.email@example.com *(Opcional)*

---

*Desenvolvido com 💻 e ☕*