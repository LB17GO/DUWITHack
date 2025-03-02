// Get the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Load the background and alien images
const backgroundImage = new Image();
backgroundImage.src = 'Purple_Nebula.png';

const AlienImage = new Image();
AlienImage.src = 'Alien.png'; // Corrected typo (was "scr" instead of "src")

let alien = null;  // Alien object
let counter = 0; // Track how many times the alien has been clicked

let timeLeft = 60; // 3 minutes for the timer
let timerInterval;
let gameOver = false; // Flag to check if game is over

// Update counter display
function updateCounter() {
    document.getElementById('counter').innerHTML = `Items Passed: ${counter}`;
}

// Once the background image is loaded, adjust the canvas size and draw the image
backgroundImage.onload = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw the background image on the canvas
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Call function to draw the grid after the background is drawn
    drawGrid(100);
};

// Function to draw a small grid in the middle of the screen
// Function to draw a small grid in the middle of the screen
function drawGrid(cellSize) {
    ctx.strokeStyle = "#FFFFFF"; // Color for the grid lines
    ctx.lineWidth = 1; // Line width for the grid lines
  
    // Define the dimensions and position of the grid in the middle of the screen
    const gridWidth = 600;  // Width of the grid
    const gridHeight = 600; // Height of the grid
    const gridX = (canvas.width - gridWidth) / 2; // X position to center the grid
    const gridY = (canvas.height - gridHeight) / 2; // Y position to center the grid
  
    // Draw vertical lines within the grid's area
    for (let x = gridX; x <= gridX + gridWidth; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, gridY);
        ctx.lineTo(x, gridY + gridHeight);
        ctx.stroke();
    }
  
    // Draw horizontal lines within the grid's area
    for (let y = gridY; y <= gridY + gridHeight; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(gridX, y);
        ctx.lineTo(gridX + gridWidth, y);
        ctx.stroke();
    }
  
    // Draw ellipses in the grid cells to represent holes
    for (let x = gridX; x < gridX + gridWidth; x += cellSize) {
        for (let y = gridY; y < gridY + gridHeight; y += cellSize) {
            drawEllipse(x + cellSize / 2, y + cellSize / 2, 40, 20); // Adjust ellipse size and position
        }
    }
}
  
function drawEllipse(x, y, radius) {
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius / 2, 0, 0, Math.PI * 2);  // Draw ellipse at (x, y) with given radius
    ctx.fillStyle = "black"; // Fill color for the hole
    ctx.fill();
    ctx.strokeStyle = "white"; // Outline color
    ctx.stroke();
}




function randomAlien(){
    alien = {
        x: Math.floor(Math.random() * 6), // Random X position within the grid (0 to 5)
        y: Math.floor(Math.random() * 6), // Random Y position within the grid (0 to 5)
    };

    console.log(`New Alien Position: x = ${alien.x}, y = ${alien.y}`); // Log the new position
    placeImageInGrid(alien.x, alien.y); // Call the function to place the alien in the grid
}


function placeImageInGrid(x, y) {
    const cellSize = 100;  // Size of each cell
    const gridWidth = 600;  // Grid width
    const gridHeight = 600;  // Grid height
    const gridX = (canvas.width - gridWidth) / 2;  // X offset to center the grid
    const gridY = (canvas.height - gridHeight) / 2;  // Y offset to center the grid

    // Correct placement calculations: Multiply by cell size
    const imgX = gridX + x * cellSize;  // Correct horizontal position of the alien
    const imgY = gridY + y * cellSize;  // Correct vertical position of the alien

    // Position the alien image so it appears to be inside the hole
    const alienWidth = 60;  // Make the alien a little smaller so it fits inside the hole
    const alienHeight = 60; // Same here, adjust to fit

    // Debugging log to verify correct placement
    console.log(`Placing Alien at: x = ${imgX + cellSize / 2 - alienWidth / 2}, y = ${imgY + cellSize / 2 - alienHeight / 2}`);

    // Draw the alien image at the calculated position, adjusted to fit inside the hole
    ctx.drawImage(AlienImage, imgX + cellSize / 2 - alienWidth / 2, imgY + cellSize / 2 - alienHeight / 2, alienWidth, alienHeight);
}


// Start the game when the start button is clicked
document.getElementById("start_button").addEventListener("click", function () {
    // Ensure the alien image is loaded before starting the game
    AlienImage.onload = function () {
        randomAlien(); // Create the first alien in a random position
        startTimer(); // Start the timer
        requestAnimationFrame(update); // Start the game loop
    };
    
    // Check if the image has already loaded (for fast clicks)
    if (AlienImage.complete) {
        randomAlien();
        startTimer();
        requestAnimationFrame(update);
    }
});

// Timer function that updates the timer every second
function startTimer() {
    if (gameOver) return;

    timerInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--; // Decrease time by 1 second

            // Format time as MM:SS
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            let formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            // Update the timer on the screen
            document.getElementById('timer').innerHTML = `Time Remaining: ${formattedTime}`;
        } else {
            clearInterval(timerInterval); // Stop the timer when time is up
            gameOver = true;

            if (counter >= 10) {
                alert("You Win! You've clicked enough aliens!");
            } else {
                alert("Time's up! You didn't hit enough aliens. Game Over!");
            }
        }
    }, 1000); // Update timer every second
}

// Event listener for the canvas to check if an alien was clicked
canvas.addEventListener("click", function (event) {
    if (gameOver) return;

    const clickX = event.offsetX;
    const clickY = event.offsetY;

    // Calculate the position of the grid on the canvas
    const cellSize = 100;
    const gridWidth = 600;  // Width of the grid
    const gridHeight = 600; // Height of the grid
    const gridX = (canvas.width - gridWidth) / 2; // X position of the grid (centered)
    const gridY = (canvas.height - gridHeight) / 2; // Y position of the grid (centered)

    // Calculate the alien's position based on the grid
    const alienX = gridX + alien.x * cellSize;
    const alienY = gridY + alien.y * cellSize;

    // Check if the click was inside the alien's bounds (within the grid cell where the alien is placed)
    if (
        clickX >= alienX && clickX <= alienX + cellSize &&
        clickY >= alienY && clickY <= alienY + cellSize
    ) {
        console.log("Alien clicked!");

        // Alien was clicked, clear the area and generate a new alien at a random position
        ctx.clearRect(alienX, alienY, cellSize, cellSize); // Clear the current alien

        // Increment the counter (this is optional if you have a "score" for hitting aliens)
        counter++; // For example, if you want to count the number of hits
        updateCounter();

        // Generate a new alien at a random position
        randomAlien();
    }
});
// Main update function to update the canvas
let lastTime = 0;
function update() {
    if (gameOver) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background and grid
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    drawGrid(100); // Draw the grid

    // Only place the alien if it's not null
    if (alien) {
        placeImageInGrid(alien.x, alien.y); // Draw the alien in the current position
    }

    // Continue the animation loop
    requestAnimationFrame(update);
}

// Event listener for the canvas to check if an alien was clicked
canvas.addEventListener("click", function (event) {
    if (gameOver) return;

    const clickX = event.offsetX;
    const clickY = event.offsetY;

    // Calculate the position of the grid on the canvas
    const cellSize = 100;
    const gridWidth = 600;  // Width of the grid
    const gridHeight = 600; // Height of the grid
    const gridX = (canvas.width - gridWidth) / 2; // X position of the grid (centered)
    const gridY = (canvas.height - gridHeight) / 2; // Y position of the grid (centered)

    // Calculate the alien's position based on the grid
    const alienX = gridX + alien.x * cellSize;
    const alienY = gridY + alien.y * cellSize;

    // Check if the click was inside the alien's bounds (within the grid cell where the alien is placed)
    if (
        clickX >= alienX && clickX <= alienX + cellSize &&
        clickY >= alienY && clickY <= alienY + cellSize
    ) {
        console.log("Alien clicked!");

        // Alien was clicked, clear the area and generate a new alien at a random position
        ctx.clearRect(alienX, alienY, cellSize, cellSize); // Clear the current alien

        // Increment the counter
        counter++;
        updateCounter();

        // Generate a new alien at a random position
        randomAlien();
    }
});

// Randomly place the alien in the grid
function randomAlien() {
    alien = {
        x: Math.floor(Math.random() * 6), // Random X position within the grid (0 to 5)
        y: Math.floor(Math.random() * 6), // Random Y position within the grid (0 to 5)
    };

    console.log(`New Alien Position: x = ${alien.x}, y = ${alien.y}`); // Log the new position
    placeImageInGrid(alien.x, alien.y); // Call the function to place the alien in the grid
}

// Function to place the alien image in the grid at the specified position
function placeImageInGrid(x, y) {
    const cellSize = 100;  // Size of each cell
    const gridWidth = 600;  // Grid width
    const gridHeight = 600;  // Grid height
    const gridX = (canvas.width - gridWidth) / 2;  // X offset to center the grid
    const gridY = (canvas.height - gridHeight) / 2;  // Y offset to center the grid

    // Correct placement calculations: Multiply by cell size
    const imgX = gridX + x * cellSize;  // Correct horizontal position of the alien
    const imgY = gridY + y * cellSize;  // Correct vertical position of the alien

    // Debugging log to verify correct placement
    console.log(`Placing Alien at: x = ${imgX}, y = ${imgY}`);

    // Draw the alien image at the calculated position
    ctx.drawImage(AlienImage, imgX, imgY, cellSize, cellSize);  // Alien image will be placed properly
}

// Start the game when the start button is clicked
document.getElementById("start_button").addEventListener("click", function () {
    // Ensure the alien image is loaded before starting the game
    AlienImage.onload = function () {
        randomAlien(); // Create the first alien in a random position
        startTimer(); // Start the timer
        requestAnimationFrame(update); // Start the game loop
    };
    
    // Check if the image has already loaded (for fast clicks)
    if (AlienImage.complete) {
        randomAlien();
        startTimer();
        requestAnimationFrame(update);
    }
});

// Timer function that updates the timer every second
function startTimer() {
    if (gameOver) return;

    timerInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--; // Decrease time by 1 second

            // Format time as MM:SS
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            let formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            // Update the timer on the screen
            document.getElementById('timer').innerHTML = `Time Remaining: ${formattedTime}`;
        } else {
            clearInterval(timerInterval); // Stop the timer when time is up
            gameOver = true;

            if (counter >= 10) {
                alert("You Win! You've clicked enough aliens!");
            } else {
                alert("Time's up! You didn't hit enough aliens. Game Over!");
            }
        }
    }, 1000); // Update timer every second
}

// Update counter display
function updateCounter() {
    document.getElementById('counter').innerHTML = `Items Passed: ${counter}`;
}

// Handle resizing of the window
window.addEventListener('resize', function () {
    // Resize the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Redraw the background image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Redraw the grid
    drawGrid(100);
});




