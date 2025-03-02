const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gridContainer = document.getElementById("grid-container");

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = 'Starfield.png';

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;












window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});