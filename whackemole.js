// Get the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = 'Purple_Nebula.png'; 

const boxImage = new Image();
boxImage.src = 'Purple_Nebula.png'; 

// Once the image is loaded, adjust the canvas size and draw the image
backgroundImage.onload = function () {
  // Set the canvas size to match the window's size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Draw the image on the canvas
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Call the function to draw the grid after drawing the background image
  drawGrid(100);
};

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
}

window.addEventListener('resize', function() {
  // Resize canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Redraw the background image
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Redraw the grid
  drawGrid(100);
});

