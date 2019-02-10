 // Create the state that will contain the whole game
var mainState = {
    preload: function() {  
        // Here we preload the assets
        game.load.spritesheet('controller-indicator', 'assets/images/controller-indicator.png', 16,16);
        game.load.spritesheet('laserHudIcon', 'assets/images/laserHudIcon.png', 16,16);
        game.load.spritesheet('laserIcon', 'assets/images/laserIcon.png', 16,16);
        game.load.spritesheet('ground', 'assets/images/ground.png', 16,16);
    },

    create: function() {
        require('./create/enablePhysics').enablePhysics(game);
        require('./create/createControls').createControls(game, this.gofull);
        require('./create/createPlayer').createPlayer(game);
        require('./create/createLevel').createLevel(game);
        require('./create/createWeapons').createWeapons(game);
        require('./create/createHud').createHud(game);  

        game.holdFire = false;
        
          

    },

    update: function() {
        require('./update/collisions').collisions(game, this.laserHitWall, this.laserGet, this.restart, this.laserHitPlayer);
        require('./update/controls').controls(game, this.laserFire);
        require('./update/hud').hud(game);
        require('./update/weapons').weapons(game);
     },

    laserFire: function() {
        // Get the first laser that's inactive, by passing 'false' as a parameter
        var laser = game.lasers.getFirstExists(false);
        if (laser) {
            // If we have a laser, set it to the starting position
            laser.reset(game.player1Sprite.body.x, game.player1Sprite.body.y);
            // Give it a velocity of -500 so it starts shooting

            if (game.player1Sprite.facing == 'right') {
                laser.body.velocity.x = 500;
            } else {
                laser.body.velocity.x = -500;
            }
        }
    },


    // Function to kill a coin
    laserGet: function(player, laserIcon) {
        laserIcon.kill();
        game.laserHudIcon = game.add.sprite(90, 10, 'laserHudIcon');
        game.laserHudIcon.tint = 0xff0000;
        game.laserGot = 'true'

    },

    laserHitWall: function(laser) {
        laser.kill();
    },

    laserHitPlayer: function(shotGuy, laser) {

        laser.kill();
    
        game.player2Sprite.healthContainerSprite.children.pop(); 

        // Blink code
        var originalTint = shotGuy.tint
        game.counter = 0 // we need a way to switch back and forth really fast, so we will use even and odd numbers
        
        var updateCounter = function() {
            
            game.counter++;

            // blink for 10 frames
            if (game.counter <= 10 ) {
                // alternate colors every frame
                if (game.counter % 2) {
                    shotGuy.tint = 0xff0000; 
                } else {
                    shotGuy.tint = 0xffffff;
                }

            } else {
                // give the guy back his normal tint and stop the counter
                game.time.events.remove(event);
                shotGuy.tint = originalTint
                game.ran = false
                shotGuy.invincible = false
            }
        }

        var event = game.time.events.loop(100, updateCounter, this);
    },

    // Function to restart the game
    restart: function() {
        game.state.start('main');
        game.laserGot = 'false'
    },

    gofull: function() {
        if (game.scale.isFullScreen){
            game.scale.stopFullScreen();
        } else {
            game.scale.startFullScreen(false);
        }
    },

    render: function() {
        //  FPS debug info
        game.debug.text(game.time.fps, 1009, 10, "#366dc5");
    }
};

// Initialize the game and start our state
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'phaser-example');  
// var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'phaser-example');  
// var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio - 40, window.innerHeight * window.devicePixelRatio - 40, Phaser.AUTO, 'phaser-example');

game.state.add('main', mainState);  
game.state.start('main');