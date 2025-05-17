# Dice Hopper 16

Um projeto web simples para acesso a jogos web criados em HTML. O sistema identifica automaticamente subpastas na pasta `games/` e exibe uma tabela com links para acessá-los. Construído com HTML, CSS e JavaScript puro, sem frameworks.

## Funcionalidades
- **Leitura automática**: Lista todas as subpastas em `games/` dinamicamente, sem necessidade de editar arquivos de configuração.
- **Acesso aos jogos**: Exibe uma tabela com links para abrir os jogos na mesma aba do navegador.
- **Design consistente**: Todos os jogos (Jogo da Forca, Sudoku, Tic-Tac-Toe) seguem o mesmo estilo visual, com tema claro/escuro alternável, fundo quadriculado, e botões estilizados.
- **Navegação**: Cada jogo inclui um botão "Voltar" no canto superior esquerdo para retornar à página inicial.

## Estrutura do Projeto
```
dice-hopper-16/
├── index.html        # Página principal do gerenciador
├── css/
│   └── styles.css    # Estilos da aplicação
├── js/
│   ├── main.js       # Lógica para listar e exibir jogos
│   └── loadGames.js  # Lógica para detectar subpastas
├── games/
│   ├── Jogo-Da-Forca/
│   │   ├── index.html  # Jogo da Forca
│   │   ├── styles.css  # Estilos do jogo
│   │   ├── script.js   # Lógica do jogo
│   │   ├── words.json  # Lista de palavras
│   │   └── README.md   # Documentação do jogo
│   ├── sudoku/
│   │   ├── index.html  # Jogo de Sudoku
│   │   ├── style.css   # Estilos do jogo
│   │   └── script.js   # Lógica do jogo
│   ├── tic-tac-toe/
│   │   ├── index.html  # Jogo da Velha
│   │   ├── style.css   # Estilos do jogo
│   │   └── script.js   # Lógica do jogo
│   └── ...             # Adicione outros jogos no mesmo padrão
└── README.md         # Documentação do projeto
```

## Como Executar
1. Clone o repositório ou baixe os arquivos.
2. Adicione suas pastas de jogos (ex.: `meu-jogo`) dentro de `games`, cada uma com um `index.html`.
3. Sirva os arquivos com um servidor local que suporte listagem de diretórios:
   ```bash
   npx http-server -c-1
   ```
   **Nota**: Certifique-se de que o servidor permite acesso à listagem de diretórios em `games/`.
4. Abra `index.html` no navegador via `http://localhost:8080`.
5. A interface listará automaticamente todas as subpastas em `games/`, com links para acessá-los.

## Tecnologias Utilizadas
- HTML5
- CSS3
- JavaScript (ES6+)

## Como Usar
1. Crie seus jogos web e organize-os em subpastas dentro de `games` (ex.: `games/meu-jogo/index.html`).
2. Inicie o servidor local.
3. Abra `index.html` no navegador.
4. A tabela exibirá todas as subpastas em `games/`, com links para seus `index.html`.
5. Clique em um link para jogar (abre na mesma aba).
6. Nos jogos, use o botão "Voltar" (⬅️) no canto superior esquerdo para retornar à página inicial.

## Detalhes da Pasta `games`
- A pasta `games` contém subpastas, uma para cada jogo web.
- Cada subpasta (ex.: `Jogo-Da-Forca`, `sudoku`, `tic-tac-toe`) deve incluir:
  - `index.html`: Arquivo principal do jogo (obrigatório).
  - `style.css`: Estilos do jogo (opcional).
  - `script.js`: Lógica do jogo (opcional).
- Não é necessário editar nenhum arquivo de configuração; as subpastas são detectadas automaticamente.

## Exemplos de Jogos
- `Jogo-Da-Forca`: Um jogo da forca interativo com cinco níveis de dificuldade, suporte a palavras com espaços, letras acentuadas, dicas automáticas, tema claro/escuro, e 10 rodadas com pontuação.
- `sudoku`: Um jogo de Sudoku com tabuleiro 9x9, validação em tempo real, botões para reiniciar ou gerar novo tabuleiro, e um solucionador para verificar a solução. Inclui tema claro/escuro e botão "Voltar".
- `tic-tac-toe`: Um jogo da velha com dois modos:
  - **Jogador vs. Jogador**: Dois jogadores (X e O) alternam turnos.
  - **Jogador vs. Computador**: Jogue contra a IA com três níveis de dificuldade:
    - **Fácil**: Jogadas aleatórias.
    - **Médio**: Prioriza vitórias/bloqueios com chance de jogadas aleatórias.
    - **Difícil**: Usa o algoritmo Minimax para jogar de forma otimizada.
  - Inclui detecção de vitória/empate, tema claro/escuro, e botão "Voltar".
- Adicione seus próprios jogos criando novas subpastas em `games/`.

## Design Padronizado
- Todos os jogos seguem o mesmo estilo:
  - **Cores**: Usam variáveis CSS (ex.: `--primary-color: #5c6bc0`, `--accent-color: #ff5722`).
  - **Fundo**: Padrão quadriculado com gradiente (`linear-gradient`).
  - **Tipografia**: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`.
  - **Tema Claro/Escuro**: Alternável via botão 🌓 no canto superior direito.
  - **Responsividade**: Ajustes para telas menores via media queries.
  - **Botão Voltar**: Ícone ⬅️ no canto superior esquerdo, redireciona para `../../index.html`.
- Suporte a **Forced Colors Mode** para acessibilidade.

## Notas de Configuração
- **Servidor Local**: Use `npx http-server -c-1` ou outro servidor que permita listagem de diretórios em `games/`. Se o servidor não suportar listagem, você precisará:
  1. Criar um endpoint (ex.: `games/list.json`) manualmente.
  2. Usar um script Node.js para gerar a lista antes de iniciar o servidor.
- **Alternativa**: Se preferir manter um arquivo de configuração, restaure o `games.json` e atualize-o manualmente.

## Próximos Passos
- Adicionar suporte para metadados (ex.: nome, descrição) em um `info.json` por subpasta.
- Implementar filtros para ordenar jogos por nome.
- Suportar thumbnails para jogos (ex.: `thumbnail.png` em cada subpasta).
- Adicionar animações para transições entre páginas.

## Contribuições
Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias!

## Licença
MIT License