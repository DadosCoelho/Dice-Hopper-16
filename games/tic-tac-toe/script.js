const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player');
const messageDisplay = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');
const startBtn = document.getElementById('start-btn');
const gameModeSelect = document.getElementById('game-mode');
const difficultySelect = document.getElementById('difficulty-level');
const difficultyDiv = document.getElementById('difficulty');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const themeToggle = document.getElementById('theme-toggle');
const backBtn = document.getElementById('back-btn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let isPvC = false;
let difficulty = 'easy';

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
  [0, 4, 8], [2, 4, 6] // Diagonais
];

// Alternar tema claro/escuro
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌓';
});

// Voltar à página inicial
backBtn.addEventListener('click', () => {
  window.location.href = '../../index.html';
});

// Mostra/esconde o seletor de dificuldade com base no modo
gameModeSelect.addEventListener('change', () => {
  difficultyDiv.style.display = gameModeSelect.value === 'pvc' ? 'block' : 'none';
});

// Inicia o jogo
startBtn.addEventListener('click', () => {
  isPvC = gameModeSelect.value === 'pvc';
  difficulty = difficultySelect.value;
  menu.style.display = 'none';
  game.style.display = 'block';
  gameActive = true;
  restartGame();
});

// Lida com cliques nas células
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (board[index] !== '' || !gameActive) return;

  makeMove(index, currentPlayer);

  if (isPvC && gameActive && currentPlayer === 'O') {
    setTimeout(computerMove, 500); // Pequeno atraso para simular "pensamento"
  }
}

// Realiza uma jogada
function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;

  if (checkWin(player)) {
    messageDisplay.textContent = `Jogador ${player} venceu!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== '')) {
    messageDisplay.textContent = 'Empate!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerDisplay.textContent = currentPlayer;
}

// Verifica vitória
function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === player);
  });
}

// Reinicia o jogo
function restartGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  messageDisplay.textContent = '';
  currentPlayerDisplay.textContent = currentPlayer;
  cells.forEach(cell => (cell.textContent = ''));
  if (isPvC && currentPlayer === 'O') {
    setTimeout(computerMove, 500);
  }
}

// Jogada do computador
function computerMove() {
  let move;
  if (difficulty === 'easy') {
    move = getRandomMove();
  } else if (difficulty === 'medium') {
    move = getMediumMove();
  } else {
    move = getBestMove();
  }
  makeMove(move, 'O');
}

// Jogada aleatória (Fácil)
function getRandomMove() {
  const availableMoves = board.reduce((acc, cell, index) => {
    if (cell === '') acc.push(index);
    return acc;
  }, []);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

// Jogada média (vitória, bloqueio ou aleatória)
function getMediumMove() {
  // Verifica vitória imediata
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      if (checkWin('O')) {
        board[i] = '';
        return i;
      }
      board[i] = '';
    }
  }

  // Bloqueia vitória do oponente
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = 'X';
      if (checkWin('X')) {
        board[i] = '';
        return i;
      }
      board[i] = '';
    }
  }

  // 50% de chance de jogada aleatória
  if (Math.random() < 0.5) {
    return getRandomMove();
  }

  // Tenta o centro ou cantos
  const preferredMoves = [4, 0, 2, 6, 8];
  for (let move of preferredMoves) {
    if (board[move] === '') return move;
  }

  return getRandomMove();
}

// Melhor jogada (Minimax - Difícil)
function getBestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

// Algoritmo Minimax
function minimax(board, depth, isMaximizing) {
  if (checkWin('O')) return 10 - depth;
  if (checkWin('X')) return depth - 10;
  if (board.every(cell => cell !== '')) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);