document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const status = document.getElementById("status");

    let field = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    let currentPlayer = 1; // Spieler 1 beginnt (X)

    function printField() {
        for (let row = 0; row < field.length; row++) {
            let actualRow = field[row];
            let output = "";
            for (let col = 0; col < actualRow.length; col++) {
                let sign = " ";
                if (actualRow[col] == 1) {
                    sign = "X";
                } else if (actualRow[col] == 2) {
                    sign = "O";
                }
                output += sign + " ";
            }
            console.log(output);
        }
    }

    function checkWin() {
        // Überprüfe horizontale und vertikale Linien
        for (let i = 0; i < 3; i++) {
            if (
                field[i][0] === currentPlayer && field[i][1] === currentPlayer && field[i][2] === currentPlayer ||
                field[0][i] === currentPlayer && field[1][i] === currentPlayer && field[2][i] === currentPlayer
            ) {
                return true;
            }
        }

        // Überprüfe diagonale Linien
        if (
            field[0][0] === currentPlayer && field[1][1] === currentPlayer && field[2][2] === currentPlayer ||
            field[0][2] === currentPlayer && field[1][1] === currentPlayer && field[2][0] === currentPlayer
        ) {
            return true;
        }

        return false;
    }

    function isBoardFull() {
        for (let row = 0; row < field.length; row++) {
            for (let col = 0; col < field[row].length; col++) {
                if (field[row][col] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    function play(row, col) {
        if (field[row][col] === 0) {
            field[row][col] = currentPlayer;
            if (checkWin()) {
                status.textContent = `Spieler ${currentPlayer === 1 ? 'X' : 'O'} gewinnt!`;
            } else if (isBoardFull()) {
                status.textContent = "Unentschieden!";
            } else {
                currentPlayer = 3 - currentPlayer; // Wechseln Sie den Spieler (1 zu 2 oder 2 zu 1)
                status.textContent = `Spieler ${currentPlayer === 1 ? 'X' : 'O'} ist dran.`;
            }
        } else {
            console.log("Ungültiger Zug! Feld ist bereits belegt.");
        }
        printField();
        updateBoard();
    }

    function updateBoard() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                const value = field[row][col];
                cell.textContent = value === 1 ? "X" : value === 2 ? "O" : "";
            }
        }
    }

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", function() {
                if (status.textContent.startsWith("Spieler")) {
                    const row = parseInt(cell.dataset.row);
                    const col = parseInt(cell.dataset.col);
                    play(row, col);
                }
            });
            board.appendChild(cell);
        }
    }
});
