document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('gameCanvas');
  const context = canvas.getContext('2d');

  let isBoardFull = false;
  const countLines = 3;
  const countColumns = 3;
  const cellSize = canvas.width / countColumns;

  let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  let winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let currentPlayer = 'X';
  let gameActive = true;

  canvas.addEventListener('mousemove', handleHover);
  canvas.addEventListener('mouseout', handleMouseOut);


  function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < countLines; i++) {
      for (let j = 0; j < countColumns; j++) {
        context.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
        context.font = '60px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        // Определение цвета для символов в зависимости от текущего игрока
        if (board[i][j] === 'X') {
          context.fillStyle = 'red'; // Цвет для крестиков (X)
        } 
        else {
          context.fillStyle = 'blue'; // Цвет для ноликов (O)
        } 

        context.fillText(board[i][j], j * cellSize + cellSize / 2, i * cellSize + cellSize / 2);
      }
    }
  }

  function handleHover(event) {
    if (gameActive === false) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();

    if (board[row][col] === '') {
      context.fillStyle = 'rgba(0, 0, 0, 0.2)';
      context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }

  function handleMouseOut() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
  }

  function checkWinCombo(winCombo) {
    for (let combo of winCombo) {
      const [a, b, c] = combo;
      const valA = board[Math.floor(a / countColumns)][a % countColumns];
      const valB = board[Math.floor(b / countColumns)][b % countColumns];
      const valC = board[Math.floor(c / countColumns)][c % countColumns];
  
      if (valA !== '' && valA === valB && valA === valC) {
        gameActive = false;
  
        if (currentPlayer === 'X') {
          context.strokeStyle = 'red';
        } 
        else {
          context.strokeStyle = 'blue';
        }
  
        context.lineWidth = 5;
        context.beginPath();
        context.moveTo((a % countColumns + 0.5) * cellSize, (Math.floor(a / countColumns) + 0.5) * cellSize);
        context.lineTo((c % countColumns + 0.5) * cellSize, (Math.floor(c / countColumns) + 0.5) * cellSize);
        context.stroke();
  
        setTimeout(function () {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.font = '60px Arial';
          context.fillText('Игрок ' + valA + ' победил!', cellSize + cellSize / 2, cellSize + cellSize / 2);
        }, 2000);
  
        setTimeout(function () {
          location.reload();
        }, 3000);
      }
    }
  }
  

  function checkDraw() {
    isBoardFull = true;
    for (let row of board) {
      if (row.includes('')) {
        isBoardFull = false;
        break;
      }
    }

    if (isBoardFull == true) {
      gameActive = false;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = "60px Arial";
      context.fillText("Ничья!", cellSize + cellSize / 2, cellSize + cellSize / 2);
      setTimeout(function() {
        location.reload(); // Перезагрузка страницы после 3 секунд
      }, 2000);
    }
  }

  function handleClick(event) {
    if (gameActive == false) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (board[row][col] == '') {
      board[row][col] = currentPlayer;
      drawBoard();
      checkWinCombo(winCombination);
      checkDraw();
      if (currentPlayer == "X") {
        currentPlayer = "O";
      } 
      else {
        currentPlayer = "X";
      }
    }
  }

  canvas.addEventListener('click', handleClick);

  drawBoard();
});
