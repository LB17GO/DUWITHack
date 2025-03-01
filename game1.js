// Get the canvas element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Background image and its position
let bgImage = new Image();
let bgX = 0; // x position of background
let bgSpeed = 2; // speed of scrolling

// Load the background image
bgImage.src = "Blue_Space.png"; // Replace with your background image path

// Rocket properties
const rocketWidth = 100;
const rocketHeight = 150; // The rocket will be rotated, so the height becomes the width
let rocketX = canvas.width / 2 - rocketWidth / 2; // X position of rocket (centered horizontally)
let rocketY = canvas.height / 2 - rocketHeight / 2; // Y position of rocket (centered vertically)
let rocketSpeed = 5; // Rocket speed

// Key press state
let upKey = false;
let downKey = false;

// Listen for keydown events to control the rocket movement
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowUp") {
    upKey = true;
  } else if (event.code === "ArrowDown") {
    downKey = true;
  }
});

// Listen for keyup events to stop the rocket movement
document.addEventListener("keyup", function(event) {
  if (event.code === "ArrowUp") {
    upKey = false;
  } else if (event.code === "ArrowDown") {
    downKey = false;
  }
});

// Fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load the background and rocket images
bgImage.onload = function() {
  rocketImage.onload = function() {
    // Begin the animation loop after both images are loaded
    requestAnimationFrame(update);
  };
};

// Load rocket image
let rocketImage = new Image();
rocketImage.src = "rocket2.png"; // Replace with your rocket image path

// Update the canvas continuously
function update() {
  // Move background
  bgX -= bgSpeed;

  // Reset the background position when it moves off-screen
  if (bgX <= -canvas.width) {
    bgX = 0;
  }

  // Handle rocket movement based on key input
  if (upKey && rocketY > 0) {
    rocketY -= rocketSpeed; // Move up
  } else if (downKey && rocketY + rocketHeight < canvas.height) {
    rocketY += rocketSpeed; // Move down
  }

  // Clear canvas for the next frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the background image twice to create a seamless scrolling effect
  ctx.drawImage(bgImage, bgX, 0, canvas.width, canvas.height); // First image
  ctx.drawImage(bgImage, bgX + canvas.width, 0, canvas.width, canvas.height); // Second image

  // Rotate and draw the rocket image
  ctx.save(); // Save the current canvas state
  ctx.translate(rocketX + rocketHeight / 2, rocketY + rocketWidth / 2); // Move origin to the center of the rocket
  ctx.rotate(Math.PI / 2); // Rotate 90 degrees (clockwise)
  ctx.drawImage(rocketImage, -rocketWidth / 2, -rocketHeight / 2, rocketWidth, rocketHeight); // Draw the rocket at the new origin
  ctx.restore(); // Restore the canvas state (reset translation and rotation)

  // Request the next frame
  requestAnimationFrame(update);
}

// Handle window resizing to keep the canvas size full-screen
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
