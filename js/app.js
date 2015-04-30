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
    this.location = 'row1'
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.hitWall = function() {

    var offset = 20;
    if (this.x > (canvasWidth + this.size + offset)) {
        return this;
    }
    else {
        return null;
    }

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
    this.speed = 200;
    this.size = 101;
    this.width = 101;
    this.height = 83;
    this.name = 'char-boy';
    this.sprite = 'images/char-boy.png';
    this.directionX= null;
    this.directionY =null;
    this.handleKeyUpEvent = function (e) {

        this.handleInput('stop');
    };

    this.handleKeyDownEvent = function (e) {

        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        this.handleInput(allowedKeys[e.keyCode]);
    }

    //http://stackoverflow.com/questions/1081499/accessing-an-objects-property-from-an-event-listener-call-in-javascript

    //include listeners for kepup and keydown.
    document.addEventListener('keyup', this.handleKeyUpEvent.bind(this), true);

    document.addEventListener('keydown', this.handleKeyDownEvent.bind(this), true);


}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //if player has not press any key, then bypass this code
    if (this.directionX != null)
    {
        this.x += this.speed*dt* this.directionX;

        //tools.clamp function make sure the player does NOT go off the canvas boundaries
        this.x = Tools.Clamp(this.x,0, canvasWidth - 101 );
    }
    if (this.directionY != null)
    {
        this.y += this.speed*dt* this.directionY;

        //tools.clamp function make sure the player does NOT go off the canvas boundaries
        this.y = Tools.Clamp(this.y,0, canvasHeigth - 171 );
    }


}


//Check player whenever hits enemies
Player.prototype.collision = function(allEnemiesToTestforCollition) {


    //setup offset player position
    var offsetpositionx = this.x + (this.width * 0.25);
    var offsetpositiony = this.y + (this.height * 0.25);
    var imgwd = this.width * 0.5;
    var imgght = this.height * 0.5;

    var allEnemiesToTestforCollitionLen = allEnemiesToTestforCollition.length;

    for (var i = 0; i < allEnemiesToTestforCollitionLen; i++) {

        var currentarray = allEnemiesToTestforCollition[i];
        var currentarrayLen = currentarray.length;

        for (var j=0; j < currentarrayLen; j++) {

            var currentenemy = currentarray[j];

            var rect0 = {
                x: offsetpositionx,
                y: offsetpositiony,
                width: imgwd,
                height: imgght
            };

            var rect1 = {
                x: currentenemy.x,
                y: currentenemy.y,
                width: currentenemy.size,
                height: 83
            };

            if (Tools.rectIntersect(rect0, rect1)) {
                //if player hits any enemy
                //console.log('player hit enemy ' + currentenemy.name);
                return true;
            }
        }
    }

    return false;

}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

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
/*
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

*/
