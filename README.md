# 🎮 Tic-Tac-Toe | Modern Web Game

<div align="center">

![Tic-Tac-Toe](https://img.shields.io/badge/Game-Tic--Tac--Toe-00f5ff?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A visually stunning, feature-rich Tic-Tac-Toe game with AI opponents and modern design.**

[🎮 Live Demo](https://govardhan906.github.io/tic-tac-toe/) • [Features](#features) • [Tech Stack](#tech-stack) • [Architecture](#architecture)

</div>

---

## ✨ Features

### 🎯 Game Modes

- **Player vs Player (PvP)** - Challenge a friend locally
- **Player vs AI** - Test your skills against the computer

### 🤖 AI Difficulty Levels

| Level      | Strategy                                  | Beatable?     |
| ---------- | ----------------------------------------- | ------------- |
| **Easy**   | Random moves                              | ✅ Yes        |
| **Medium** | Strategic blocking & winning              | ⚠️ Sometimes  |
| **Hard**   | Minimax algorithm with alpha-beta pruning | ❌ Unbeatable |

### 🎨 Visual Design

- **Neon Cyberpunk Theme** - Vibrant cyan & magenta glows
- **Glassmorphism Effects** - Modern frosted glass UI
- **Smooth Animations** - Placement effects, win celebrations
- **Responsive Design** - Works on desktop, tablet, and mobile

### 💾 Persistence

- Automatic score tracking across sessions
- LocalStorage integration for data persistence

---

## 🛠️ Tech Stack

| Technology            | Purpose                                     |
| --------------------- | ------------------------------------------- |
| **HTML5**             | Semantic structure, accessibility           |
| **CSS3**              | Flexbox, Grid, CSS Variables, Animations    |
| **JavaScript (ES6+)** | Game logic, AI algorithms, DOM manipulation |
| **Google Fonts**      | Orbitron & Inter typography                 |
| **LocalStorage API**  | Score persistence                           |

---

## 🏗️ Architecture

```
tic-tac-toe/
├── index.html          # Main game page
├── css/
│   └── styles.css      # Design system & styling
├── js/
│   ├── game.js         # Core game state & logic
│   ├── ai.js           # AI implementations
│   └── ui.js           # DOM controller
└── assets/
    └── favicon.png     # Browser tab icon
```

### Design Patterns Used

- **Module Pattern** - Encapsulated AI and UI modules
- **State Management** - Centralized GameState object
- **Event Delegation** - Efficient click handling
- **Separation of Concerns** - Logic, UI, and AI in separate files

---

## 🚀 Quick Start

### Option 1: Direct Browser

```bash
# Clone the repository
git clone https://github.com/Govardhan906/tic-tac-toe.git

# Open in browser
open index.html
```

### Option 2: Local Server

```bash
# Using Node.js serve
npx serve .

# Or Python
python -m http.server 8000
```

---

## 🧠 AI Implementation

### Minimax Algorithm (Hard Mode)

The unbeatable AI uses the **Minimax algorithm** with **alpha-beta pruning** for optimal performance:

```javascript
minimax(board, depth, isMaximizing, alpha, beta) {
  // Evaluate terminal states
  // Recursively explore all possible moves
  // Apply alpha-beta pruning for efficiency
  // Return optimal score
}
```

**Key Features:**

- Evaluates all possible game states
- Prefers faster wins (considers depth)
- Alpha-beta pruning reduces search space by ~50%

---

## 📱 Responsive Design

| Device  | Screen Width | Optimizations                      |
| ------- | ------------ | ---------------------------------- |
| Desktop | > 480px      | Full-size game board (100px cells) |
| Tablet  | 361-480px    | Medium board (80px cells)          |
| Mobile  | ≤ 360px      | Compact board (70px cells)         |

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- ✅ **Vanilla JavaScript** - No frameworks, pure JS
- ✅ **CSS Architecture** - CSS variables, responsive design
- ✅ **Algorithm Implementation** - Minimax with optimization
- ✅ **State Management** - Centralized game state
- ✅ **DOM Manipulation** - Efficient rendering & updates
- ✅ **Event Handling** - Click & keyboard navigation
- ✅ **Web Storage API** - LocalStorage for persistence
- ✅ **Accessibility** - Keyboard navigation, ARIA labels
- ✅ **Modern CSS** - Glassmorphism, CSS Grid, animations

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by Govardhan Reddy**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Govardhan906)

</div>
