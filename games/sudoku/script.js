const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const newGameBtn = document.getElementById('new-game-btn');
const solveBtn = document.getElementById('solve-btn');
const resetBtn = document.getElementById('reset-btn');
const themeToggle = document.getElementById('theme-toggle');
const backBtn = document.getElementById('back-btn');

let board = [];
let initialBoard = [];

// Alternar tema claro/escuro
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌓';
});

// Voltar à página inicial
backBtn.addEventListener('click', () => {
  window.location.href = '../../index.html';
});

// Gera um tabuleiro de Sudoku válido
function generateBoard() {
  board = Array(9).fill().map(() => Array(9).fill(0));
  fillDiagonal();
  solveSudoku(board);
  initialBoard = board.map(row => [...row]);
  removeNumbers();
  renderBoard();
}

// Preenche as subgrades diagonais 3x3
function fillDiagonal() {
  for (let i = 0; i < 9; i += 3) {
    fillBox(i, i);
  }
}

function fillBox(row, col) {
  let num;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      do {
        num = Math.floor(Math.random() * 9) + 1;
      } while (!isSafe(board, row + i, col + j, num));
      board[row + i][col + j] = num;
    }
  }
}

// Verifica se é seguro colocar um número
function isSafe(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }
  let startRow = row - row % 3;
  let startCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }
  return true;
}

// Solucionador de Sudoku
function solveSudoku(board) {
  let row = -1;
  let col = -1;
  let isEmpty = false;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        row = i;
        col = j;
        isEmpty = true;
        break;
      }
    }
    if (isEmpty) break;
  }
  if (!isEmpty) return true;
  for (let num = 1; num <= 9; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;
      if (solveSudoku(board)) return true;
      board[row][col] = 0;
    }
  }
  return false;
}

// Remove números para criar o puzzle
function removeNumbers() {
  let count = 40; // Remove 40 números para dificuldade moderada
  while (count > 0) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);
    if (board[row][col] !== 0) {
      board[row][col] = 0;
      count--;
    }
  }
}

// Renderiza o tabuleiro
function renderBoard() {
  boardElement.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('input');
      cell.className = 'cell';
      cell.type = 'text';
      cell.maxLength = 1;
      cell.value = board[i][j] === 0 ? '' : board[i][j];
      if (board[i][j] !== 0) cell.readOnly = true;
      cell.addEventListener('input', (e) => handleInput(e, i, j));
      boardElement.appendChild(cell);
    }
  }
  validateBoard();
}

// Lida com entradas do usuário
function handleInput(event, row, col) {
  const value = event.target.value;
  if (value === '' || (value >= '1' && value <= '9')) {
    board[row][col] = value === '' ? 0 : parseInt(value);
    validateBoard();
  } else {
    event.target.value = '';
  }
}

// Valida o tabuleiro
function validateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.classList.remove('invalid'));
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) continue;
      let temp = board[i][j];
      board[i][j] = 0;
      if (!isSafe(board, i, j, temp)) {
        cells[i * 9 + j].classList.add('invalid');
      }
      board[i][j] = temp;
    }
  }
}

// Verifica a solução
function checkSolution() {
  let tempBoard = board.map(row => [...row]);
  if (solveSudoku(tempBoard)) {
    messageElement.textContent = 'Parabéns! Solução correta!';
  } else {
    messageElement.textContent = 'Solução inválida. Tente novamente.';
  }
}

// Reinicia o tabuleiro
function resetBoard() {
  board = initialBoard.map(row => [...row]);
  renderBoard();
  messageElement.textContent = '';
}

// Eventos dos botões
newGameBtn.addEventListener('click', () => {
  generateBoard();
  messageElement.textContent = '';
});
solveBtn.addEventListener('click', checkSolution);
resetBtn.addEventListener('click', resetBoard);

// Inicializa o jogo
generateBoard();