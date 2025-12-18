// AI Module
const AI = {
  getMove: function (board, difficulty) {
    switch (difficulty) {
      case "easy": return this.getEasyMove(board);
      case "medium": return this.getMediumMove(board);
      case "hard": return this.getHardMove(board);
      default: return this.getMediumMove(board);
    }
  },

  // Easy: Random move
  getEasyMove: function (board) {
    const available = getAvailableCells(board);
    if (available.length === 0) return -1;
    return available[Math.floor(Math.random() * available.length)];
  },

  // Medium: Basic strategy (win > block > center > corner > edge)
  getMediumMove: function (board) {
    const available = getAvailableCells(board);
    if (available.length === 0) return -1;

    const winMove = this.findWinningMove(board, "O");
    if (winMove !== -1) return winMove;

    const blockMove = this.findWinningMove(board, "X");
    if (blockMove !== -1) return blockMove;

    if (board[4] === "") return 4;

    const corners = [0, 2, 6, 8].filter((i) => board[i] === "");
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

    const edges = [1, 3, 5, 7].filter((i) => board[i] === "");
    if (edges.length > 0) return edges[Math.floor(Math.random() * edges.length)];

    return this.getEasyMove(board);
  },

  findWinningMove: function (board, player) {
    for (const pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      const cells = [board[a], board[b], board[c]];
      const playerCount = cells.filter((c) => c === player).length;
      const emptyCount = cells.filter((c) => c === "").length;

      if (playerCount === 2 && emptyCount === 1) {
        if (board[a] === "") return a;
        if (board[b] === "") return b;
        if (board[c] === "") return c;
      }
    }
    return -1;
  },

  // Hard: Minimax algorithm (unbeatable)
  getHardMove: function (board) {
    const available = getAvailableCells(board);
    if (available.length === 0) return -1;
    if (available.length === 9) return 4;

    let bestScore = -Infinity;
    let bestMove = available[0];

    for (const move of available) {
      board[move] = "O";
      const score = this.minimax(board, 0, false, -Infinity, Infinity);
      board[move] = "";

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  },

  minimax: function (board, depth, isMaximizing, alpha, beta) {
    const result = this.evaluateBoard(board);
    if (result !== null) return result - depth;

    const available = getAvailableCells(board);

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (const move of available) {
        board[move] = "O";
        const score = this.minimax(board, depth + 1, false, alpha, beta);
        board[move] = "";
        maxScore = Math.max(maxScore, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (const move of available) {
        board[move] = "X";
        const score = this.minimax(board, depth + 1, true, alpha, beta);
        board[move] = "";
        minScore = Math.min(minScore, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
      return minScore;
    }
  },

  evaluateBoard: function (board) {
    for (const pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] === "O" ? 10 : -10;
      }
    }
    if (board.every((cell) => cell !== "")) return 0;
    return null;
  },
};

window.AI = AI;
