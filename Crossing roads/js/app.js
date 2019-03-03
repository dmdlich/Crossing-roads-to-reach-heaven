
//Displays the image of the player in the grid with the x and y points.
const Player = function() {
    
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

//This is to end the game when player and enemy collide by designating the distance that they need to be within for the game to end. 
//Then alert and finish the game.
Player.prototype.update = function(dt) {
  
    allEnemies.forEach(function(enemy){
        if(Math.abs(enemy.x - player.x) < 75 && Math.abs(enemy.y - player.y) < 70){
            setTimeout(function() {
                alert('You died.');
                player = new Player();
                enemy1 = new Enemy(60);
                enemy2 = new Enemy(146);
                enemy3 = new Enemy(228);
                allEnemies = [enemy1, enemy2, enemy3];
            }, 10);
        }
    });
};



// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Function that enables the player to be moved according to the arrow key input.
Player.prototype.handleInput = function(direction) {
    if (direction === 'right') {
        if (this.x < 400) {
            this.x = this.x + 101; 
        }
    } else if (direction === 'left') {
        if (this.x > 0) {
            this.x = this.x - 101; 
        }
    } else if (direction === 'up') {
        if (this.y > 0) {
            this.y = this.y - 85;
        }
    } else if (direction === 'down') {
        if (this.y < 400) {
            this.y = this.y + 85;
        }
    }

//If player crosses the three enemies and goes to the other side of the grid, game ends and winning message displays.
    if(this.y < 50) {
        setTimeout(function (){
        alert('you win!');
        player = new Player();
        enemy1 = new Enemy(60);
        enemy2 = new Enemy(146);
        enemy3 = new Enemy(228);
        allEnemies = [enemy1, enemy2, enemy3];
        }, 100);
    }
};

const Enemy = function(startPos) {
  

//Sets the starting point of the enemies and also defines the speed that each enemy will cross the grid.
    this.sprite = 'images/enemy-bug.png';
    this.x = -200;
    this.y = startPos;
    this.speed = Math.floor(Math.random() * (1000 - 100)) + 100;
};



Enemy.prototype.update = function(dt) {
  
    this.x = this.x + dt*this.speed;
    if(this.x > 500) {
        this.x = -150;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Defines player and three enemies and push all enemies into one single array to be accessed later on.
let player = new Player();
let enemy1 = new Enemy(60);
let enemy2 = new Enemy(146);
let enemy3 = new Enemy(228);

let allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
