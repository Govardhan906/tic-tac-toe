// Game State
const GameState = {
  board: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "X",
  gameMode: "pvp",
  aiDifficulty: "medium",
  gameActive: true,
  scores: { X: 0, O: 0, draws: 0 },
  winningCells: [],
};

// Win patterns (rows, columns, diagonals)
const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const STORAGE_KEY = "ticTacToe_scores";

// Initialize game
function initGame() {
  GameState.board = ["", "", "", "", "", "", "", "", ""];
  GameState.currentPlayer = "X";
  GameState.gameActive = true;
  GameState.winningCells = [];
  loadScores();
  UI.renderBoard();
  UI.updateTurnIndicator();
  UI.updateScoreboard();
  UI.hideModal();
}

function newGame() {
  initGame();
}

function resetGame() {
  GameState.scores = { X: 0, O: 0, draws: 0 };
  saveScores();
  initGame();
}

// Handle cell click
function handleCellClick(index) {
  if (!isValidMove(index)) return;

  makeMove(index);
  const result = checkGameEnd();

  if (result) {
    handleGameEnd(result);
    return;
  }

  switchPlayer();

  // Trigger AI move if applicable
  if (GameState.gameMode === "ai" && GameState.currentPlayer === "O" && GameState.gameActive) {
    setTimeout(() => makeAIMove(), 500);
  }
}

function isValidMove(index) {
  if (!GameState.gameActive) return false;
  if (GameState.board[index] !== "") return false;
  if (GameState.gameMode === "ai" && GameState.currentPlayer === "O") return false;
  return true;
}

function makeMove(index) {
  GameState.board[index] = GameState.currentPlayer;
  UI.updateCell(index, GameState.currentPlayer);
}

function switchPlayer() {
  GameState.currentPlayer = GameState.currentPlayer === "X" ? "O" : "X";
  UI.updateTurnIndicator();
}

function makeAIMove() {
  if (!GameState.gameActive) return;
  const move = AI.getMove(GameState.board, GameState.aiDifficulty);

  if (move !== -1) {
    makeMove(move);
    const result = checkGameEnd();
    if (result) {
      handleGameEnd(result);
      return;
    }
    switchPlayer();
  }
}

// Win/Draw detection
function checkGameEnd() {
  const winner = checkWinner();
  if (winner) return { type: "win", winner: winner.player, cells: winner.cells };
  if (checkDraw()) return { type: "draw" };
  return null;
}

function checkWinner() {
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (GameState.board[a] && GameState.board[a] === GameState.board[b] && GameState.board[a] === GameState.board[c]) {
      return { player: GameState.board[a], cells: pattern };
    }
  }
  return null;
}

function checkDraw() {
  return GameState.board.every((cell) => cell !== "");
}

function handleGameEnd(result) {
  GameState.gameActive = false;

  if (result.type === "win") {
    GameState.winningCells = result.cells;
    GameState.scores[result.winner]++;
    UI.highlightWinningCells(result.cells);
    UI.showModal("win", result.winner);
  } else {
    GameState.scores.draws++;
    UI.showModal("draw");
  }

  saveScores();
  UI.updateScoreboard();
}

// Game settings
function setGameMode(mode) {
  GameState.gameMode = mode;
  UI.updateModeUI(mode);
  newGame();
}

function setDifficulty(difficulty) {
  GameState.aiDifficulty = difficulty;
  UI.updateDifficultyUI(difficulty);
  newGame();
}

// Score persistence
function saveScores() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(GameState.scores));
  } catch (e) {
    console.warn("Could not save scores:", e);
  }
}

function loadScores() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      GameState.scores = { X: parsed.X || 0, O: parsed.O || 0, draws: parsed.draws || 0 };
    }
  } catch (e) {
    GameState.scores = { X: 0, O: 0, draws: 0 };
  }
}

function getAvailableCells(board) {
  const available = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") available.push(i);
  }
  return available;
}

// Exports
window.GameState = GameState;
window.WIN_PATTERNS = WIN_PATTERNS;
window.initGame = initGame;
window.newGame = newGame;
window.resetGame = resetGame;
window.handleCellClick = handleCellClick;
window.setGameMode = setGameMode;
window.setDifficulty = setDifficulty;
window.getAvailableCells = getAvailableCells;
window.checkWinner = checkWinner;
