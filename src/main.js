var enablePhysics = require('./enablePhysics.js');
var p2Physics = require('./p2Physics');

var createHookFile = require('./createHook.js');
var createHook = createHookFile.createHook;

var createHeroFile = require('./createHero.js');
var createHero = createHeroFile.createHero;

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

var groundSprite;
var cursors;
var jumpButton;

function create() {

    enablePhysics(game);
    this.hookSprite = createHook(game);
    this.heroSprite = createHero(game);

    console.log('heroSprite2', this.heroSprite);

    




    var groundBmd = game.add.bitmapData(16,16);
    groundBmd.ctx.beginPath();
    groundBmd.ctx.rect(0,0,16,16);
    groundBmd.ctx.fillStyle = '#DD9B33';
    groundBmd.ctx.fill();
    groundSprite = game.add.sprite(300, 400, groundBmd);
    game.physics.enable(groundSprite, Phaser.Physics.ARCADE); // needed for collision detection
    groundSprite.body.collideWorldBounds = true;
    groundSprite.body.checkCollision.up = true;
    groundSprite.body.checkCollision.down = false;
    groundSprite.body.immovable = true;



    p2Physics(game, this.heroSprite, this.hookSprite);

    // controls
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    
    console.log('heroSprite3', this.heroSprite);

    game.physics.arcade.collide(this.heroSprite, groundSprite);

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

