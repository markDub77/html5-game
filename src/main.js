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
    },

    update: function() {
        require('./update/collisions').collisions(game, this.hitWall, this.getLaser, this.restart, this.hitPlayer);
        require('./update/controls').controls(game, this.fireLaser);
        require('./update/hud').hud(game);
        require('./update/weapons').weapons(game);

        
     },

     fireLaser: function() {
        // Get the first laser that's inactive, by passing 'false' as a parameter
        var laser = game.lasers.getFirstExists(false);
        if (laser) {
            // If we have a laser, set it to the starting position
            laser.reset(game.playerSprite.body.x, game.playerSprite.body.y);
            // Give it a velocity of -500 so it starts shooting

            if (game.playerSprite.facing == 'right') {
                laser.body.velocity.x = 500;
            } else {
                laser.body.velocity.x = -500;
            }
        }
    },

    // Function to kill a coin
    getLaser: function(player, laserIcon) {
        laserIcon.kill();
        game.laserHudIcon = game.add.sprite(90, 10, 'laserHudIcon');

    },
    hitWall: function(laser) {
        laser.kill();
    },
    hitPlayer: function(obj1, obj2) {
        obj2.kill();
    },
    // Function to restart the game
    restart: function() {
        game.state.start('main');
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
        game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 0, 765, "#366dc5");
    }
};

// Initialize the game and start our state
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'phaser-example');  
// var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'phaser-example');  
// var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio - 40, window.innerHeight * window.devicePixelRatio - 40, Phaser.AUTO, 'phaser-example');

game.state.add('main', mainState);  
game.state.start('main');