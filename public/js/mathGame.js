const gameContainer = document.getElementById("game-container");
const livesContainer = document.getElementById("lives");
const gameOverDisplay = document.getElementById("game-over");
const gameOverMessage = document.getElementById("game-over-message");
const playButton = document.getElementById("play-button");
let lives = 3;
let asteroids = [];
let currentAsteroidIndex = 0;
let wrongAnswers = 0;
let missedAsteroids = 0;

function createAsteroid() {
    if (currentAsteroidIndex >= 10) {
        gameOver("You answered all questions!");
        localStorage.setItem("MathBool", "true");
        window.location.href = "/";
    }

    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const answer = num1 + num2;

    const asteroid = document.createElement("div");
    asteroid.classList.add("asteroid");
    asteroid.textContent = `${num1} + ${num2}`;
    asteroid.style.left = `${Math.random() * 250}px`;
    asteroid.dataset.answer = answer;

    gameContainer.appendChild(asteroid);
    asteroids.push(asteroid);

    setTimeout(() => {
        asteroid.style.top = "550px";
    }, 100);

    setTimeout(() => {
        if (asteroid.parentElement) {
            gameContainer.removeChild(asteroid);
            missedAsteroids++;
            loseLife();
            if (missedAsteroids >= 3) {
                gameOver("You missed too many asteroids!");
                window.location.href = "/";
            }
            if (lives > 0) createAsteroid();
        }
    }, 5100);

    asteroid.addEventListener("click", () => {
        const userAnswer = prompt("Enter the answer:");
        if (userAnswer === asteroid.dataset.answer) {
            gameContainer.removeChild(asteroid);
            currentAsteroidIndex++;
            createAsteroid();
        } else {
            wrongAnswers++;
            loseLife();
            if (wrongAnswers >= 3) {
                gameOver("You got too many wrong answers!");
                window.location.href = "/";
            }
        }
    });
}

function loseLife() {
    lives--;
    updateLives();
    if (lives <= 0) {
        gameOver("You ran out of lives!");
        window.location.href = "/";
    }
}

function updateLives() {
    livesContainer.innerHTML = "";
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement("img");
        heart.src = "../Sprites/MathGame/heart.png";
        livesContainer.appendChild(heart);
    }
}

function gameOver(message) {
    gameOverMessage.textContent = message;
    gameOverDisplay.style.display = "block";

}

function startGame() {
    playButton.style.display = "none";
    updateLives();
    createAsteroid();
}

playButton.addEventListener("click", () => {
    alert("Click on the falling asteroids and type in the answer as fast as you can - 3 mistakes or 3 missed asteroids and your rocket will collide!");
    startGame();
});