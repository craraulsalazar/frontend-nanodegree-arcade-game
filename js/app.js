// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 0;
    this.y = 0;
    this.speed = 110;
    this.size = 101;
    this.name = 'bug';
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    //this.y +=2;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.hitWall = function() {

    var offset = 20;
    if (this.x > (canvasWidth + this.size + offset))
        return this;
    else
        return null;

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Player = function() {

    this.x = 0;
    this.y = 0;
    this.speed = 100;
    this.size = 101;
    this.name = 'char-boy';
    this.sprite = 'images/char-boy.png';
    this.directionX= 0;
    this.directionY =0;

}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.directionX != null)
    {
        this.x += this.speed*dt* this.directionX;
    }
    if (this.directionY != null)
    {
        this.y += this.speed*dt* this.directionY;
    }

}

Player.prototype.collision = function(AllEnemies)
{


}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(PushedKey)
{
    this.directionX = null;
    this.directionY = null;

    switch (PushedKey)
    {
        case 'left':
            console.log('push left');
            this.directionX = -1;
            break;
        case 'right':
            console.log('push right');
            this.directionX = 1;
            break;
        case 'up':
            console.log('push up');
            this.directionY = -1;
            break;
        case 'down':
            console.log('push down');
            this.directionY = 1;
            break;
    }

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

    player.handleInput('stop');
});

document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
