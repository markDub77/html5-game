var p2Physics = require('./p2Physics');
var enablePhysics = require('./enablePhysics');

var createHookFile = require('./createHook');
var createHeroFile = require('./createHero');
var createGroundFile = require('./createGround');
var createControlsFile = require('./createControls');
var controlsFile = require('./controls');

var createHook = createHookFile.createHook;
var createHero = createHeroFile.createHero;
var createGround = createGroundFile.createGround;
var createControls = createControlsFile.createControls;
var controls = controlsFile.controls;

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

function create() {

    enablePhysics(game);
    this.hookSprite = createHook(game);
    this.heroSprite = createHero(game);
    this.groundSprite = createGround(game);

    // not being used right now
    p2Physics(game, this.heroSprite, this.hookSprite);

    this.createControls = createControls(game);
    this.run = this.createControls.run;
    this.jump = this.createControls.jump;
}

function update() {
    
    game.physics.arcade.collide(this.heroSprite, this.groundSprite);

    // Archade clollision detection breaks this 
	//  this.heroSprite.body.setZeroVelocity();
     this.heroSprite.body.velocity.x = 0;
     controls(this.run, this.jump, this.heroSprite);
}
