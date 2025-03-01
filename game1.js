// Get the canvas element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Background image and its position
let bgImage = new Image();
let bgX = 0; // x position of background
let bgSpeed = 2; // speed of scrolling

// Load background image
bgImage.src = "images/Blue_Nebula.png";

let Items = [];
let Asteroid = new Image();
let Earth = new Image();
let Moon = new Image();
let Planet = new Image();
let Planet1 = new Image();
let Planet2 = new Image();
let Planet3 = new Image();
let Planet4 = new Image();
let Planet5 = new Image();
Earth.src = "images/Earth.png";
Asteroid.src = "images/Asteroid.png";
Moon.src = "images/Moon.png";
Planet.src = "images/Planet.png";
Planet1.src = "images/Planet1.png";
Planet2.src = "images/Planet2.png";
Planet3.src = "images/Planet3.png";
Planet4.src = "images/Planet4.png";
Planet5.src = "images/Planet5.png";
Items.push(Asteroid, Earth, Moon, Planet, Planet1, Planet2, Planet3, Planet4, Planet5);
let Objects = [];

// Rocket
const rocketWidth = 100;
const rocketHeight = 150; // The rocket will be rotated, so the height becomes the width
let rocketX = canvas.width / 2 - rocketWidth / 2; // X position of rocket (centered horizontally)
let rocketY = canvas.height / 2 - rocketHeight / 2; // Y position of rocket (centered vertically)
let rocketSpeed = 5; // Rocket speed

// Key presses
let upKey = false;
let downKey = false;

let timeLeft = 120; // Start countdown at 120 seconds (2 minutes)
let timerInterval;
let gameOver = false; // Flag to track if the game is over

// Listen for keydown events to control the rocket movement
document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowUp") {
    upKey = true;
  } else if (event.code === "ArrowDown") {
    downKey = true;
  }
});

// Listen for keyup events to stop the rocket movement
document.addEventListener("keyup", function (event) {
  if (event.code === "ArrowUp") {
    upKey = false;
  } else if (event.code === "ArrowDown") {
    downKey = false;
  }
});

// Fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load background and rocket images
let rocketImage = new Image();
rocketImage.src = "images/rocket2.png"; // Replace with your rocket image path

bgImage.onload = function () {
  rocketImage.onload = function () {
    // Begin the animation loop after both images are loaded
    startTimer(); // Start the timer immediately
    requestAnimationFrame(update);
  };
};

function generateItem() {
  let size = Math.random() * 50 + 30; // Random size between 30 and 80
  let x = canvas.width + size; // Start off-screen (right side)
  let y = Math.random() * (canvas.height - size); // Random y position
  let speed = Math.random() * 3 + 1; // Random speed between 1 and 4
  let randomImage = Items[Math.floor(Math.random() * Items.length)]; // Random image from the array
  let object = { x, y, size, speed, image: randomImage };
  Objects.push(object);
}

function checkCollision(rocket, object) {
  const rocketLeft = rocket.x;
  const rocketRight = rocket.x + rocketWidth;
  const rocketTop = rocket.y;
  const rocketBottom = rocket.y + rocketHeight;

  const objectLeft = object.x - object.size / 2;
  const objectRight = object.x + object.size / 2;
  const objectTop = object.y - object.size / 2;
  const objectBottom = object.y + object.size / 2;

  return rocketRight > objectLeft &&
         rocketLeft < objectRight &&
         rocketBottom > objectTop &&
         rocketTop < objectBottom;
}

function startTimer() {
  if (gameOver) return; // Don't start the timer if the game is over

  timerInterval = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--; // Decrease the time left by 1 second
      document.getElementById('timer').innerHTML = `Time Remaining: ${timeLeft}s`; // Update the timer text
    } else {
      clearInterval(timerInterval); // Stop the timer when it reaches 0
      alert("You Win! 2 minutes have passed.");
      gameOver = true;
      return;
    }
  }, 1000); // Update the timer every second
}

// Update the canvas continuously
function update() {
  if (gameOver) return; // Stop the game when it's over

  bgX -= bgSpeed;

  if (bgX <= -canvas.width) {
    bgX = 0;
  }

  if (upKey && rocketY > 0) {
    rocketY -= rocketSpeed; // Move up
  } else if (downKey && rocketY + rocketHeight < canvas.height) {
    rocketY += rocketSpeed; // Move down
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(bgImage, bgX, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImage, bgX + canvas.width, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(rocketX + rocketHeight / 2, rocketY + rocketWidth / 2);
  ctx.rotate(Math.PI / 2);
  ctx.drawImage(rocketImage, -rocketWidth / 2, -rocketHeight / 2, rocketWidth, rocketHeight);
  ctx.restore();

  for (let i = 0; i < Objects.length; i++) {
    let object = Objects[i];

    object.x -= object.speed;

    if (object.x + object.size < 0) {
      Objects.splice(i, 1); // Remove the object from the array
      i--; // Adjust the index after removal to account for the shift
      generateItem(); // Generate a new item
    }

    if (checkCollision({ x: rocketX, y: rocketY }, object)) {
      console.log("Collision detected with object!");
      alert("Game Over!");
      if (confirm("Do you want to play again?")) {
        location.reload(); // Reload the page to restart the game
      }
      return; // Stop further game processing (for a simple game over)
    }

    ctx.drawImage(object.image, object.x - object.size / 2, object.y - object.size / 2, object.size, object.size);
  }

  requestAnimationFrame(update);
}

// Handle window resizing to keep the canvas size full-screen
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

setInterval(generateItem, 2000);
