var game_level = {
  y_positions: [60,140,220],
  speed: Math.floor(Math.random() * 200) + 300
}

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';   // Load enemy images
    this.x = Math.floor(Math.random() * 500); //Random x starting position
    this.y = game_level.y_positions[Math.floor(Math.random() * game_level.y_positions.length)]; // Randomly choose between three y positions
    this.enemy_speed = game_level.speed; // Random enemy speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.enemy_speed * dt;
    if (this.x > 500) {   //Resets enemies position after enemy has scrolled of the board
      this.x = -100;
      this.enemy_speed = game_level.speed;
      this.y = game_level.y_positions[Math.floor(Math.random() * game_level.y_positions.length)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 380;
};

Player.prototype.update = function(dt) {
};

//Updates player position based on clicking arrow
Player.prototype.handleInput = function(pressed_key) {
  if (pressed_key == "up" && this.y > 0) { this.y = this.y-80 }
  else if (pressed_key == "down" && this.y < 350) { this.y = this.y+80 }
  else if (pressed_key == "left" && this.x > 0) { this.x = this.x-100 }
  else if (pressed_key == "right" && this.x < 400) { this.x = this.x+100 }

  if (this.y <= 0) { wonGame (); }
};

// Renders player on screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//
function wonGame () {
  document.getElementById('win').innerHTML = "You Won";
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Creates multiple enemies
var allEnemies = (function () {
  enemies_array = []
  for (i=0; i<4; i++){
    enemies_array.push(new Enemy());
  }
  return enemies_array;
})()

// Place the player object in a variable called player
var player = new Player();

// Keeps an eye out for collison between enemies and player
function checkCollisions() {
  allEnemies.forEach(function(enemy) {
      if (enemy.y == player.y && enemy.x >= player.x - 80 && enemy.x <= player.x + 80 ) {
        console.log("Its a hit");
        player.x = 200;
        player.y = 380;
      }
  });
}

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
