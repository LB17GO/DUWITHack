class GameObject {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    collidesWith(obj) {
        return (this.x < obj.x + obj.width &&
                this.x + this.width > obj.x &&
                this.y < obj.y + obj.height &&
                this.y + this.height > obj.y);
    }
}

class Bullet extends GameObject {
    constructor(x, y, width, height, color, dy) {
        super(x, y, width, height, color);
        this.dy = dy;
    }

    update() {
        this.y += this.dy;
    }
}

class SpaceShip extends GameObject {
    constructor(x, y, width, height, color, canvasHeight) {
        super(x, y, width, height, color);
        this.canvasHeight = canvasHeight;
        this.bulletWidth = 4;
        this.bulletHeight = 8;
        this.bulletColor = "#ff7800";
        this.bullets = [];
    }

    draw(ctx) {
        super.draw(ctx);
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].draw(ctx);
            this.bullets[i].update();
            if (this.bullets[i].y < 0 || this.bullets[i].y > this.canvasHeight) {
                this.bullets.splice(i, 1);
            }
        }
    }

    shoot(dy) {
        this.bullets.push(new Bullet(
            this.x + this.width / 2 - this.bulletWidth / 2,
            this.y - this.bulletHeight,
            this.bulletWidth,
            this.bulletHeight,
            this.bulletColor,
            dy
        ));
    }
}

class Player extends SpaceShip {
    constructor(x, y, width, height, color, canvasHeight, canvasWidth) {
        super(x, y, width, height, color, canvasHeight);
        this.canvasWidth = canvasWidth;
        this.fireCooldown = 0;
    }

    update(dx, dy) {
        super.update(dx, dy);
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > this.canvasWidth) this.x = this.canvasWidth - this.width;
    }
}

class Asteroid {
    constructor(x, y, width, height, color, noParts) {
        this.parts = [];
        for (let i = 0; i < noParts; i++) {
            for (let j = 0; j < noParts; j++) {
                this.parts.push(new GameObject(
                    x + i * width,
                    y + j * height,
                    width,
                    height,
                    color
                ));
            }
        }
    }

    draw(ctx) {
        this.parts.forEach(part => part.draw(ctx));
    }

    collidesWith(obj) {
        return this.parts.some(part => part.collidesWith(obj));
    }

    removeOnCollide(obj) {
        this.parts = this.parts.filter(part => !part.collidesWith(obj));
    }
}

var game = {};

game.canvas = document.getElementById('canvas');
game.ctx = game.canvas.getContext('2d');

game.backgroundImage = new Image();
game.backgroundImage.src = 'Starfield.png';

game.canvas.width = window.innerWidth;
game.canvas.height = window.innerHeight;

game.backgroundImage.onload = function () {
    drawBackground();
};

function drawBackground() {
    game.ctx.drawImage(game.backgroundImage, 0, 0, game.canvas.width, game.canvas.height);
}

game.killCounter = 0;

game.asteroidsParts = 8;
game.noOfAsteroids = 8;
game.asteroidsSpace = game.canvas.width / (game.noOfAsteroids + 1);
game.enemiesEachLine = 20;
game.enemyLines = 8;
game.enemySpace = 30;
game.enemyFireRate = 1000;
game.enemyFireTimer = 0;
game.enemyDirection = 1;
game.enemyStep = 5;

game.init = function() {
    game.interval = setInterval(game.update, 1000 / 60);

    game.player = new Player(
        game.canvas.width / 2 - 10,
        game.canvas.height - 40,
        20,
        20,
        '#0099CC',
        game.canvas.width
    );

    game.asteroids = [];
    for (let i = 0; i < game.noOfAsteroids; i++) {
        game.asteroids.push(new Asteroid(
            game.asteroidsSpace + i * game.asteroidsSpace,
            game.canvas.height - 180,
            5,
            5,
            '#ffffff',
            game.asteroidsParts
        ));
    }

    game.enemies = [];
    for (let i = 0; i < game.enemyLines; i++) {
        for (let j = 0; j < game.enemiesEachLine; j++) {
            game.enemies.push(new SpaceShip(
                game.enemySpace + j * game.enemySpace,
                game.enemySpace + i * game.enemySpace,
                20,
                20,
                '#FF0000',
                game.canvas.height
            ));
        }
    }
};

game.update = function() {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    drawBackground();
    game.player.draw(game.ctx);

    for (let asteroid of game.asteroids) {
        asteroid.draw(game.ctx);
    }

    for (let enemy of game.enemies) {
        enemy.draw(game.ctx);
        enemy.update(game.enemyDirection, 0);
    }

    if (game.enemies.length === 0) {
        game.restart();
    }

    game.player.bullets.forEach((bullet, i) => {
        for (let j = game.enemies.length - 1; j >= 0; j--) {
            if (game.enemies[j].collidesWith(bullet)) {
                game.enemies.splice(j, 1);
                game.player.bullets.splice(i, 1);
                game.killCounter++; 
                document.getElementById("counter").innerHTML= "Count:" + game.killCounter;
                break;
            }
        }
    });

    if (game.player.fireCooldown > 0) {
        game.player.fireCooldown--;
    }

    let closestToRightSideEnemy = game.enemies[0];
    let closestToLeftSideEnemy = game.enemies[0];

// Find enemies closest to the screen edges
    for (let i = 1; i < game.enemies.length; i++) {
        if (game.enemies[i].x > closestToRightSideEnemy.x) {
            closestToRightSideEnemy = game.enemies[i];
        }
        if (game.enemies[i].x < closestToLeftSideEnemy.x) {
         closestToLeftSideEnemy = game.enemies[i];
        }
    }

// Check if the enemies should reverse direction
    if (closestToRightSideEnemy.x + closestToRightSideEnemy.width >= game.canvas.width - game.enemyStep) {
        game.enemyDirection = -1; // Move left
        moveEnemiesDown();
    } else if (closestToLeftSideEnemy.x <= game.enemyStep) {
        game.enemyDirection = 1; // Move right
        moveEnemiesDown();
    }

// Move all enemies in the correct direction
    for (let enemy of game.enemies) {
        enemy.update(game.enemyDirection, 0);
    }

// Function to move enemies downward when reversing
    function moveEnemiesDown() {
     for (let enemy of game.enemies) {
        enemy.update(0, game.enemyStep);
    }
    }


    if(game.killCounter==120){
        alert("You won!");
        let InvadersBool = true;  // Or false, depending on your logic

            // Store the boolean value in localStorage
        localStorage.setItem('InvadersBool', InvadersBool);

            // Redirect to the home page
        window.location.href = '/public/index.html';  
    }
};

game.stop = function() {
    clearInterval(game.interval);
};

game.restart = function() {
    game.stop();
    game.init();
};

window.addEventListener('resize', function () {
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;
    drawBackground();
});

window.onload = function() {
    game.init();
    drawBackground();
};

window.addEventListener("keydown", function(e) {
    if (e.keyCode == 37 || e.keyCode == 65) {
        game.player.update(-5, 0);
    } else if (e.keyCode == 39 || e.keyCode == 68) {
        game.player.update(5, 0);
    } else if (e.keyCode == 32 && game.player.fireCooldown <= 0) {
        game.player.shoot(-5);
        game.player.fireCooldown = 10;
    }
});
