const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');
let oTurn = false;  // false: Player (X)'s turn, true: Robot (O)'s turn

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  oTurn = false;  // Start with player X
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setGameStatus("Player X's Turn");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = X_CLASS;  // Player is always X
  placeMark(cell, currentClass);
  
  if (checkWin(currentClass)) {
    setGameStatus('Player X Wins!');
    endGame();
  } else if (isDraw()) {
    setGameStatus('It\'s a Draw!');
    endGame();
  } else {
    // Robot's turn (O)
    setTimeout(() => {
      robotMove();
    }, 500);  // Small delay for more natural AI move
  }
}

function robotMove() {
  const availableCells = [...cellElements].filter(cell => 
    !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)
  );
  
  if (availableCells.length > 0) {
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    placeMark(randomCell, O_CLASS);
    
    if (checkWin(O_CLASS)) {
      setGameStatus('Robot (O) Wins!');
      endGame();
    } else if (isDraw()) {
      setGameStatus('It\'s a Draw!');
      endGame();
    } else {
      setGameStatus("Player X's Turn");
    }
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame() {
  cellElements.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

function setGameStatus(message) {
  gameStatus.textContent = message;
}
