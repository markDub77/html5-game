var game = new Phaser.Game(1800, 900, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

function create() {

    require('./enablePhysics').enablePhysics(game);

    this.heroSprite = require('./createHero').createHero(game);
    this.platformSprite = require('./createPlatform').createPlatform(game);
    
    this.createChainSprite = require('./createChain').createChain(game, this.platformSprite, this.heroSprite);
        this.chainBitmapData = this.createChainSprite.chainBitmapData;
        this.chainAnchorX = this.createChainSprite.chainAnchorX;
        this.chainAnchorY = this.createChainSprite.chainAnchorY;
        this.chainLength = this.createChainSprite.chainLength;
        this.chainSprite = this.createChainSprite.chainSprite;
        this.hookSprite = this.createChainSprite.hookSprite;
    

    this.createControls = require('./createControls').createControls(game);
        this.run = this.createControls.run;
        this.jump = this.createControls.jump;
        this.pad1 = this.createControls.pad1;

}



function update() {
    
    this.controls =  require('./controls').controls(
        this.run, 
        this.jump, 
        this.heroSprite, 
        this.pad1, 
        this.chainBitmapData, 
        this.chainLength,
        this.chainAnchorX,
        this.chainAnchorY
    );
        this.chainLength = this.controls.chainLength;
        this.grappleRelease = this.controls.grappleRelease;
        this.chainAnchorX = this.controls.chainAnchorX;
        this.chainAnchorY = this.controls.chainAnchorY;

    this.updateChain =  require('./updateChain').updateChain(
        game, 
        this.platformSprite, 
        this.heroSprite, 
        this.chainLength, 
        this.spring, 
        this.chainBitmapData, 
        this.chainAnchorX, 
        this.chainAnchorY, 
        this.grappleRelease,
        this.chainSprite,
        this.hookSprite
    ); 
        this.chainBitmapData = this.updateChain.chainBitmapData;
        this.chainLength = this.updateChain.chainLength;
        this.spring = this.updateChain.spring;
        this.chainAnchorX = this.updateChain.chainAnchorX;
        this.chainAnchorY = this.updateChain.chainAnchorY;
        this.chainSprite = this.updateChain.chainSprite;
        this.hookSprite = this.updateChain.hookSprite;
}
