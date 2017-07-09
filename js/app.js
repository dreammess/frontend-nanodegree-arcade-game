// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 0;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x >= 515) {
        this.x = -75;
    }

    // Collision
    // y collision settings are ajusted to give the player more leeway with their head than with their feet.
    if(this.x < player.x + 25 && this.x + 25 > player.x && this.y < player.y + 50 && this.y + 30 > player.y) {
        player.score -= 5;
        player.lives -= 1;
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Initialize player's speed, score, lives and level
var Player = function() {
    this.x = 217;
    this.y = 430;
    this.speed = 15;
    this.score = 10;
    this.lives = 2;
    this.level = 1;
    this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function(dt) {

    // Handle player reaching water: score, lives and level all increase; Enemy speed increased.
    if(this.y < 0) {
        this.score += 50;
        this.lives += 1;
        this.level += 1;
        this.reset();
        allEnemies.forEach(function(enemy) {
            enemy.speed += 30;
            this.speed += 20;
        });
    }

//Reset player to beginning position
Player.prototype.reset = function() {
   this.x = 200;
   this.y = 400;
};

//Draw plazer to screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handle input using directional arrows on the keyboard.
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 0) {
        this.x -= this.speed;
    } else if(direction === 'right' && this.x < 410) {
        this.x += this.speed;
    } else if(direction === 'up') {
        this.y -= this.speed;
    } else if(direction === 'down' && this.y < 430) {
        this.y += this.speed;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var allEnemies = [];
var enemy1 = new Enemy(70, 120);
var enemy2 = new Enemy(200, 150);
var enemy3 = new Enemy(330, 170);
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
