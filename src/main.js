var enablePhysics = require('./enablePhysics.js');
var p2Physics = require('./p2Physics');

var createHookFile = require('./createHook.js');
var createHeroFile = require('./createHero.js');
var createGroundFile = require('./createGround.js');

var createHook = createHookFile.createHook;
var createHero = createHeroFile.createHero;
var createGround = createGroundFile.createGround;

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

var cursors;
var jumpButton;

function create() {

    enablePhysics(game);
    this.hookSprite = createHook(game);
    this.heroSprite = createHero(game);
    this.groundSprite = createGround(game);
    p2Physics(game, this.heroSprite, this.hookSprite);

    // controls
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    
    game.physics.arcade.collide(this.heroSprite, this.groundSprite);

    // Archade clollision detection breaks this 
	// heroSprite.body.setZeroVelocity();
     this.heroSprite.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
    	// heroSprite.body.moveLeft(400);
        this.heroSprite.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
    	// heroSprite.body.moveRight(400);
        this.heroSprite.body.velocity.x = 150;
    }

    if (cursors.up.isDown)
    {
        // heroSprite.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
        // heroSprite.body.moveDown(400);
    }

    if (jumpButton.isDown && this.heroSprite.body.onFloor())
    {
        this.heroSprite.body.velocity.y = -350;
        // jumpTimer = game.time.now + 750;
    }
}

