// Get the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = 'Purple_Nebula.png'; 

const boxImage = new Image();
boxImage.src = 'Purple_Nebula.png'; 

const AlienImage = new Image();
AlienImage.scr = "Alien.png"

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
  
  for (let x = gridX; x < gridX + gridWidth; x += cellSize) {
    for (let y = gridY; y < gridY + gridHeight; y += cellSize) {
      drawEllipse(x + cellSize / 2, y + cellSize / 2, 40, 20); // Adjust ellipse size and position as needed
    }
  }
}

function drawEllipse(x, y, radius) {
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius / 2, 0, 0, Math.PI * 2);  // Draw ellipse at (x, y) with given radius
    ctx.fillStyle = "black"; // Fill color
    ctx.fill();
    ctx.strokeStyle = "white"; // Outline color
    ctx.stroke();
}

function randomAlien(){
    let randomNumberX = Math.random() * 6;
    let randomNumberY = Math.random() * 6;
    placeImageInGrid(randomNumberX,randomNumberY);
}

function placeImageInGrid(row, col){
    const cellSize = 100;

    // Define the position of the top-left corner of the image in the grid
    const gridWidth = 600;  // Width of the grid
    const gridHeight = 600; // Height of the grid
    const gridX = (canvas.width - gridWidth) / 2; // X position to center the grid
    const gridY = (canvas.height - gridHeight) / 2; // Y position to center the grid

    // Calculate the position of the image based on row and column
    const imgX = gridX + col * cellSize;  // X position of the image in the grid
    const imgY = gridY + row * cellSize;  // Y position of the image in the grid

    // Draw the image at the calculated position
    ctx.drawImage(AlienImage, imgX, imgY, cellSize, cellSize); 
}

document.getElementById("start_button").addEventListener("click", function(){
    
})


window.addEventListener('resize', function() {
  // Resize canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Redraw the background image
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Redraw the grid
  drawGrid(100);
});

