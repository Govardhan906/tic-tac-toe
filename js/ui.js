// UI Module
const UI = {
  elements: {
    gameBoard: null,
    cells: null,
    turnIndicator: null,
    currentPlayer: null,
    scoreX: null,
    scoreO: null,
    scoreDraws: null,
    modeSelector: null,
    difficultyGroup: null,
    difficultySelector: null,
    resetBtn: null,
    newGameBtn: null,
    modal: null,
    modalIcon: null,
    modalTitle: null,
    modalMessage: null,
    playAgainBtn: null,
  },

  init: function () {
    this.elements.gameBoard = document.getElementById("gameBoard");
    this.elements.cells = document.querySelectorAll(".cell");
    this.elements.turnIndicator = document.getElementById("turnIndicator");
    this.elements.currentPlayer = document.getElementById("currentPlayer");
    this.elements.scoreX = document.getElementById("scoreX");
    this.elements.scoreO = document.getElementById("scoreO");
    this.elements.scoreDraws = document.getElementById("scoreDraws");
    this.elements.modeSelector = document.getElementById("modeSelector");
    this.elements.difficultyGroup = document.getElementById("difficultyGroup");
    this.elements.difficultySelector = document.getElementById("difficultySelector");
    this.elements.resetBtn = document.getElementById("resetBtn");
    this.elements.newGameBtn = document.getElementById("newGameBtn");
    this.elements.modal = document.getElementById("gameModal");
    this.elements.modalIcon = document.getElementById("modalIcon");
    this.elements.modalTitle = document.getElementById("modalTitle");
    this.elements.modalMessage = document.getElementById("modalMessage");
    this.elements.playAgainBtn = document.getElementById("playAgainBtn");
    this.attachEventListeners();
  },

  attachEventListeners: function () {
    this.elements.cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        handleCellClick(parseInt(e.target.dataset.index, 10));
      });
    });

    this.elements.modeSelector.addEventListener("click", (e) => {
      const btn = e.target.closest(".toggle-btn");
      if (btn && btn.dataset.mode) setGameMode(btn.dataset.mode);
    });

    this.elements.difficultySelector.addEventListener("click", (e) => {
      const btn = e.target.closest(".toggle-btn");
      if (btn && btn.dataset.difficulty) setDifficulty(btn.dataset.difficulty);
    });

    this.elements.resetBtn.addEventListener("click", () => resetGame());
    this.elements.newGameBtn.addEventListener("click", () => newGame());
    this.elements.playAgainBtn.addEventListener("click", () => newGame());

    this.elements.cells.forEach((cell, index) => {
      cell.addEventListener("keydown", (e) => this.handleCellKeyboard(e, index));
    });
  },

  handleCellKeyboard: function (e, index) {
    let newIndex = index;
    switch (e.key) {
      case "ArrowUp": newIndex = index - 3; break;
      case "ArrowDown": newIndex = index + 3; break;
      case "ArrowLeft": newIndex = index - 1; break;
      case "ArrowRight": newIndex = index + 1; break;
      case "Enter":
      case " ": handleCellClick(index); return;
      default: return;
    }
    if (newIndex >= 0 && newIndex < 9) {
      this.elements.cells[newIndex].focus();
      e.preventDefault();
    }
  },

  renderBoard: function () {
    this.elements.cells.forEach((cell, index) => {
      const value = GameState.board[index];
      cell.textContent = value;
      cell.className = "cell";
      if (value === "X") cell.classList.add("x", "taken");
      else if (value === "O") cell.classList.add("o", "taken");
    });
  },

  updateCell: function (index, player) {
    const cell = this.elements.cells[index];
    cell.textContent = player;
    cell.classList.add(player.toLowerCase(), "taken");
  },

  highlightWinningCells: function (cells) {
    cells.forEach((index) => this.elements.cells[index].classList.add("winner"));
  },

  updateTurnIndicator: function () {
    const player = GameState.currentPlayer;
    this.elements.currentPlayer.textContent = player;
    this.elements.currentPlayer.className = "turn-player player-" + player.toLowerCase();
  },

  updateScoreboard: function () {
    this.elements.scoreX.textContent = GameState.scores.X;
    this.elements.scoreO.textContent = GameState.scores.O;
    this.elements.scoreDraws.textContent = GameState.scores.draws;
  },

  updateModeUI: function (mode) {
    const buttons = this.elements.modeSelector.querySelectorAll(".toggle-btn");
    buttons.forEach((btn) => btn.classList.toggle("active", btn.dataset.mode === mode));
    if (mode === "ai") this.elements.difficultyGroup.classList.remove("hidden");
    else this.elements.difficultyGroup.classList.add("hidden");
  },

  updateDifficultyUI: function (difficulty) {
    const buttons = this.elements.difficultySelector.querySelectorAll(".toggle-btn");
    buttons.forEach((btn) => btn.classList.toggle("active", btn.dataset.difficulty === difficulty));
  },

  showModal: function (type, winner = null) {
    if (type === "win") {
      this.elements.modalIcon.textContent = "🏆";
      this.elements.modalTitle.textContent = `Player ${winner} Wins!`;
      if (GameState.gameMode === "ai") {
        this.elements.modalMessage.textContent = winner === "X" ? "You defeated the AI!" : "The AI wins. Try again!";
      } else {
        this.elements.modalMessage.textContent = "Congratulations!";
      }
    } else {
      this.elements.modalIcon.textContent = "🤝";
      this.elements.modalTitle.textContent = "It's a Draw!";
      this.elements.modalMessage.textContent = "Great game!";
    }
    this.elements.modal.classList.remove("hidden");
  },

  hideModal: function () {
    this.elements.modal.classList.add("hidden");
  },
};

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  UI.init();
  initGame();
});

window.UI = UI;
