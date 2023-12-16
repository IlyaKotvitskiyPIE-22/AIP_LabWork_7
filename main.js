document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
  
    let isBoardFull = false; // Объявляем переменную для проверки заполненности поля
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
  
    function drawBoard() {
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      for (let i = 0; i < countLines; i++) {
        for (let j = 0; j < countColumns; j++) {
          context.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
          context.font = '40px Arial';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(board[i][j], j * cellSize + cellSize / 2, i * cellSize + cellSize / 2);
        }
      }
    }
  
    function checkWinCombo(winCombo){    
      for (let combo of winCombo) {
        const [a, b, c] = combo;
        const valA = board[Math.floor(a / countColumns)][a % countColumns];
        const valB = board[Math.floor(b / countColumns)][b % countColumns];
        const valC = board[Math.floor(c / countColumns)][c % countColumns];
  
        if (valA !== '' && valA && valA === valB && valA === valC) {
          gameActive = false;
  
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.font = "40px Arial";
          context.fillText("Игрок " + currentPlayer + " победил!", cellSize + cellSize / 2, cellSize + cellSize / 2);
          return;
        }
      }
    }

    function checkDraw(){
      // Проверка на ничью
      isBoardFull = true;
      for (let row of board) {
        if (row.includes('')) {
          // Есть пустая ячейка, игра еще не завершена
          isBoardFull = false;
          break;
        }
      }
  
      if (isBoardFull == true) {
        // Поле заполнено, но нет выигрышной комбинации - объявляем ничью
        gameActive = false;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "40px Arial";
        context.fillText("Ничья!", cellSize + cellSize / 2, cellSize + cellSize / 2);
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
        if (currentPlayer == "X"){
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
  