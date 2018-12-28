var createDistanceConstraint = require('./createDistanceConstraint');
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

var nullSprite;
function create() {

    enablePhysics(game);
    this.hookSprite = createHook(game);
    this.heroSprite = createHero(game);
    this.groundSprite = createGround(game);

    this.createControls = createControls(game);
    this.run = this.createControls.run;
    this.jump = this.createControls.jump;

    var nullBmp = game.add.bitmapData(4,4);
        nullBmp.ctx.beginPath();
        nullBmp.ctx.rect(0,0,4,4);
        nullBmp.ctx.fillStyle = '#0de832';
        nullBmp.ctx.fill();
        nullSprite = game.add.sprite(410, 300, nullBmp);
        game.physics.p2.enable(nullSprite);
        createDistanceConstraint(game, nullSprite, this.hookSprite);

    this.heroSprite.addChild(nullSprite);

}

function update() {
    
    game.physics.arcade.collide(this.heroSprite, this.groundSprite);

    // Archade clollision detection breaks this 
     nullSprite.body.setZeroVelocity();
     
     this.heroSprite.body.velocity.x = 0;

     controls(this.run, this.jump, this.heroSprite);
}
