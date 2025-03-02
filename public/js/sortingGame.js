const asteroids = [
    { color: 'red', image: '../Sprites/SortingGame/RED.png' },
    { color: 'blue', image: '../Sprites/SortingGame/BLUE.png' },
    { color: 'green', image: '../Sprites/SortingGame/GREEN.png' },
    { color: 'yellow', image: '../Sprites/SortingGame/YELLOW.png' },
    { color: 'purple', image: '../Sprites/SortingGame/PURPLE.png' },
    { color: 'orange', image: '../Sprites/SortingGame/ORANGE.png' },
];

let timer;
let timeLeft = 60;
let correctCount = 0;
let currentAsteroidIndex = 0;

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('playAgainBtn').addEventListener('click', resetGame);
document.getElementById('goBackBtn').addEventListener('click', goBackToRocket);

function startGame() {
    resetGame();
    document.getElementById('bins').style.display = 'flex';
    startTimer();
    showAsteroid();
}

function resetGame() {
    timeLeft = 60;
    correctCount = 0;
    currentAsteroidIndex = 0;
    document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('asteroid').style.display = 'none';
    document.getElementById('startBtn').style.display = 'none';
}

function showAsteroid() {
    if (currentAsteroidIndex < asteroids.length) {
        const asteroid = asteroids[currentAsteroidIndex];
        const asteroidImg = document.getElementById('asteroid');
        asteroidImg.src = asteroid.image; // Add the correct path to your images
        asteroidImg.dataset.color = asteroid.color;
        asteroidImg.style.display = 'block';
        asteroidImg.classList.add('fade-in');
        asteroidImg.draggable = true;
        asteroidImg.addEventListener('dragstart', dragStart);
    }
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.color);
}

const bins = document.querySelectorAll('.bin');
bins.forEach(bin => {
    bin.addEventListener('dragover', dragOver);
    bin.addEventListener('drop', drop);
});

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const color = e.dataTransfer.getData('text/plain');
    const binColor = e.target.dataset.color;

    if (color === binColor) {
        alert('Correct!');
        document.getElementById('asteroid').style.display = 'none';
        correctCount++;
        currentAsteroidIndex++;
        showAsteroid();
        checkGameOver();
    } else {
        alert('Try again!');
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame('Time\'s up!');
        }
    }, 1000);
}

function checkGameOver() {
    if (correctCount === asteroids.length) {
        clearInterval(timer);
        endGame(`Well done! Time taken: ${60 - timeLeft} seconds`);
        localStorage.setItem("SortingBool", "true");
    }
}

function endGame(message) {
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('result').innerText = message;
    document.getElementById('bins').style.display = 'none';
    document.getElementById('asteroid').style.display = 'none';
}

function goBackToRocket() {
    // Insert go back to the rocket actions
    alert("Going back to the rocket!");
    // Redirect to another page
    window.location.href = "/";
}