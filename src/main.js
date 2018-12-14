const enablePhysics = require('./enablePhysics.js');
const p2Physics = require('./p2Physics');

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {}

var hookSprite;
var heroSprite;
var groundSprite;
var cursors;
var platforms;
var jumpButton;

function create() {
    enablePhysics(game);

    var hookBmd = game.add.bitmapData(4,4);
    hookBmd.ctx.beginPath();
    hookBmd.ctx.rect(0,0,4,4);
    hookBmd.ctx.fillStyle = '#ff0000';
    hookBmd.ctx.fill();
    hookSprite = game.add.sprite(400, 300, hookBmd);
    game.physics.p2.enable(hookSprite);

    var heroBmd = game.add.bitmapData(16,16);
    heroBmd.ctx.beginPath();
    heroBmd.ctx.rect(0,0,16,16);
    heroBmd.ctx.fillStyle = '#DD9B33';
    heroBmd.ctx.fill();
    heroSprite = game.add.sprite(400, 300, heroBmd);
    
    game.physics.enable(heroSprite, Phaser.Physics.ARCADE); // needed for collision detection
    heroSprite.body.bounce.y = 0.2;
    heroSprite.body.collideWorldBounds = true;
    heroSprite.body.collideWorldBounds = true; 
    game.physics.p2.enable(heroSprite);

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

    p2Physics(game,heroSprite,hookSprite);

    // controls
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);




}

function update() {
    
    game.physics.arcade.collide(heroSprite, groundSprite);

    // Archade clollision detection breaks this 
	// heroSprite.body.setZeroVelocity();
    heroSprite.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
    	// heroSprite.body.moveLeft(400);
        heroSprite.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
    	// heroSprite.body.moveRight(400);
        heroSprite.body.velocity.x = 150;
    }

    if (cursors.up.isDown)
    {
        // heroSprite.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
        // heroSprite.body.moveDown(400);
    }

    if (jumpButton.isDown && heroSprite.body.onFloor())
    {
        heroSprite.body.velocity.y = -350;
        // jumpTimer = game.time.now + 750;
    }
}

