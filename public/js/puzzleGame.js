const puzzleGrid = document.getElementById("puzzle-grid");
const piecesContainer = document.getElementById("pieces-container");
const timerDisplay = document.getElementById("timer");
const gameOverDisplay = document.getElementById("game-over");
const playButton = document.getElementById("play-button");
let pieces = [];
let timeLeft = 120;
let timerInterval;

const imageUrls = [
    "../Sprites/PuzzleGame/ROCKET 1.png",
    "../Sprites/PuzzleGame/ROCKET 2.png",
    "../Sprites/PuzzleGame/Rocket 3.png",
    "../Sprites/PuzzleGame/Rocket 4.png",
    "../Sprites/PuzzleGame/Rocket 5.png",
    "../Sprites/PuzzleGame/Rocket 6.png",
    "../Sprites/PuzzleGame/Rocket 7.png",
    "../Sprites/PuzzleGame/Rocket 8.png",
    "../Sprites/PuzzleGame/Rocket 9.png",
    "../Sprites/PuzzleGame/Rocket 10.png",
    "../Sprites/PuzzleGame/Rocket 11.png",
    "../Sprites/PuzzleGame/Rocket 12.png",
    "../Sprites/PuzzleGame/Rocket 13.png",
    "../Sprites/PuzzleGame/Rocket 14.png",
    "../Sprites/PuzzleGame/Rocket 15.png",
    "../Sprites/PuzzleGame/Rocket 16.png"
];

function createGame() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const gridSquare = document.createElement("div");
            gridSquare.classList.add("grid-square");
            gridSquare.dataset.row = row;
            gridSquare.dataset.col = col;
            puzzleGrid.appendChild(gridSquare);
        }
    }

    for (let i = 0; i < 16; i++) {
        const piece = document.createElement("img");
        piece.src = imageUrls[i];
        piece.classList.add("image-piece");
        piece.dataset.number = i + 1;
        piece.draggable = true;
        piecesContainer.appendChild(piece);
        pieces.push(piece);

        piece.style.left = `${Math.random() * 500}px`;
        piece.style.top = `${Math.random() * 100}px`;
    }

    pieces.forEach(piece => {
        piece.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", piece.dataset.number);
        });
    });

    puzzleGrid.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    puzzleGrid.addEventListener("drop", (e) => {
        const number = parseInt(e.dataTransfer.getData("text/plain"));
        const targetSquare = e.target.closest(".grid-square");

        if (targetSquare) {
            const targetRow = parseInt(targetSquare.dataset.row);
            const targetCol = parseInt(targetSquare.dataset.col);
            const expectedNumber = targetRow * 4 + targetCol + 1;

            if (number === expectedNumber) {
                const draggedPiece = pieces.find(p => parseInt(p.dataset.number) === number);
                if (draggedPiece) {
                    targetSquare.appendChild(draggedPiece);
                    draggedPiece.style.position = "static";
                    draggedPiece.style.left = "auto";
                    draggedPiece.style.top = "auto";
                }
            }
        }
    });
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;

    if (timeLeft <= 0) {
        stopTimer();
        gameOverDisplay.style.display = "block";
        window.location.href = "/";
    }
}

function stopTimer() {
    clearInterval(timerInterval);
}

playButton.addEventListener("click", () => {
    playButton.style.display = "none";
    createGame();
    startTimer();
});