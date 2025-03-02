const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gridContainer = document.getElementById("grid-container");

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = 'Starfield.png';

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Start animation loop when the image is loaded
backgroundImage.onload = function () {
    draw();
};

// Define number of rows and columns
const rows = 3;
const cols = 4;
const totalCards = rows * cols;

timeLeft = 180;
timerStarted = false;
counter = 0;  // Counter to track matches

// List of unique images (half of total cards)
const uniqueImages = [
    "SpaceImages/Earth.png", "SpaceImages/Moon.png", "SpaceImages/Planet.png", "SpaceImages/Planet1.png", 
    "SpaceImages/Planet4.png", "SpaceImages/Planet5.png"
];

// Duplicate the images to ensure each appears twice
let cardImages = [...uniqueImages, ...uniqueImages];

// Shuffle the images randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}
shuffleArray(cardImages);

// Variables for matching logic
let flippedCards = [];
let lockBoard = false; // Prevents extra clicks during checking

// Generate the grid of cards with shuffled images
if (gridContainer) {
    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = cardImages[i]; // Store image in dataset
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <p>?</p>
                </div>
                <div class="card-back">
                    <img src="${cardImages[i]}" alt="Revealed Image">
                </div>
            </div>
        `;
        card.addEventListener("click", () => flipCard(card));
        gridContainer.appendChild(card);
    }
}

// Function to handle card flipping
function flipCard(card) {
    if (lockBoard || card.classList.contains("flipped")) return;

    card.classList.add("flipped");
    flippedCards.push(card);

    if (!timerStarted) {
        startTimer(); // Start the timer
        timerStarted = true;
    }

    if (flippedCards.length === 2) {
        lockBoard = true;
        checkForMatch();
    }
}

// Function to check if two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.image === card2.dataset.image) {
        // It's a match! Keep them flipped
        flippedCards = [];
        lockBoard = false;
        counter++;  // Increment the match count
        const matchCountElement = document.getElementById('counter');
        matchCountElement.innerHTML = `Match Count: ${counter}`;  // Update the match count display

        if(counter===6){
            gameOver=true;
            alert("You won the game!");
        }

    } else {
        // No match – flip them back after a short delay
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}

// Function to draw the background and stars
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Draw stars effect
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    for (let i = 0; i < 50; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = Math.random() * 3;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(draw);
}

// Handle window resizing
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start countdown timer
function startTimer() {
    timerStarted = true;
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            
            // Calculate minutes and seconds
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;

            // Format time to always display two digits for seconds
            const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            // Display the formatted time
            document.getElementById('timer').textContent = formattedTime;

            console.log(`Time left: ${formattedTime}`); // Optional, to log in console
        } else {
            clearInterval(timerInterval);
            gameOver = true;
            console.log("Game Over!");
            alert("Game Over");
        }
    }, 1000);
}
