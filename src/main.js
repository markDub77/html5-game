var createDistanceConstraint = require('./createDistanceConstraint');
var enablePhysics = require('./enablePhysics');


var createHeroFile = require('./createHero');
var createGroundFile = require('./createGround');
var createControlsFile = require('./createControls');
var createRopeFile = require('./createRope');
var controlsFile = require('./controls');


var createHero = createHeroFile.createHero;
var createGround = createGroundFile.createGround;
var createRope = createRopeFile.createRope;
var createControls = createControlsFile.createControls;

var controls = controlsFile.controls;

var game = new Phaser.Game(1800, 900, Phaser.CANVAS, 'phaser-example', { create: create, update: update });


function create() {

    enablePhysics(game);
    this.heroSprite = createHero(game);
    this.groundSprite = createGround(game);
    
    this.createRopeSprite = createRope(game, this.groundSprite, this.heroSprite);
    this.ropeBitmapData = this.createRopeSprite.ropeBitmapData;
    this.ropeAnchorX = this.createRopeSprite.ropeAnchorX;
    this.ropeAnchorY = this.createRopeSprite.ropeAnchorY;

    this.createControls = createControls(game);
    this.run = this.createControls.run;
    this.jump = this.createControls.jump;  
}

function update() {
    
    //  this.heroSprite.body.setZeroVelocity(); // p2 physics
     
     // Change the bitmap data to reflect the new rope position
    
    this.ropeBitmapData.clear();
    this.ropeBitmapData.ctx.beginPath();
    this.ropeBitmapData.ctx.moveTo(this.heroSprite.x, this.heroSprite.y);
    this.ropeBitmapData.ctx.lineTo(this.ropeAnchorX, this.ropeAnchorY);
    this.ropeBitmapData.ctx.lineWidth = "2";
    this.ropeBitmapData.ctx.stroke();
    this.ropeBitmapData.ctx.closePath();
    this.ropeBitmapData.render();


     controls(this.run, this.jump, this.heroSprite);
}
