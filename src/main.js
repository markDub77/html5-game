var createDistanceConstraint = require('./createDistanceConstraint');
var enablePhysics = require('./enablePhysics');


var createHeroFile = require('./createHero');
var createPlatformFile = require('./createPlatform');
var createControlsFile = require('./createControls');
var createChainFile = require('./createChain');
var controlsFile = require('./controls');


var createHero = createHeroFile.createHero;
var createPlatform = createPlatformFile.createPlatform;
var createChain = createChainFile.createChain;
var createControls = createControlsFile.createControls;

var controls = controlsFile.controls;

var game = new Phaser.Game(1800, 900, Phaser.CANVAS, 'phaser-example', { create: create, update: update });


function create() {

    enablePhysics(game);
    this.heroSprite = createHero(game);
    this.platformSprite = createPlatform(game);
    
    this.createChainSprite = createChain(game, this.platformSprite, this.heroSprite);
    this.chainBitmapData = this.createChainSprite.chainBitmapData;
    this.chainAnchorX = this.createChainSprite.chainAnchorX;
    this.chainAnchorY = this.createChainSprite.chainAnchorY;

    this.createControls = createControls(game);
    this.run = this.createControls.run;
    this.jump = this.createControls.jump;  
}

function update() {
    
    this.chainBitmapData.clear();
    this.chainBitmapData.ctx.beginPath();
    this.chainBitmapData.ctx.moveTo(this.heroSprite.x, this.heroSprite.y);
    this.chainBitmapData.ctx.lineTo(this.chainAnchorX, this.chainAnchorY);
    this.chainBitmapData.ctx.lineWidth = "2";
    this.chainBitmapData.ctx.stroke();
    this.chainBitmapData.ctx.closePath();
    this.chainBitmapData.render();

    controls(this.run, this.jump, this.heroSprite);
}
