const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');
const startGameButton = document.getElementById('start-game');
const levelSelect = document.getElementById('level');
const modeSelect = document.getElementById('mode');
const levelDisplay = document.getElementById('level-display');
const wordDisplay = document.getElementById('word-display');
const wrongLettersList = document.getElementById('wrong-letters-list');
const message = document.getElementById('message');
const hintDisplay = document.getElementById('hint');
const scoreDisplay = document.getElementById('score');
const roundDisplay = document.getElementById('round');
const keyboard = document.getElementById('keyboard');
const hangman = document.getElementById('hangman');
const hangmanContainer = document.getElementById('hangman-container');
const themeToggle = document.getElementById('theme-toggle');
const restartGameButton = document.getElementById('restart-game');
const timerDisplay = document.getElementById('timer-display');
const hangmanParts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];

// Variável para o botão de voltar
const backBtn = document.getElementById('back-btn');

let words = [];
let word = '';
let hint = '';
let guessedLetters = [];
let wrongLetters = [];
let errors = 0;
let score = 0;
let round = 1;
let selectedLevel = '';
let selectedMode = '';
let usedWords = [];
let timerInterval = null;
let timeLeft = 30;
const maxRounds = 10;
const maxErrors = 6;
const pointsPerRound = 10;
const pointsPerError = pointsPerRound / maxErrors;
const timerDuration = 30; // 30 seconds per letter

// Letras do alfabeto (sem ç)
const alphabet = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

// Tema claro/escuro
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌓';
});

// Event listener para o botão de voltar
backBtn.addEventListener('click', () => {
  window.location.href = '../../index.html'; // Redireciona para a página inicial
});

// Função para normalizar letras (remover acentos e tratar ç como c)
function normalizeLetter(letter) {
    return letter
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ç/gi, 'c')
        .toLowerCase();
}

async function loadWords() {
    try {
        const response = await fetch('words.json');
        if (!response.ok) throw new Error('Falha ao carregar words.json');
        words = (await response.json()).words;
        if (!words || words.length === 0) throw new Error('Nenhuma palavra encontrada no JSON');
    } catch (error) {
        console.error('Erro ao carregar palavras:', error);
        alert('Falha ao carregar palavras. Verifique se words.json está na mesma pasta e tem o formato correto.');
    }
}

function getRandomWord(level) {
    // Filtra palavras do nível selecionado que ainda não foram usadas
    const levelWords = words.filter(w => w.level === level && !usedWords.includes(w.word));
    
    // Se não houver palavras disponíveis
    if (levelWords.length === 0) {
        console.warn(`Nenhuma palavra nova disponível para o nível: ${level}. Reiniciando lista de palavras usadas.`);
        usedWords = []; // Reseta a lista de palavras usadas
        const remainingWords = words.filter(w => w.level === level);
        if (remainingWords.length === 0) {
            message.textContent = `Erro: Nenhuma palavra disponível para o nível ${level}. Escolha outro nível.`;
            message.style.color = 'var(--wrong-color)';
            restartGameButton.style.display = 'block';
            return { word: 'erro', hint: 'Nenhuma palavra disponível.', level };
        }
        // Seleciona uma palavra aleatoriamente das palavras restantes
        const selectedWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
        usedWords.push(selectedWord.word);
        return selectedWord;
    }
    
    // Seleciona uma palavra aleatoriamente do nível
    const selectedWord = levelWords[Math.floor(Math.random() * levelWords.length)];
    usedWords.push(selectedWord.word);
    return selectedWord;
}

function createKeyboard() {
    keyboard.innerHTML = '';
    alphabet.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        row.forEach(letter => {
            const button = document.createElement('button');
            button.className = 'letter-button';
            button.textContent = letter.toUpperCase();
            button.addEventListener('click', () => handleLetter(letter));
            rowDiv.appendChild(button);
        });
        keyboard.appendChild(rowDiv);
    });
}

function updateKeyboard() {
    const buttons = keyboard.querySelectorAll('.letter-button');
    buttons.forEach(button => {
        const letter = button.textContent.toLowerCase();
        button.disabled = guessedLetters.includes(letter);
    });
}

function displayWord() {
    const display = word
        .split('')
        .map(letter => {
            if (letter === ' ') {
                return ' '; // Exibe espaço como espaço
            }
            if (letter === '-') {
                return '-'; // Preserva hífens
            }
            return guessedLetters.some(gl => normalizeLetter(gl) === normalizeLetter(letter)) ? letter : '_';
        })
        .join('');
    wordDisplay.textContent = display;
}

function displayWrongLetters() {
    wrongLettersList.textContent = wrongLetters.join(', ');
}

function updateHangman() {
    if (errors <= maxErrors) {
        const part = document.getElementById(hangmanParts[errors - 1]);
        if (part) {
            part.style.display = 'block';
            part.classList.add('pulse');
            setTimeout(() => part.classList.remove('pulse'), 1000);
        }
    }
}

function calculateRoundScore() {
    if (errors >= maxErrors) return 0;
    return Math.round((pointsPerRound - errors * pointsPerError) * 100) / 100;
}

function checkWin() {
    const isWin = word
        .split('')
        .filter(letter => letter !== ' ' && letter !== '-') // Ignora espaços e hífens
        .every(letter => guessedLetters.some(gl => normalizeLetter(gl) === normalizeLetter(letter)));
    if (isWin) {
        const roundScore = calculateRoundScore();
        score += roundScore;
        scoreDisplay.textContent = `Pontuação: ${score.toFixed(2)}`;
        message.textContent = `Você venceu a rodada! Ganhou ${roundScore.toFixed(2)} pontos.`;
        message.style.color = 'var(--correct-color)';
        stopTimer();
        document.removeEventListener('keydown', handleKeyPress);
        keyboard.querySelectorAll('.letter-button').forEach(button => button.disabled = true);
        wordDisplay.classList.add('pulse');
        proceedToNextRound();
    }
}

function checkLose() {
    if (errors >= maxErrors) {
        message.textContent = `Você perdeu a rodada! A palavra era: ${word}.`;
        message.style.color = 'var(--wrong-color)';
        stopTimer();
        document.removeEventListener('keydown', handleKeyPress);
        keyboard.querySelectorAll('.letter-button').forEach(button => button.disabled = true);
        proceedToNextRound();
    }
}

function proceedToNextRound() {
    round++;
    if (round <= maxRounds) {
        roundDisplay.textContent = `Rodada: ${round}/${maxRounds}`;
        setTimeout(startNewRound, 5000);
    } else {
        message.textContent = `Jogo concluído! Pontuação final: ${score.toFixed(2)}/100`;
        message.style.color = '#3f51b5';
        restartGameButton.style.display = 'block';
        restartGameButton.classList.add('pulse');
        keyboard.style.display = 'none';
        hangmanContainer.style.display = 'none';
        wordDisplay.style.display = 'none';
        wrongLettersList.parentElement.style.display = 'none';
        hintDisplay.style.display = 'none';
        timerDisplay.style.display = 'none';
    }
}

function startTimer() {
    if (selectedMode === 'timer') {
        timeLeft = timerDuration;
        timerDisplay.textContent = `Tempo: ${timeLeft}s`;
        timerDisplay.style.display = 'block';
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Tempo: ${timeLeft}s`;
            if (timeLeft <= 0) {
                errors++;
                updateHangman();
                checkLose();
                resetTimer();
            }
        }, 1000);
    }
}

function resetTimer() {
    if (selectedMode === 'timer') {
        timeLeft = timerDuration;
        timerDisplay.textContent = `Tempo: ${timeLeft}s`;
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerDisplay.style.display = 'none';
    }
}

function handleLetter(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (word.split('').some(wl => normalizeLetter(wl) === normalizeLetter(letter))) {
            displayWord();
            checkWin();
        } else {
            wrongLetters.push(letter);
            errors++;
            displayWrongLetters();
            updateHangman();
            checkLose();
        }
        resetTimer();
        updateKeyboard();
    }
}

function handleKeyPress(event) {
    const letter = event.key.toLowerCase();
    if (/^[a-z]$/.test(letter)) {
        handleLetter(letter);
    }
}

async function startNewRound() {
    guessedLetters = [];
    wrongLetters = [];
    errors = 0;
    message.textContent = '';
    wrongLettersList.textContent = '';
    hangmanParts.forEach(part => {
        document.getElementById(part).style.display = 'none';
    });
    keyboard.style.display = 'flex';
    hangmanContainer.style.display = 'block';
    wordDisplay.style.display = 'flex';
    wordDisplay.classList.remove('pulse');
    wrongLettersList.parentElement.style.display = 'block';
    hintDisplay.style.display = 'block';
    restartGameButton.style.display = 'none';
    restartGameButton.classList.remove('pulse');
    
    const wordData = getRandomWord(selectedLevel);
    word = wordData.word;
    hint = wordData.hint;
    hintDisplay.textContent = `Dica: ${hint}`;
    displayWord();
    createKeyboard();
    stopTimer();
    startTimer();
    document.addEventListener('keydown', handleKeyPress);
}

async function startNewGame() {
    score = 0;
    round = 1;
    usedWords = [];
    scoreDisplay.textContent = `Pontuação: ${score}`;
    roundDisplay.textContent = `Rodada: ${round}/${maxRounds}`;
    await startNewRound();
}

startGameButton.addEventListener('click', () => {
    selectedLevel = levelSelect.value;
    selectedMode = modeSelect.value;
    const levelText = levelSelect.options[levelSelect.selectedIndex].text;
    levelDisplay.textContent = `Nível: ${levelText}`;
    startScreen.style.display = 'none';
    gameContainer.style.display = 'flex';
    startNewGame();
});

restartGameButton.addEventListener('click', () => {
    startScreen.style.display = 'flex';
    gameContainer.style.display = 'none';
    stopTimer();
    loadWords().then(() => {
        selectedLevel = '';
        selectedMode = '';
        levelDisplay.textContent = 'Nível: ';
    });
});

loadWords();