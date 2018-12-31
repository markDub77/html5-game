var createDistanceConstraint = require('./createDistanceConstraint');
var enablePhysics = require('./enablePhysics');


var createHeroFile = require('./createHero');
var createPlatformFile = require('./createPlatform');
var createControlsFile = require('./createControls');
var createChainFile = require('./createChain');
var controlsFile = require('./controls');

var pad1;

var createHero = createHeroFile.createHero;
var createPlatform = createPlatformFile.createPlatform;
var createChain = createChainFile.createChain;
var createControls = createControlsFile.createControls;

var controls = controlsFile.controls;

var game = new Phaser.Game(1800, 900, Phaser.CANVAS, 'phaser-example', { create: create, update: update });


function preload() {
    game.input.gamepad.start();  
    pad1 = game.input.gamepad.pad1;
}
function create() {

    enablePhysics(game);
    this.heroSprite = createHero(game);
    this.platformSprite = createPlatform(game);
    
    this.createChainSprite = createChain(game, this.platformSprite, this.heroSprite);
    this.chainBitmapData = this.createChainSprite.chainBitmapData;
    this.chainAnchorX = this.createChainSprite.chainAnchorX;
    this.chainAnchorY = this.createChainSprite.chainAnchorY;
    this.chainLength = this.createChainSprite.chainLength;
    this.chain = this.createChainSprite.chain;

    

    this.createControls = createControls(game);
    this.run = this.createControls.run;
    this.jump = this.createControls.jump;

    game.input.gamepad.start();
    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    pad1 = game.input.gamepad.pad1;

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
    
    this.controls = controls(this.run, this.jump, this.heroSprite, pad1, this.chainBitmapData, this.chainLength);
    this.chainLength = this.controls.chainLength;
    console.log('this.chainLength', this.chainLength)
    
    //Remove last spring
    game.physics.p2.removeSpring(this.chain);

    //Create new spring at pointer x and y
    this.chain = game.physics.p2.createSpring(
        this.platformSprite, // sprite 1
        this.heroSprite,     // sprite 2
        this.chainLength,    // length of the Chain
        100,                 // stiffness (lower numbers sag)
        9,                   // damping (lower numbers bounce)
        [-this.chainAnchorX, -this.chainAnchorY]); // Where to hook the spring to body A in world coordinates. 
    
    // this.chainAnchorX = pointer.x;
    // this.chainAnchorY = pointer.y
   

}
