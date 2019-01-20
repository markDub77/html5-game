 // Create the state that will contain the whole game
var mainState = {
    preload: function() {  
        // Here we preload the assets
    },

    create: function() {

        
    




        //  Advanced profiling, including the fps rate, fps min/max, suggestedFps and msMin/msMax are updated
        game.time.advancedTiming = true;

        // Stretch to fill
        // game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        
        // Keep original size
        // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

        // Maintain aspect ratio
        // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.input.onDown.add(this.gofull, this);

        // Here we create the game
        // Set the background color to blue
        // game.stage.backgroundColor = '#3598db';

        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // game.time.desiredFps = 30; //???
        // Add the physics engine to all game objects
        game.world.enableBody = true;

        // Variable to store the arrow key pressed
        this.cursor = game.input.keyboard.createCursorKeys();


        this.createControls = require('./createControls').createControls(game);
        this.run = this.createControls.run;
        this.jump = this.createControls.jump;
        this.pad1 = this.createControls.pad1;
        this.shoot = this.createControls.shoot;


        // Create the player in the middle of the game
        var heroBmd = game.add.bitmapData(16,16);
            heroBmd.ctx.beginPath();
            heroBmd.ctx.rect(0,0,16,16);
            heroBmd.ctx.fillStyle = '#DD9B33';
            heroBmd.ctx.fill();
        this.heroSprite = game.add.sprite(40, 70, heroBmd);
        this.heroSprite.anchor.setTo(0.5, 0.5);
 
        
         // Add gravity to make it fall
         this.heroSprite.body.gravity.y = 300;  
         // game.physics.arcade.gravity.y = 250;
        //  this.heroSprite.body.gravity.set(0, 250);   

        // Create 3 groups that will contain our objects
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();

        // Design the level. x = wall, o = coin, ! = lava.
        var level = [
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            'x',                                                                                           
            'x                 o',                                                                         
            'x',                                                                                           
            'x',                                                                                           
            'x',                    
            'x',                    
            'x         o',          
            'x',                    
            'x     o       ',     
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            '                                                                                             x',
            '                                                                                             x',
            '                                                                                             x ',
            '                                                                                             x',
            '                                                                                             x',
            '                                                                                             x',
            '                                                                                             x',
            '                                                                                             x',
            '                                                                                             x',
            '                                                                                             x',
            '                                                                                             x',
            '                                                                                             x',
            '                                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            

        ];


        var wallBmd = game.add.bitmapData(16,16);
            wallBmd.ctx.beginPath();
            wallBmd.ctx.rect(0,0,16,16);
            wallBmd.ctx.fillStyle = '#366dc5';
            wallBmd.ctx.fill();
        
        var coinBmd = game.add.bitmapData(16,16);
            coinBmd.ctx.beginPath();
            coinBmd.ctx.rect(0,0,16,16);
            coinBmd.ctx.fillStyle = '#EDC233';
            coinBmd.ctx.fill();

        var lavaBmd = game.add.bitmapData(16,16);
            lavaBmd.ctx.beginPath();
            lavaBmd.ctx.rect(0,0,16,16);
            lavaBmd.ctx.fillStyle = '#D95F49';
            lavaBmd.ctx.fill();

        // Create the level by going through the array
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

                // Create a wall and add it to the 'walls' group
                if (level[i][j] == 'x') {
                    var wall = game.add.sprite(16*j, 16*i, wallBmd);
                    this.walls.add(wall);
                    wall.body.immovable = true; 
                }

                // Create a coin and add it to the 'coins' group
                else if (level[i][j] == 'o') {
                    var coin = game.add.sprite(16*j, 16*i, coinBmd);
                    this.coins.add(coin);
                }

                // Create a enemy and add it to the 'enemies' group
                else if (level[i][j] == '!') {
                    var enemy = game.add.sprite(16*j, 16*i, lavaBmd);
                    this.enemies.add(enemy);
                }
            }
        }



        var laserBmd = game.add.bitmapData(4,4);
        laserBmd.ctx.beginPath();
        laserBmd.ctx.rect(0,0,4,4);
        laserBmd.ctx.fillStyle = '#ff0000';
        laserBmd.ctx.fill();
        // Create the group using the group factory
        this.lasers = game.add.group();
        // To move the sprites later on, we have to enable the body
        this.lasers.enableBody = true;
        // We're going to set the body type to the ARCADE physics, since we don't need any advanced physics
        this.lasers.physicsBodyType = Phaser.Physics.ARCADE;
        /*
            This will create 20 sprites and add it to the stage. They're inactive and invisible, but they're there for later use.
            We only have 20 laser bullets available, and will 'clean' and reset they're off the screen.
            This way we save on precious resources by not constantly adding & removing new sprites to the stage
        */
       this.lasers.createMultiple(1, laserBmd);

       /*
		Behind the scenes, this will call the following function on all lasers:
			- events.onOutOfBounds.add(resetLaser)
		Every sprite has an 'events' property, where you can add callbacks to specific events.
		Instead of looping over every sprite in the group manually, this function will do it for us.
        */
       this.lasers.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
        // Same as above, set the anchor of every sprite to 0.5, 1.0
        this.lasers.callAll('anchor.setTo', 'anchor', -4, -1);

        // This will set 'checkWorldBounds' to true on all sprites in the group
        this.lasers.setAll('checkWorldBounds', true);

        function resetLaser(laser) {
            laser.kill();
        }


    },

    update: function() {
        // Here we update the game 60 times per second

         // Make the player and the walls collide
         game.physics.arcade.collide(this.heroSprite, this.walls);

        this.controls =  require('./controls').controls(
            this.run, 
            this.jump, 
            this.shoot,
            this.heroSprite, 
            this.pad1,
            this.lasers
        );


        // function fireLaser() {
        //     // Get the first laser that's inactive, by passing 'false' as a parameter
        //     var laser = lasers.getFirstExists(false);
        //     if (laser) {
        //         // If we have a laser, set it to the starting position
        //         laser.reset(heroSprite.body.x, heroSprite.body.y - 20);
        //         // Give it a velocity of -500 so it starts shooting
        //         laser.body.velocity.y = -500;
        //     }
        // }
       

        // Call the 'takeCoin' function when the player takes a coin
        game.physics.arcade.overlap(this.heroSprite, this.coins, this.takeCoin, null, this);

        // Call the 'restart' function when the player touches the enemy
        game.physics.arcade.overlap(this.heroSprite, this.enemies, this.restart, null, this);

     },

    
    // Function to kill a coin
    takeCoin: function(player, coin) {
        coin.kill();
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
        game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 0, 10, "#00ff00");
    }
};

// Initialize the game and start our state
// var game = new Phaser.Game(1800, 400, Phaser.AUTO, 'phaser-example');  
var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio - 40, window.innerHeight * window.devicePixelRatio - 40, Phaser.AUTO, 'phaser-example');

game.state.add('main', mainState);  
game.state.start('main');