document.addEventListener("DOMContentLoaded", () => {
    const SIZE = 15;
    let board = [];
    let currentPlayer = ""; 
    let movesCount = 0;
    let isGameOver = false;

    const boardElement = document.getElementById("board");
    const statusElement = document.getElementById("status-message");
    const restartBtn = document.getElementById("restart-btn");

   
    function initGame() {
        board = Array(SIZE).fill(null).map(() => Array(SIZE).fill(null));
        movesCount = 0;
        isGameOver = false;
        boardElement.innerHTML = "";
        restartBtn.style.display = "none";

       
        for (let r = 0; r < SIZE; r++) {
            for (let c = 0; c < SIZE; c++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.addEventListener("click", handleHumanMove);
                boardElement.appendChild(cell);
            }
        }

      
        currentPlayer = Math.random() < 0.5 ? "Umano" : "Computer";
        updateStatus();

        if (currentPlayer === "Computer") {
            setTimeout(handleComputerMove, 600);
        }
    }

    function updateStatus() {
        if (isGameOver) return;
        statusElement.textContent = `Turno corrente: ${currentPlayer === "Umano" ? "Tu (X)" : "Computer (O)"}`;
    }

   
    function handleHumanMove(e) {
        if (currentPlayer !== "Umano" || isGameOver) return;

        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);

        if (board[row][col] !== null) {
            alert("Mossa non valida! Questa cella è già occupata.");
            return;
        }

        executeMove(row, col, "Umano", "X", e.target);
    }

   
    function executeMove(row, col, player, symbol, cellElement) {
        board[row][col] = player;
        cellElement.textContent = symbol;
        cellElement.classList.add(player === "Umano" ? "player-x" : "player-o");
        movesCount++;

        if (checkWin(row, col, player)) {
            isGameOver = true;
            statusElement.textContent = player === "Umano" ? "Complimenti! Hai vinto!" : "Il Computer ha vinto!";
            restartBtn.style.display = "inline-block";
            return;
        }

        if (movesCount === SIZE * SIZE) {
            isGameOver = true;
            statusElement.textContent = "Partita terminata in pareggio!";
            restartBtn.style.display = "inline-block";
            return;
        }

       
        currentPlayer = player === "Umano" ? "Computer" : "Umano";
        updateStatus();

        if (currentPlayer === "Computer" && !isGameOver) {
            setTimeout(handleComputerMove, 500);
        }
    }

   
    function handleComputerMove() {
        if (isGameOver) return;

        let bestMove = null;
        let maxScore = -1;

      
        for (let r = 0; r < SIZE; r++) {
            for (let c = 0; c < SIZE; c++) {
                if (board[r][c] === null) {
                    let score = evaluateCell(r, c);
                    if (score > maxScore) {
                        maxScore = score;
                        bestMove = { r, c };
                    }
                }
            }
        }

        if (bestMove) {
            const cellElement = document.querySelector(`[data-row='${bestMove.r}'][data-col='${bestMove.c}']`);
            executeMove(bestMove.r, bestMove.bestMove = bestMove.c, "Computer", "O", cellElement);
        }
    }

   
    function evaluateCell(r, c) {
       
        let score = (SIZE/2 - Math.abs(SIZE/2 - r)) + (SIZE/2 - Math.abs(SIZE/2 - c));

     
        const dirs = [[0, 1], [1, 0], [1, 1], [-1, 1]];

        dirs.forEach(([dr, dc]) => {
            let countHuman = 0;
            let countComputer = 0;

           
            for (let i = -4; i <= 4; i++) {
                if (i === 0) continue;
                let nr = r + dr * i;
                let nc = c + dc * i;

                if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
                    if (board[nr][nc] === "Umano") countHuman++;
                    if (board[nr][nc] === "Computer") countComputer++;
                }
            }

            
            if (countComputer === 4) score += 10000; 
            else if (countHuman === 4) score += 5000;  
            else if (countHuman === 3) score += 500;   
            else if (countComputer === 3) score += 300; 
            else score += (countHuman * 10) + (countComputer * 5);
        });

        return score;
    }

    
    function checkWin(r, c, player) {
        const directions = [
            [0, 1],   
            [1, 0],   
            [1, 1],   
            [-1, 1]   
        ];

        for (let [dr, dc] of directions) {
            let consecutive = 1;

           
            let nr = r + dr, nc = c + dc;
            while (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && board[nr][nc] === player) {
                consecutive++;
                nr += dr;
                nc += dc;
            }

            
            nr = r - dr; nc = c - dc;
            while (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && board[nr][nc] === player) {
                consecutive++;
                nr -= dr;
                nc -= dc;
            }

            if (consecutive >= 5) return true;
        }
        return false;
    }

    restartBtn.addEventListener("click", initGame);
    initGame();
});